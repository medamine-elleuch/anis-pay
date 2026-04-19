import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert, ScanFace, RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

export function FaceScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isBlocked = ['spoof_detected'].includes(currentStateId);
  const isSoftBlock = currentStateId === 'soft_block_3_fails';
  const isStale = currentStateId === 'stale_record';
  
  const errorMessages: Record<string, string> = {
    'no_face': 'لم يتم العثور على وجه، يرجى وضع وجهك داخل الإطار.',
    'face_too_small': 'يرجى تقريب وجهك ليملأ الإطار المخصص.',
    'blur_detected': 'الصورة غير واضحة، يرجى تثبيت هاتفك أثناء التصوير.',
    'glare_reflection': 'يوجد انعكاس ضوء، يرجى التصوير في مكان بإضاءة هادئة.',
    'low_luminance': 'الإضاءة غير كافية، يرجى التصوير في مكان مضاء جيداً.',
    'multiple_faces': 'يجب أن يكون شخص واحد فقط أمام الكاميرا.',
  };

  const currentError = errorMessages[currentStateId];

  if (isBlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّر التحقق</h2>
        <p className="text-sm text-neutral-500">تم إيقاف العملية لأسباب أمنية.</p>
      </div>
    );
  }

  if (isSoftBlock) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-brand-amber" />
        </div>
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّر التقاط الصورة</h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          لنحاول مجدداً بعد بضع دقائق. تقدمك محفوظ.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-neutral-950 relative overflow-hidden">
      {/* Camera Viewport Mock */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-neutral-950/60"></div>

      <div className="relative z-10 p-6 pt-16 flex flex-col h-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">التقاط صورة الوجه</h1>
          <p className="text-sm text-neutral-300">
            {isStale ? 'يرجى إعادة التقاط صورتك لتحديث السجل البيومتري.' : 'يرجى وضع وجهك داخل الإطار المخصص'}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Face Guide */}
          <div className={clsx(
            "w-64 h-80 rounded-[100px] border-4 transition-all duration-300 relative",
            currentError ? "border-semantic-error" : "border-brand-gold"
          )}>
            {/* Corner markers */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-[100px]"></div>
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-[100px]"></div>
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-[100px]"></div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-[100px]"></div>
          </div>

          {currentError && (
            <div className="mt-8 px-4 py-3 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl flex items-center gap-3 max-w-[280px]">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-white font-medium text-right">{currentError}</p>
            </div>
          )}
        </div>

        <div className="mt-auto pb-8 flex justify-center">
          <button 
            onClick={() => setScreen('STEP_7A_PASSPORT')}
            className={clsx(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all",
              currentError ? "bg-neutral-800 text-neutral-500" : "bg-white text-neutral-950 shadow-[0_0_0_4px_rgba(255,255,255,0.2)]"
            )}
          >
            <ScanFace className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
