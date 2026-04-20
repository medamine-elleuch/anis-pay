import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { User, Phone, Mail, Lock, Smartphone, ChevronLeft } from 'lucide-react';

export function ProfileHubScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-neutral-100 relative overflow-y-auto">
      <div className="p-6 pt-16 pb-8 bg-white shadow-sm rounded-b-[32px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center text-white shadow-brand-soft">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-950">محمد أحمد</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-neutral-500">حساب أساسي</span>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-bold" dir="ltr">T0+</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setScreen('STEP_7A_PASSPORT')}
          className="w-full py-3 bg-orange-50 text-brand-amber font-bold rounded-xl border border-orange-100 text-sm"
        >
          ترقية الحساب إلى T1
        </button>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-sm font-bold text-neutral-950 mb-2">إعدادات الحساب</h3>
        
        <MenuRow icon={<Phone />} title="إدارة أرقام الهاتف" onClick={() => setScreen('PHONE_MGMT')} />
        <MenuRow icon={<Mail />} title="البريد الإلكتروني" onClick={() => setScreen('EMAIL_MGMT')} />
        <MenuRow icon={<Lock />} title="كلمة المرور والأمان" onClick={() => setScreen('PASSWORD_MGMT')} />
        <MenuRow icon={<Smartphone />} title="الأجهزة الموثوقة" onClick={() => setScreen('DEVICE_ALERTS')} />
      </div>
      
      <div className="mt-auto p-6">
        <button 
          onClick={() => setScreen('DASHBOARD_T0')}
          className="w-full py-4 rounded-[20px] bg-white text-neutral-700 font-bold shadow-sm border border-neutral-200"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}

function MenuRow({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
    >
      <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-500 shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-neutral-950">{title}</h4>
      </div>
      <ChevronLeft className="w-5 h-5 text-neutral-400" />
    </div>
  );
}
