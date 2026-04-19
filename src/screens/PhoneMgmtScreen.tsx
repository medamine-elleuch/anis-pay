import { useAppStore } from '../store/useAppStore';
import { Phone, Plus, CheckCircle2, ShieldAlert } from 'lucide-react';

export function PhoneMgmtScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-neutral-100 relative overflow-y-auto">
      <div className="p-6 pt-16 pb-6 bg-white shadow-sm rounded-b-[32px]">
        <h1 className="text-xl font-bold text-neutral-950 mb-2">إدارة أرقام الهاتف</h1>
        <p className="text-sm text-neutral-500">أضف أرقاماً إضافية أو قم بتغيير رقمك الأساسي.</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-gold/30">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-brand-amber">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-950" dir="ltr">+218 91 123 4567</p>
                <div className="flex items-center gap-1 text-semantic-success mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-xs font-medium">رقم أساسي (Auth)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-950" dir="ltr">+218 92 987 6543</p>
                <div className="flex items-center gap-1 text-neutral-500 mt-1">
                  <span className="text-xs font-medium">تم التحقق (رقم ثانوي)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-100">
            <button className="flex-1 py-2 bg-neutral-100 text-neutral-700 text-xs font-bold rounded-lg">
              ترقية إلى أساسي
            </button>
            <button className="flex-1 py-2 bg-red-50 text-semantic-error text-xs font-bold rounded-lg">
              حذف
            </button>
          </div>
        </div>

        <button className="w-full p-4 bg-white rounded-2xl shadow-sm border border-dashed border-neutral-300 flex items-center justify-center gap-2 text-brand-amber font-bold hover:bg-orange-50 transition-colors">
          <Plus className="w-5 h-5" />
          <span>إضافة رقم جديد</span>
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
