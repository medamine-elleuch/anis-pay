import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export function NidScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isBlocked = ['brute_force_nid', 'blacklist_match'].includes(currentStateId);
  const isInvalid = currentStateId === 'invalid_nid';
  const isIncomplete = currentStateId === 'incomplete_nid';
  const isUnderAge = currentStateId === 'age_under_18';
  const isPending = currentStateId === 'cra_pending';
  const isDuplicate = currentStateId === 'duplicate_nid';
  const isDowntime = currentStateId === 'cra_downtime';

  if (isBlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّرت العملية</h2>
        <p className="text-sm text-neutral-500">
          {currentStateId === 'brute_force_nid' ? 'يرجى المحاولة بعد 30 دقيقة.' : 'تم إيقاف العملية لأسباب أمنية.'}
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Loader2 className="w-12 h-12 text-brand-amber animate-spin mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">جاري التحقق من هويتك</h2>
        <p className="text-sm text-neutral-500">يرجى الانتظار...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="p-6 pt-16 pb-6 border-b border-neutral-100">
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">الرقم الوطني</h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          أدخل رقمك الوطني المكون من 12 رقماً كما هو مدوّن في مستنداتك الرسمية.
        </p>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {isDowntime && (
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 text-right">
            <AlertCircle className="w-5 h-5 text-brand-amber shrink-0" />
            <p className="text-sm text-orange-800 font-medium leading-relaxed">
              نواجه حالياً صعوبة في الاتصال بمنظومة السجل المدني. سنقوم بإخطارك فور عودة الخدمة لتتمكن من إكمال عملية التسجيل.
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">الرقم الوطني</label>
          <input 
            type="text" 
            placeholder="1 19XX XXXXXXX"
            disabled={isDowntime}
            className={clsx(
              "w-full h-14 bg-neutral-50 rounded-2xl px-4 font-medium text-lg outline-none transition-all text-left",
              (isInvalid || isIncomplete || isUnderAge || isDuplicate) ? "border-2 border-semantic-error bg-red-50" : "border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20",
              isDowntime && "opacity-50"
            )}
            dir="ltr"
          />
          
          {isInvalid && (
            <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5" dir="rtl">
              <AlertCircle className="w-4 h-4" />
              رقم غير صالح، يرجى التحقق من الرقم الوطني المدوّن في مستنداتك الرسمية.
            </p>
          )}
          {isIncomplete && (
            <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5" dir="rtl">
              <AlertCircle className="w-4 h-4" />
              الرقم غير مكتمل
            </p>
          )}
          {isUnderAge && (
            <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5" dir="rtl">
              <AlertCircle className="w-4 h-4" />
              عذراً، يجب أن يكون العمر 18 عاماً فما فوق لفتح حساب.
            </p>
          )}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-neutral-100">
        <button 
          onClick={() => setScreen('STEP_5_NAME')}
          disabled={isDowntime || isUnderAge || isDuplicate}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
        >
          المتابعة
        </button>
      </div>

      {/* Duplicate NID Modal */}
      {isDuplicate && (
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm flex items-end z-50">
          <div className="w-full bg-white rounded-t-[32px] p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6"></div>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ShieldAlert className="w-8 h-8 text-semantic-error" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 text-center mb-3">حساب نشط بالفعل</h3>
            <p className="text-neutral-600 text-center mb-8 leading-relaxed">
              هذا الرقم الوطني مرتبط بحساب نشط بالفعل. يمكنك تسجيل الدخول مباشرة أو استعادة كلمة المرور في حال نسيانها.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => setScreen('LOGIN')}
                className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium"
              >
                تسجيل الدخول
              </button>
              <button 
                onClick={() => setScreen('LOGIN')}
                className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-700 font-bold"
              >
                استعادة كلمة المرور
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
