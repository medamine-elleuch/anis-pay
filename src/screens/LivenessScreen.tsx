import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert, UserCheck, Clock } from 'lucide-react';
import clsx from 'clsx';

export function LivenessScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isAntiHandoff = currentStateId === 'anti_handoff';
  const isSpoof = currentStateId === 'spoof_deepfake';
  const isCoolingOff = currentStateId === 'cooling_off_3_fails';
  const isEscalation = currentStateId === 'escalation_5_fails';

  if (isSpoof) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّر التحقق</h2>
        <p className="text-sm text-neutral-500">تم إيقاف العملية لأسباب أمنية.</p>
      </div>
    );
  }

  if (isAntiHandoff || isEscalation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّر التحقق</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          {isAntiHandoff 
            ? 'لم نتمكن من مطابقة الصورة الحالية مع بيانات الهوية. يرجى المحاولة مرة أخرى في مكان ذي إضاءة أوضح، مع إزالة النظارات أو أي غطاء للرأس.'
            : 'تم تعليق الترقية. يرجى المتابعة لإكمال التسجيل.'}
        </p>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
        >
          المتابعة بحساب (T1)
        </button>
      </div>
    );
  }

  if (isCoolingOff) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Clock className="w-16 h-16 text-brand-amber mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّرت العملية</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          يرجى المحاولة بعد 30 دقيقة.
        </p>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
        >
          تخطي والمتابعة بحساب (T1)
        </button>
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
          <h1 className="text-2xl font-bold text-white mb-2">التحقق من الحيوية</h1>
          <p className="text-sm text-neutral-300">
            يرجى اتباع التعليمات التي تظهر على الشاشة
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Face Guide */}
          <div className="w-64 h-80 rounded-[100px] border-4 border-brand-gold relative flex items-center justify-center">
            <div className="text-white text-lg font-bold bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
              انظر إلى اليمين
            </div>
          </div>
        </div>

        <div className="mt-auto pb-8 flex flex-col gap-4">
          <button 
            onClick={() => setScreen('STEP_8_FINAL')}
            className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all"
          >
            إكمال التحقق
          </button>
          <button 
            onClick={() => setScreen('STEP_8_FINAL')}
            className="w-full py-4 rounded-[20px] bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
          >
            تخطي (حساب T1)
          </button>
        </div>
      </div>
    </div>
  );
}
