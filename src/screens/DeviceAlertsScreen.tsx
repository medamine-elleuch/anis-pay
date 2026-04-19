import { useAppStore } from '../store/useAppStore';
import { Smartphone, AlertTriangle } from 'lucide-react';

export function DeviceAlertsScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-neutral-100 relative overflow-y-auto">
      <div className="p-6 pt-16 pb-6 bg-white shadow-sm rounded-b-[32px]">
        <h1 className="text-xl font-bold text-neutral-950 mb-2">الأجهزة الموثوقة</h1>
        <p className="text-sm text-neutral-500">الأجهزة التي قمت بتسجيل الدخول منها.</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-gold/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-brand-amber shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-neutral-950 mb-1">iPhone 14 Pro</h4>
              <p className="text-xs text-neutral-500" dir="ltr">iOS 16.5 • Tripoli, Libya</p>
              <p className="text-xs text-semantic-success font-medium mt-1">هذا الجهاز (نشط الآن)</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-500 shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-neutral-950 mb-1">Samsung Galaxy S22</h4>
              <p className="text-xs text-neutral-500" dir="ltr">Android 13 • Benghazi, Libya</p>
              <p className="text-xs text-neutral-400 mt-1">آخر نشاط: منذ 3 أيام</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <button className="w-full py-2 bg-red-50 text-semantic-error text-sm font-bold rounded-lg">
              تسجيل الخروج من هذا الجهاز
            </button>
          </div>
        </div>
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
