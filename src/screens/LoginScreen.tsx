import { useAppStore } from '../store/useAppStore';
import { LogIn } from 'lucide-react';

export function LoginScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="p-6 pt-16 pb-6 border-b border-neutral-100">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <LogIn className="w-8 h-8 text-brand-amber" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">تسجيل الدخول</h1>
        <p className="text-sm text-neutral-500">مرحباً بعودتك إلى أنيس باي</p>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">رقم الهاتف</label>
          <div className="flex gap-3" dir="ltr">
            <div className="w-24 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center font-medium text-neutral-950 border border-transparent">
              +218
            </div>
            <input 
              type="tel" 
              placeholder="9X XXX XXXX"
              className="flex-1 h-14 bg-neutral-50 rounded-2xl px-4 font-medium text-lg outline-none transition-all border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">كلمة المرور</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full h-14 bg-neutral-50 rounded-2xl px-4 font-medium text-lg outline-none border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all text-left"
            dir="ltr"
          />
          <div className="mt-3 text-left">
            <button className="text-sm font-bold text-brand-red underline underline-offset-4">
              نسيت كلمة المرور؟
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-neutral-100 space-y-3">
        <button 
          onClick={() => setScreen('DASHBOARD_T0')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all"
        >
          تسجيل الدخول
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
