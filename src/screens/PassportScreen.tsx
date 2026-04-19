import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert, ScanLine, Clock } from 'lucide-react';
import clsx from 'clsx';

export function PassportScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isExpired = currentStateId === 'expired_passport';
  const isOcrFails = currentStateId === 'ocr_fails_3';
  const isGreyZone = currentStateId === 'facial_continuity_grey';
  const isSuccess = currentStateId === 't1_eligibility_success';
  const isFallback = currentStateId === 'fallback_t0_pending';

  const errorMessages: Record<string, string> = {
    'glare_document': 'يوجد انعكاس ضوء على وثيقتك، يرجى التصوير في مكان بإضاءة هادئة.',
    'document_too_far': 'يرجى تقريب جواز السفر ليملأ الإطار المخصص.',
    'blur_document': 'الصورة غير واضحة، يرجى تثبيت الهاتف أثناء التصوير.',
    'partial_scan': 'أظهر الصفحة الرئيسية للجواز بالكامل داخل الإطار.',
    'low_ocr_confidence': 'تعذّر قراءة بيانات الجواز، يرجى تنظيف عدسة الكاميرا والتصوير من مسافة قريبة وثابتة.',
  };

  const currentError = errorMessages[currentStateId];

  if (isExpired) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">جواز سفر منتهي</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          عذراً، جواز السفر المستخدم منتهي الصلاحية. يرجى استخدام وثيقة سارية المفعول.
        </p>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
        >
          المتابعة بحساب أساسي (T0+)
        </button>
      </div>
    );
  }

  if (isGreyZone || isOcrFails) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Clock className="w-16 h-16 text-brand-amber mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">قيد المراجعة اليدوية</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          لم نتمكن من مطابقة البيانات تلقائياً، تم تحويل طلبك للمراجعة اليدوية، انتظر إشعاراً خلال 24 ساعة.
        </p>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium"
        >
          المتابعة بحساب أساسي مؤقتاً
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-neutral-950 relative overflow-hidden">
      {/* Camera Viewport Mock */}
      <div className="absolute inset-0 bg-neutral-800"></div>
      
      <div className="relative z-10 p-6 pt-16 flex flex-col h-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">مسح جواز السفر</h1>
          <p className="text-sm text-neutral-300">
            ضع صفحة البيانات الشخصية لجواز السفر داخل الإطار
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Passport Guide */}
          <div className={clsx(
            "w-full max-w-[300px] aspect-[1.4/1] rounded-2xl border-2 transition-all duration-300 relative bg-white/5 backdrop-blur-sm",
            currentError ? "border-semantic-error" : "border-brand-gold"
          )}>
            <div className="absolute inset-0 flex items-center justify-center">
              <ScanLine className={clsx("w-12 h-12", currentError ? "text-semantic-error" : "text-brand-gold/50")} />
            </div>
          </div>

          {currentError && (
            <div className="mt-8 px-4 py-3 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl flex items-center gap-3 max-w-[280px]">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-white font-medium text-right">{currentError}</p>
            </div>
          )}
        </div>

        <div className="mt-auto pb-8 flex flex-col gap-4">
          <button 
            onClick={() => setScreen('STEP_7B_LIVENESS')}
            className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all"
          >
            التقاط الصورة
          </button>
          <button 
            onClick={() => setScreen('STEP_8_FINAL')}
            className="w-full py-4 rounded-[20px] bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
          >
            تخطي (حساب T0+)
          </button>
        </div>
      </div>
    </div>
  );
}
