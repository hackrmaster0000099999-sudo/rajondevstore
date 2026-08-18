import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Download, 
  Lock, 
  Sparkles,
  Smartphone,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { StoreItem, SourceCodeItem } from '../types';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  item: SourceCodeItem;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ item, onClose }) => {
  const { language, purchaseItem, startDownload } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad' | 'paypal'>('card');
  const [email, setEmail] = useState('developer@gmail.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      purchaseItem(item.id);

      // Trigger confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="checkout-modal"
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-6 transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Lock size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                {language === 'bn' ? 'নিরাপদ চেকআউট' : 'Secure Instant Checkout'}
              </h3>
              <p className="text-[10px] text-zinc-500">256-Bit SSL Encrypted Payment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h4 className="text-lg font-black text-zinc-900 dark:text-white">
                {language === 'bn' ? 'পেমেন্ট সফল হয়েছে!' : 'Purchase Successful!'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {language === 'bn' 
                  ? 'আপনার লাইসেন্স এবং সোর্স কোড ডাউনলোড আনলক করা হয়েছে।' 
                  : 'Your license key and complete codebase ZIP have been unlocked.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-left text-xs space-y-1 font-mono">
              <div className="flex justify-between text-zinc-500">
                <span>Transaction ID:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">TX-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>License:</span>
                <span className="font-bold text-emerald-500">Commercial Standard</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                startDownload(item);
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all"
            >
              <Download size={15} />
              <span>{language === 'bn' ? 'সোর্স কোড জিপ ডাউনলোড করুন' : 'Download Codebase ZIP Now'}</span>
            </button>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handlePay} className="p-5 sm:p-6 space-y-5">
            
            {/* Item Mini Card */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="min-w-0 pr-3">
                <span className="text-[10px] uppercase font-bold text-amber-500 block">
                  {item.category}
                </span>
                <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                  {language === 'bn' ? item.titleBn || item.title : item.title}
                </h4>
              </div>
              <span className="text-base font-black text-zinc-900 dark:text-white">
                ${item.price}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {language === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন' : 'Select Payment Method'}
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Credit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <CreditCard size={15} />
                  <span>Card (Global)</span>
                </button>

                {/* bKash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-600 bg-pink-50/50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Smartphone size={15} className="text-pink-500" />
                  <span>bKash (বিকাশ)</span>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-orange-600 bg-orange-50/50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Smartphone size={15} className="text-orange-500" />
                  <span>Nagad (নগদ)</span>
                </button>

                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Wallet size={15} className="text-blue-500" />
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {language === 'bn' ? 'রিসিট ও লাইসেন্স পাঠানোর ইমেইল' : 'Receipt & License Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Price calculation */}
            <div className="space-y-1 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal:</span>
                <span>${item.originalPrice}.00</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Launch Discount:</span>
                <span>-${item.originalPrice - item.price}.00</span>
              </div>
              <div className="flex justify-between text-zinc-900 dark:text-white font-black text-sm pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <span>Total Due:</span>
                <span>${item.price}.00 USD</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/30 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{language === 'bn' ? 'ভেরিফাই করা হচ্ছে...' : 'Processing Secure Payment...'}</span>
                </>
              ) : (
                <>
                  <Lock size={13} />
                  <span>{language === 'bn' ? `পেমেন্ট সম্পন্ন করুন ($${item.price})` : `Complete Instant Purchase ($${item.price})`}</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
