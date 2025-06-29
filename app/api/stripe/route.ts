import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { cartItems } = await request.json();

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [{ shipping_rate: 'shr_1NViCELkdIwHu7ixaXMQg8LQ' }],
      line_items: cartItems.map((item: any) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image[0]],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/canceled`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
