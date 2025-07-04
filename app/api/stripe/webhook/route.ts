import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case 'payment_intent.succeeded':
      await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
      break;

    case 'payment_intent.payment_failed':
      await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing checkout session:', session.id);

    // Retrieve session with line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'payment_intent'],
    });

    const userId = session.metadata?.userId !== 'guest' ? session.metadata?.userId : null;
    const cartItems = JSON.parse(session.metadata?.cartItems || '[]');

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Calculate totals
    const subtotal = Number(session.amount_subtotal) / 100;
    const tax = Number(session.total_details?.amount_tax || 0) / 100;
    const shipping = Number(session.total_details?.amount_shipping || 0) / 100;
    const total = Number(session.amount_total) / 100;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        fulfillmentStatus: 'UNFULFILLED',
        subtotal,
        tax,
        shipping,
        total,
        currency: session.currency?.toUpperCase() || 'USD',
        email: session.customer_details?.email || '',
        phone: session.customer_details?.phone,
        stripePaymentIntentId:
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id,
        items: {
          create: cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update inventory
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          inventory: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Clear user's cart if authenticated
    if (userId) {
      await prisma.cartItem.deleteMany({
        where: { userId },
      });
    }

    console.log('Order created successfully:', order.orderNumber);
  } catch (error) {
    console.error('Error processing checkout session:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment succeeded:', paymentIntent.id);

    // Update order payment status
    await prisma.order.updateMany({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: {
        paymentStatus: 'PAID',
        stripeChargeId: paymentIntent.latest_charge as string,
      },
    });
  } catch (error) {
    console.error('Error processing payment success:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment failed:', paymentIntent.id);

    // Update order payment status
    await prisma.order.updateMany({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
      },
    });
  } catch (error) {
    console.error('Error processing payment failure:', error);
  }
}
