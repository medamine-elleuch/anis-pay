import { useAppStore } from '../store/useAppStore';
import { Mail, AlertCircle } from 'lucide-react';

export function EmailMgmtScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-neutral-100 relative overflow-y-auto">
      <div className="p-6 pt-16 pb-6 bg-white shadow-sm rounded-b-[32px]">
        <h1 className="text-xl font-bold text-neutral-950 mb-2">البريد الإلكتروني</h1>
        <p className="text-sm text-neutral-500">إضافة بريد إلكتروني يساعدك في استعادة حسابك.</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 text-right">
          <AlertCircle className="w-5 h-5 text-brand-amber shrink-0" />
          <p className="text-sm text-orange-800 font-medium leading-relaxed">
            ستصلك رسالة تأكيد على بريدك الإلكتروني القديم عند التغيير.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">البريد الإلكتروني الحالي</label>
          <input 
            type="email" 
            placeholder="example@email.com"
            className="w-full h-14 bg-white rounded-2xl px-4 font-medium text-lg outline-none border border-neutral-200 focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all text-left"
            dir="ltr"
          />
        </div>

        <button className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all">
          تحديث البريد الإلكتروني
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
