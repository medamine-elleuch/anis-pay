import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export function WelcomeScreen() {
  const { currentScreen, currentStateId, setScreen } = useAppStore();

  const [termsChecked, setTermsChecked] = useState(true);
  const [kycChecked, setKycChecked] = useState(true);

  const isErrorState = ['vpn_detected', 'emulator_detected', 'root_jailbreak', 'session_hijack'].includes(currentStateId);
  const isPermissionDenied = currentStateId === 'permission_denied';
  const isConsentDeclined = currentStateId === 'consent_declined';
  const isStep1Default = currentStateId === 'step_1_default';
  const isStep1 = currentScreen === 'STEP_1_CONSENT';

  useEffect(() => {
    if (isStep1Default) {
      setTermsChecked(true);
      setKycChecked(true);
    } else if (isConsentDeclined) {
      setTermsChecked(false);
      setKycChecked(false);
    }
  }, [isStep1Default, isConsentDeclined]);

  const isActionDisabled = !termsChecked || !kycChecked || isPermissionDenied || isErrorState;

  if (isErrorState) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّر إتمام العملية</h2>
        <p className="text-sm text-neutral-500">لأسباب أمنية، لا يمكن المتابعة من هذا الجهاز أو الشبكة.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Logo Mock */}
        <div className="w-24 h-24 bg-brand-gradient rounded-[28px] shadow-brand-logo flex items-center justify-center mb-6">
          <span className="text-white text-5xl font-bold font-sans">a</span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">أنيس باي</h1>
        <p className="text-neutral-500 text-center text-sm">محفظتك الرقمية الموثوقة</p>
      </div>

      <div className="p-6 pb-10 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {isPermissionDenied && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 text-right">
            <AlertTriangle className="w-5 h-5 text-brand-amber shrink-0" />
            <p className="text-sm text-orange-800 font-medium leading-relaxed">
              التطبيق يحتاج للوصول للكاميرا والموقع الجغرافي لإتمام التحقق.
            </p>
          </div>
        )}

        {isStep1 ? (
          <>
            {(isPermissionDenied || isConsentDeclined) && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 text-right">
                <AlertTriangle className="w-5 h-5 text-brand-amber shrink-0" />
                <p className="text-sm text-orange-800 font-medium leading-relaxed">
                  {isPermissionDenied 
                    ? 'التطبيق يحتاج للوصول للكاميرا والموقع الجغرافي لإتمام التحقق.'
                    : 'يجب الموافقة على الشروط والأحكام للمتابعة.'}
                </p>
              </div>
            )}

            <div className="space-y-4 mb-6 text-sm text-neutral-700">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={termsChecked} 
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-neutral-300 text-brand-amber focus:ring-brand-amber cursor-pointer" 
                />
                <span className="leading-relaxed">
                  أوافق على <a href="#" className="text-brand-red font-medium">الشروط والأحكام</a> و <a href="#" className="text-brand-red font-medium">سياسة الخصوصية</a>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={kycChecked} 
                  onChange={(e) => setKycChecked(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-neutral-300 text-brand-amber focus:ring-brand-amber cursor-pointer" 
                />
                <span className="leading-relaxed">
                  أوافق على معالجة بياناتي لأغراض التحقق من الهوية (KYC)
                </span>
              </label>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setScreen('STEP_2_PHONE')}
                disabled={isActionDisabled}
                className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
              >
                موافق والمتابعة
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <button 
              onClick={() => setScreen('REGISTER_ENTRY')}
              className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium transition-all active:scale-[0.98]"
            >
              إنشاء حساب جديد
            </button>
            <button 
              onClick={() => setScreen('LOGIN')}
              className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200 transition-colors"
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => setScreen('GUEST_DASHBOARD')}
              className="w-full py-4 rounded-[20px] bg-transparent text-neutral-500 font-bold hover:bg-neutral-50 transition-colors"
            >
              الدخول كزائر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

