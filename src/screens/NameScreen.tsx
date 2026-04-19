import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export function NameScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isInvalidArabic = currentStateId === 'invalid_arabic';
  const isIncomplete = currentStateId === 'incomplete_name';
  const isSymbols = currentStateId === 'symbols_numbers';
  const isG2Review = currentStateId === 'g2_review';
  const isG2Fail = currentStateId === 'g2_fail';
  const isBlocked = currentStateId === 'mismatch_fraud';

  if (isBlocked || isG2Fail) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّرت العملية</h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          {isG2Fail 
            ? 'بيانات الاسم لا تتطابق مع الرقم الوطني المُدخل. يرجى إدخال اسمك الرباعي كما هو مُسجل في السجل المدني بدقة.'
            : 'البيانات المُدخلة لا تتطابق مع السجلات. يرجى مراجعة بياناتك.'}
        </p>
        {isG2Fail && (
          <button 
            onClick={() => setScreen('STEP_5_NAME')}
            className="mt-8 w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
          >
            المحاولة مرة أخرى
          </button>
        )}
      </div>
    );
  }

  if (isG2Review) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Loader2 className="w-12 h-12 text-brand-amber animate-spin mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">جاري مراجعة بياناتك</h2>
        <p className="text-sm text-neutral-500">سنُعلمك بالنتيجة قريباً.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="p-6 pt-16 pb-6 border-b border-neutral-100">
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">الاسم الرباعي</h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          أدخل اسمك الرباعي باللغة العربية كما هو مدوّن في مستنداتك الرسمية.
        </p>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {(isInvalidArabic || isSymbols) && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-right mb-2">
            <AlertCircle className="w-5 h-5 text-semantic-error shrink-0" />
            <p className="text-sm text-red-800 font-medium leading-relaxed">
              {isInvalidArabic ? 'أدخل اسمك بالعربي فقط.' : 'حروف عربية فقط، بدون أرقام أو رموز.'}
            </p>
          </div>
        )}

        {['الاسم الأول', 'اسم الأب', 'اسم الجد', 'اسم العائلة'].map((label, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
            <input 
              type="text" 
              className={clsx(
                "w-full h-14 bg-neutral-50 rounded-2xl px-4 font-medium text-lg outline-none transition-all",
                isIncomplete && i === 3 ? "border-2 border-semantic-error bg-red-50" : "border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20"
              )}
            />
            {isIncomplete && i === 3 && (
              <p className="mt-2 text-sm text-semantic-error flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                هذا الحقل مطلوب.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-neutral-100">
        <button 
          onClick={() => setScreen('STEP_6_FACE')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all"
        >
          المتابعة
        </button>
      </div>
    </div>
  );
}
