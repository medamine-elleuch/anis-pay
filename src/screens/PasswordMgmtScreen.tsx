import { useAppStore } from '../store/useAppStore';
import { Lock, AlertCircle } from 'lucide-react';

export function PasswordMgmtScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-neutral-100 relative overflow-y-auto">
      <div className="p-6 pt-16 pb-6 bg-white shadow-sm rounded-b-[32px]">
        <h1 className="text-xl font-bold text-neutral-950 mb-2">كلمة المرور والأمان</h1>
        <p className="text-sm text-neutral-500">قم بتحديث كلمة المرور الخاصة بك.</p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">كلمة المرور الحالية</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full h-14 bg-white rounded-2xl px-4 font-medium text-lg outline-none border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">كلمة المرور الجديدة</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full h-14 bg-white rounded-2xl px-4 font-medium text-lg outline-none border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all text-left"
            dir="ltr"
          />
          <div className="mt-3 flex gap-1.5" dir="ltr">
            <div className="h-1.5 flex-1 rounded-full bg-neutral-200"></div>
            <div className="h-1.5 flex-1 rounded-full bg-neutral-200"></div>
            <div className="h-1.5 flex-1 rounded-full bg-neutral-200"></div>
            <div className="h-1.5 flex-1 rounded-full bg-neutral-200"></div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">تأكيد كلمة المرور الجديدة</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full h-14 bg-white rounded-2xl px-4 font-medium text-lg outline-none border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all text-left"
            dir="ltr"
          />
        </div>

        <button className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all">
          تغيير كلمة المرور
        </button>
      </div>

      <div className="mt-auto p-6">
        <button 
          onClick={() => setScreen('PROFILE_HUB')}
          className="w-full py-4 rounded-[20px] bg-white text-neutral-700 font-bold shadow-sm border border-neutral-200"
        >
          رجوع
        </button>
      </div>
    </div>
  );
}
