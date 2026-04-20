import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { BookOpen, Shield, ArrowRight, UserPlus, ArrowUpRight, ArrowDownLeft, QrCode, Receipt, Wallet } from 'lucide-react';

export function GuestDashboardScreen() {
  const { setScreen } = useAppStore();

  const handleFinancialAction = () => {
    setScreen('REGISTER_ENTRY');
  };

  return (
    <div className="h-full flex flex-col bg-neutral-100 relative overflow-y-auto pb-24">
      <div className="p-6 pt-16 pb-8 bg-white shadow-sm rounded-b-[32px]">
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">مرحباً بك كزائر</h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          استكشف خدمات أنيس باي وتعرف على كيفية إدارة أموالك بأمان.
        </p>
      </div>

      {/* Quick Actions (Redirect to Register) */}
      <div className="p-6 pb-2">
        <div className="grid grid-cols-4 gap-4">
          <ActionBtn icon={<ArrowUpRight />} label="إرسال" onClick={handleFinancialAction} />
          <ActionBtn icon={<ArrowDownLeft />} label="استلام" onClick={handleFinancialAction} />
          <ActionBtn icon={<QrCode />} label="دفع QR" onClick={handleFinancialAction} />
          <ActionBtn icon={<Receipt />} label="فواتير" onClick={handleFinancialAction} />
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Registration CTA */}
        <div className="p-5 bg-brand-gradient rounded-[24px] text-white shadow-brand-medium relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">افتح حسابك الآن</h3>
            <p className="text-sm text-white/90 mb-4 leading-relaxed">
              احصل على محفظتك الرقمية في دقائق واستمتع بكافة الخدمات المالية.
            </p>
            <button 
              onClick={() => setScreen('REGISTER_ENTRY')}
              className="w-full py-3 bg-white text-brand-red font-bold rounded-xl shadow-sm active:scale-[0.98] transition-transform"
            >
              إنشاء حساب جديد
            </button>
          </div>
        </div>

        {/* Financial Literacy Content */}
        <h3 className="text-sm font-bold text-neutral-950 mt-6 mb-3">دليلك المالي</h3>
        
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-brand-amber shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-neutral-950 mb-1">كيف نحمي أموالك؟</h4>
              <p className="text-xs text-neutral-500">تعرف على معايير الأمان المتبعة</p>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-semantic-info shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-neutral-950 mb-1">دليل الاستخدام</h4>
              <p className="text-xs text-neutral-500">كيفية إجراء التحويلات والدفع</p>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Bottom Nav Mock */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-neutral-200 flex justify-around items-center px-6 pb-4">
        <div className="flex flex-col items-center gap-1 text-brand-amber cursor-pointer">
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-bold">الرئيسية</span>
        </div>
        <div 
          className="flex flex-col items-center gap-1 text-neutral-400 cursor-pointer"
          onClick={handleFinancialAction}
        >
          <Receipt className="w-6 h-6" />
          <span className="text-[10px] font-medium">العمليات</span>
        </div>
        <div 
          className="flex flex-col items-center gap-1 text-neutral-400 cursor-pointer"
          onClick={() => setScreen('WELCOME')}
        >
          <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center">
            <UserPlus className="w-3 h-3 text-neutral-500" />
          </div>
          <span className="text-[10px] font-medium">تسجيل</span>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={onClick}>
      <button className="w-14 h-14 rounded-[20px] flex items-center justify-center transition-all bg-white text-neutral-950 shadow-sm hover:shadow-md">
        {icon}
      </button>
      <span className="text-xs font-medium text-neutral-700">{label}</span>
    </div>
  );
}
