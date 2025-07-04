'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Badge } from '@/src/components/ui/badge';
import { 
  Settings, 
  Store, 
  CreditCard,
  Mail,
  Shield,
  Bell,
  Palette,
  Globe,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface StoreSettings {
  storeName: string;
  storeDescription: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  timezone: string;
  allowGuestCheckout: boolean;
  requireEmailVerification: boolean;
  enableReviews: boolean;
  enableWishlist: boolean;
  enableInventoryTracking: boolean;
  lowInventoryThreshold: number;
}

interface PaymentSettings {
  stripeEnabled: boolean;
  stripePublishableKey: string;
  stripeSecretKey: string;
  paypalEnabled: boolean;
  paypalClientId: string;
  paypalClientSecret: string;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  orderConfirmationEnabled: boolean;
  shippingNotificationEnabled: boolean;
  marketingEmailsEnabled: boolean;
}

interface SecuritySettings {
  twoFactorRequired: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireStrongPasswords: boolean;
  enableAuditLog: boolean;
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('store');
  const { data: session } = useSession();

  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'UDT Store',
    storeDescription: 'Your premium e-commerce destination',
    storeEmail: 'admin@udtstore.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Main St, City, State 12345',
    currency: 'USD',
    timezone: 'America/New_York',
    allowGuestCheckout: true,
    requireEmailVerification: false,
    enableReviews: true,
    enableWishlist: true,
    enableInventoryTracking: true,
    lowInventoryThreshold: 5,
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    stripeEnabled: true,
    stripePublishableKey: '',
    stripeSecretKey: '',
    paypalEnabled: false,
    paypalClientId: '',
    paypalClientSecret: '',
  });

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@udtstore.com',
    fromName: 'UDT Store',
    orderConfirmationEnabled: true,
    shippingNotificationEnabled: true,
    marketingEmailsEnabled: false,
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorRequired: false,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPasswords: true,
    enableAuditLog: true,
  });

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // In a real application, you would save these settings to a database
      // For now, we'll simulate saving to localStorage
      const settings = {
        store: storeSettings,
        payment: paymentSettings,
        email: emailSettings,
        security: securitySettings,
      };
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load settings from localStorage on component mount
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.store) setStoreSettings(parsed.store);
      if (parsed.payment) setPaymentSettings(parsed.payment);
      if (parsed.email) setEmailSettings(parsed.email);
      if (parsed.security) setSecuritySettings(parsed.security);
    }
  }, []);

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Access Restricted</h3>
          <p className="text-muted-foreground">
            Settings are only available to administrators.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'store', label: 'Store Settings', icon: Store },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your store configuration and preferences</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={loading}>
          {loading ? (
            <Bell className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      {/* Save notification */}
      {saved && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700">Settings saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-3">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="col-span-9">
          {/* Store Settings */}
          {activeTab === 'store' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Basic information about your store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input
                        id="storeName"
                        value={storeSettings.storeName}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, storeName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="storeEmail">Store Email</Label>
                      <Input
                        id="storeEmail"
                        type="email"
                        value={storeSettings.storeEmail}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <textarea
                      id="storeDescription"
                      className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                      value={storeSettings.storeDescription}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, storeDescription: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="storePhone">Phone Number</Label>
                      <Input
                        id="storePhone"
                        value={storeSettings.storePhone}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, storePhone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        className="w-full px-3 py-2 border rounded-md"
                        value={storeSettings.currency}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, currency: e.target.value }))}
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <textarea
                      id="storeAddress"
                      className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                      value={storeSettings.storeAddress}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, storeAddress: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Features</CardTitle>
                  <CardDescription>Enable or disable store features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <Label>Allow Guest Checkout</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to checkout without creating an account</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={storeSettings.allowGuestCheckout}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, allowGuestCheckout: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <Label>Require Email Verification</Label>
                      <p className="text-sm text-muted-foreground">Require customers to verify their email before placing orders</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={storeSettings.requireEmailVerification}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, requireEmailVerification: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <Label>Enable Product Reviews</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to leave reviews on products</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={storeSettings.enableReviews}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, enableReviews: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <Label>Enable Wishlist</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to save products to wishlist</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={storeSettings.enableWishlist}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, enableWishlist: e.target.checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Settings</CardTitle>
                  <CardDescription>Configure inventory management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <Label>Enable Inventory Tracking</Label>
                      <p className="text-sm text-muted-foreground">Track product stock levels</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={storeSettings.enableInventoryTracking}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, enableInventoryTracking: e.target.checked }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lowInventoryThreshold">Low Inventory Threshold</Label>
                    <Input
                      id="lowInventoryThreshold"
                      type="number"
                      value={storeSettings.lowInventoryThreshold}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, lowInventoryThreshold: parseInt(e.target.value) }))}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Send notifications when inventory falls below this number</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Stripe Settings
                    <Badge variant={paymentSettings.stripeEnabled ? "default" : "secondary"}>
                      {paymentSettings.stripeEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Configure Stripe payment processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <Label>Enable Stripe</Label>
                      <p className="text-sm text-muted-foreground">Accept credit card payments via Stripe</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={paymentSettings.stripeEnabled}
                      onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripeEnabled: e.target.checked }))}
                    />
                  </div>
                  {paymentSettings.stripeEnabled && (
                    <>
                      <div>
                        <Label htmlFor="stripePublishableKey">Publishable Key</Label>
                        <Input
                          id="stripePublishableKey"
                          type="password"
                          value={paymentSettings.stripePublishableKey}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripePublishableKey: e.target.value }))}
                          placeholder="pk_test_..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="stripeSecretKey">Secret Key</Label>
                        <Input
                          id="stripeSecretKey"
                          type="password"
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                          placeholder="sk_test_..."
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    PayPal Settings
                    <Badge variant={paymentSettings.paypalEnabled ? "default" : "secondary"}>
                      {paymentSettings.paypalEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Configure PayPal payment processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <Label>Enable PayPal</Label>
                      <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={paymentSettings.paypalEnabled}
                      onChange={(e) => setPaymentSettings(prev => ({ ...prev, paypalEnabled: e.target.checked }))}
                    />
                  </div>
                  {paymentSettings.paypalEnabled && (
                    <>
                      <div>
                        <Label htmlFor="paypalClientId">Client ID</Label>
                        <Input
                          id="paypalClientId"
                          type="password"
                          value={paymentSettings.paypalClientId}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, paypalClientId: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="paypalClientSecret">Client Secret</Label>
                        <Input
                          id="paypalClientSecret"
                          type="password"
                          value={paymentSettings.paypalClientSecret}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, paypalClientSecret: e.target.value }))}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SMTP Configuration</CardTitle>
                  <CardDescription>Configure email delivery settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpUsername">Username</Label>
                      <Input
                        id="smtpUsername"
                        value={emailSettings.smtpUsername}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={emailSettings.smtpPassword}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={emailSettings.fromEmail}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={emailSettings.fromName}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Configure automated email notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <Label>Order Confirmation Emails</Label>
                      <p className="text-sm text-muted-foreground">Send confirmation emails when orders are placed</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={emailSettings.orderConfirmationEnabled}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, orderConfirmationEnabled: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <Label>Shipping Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send emails when orders are shipped</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={emailSettings.shippingNotificationEnabled}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, shippingNotificationEnabled: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Send promotional and marketing emails</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={emailSettings.marketingEmailsEnabled}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, marketingEmailsEnabled: e.target.checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Settings</CardTitle>
                  <CardDescription>Configure authentication and security policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <Label>Require Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={securitySettings.twoFactorRequired}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorRequired: e.target.checked }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password Policy</CardTitle>
                  <CardDescription>Configure password requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <Label>Require Strong Passwords</Label>
                      <p className="text-sm text-muted-foreground">Require uppercase, lowercase, numbers, and symbols</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={securitySettings.requireStrongPasswords}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, requireStrongPasswords: e.target.checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audit & Logging</CardTitle>
                  <CardDescription>Configure security monitoring and logging</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <Label>Enable Audit Log</Label>
                      <p className="text-sm text-muted-foreground">Log admin actions and security events</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={securitySettings.enableAuditLog}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, enableAuditLog: e.target.checked }))}
                    />
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700">Audit logs help track changes and maintain security. Enable for production environments.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}