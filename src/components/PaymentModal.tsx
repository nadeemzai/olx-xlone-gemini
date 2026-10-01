import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Mail, 
  CheckCircle, 
  Receipt, 
  Download,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentModal: React.FC = () => {
  const { 
    language, 
    isPaymentModalOpen, 
    setIsPaymentModalOpen, 
    paymentModalListing, 
    paymentModalPackage, 
    completePayment, 
    currentUser 
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'raast' | 'card'>('jazzcash');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone || '03001234567');
  const [email, setEmail] = useState(currentUser.email || 'nadeem.ahmad@oztechwork.com');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('7849');

  if (!isPaymentModalOpen || !paymentModalListing || !paymentModalPackage) return null;

  const amountMap = {
    featured_7d: 1499,
    featured_30d: 2999,
    bump_up: 799
  };

  const nameMap = {
    featured_7d: 'Featured Ad (7 Days Spotlight)',
    featured_30d: 'Featured Ad (30 Days Elite + Top Page)',
    bump_up: 'Bump to Top (Immediate Refresh)'
  };

  const pricePKR = amountMap[paymentModalPackage];
  const packageName = nameMap[paymentModalPackage];

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate gateway handoff
    setTimeout(() => {
      setIsProcessing(false);
      setShowOtpStep(true);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowOtpStep(false);
      completePayment(paymentMethod, email);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#002f34] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#23e5db]" />
            <h3 className="font-bold text-sm sm:text-base">
              Secure Checkout · Andaza Pakistan Payments
            </h3>
          </div>
          <button
            onClick={() => {
              setIsPaymentModalOpen(false);
              setShowOtpStep(false);
            }}
            className="text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800">{packageName}</p>
            <p className="text-[11px] text-slate-500 truncate max-w-xs">{paymentModalListing.title}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Due</span>
            <span className="text-lg font-extrabold text-[#002f34] tabular-nums">
              Rs {pricePKR.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {!showOtpStep ? (
            <form onSubmit={handleInitiate} className="space-y-5">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Pakistani Payment Gateway:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* JazzCash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${paymentMethod === 'jazzcash' ? 'border-[#002f34] bg-teal-50/50 ring-1 ring-[#002f34]' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="w-7 h-7 rounded bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      JC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">JazzCash</p>
                      <p className="text-[10px] text-slate-500">Mobile Wallet</p>
                    </div>
                  </button>

                  {/* Easypaisa */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${paymentMethod === 'easypaisa' ? 'border-[#002f34] bg-teal-50/50 ring-1 ring-[#002f34]' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="w-7 h-7 rounded bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      EP
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Easypaisa</p>
                      <p className="text-[10px] text-slate-500">Telenor Microfinance</p>
                    </div>
                  </button>

                  {/* Raast Fast P2M */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('raast')}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${paymentMethod === 'raast' ? 'border-[#002f34] bg-teal-50/50 ring-1 ring-[#002f34]' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="w-7 h-7 rounded bg-sky-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Raast Instant</p>
                      <p className="text-[10px] text-slate-500">SBP Instant Pay</p>
                    </div>
                  </button>

                  {/* Visa / Mastercard */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${paymentMethod === 'card' ? 'border-[#002f34] bg-teal-50/50 ring-1 ring-[#002f34]' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <CreditCard className="w-6 h-6 text-slate-700 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Debit / Credit</p>
                      <p className="text-[10px] text-slate-500">Visa & Mastercard</p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Dynamic Inputs based on Method */}
              {paymentMethod !== 'card' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {paymentMethod === 'jazzcash' ? 'JazzCash Mobile Account Number' : paymentMethod === 'easypaisa' ? 'Easypaisa Mobile Account Number' : 'Raast Registered Mobile Number'}
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="08/28"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        defaultValue="•••"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Automated Email for Receipt Notification */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Automated Email Notification Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34]"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Tax invoice & payment confirmation receipt will be auto-dispatched to this inbox.
                </p>
              </div>

              {/* Security Shield Note */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 text-xs text-slate-600">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-bit SSL encrypted PCI-DSS Compliant Gateway</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-[#002f34] hover:bg-[#002226] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Connecting to Gateway...' : `Proceed to Pay Rs ${pricePKR.toLocaleString()} →`}
              </button>
            </form>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleVerifyOtp} className="space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Authorize Transaction</h4>
                <p className="text-xs text-slate-500 mt-1">
                  A 4-digit OTP has been sent via SMS to <strong>{phoneNumber}</strong> by {paymentMethod.toUpperCase()}.
                </p>
              </div>

              <div className="flex justify-center gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-36 text-center tracking-widest text-lg font-mono font-bold py-2 border-2 border-[#002f34] rounded-lg focus:outline-none"
                  autoFocus
                />
              </div>

              <p className="text-[11px] text-slate-400">Demo OTP auto-filled: 7849</p>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-[#002f34] hover:bg-[#002226] text-white font-bold text-xs rounded-lg transition-colors"
              >
                {isProcessing ? 'Verifying OTP & Authorizing...' : 'Confirm & Activate Listing'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
