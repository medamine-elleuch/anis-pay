import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

export function PhoneScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isBlocked = ['voip_detected', 'blacklisted_number', 'sim_swap', 'rate_limit'].includes(currentStateId);
  const isLinkedAccount = currentStateId === 'linked_account';
  const isInvalidPhone = currentStateId === 'invalid_phone';
  const isInactiveNumber = currentStateId === 'inactive_number';
  const isWeakPassword = currentStateId === 'weak_password';
  const isPasswordMismatch = currentStateId === 'password_mismatch';

  if (isBlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّر إتمام العملية</h2>
        <p className="text-sm text-neutral-500">تم إيقاف العملية لأسباب أمنية.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="p-6 pt-16 pb-6 border-b border-neutral-100">
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">إنشاء حساب جديد</h1>
        <p className="text-sm text-neutral-500">أدخل رقم هاتفك وكلمة مرور قوية للمتابعة</p>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">رقم الهاتف</label>
          <div className="flex gap-3" dir="ltr">
            <div className="w-24 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center font-medium text-neutral-950 border border-transparent">
              +218
            </div>
            <input 
              type="tel" 
              placeholder="9X XXX XXXX"
              className={clsx(
                "flex-1 h-14 bg-neutral-50 rounded-2xl px-4 font-medium text-lg outline-none transition-all",
                (isInvalidPhone || isInactiveNumber) ? "border-2 border-semantic-error bg-red-50" : "border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20"
              )}
            />
          </div>
          {isInvalidPhone && (
            <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5" dir="rtl">
              <AlertCircle className="w-4 h-4" />
              رقم الهاتف غير صحيح، يرجى التحقق منه.
            </p>
          )}
          {isInactiveNumber && (
            <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5" dir="rtl">
              <AlertCircle className="w-4 h-4" />
              رقم الهاتف غير نشط أو معلق. يرجى التحقق من الرقم أو استخدام رقم آخر.
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">كلمة المرور</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full h-14 bg-neutral-50 rounded-2xl px-4 font-medium text-lg outline-none border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all text-left"
            dir="ltr"
          />
          
          {/* Strength Meter */}
          <div className="mt-3 flex gap-1.5" dir="ltr">
            <div className={clsx("h-1.5 flex-1 rounded-full", isWeakPassword ? "bg-semantic-error" : "bg-neutral-200")}></div>
            <div className="h-1.5 flex-1 rounded-full bg-neutral-200"></div>
            <div className="h-1.5 flex-1 rounded-full bg-neutral-200"></div>
            <div className="h-1.5 flex-1 rounded-full bg-neutral-200"></div>
          </div>
          
          {isWeakPassword && (
            <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5" dir="rtl">
              <AlertCircle className="w-4 h-4" />
              كلمة المرور ضعيفة، يرجى استخدام مزيج من الحروف والأرقام والرموز.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">تأكيد كلمة المرور</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className={clsx(
              "w-full h-14 bg-neutral-50 rounded-2xl px-4 font-medium text-lg outline-none transition-all text-left",
              isPasswordMismatch ? "border-2 border-semantic-error bg-red-50" : "border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20"
            )}
            dir="ltr"
          />
          {isPasswordMismatch && (
            <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5" dir="rtl">
              <AlertCircle className="w-4 h-4" />
              كلمتا المرور غير متطابقتين، يرجى التأكد والمحاولة مرة أخرى.
            </p>
          )}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-neutral-100">
        <button 
          onClick={() => setScreen('STEP_3_OTP')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all"
        >
          إرسال رمز التحقق
        </button>
      </div>

      {/* Linked Account Modal */}
      {isLinkedAccount && (
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm flex items-end z-50">
          <div className="w-full bg-white rounded-t-[32px] p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6"></div>
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <AlertCircle className="w-8 h-8 text-brand-amber" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 text-center mb-3">حساب نشط بالفعل</h3>
            <p className="text-neutral-600 text-center mb-8 leading-relaxed">
              هذا الرقم مرتبط بحساب أنيس باي نشط. هل ترغب في تسجيل الدخول أم استخدام رقم آخر؟
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => setScreen('LOGIN')}
                className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium"
              >
                تسجيل الدخول
              </button>
              <button 
                onClick={() => useAppStore.getState().setStateId('phone_default')}
                className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-700 font-bold"
              >
                تغيير رقم الهاتف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
