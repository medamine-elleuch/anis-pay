import { useAppStore } from '../store/useAppStore';
import { UserPlus, LogIn, Compass } from 'lucide-react';

export function RegisterEntryScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <UserPlus className="w-10 h-10 text-brand-amber" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 mb-3">حساب جديد</h1>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          انضم إلى أنيس باي واستمتع بتجربة مالية رقمية آمنة وموثوقة.
        </p>
        
        <div className="w-full space-y-4 text-right mb-8">
          <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-amber font-bold shadow-sm">1</div>
            <span className="text-sm font-medium text-neutral-700">رقم الهاتف وكلمة المرور</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-amber font-bold shadow-sm">2</div>
            <span className="text-sm font-medium text-neutral-700">الرقم الوطني (CRA)</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-amber font-bold shadow-sm">3</div>
            <span className="text-sm font-medium text-neutral-700">التقاط صورة الوجه</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => setScreen('STEP_1_CONSENT')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all"
        >
          ابدأ التسجيل
        </button>
        <button 
          onClick={() => setScreen('WELCOME')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200 transition-colors"
        >
          رجوع
        </button>
      </div>
    </div>
  );
}
