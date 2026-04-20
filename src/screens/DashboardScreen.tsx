import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { ShieldAlert, Wallet, ArrowUpRight, ArrowDownLeft, QrCode, Receipt, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export function DashboardScreen({ tier }: { tier: string }) {
  const { currentStateId, setScreen } = useAppStore();

  const isFrozen = currentStateId === 't0_frozen' || tier === 'DASHBOARD_FROZEN';
  const isUnderReview = currentStateId === 'under_review';

  const tierLabels: Record<string, string> = {
    'DASHBOARD_T0': 'T0+',
    'DASHBOARD_T1': 'T1',
    'DASHBOARD_T2': 'T2',
    'DASHBOARD_FROZEN': 'T0+'
  };

  const currentTierLabel = tierLabels[tier] || 'T0+';

  if (isUnderReview) {
    return (
      <div className="h-full flex flex-col bg-neutral-100 relative">
        <div className="p-6 pt-16 pb-8 bg-white shadow-sm rounded-b-[32px] text-center">
          <Clock className="w-12 h-12 text-brand-amber mx-auto mb-4" />
          <h2 className="text-xl font-bold text-neutral-950 mb-2">حسابك قيد المراجعة</h2>
          <p className="text-sm text-neutral-500">يرجى الانتظار لحين انتهاء فريقنا من مراجعة بياناتك.</p>
        </div>
        <div className="p-6">
          <button className="w-full py-4 rounded-[20px] bg-white text-neutral-950 font-bold shadow-sm border border-neutral-200">
            التواصل مع الدعم الفني
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-neutral-100 relative overflow-y-auto pb-24">
      {/* Header & Balance Card */}
      <div className="p-6 pt-16 pb-8 bg-white shadow-sm rounded-b-[32px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-950">محمد أحمد</h2>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-500">
                  {tier === 'DASHBOARD_T2' ? 'حساب مميز' : tier === 'DASHBOARD_T1' ? 'حساب موثق' : 'حساب أساسي'}
                </span>
                <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-bold" dir="ltr">{currentTierLabel}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setScreen('PROFILE_HUB')}
            className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
          >
            <div className="w-5 h-5 bg-neutral-300 rounded-full"></div>
          </button>
        </div>

        {/* Balance */}
        <div className={clsx(
          "p-6 rounded-[24px] relative overflow-hidden",
          isFrozen ? "bg-neutral-800" : "bg-brand-gradient shadow-brand-medium"
        )}>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          {tier === 'DASHBOARD_T2' && (
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
          )}
          
          <div className="relative z-10">
            <p className="text-white/80 text-sm mb-1">الرصيد المتاح</p>
            <div className="flex items-end gap-2 text-white">
              <span className="text-3xl font-bold" dir="ltr">
                {tier === 'DASHBOARD_T2' ? '85,000.00' : tier === 'DASHBOARD_T1' ? '8,500.00' : '450.00'}
              </span>
              <span className="text-sm font-medium mb-1">د.ل</span>
            </div>
          </div>
        </div>

        {/* Upgrade Prompts */}
        {tier === 'DASHBOARD_T0' && !isFrozen && (
          <div className="mt-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-brand-amber" />
            <div>
              <p className="text-sm font-bold mb-1 text-orange-800">حساب مؤقت</p>
              <p className="text-xs leading-relaxed text-orange-700">
                متبقي 25 يوماً أو 3 عمليات تحويل. قم بترقية حسابك لتجنب التجميد.
              </p>
              <button 
                onClick={() => setScreen('STEP_7A_PASSPORT')}
                className="mt-2 text-xs font-bold underline underline-offset-4 text-brand-amber"
              >
                ترقية الحساب الآن (مسح الجواز)
              </button>
            </div>
          </div>
        )}

        {tier === 'DASHBOARD_T1' && (
          <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-semantic-success" />
            <div>
              <p className="text-sm font-bold mb-1 text-neutral-950">حساب موثق (T1)</p>
              <p className="text-xs leading-relaxed text-neutral-500">
                استمتع بسقف رصيد يصل إلى 10,000 د.ل. يمكنك الترقية لمميزات إضافية.
              </p>
              <button 
                onClick={() => setScreen('STEP_7B_LIVENESS')}
                className="mt-2 text-xs font-bold underline underline-offset-4 text-brand-amber"
              >
                الترقية إلى T2 (التحقق الحيوي)
              </button>
            </div>
          </div>
        )}

        {isFrozen && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-semantic-error" />
            <div>
              <p className="text-sm font-bold mb-1 text-red-800">حسابك مجمد مؤقتاً</p>
              <p className="text-xs leading-relaxed text-red-700">
                يرجى ترقية حسابك لاستعادة الخدمات وإزالة القيود.
              </p>
              <button 
                onClick={() => setScreen('STEP_7A_PASSPORT')}
                className="mt-2 text-xs font-bold underline underline-offset-4 text-semantic-error"
              >
                ترقية الحساب الآن
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4">
          <ActionBtn icon={<ArrowUpRight />} label="إرسال" disabled={isFrozen} />
          <ActionBtn icon={<ArrowDownLeft />} label="استلام" disabled={isFrozen} />
          <ActionBtn icon={<QrCode />} label="دفع QR" disabled={isFrozen} />
          <ActionBtn icon={<Receipt />} label="فواتير" disabled={isFrozen} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6">
        <h3 className="text-sm font-bold text-neutral-950 mb-4">آخر العمليات</h3>
        <div className="space-y-3">
          <TxRow title="شحن رصيد" type="in" amount="500.00" date="اليوم، 10:30 ص" />
          <TxRow title="دفع لتاجر" type="out" amount="50.00" date="أمس، 08:15 م" />
        </div>
      </div>

      {/* Bottom Nav Mock */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-neutral-200 flex justify-around items-center px-6 pb-4">
        <div 
          className="flex flex-col items-center gap-1 text-brand-amber cursor-pointer"
          onClick={() => setScreen(tier as any)}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-bold">الرئيسية</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-neutral-400">
          <Receipt className="w-6 h-6" />
          <span className="text-[10px] font-medium">العمليات</span>
        </div>
        <div 
          className="flex flex-col items-center gap-1 text-neutral-400 cursor-pointer"
          onClick={() => setScreen('PROFILE_HUB')}
        >
          <div className="w-6 h-6 bg-neutral-200 rounded-full"></div>
          <span className="text-[10px] font-medium">حسابي</span>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, disabled }: { icon: React.ReactNode, label: string, disabled?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button 
        disabled={disabled}
        className={clsx(
          "w-14 h-14 rounded-[20px] flex items-center justify-center transition-all",
          disabled ? "bg-neutral-200 text-neutral-400" : "bg-white text-neutral-950 shadow-sm hover:shadow-md"
        )}
      >
        {icon}
      </button>
      <span className={clsx("text-xs font-medium", disabled ? "text-neutral-400" : "text-neutral-700")}>{label}</span>
    </div>
  );
}

function TxRow({ title, type, amount, date }: { title: string, type: 'in'|'out', amount: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-3">
        <div className={clsx(
          "w-10 h-10 rounded-full flex items-center justify-center",
          type === 'in' ? "bg-green-50 text-semantic-success" : "bg-neutral-50 text-neutral-950"
        )}>
          {type === 'in' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
        </div>
        <div>
          <p className="text-sm font-bold text-neutral-950">{title}</p>
          <p className="text-xs text-neutral-500">{date}</p>
        </div>
      </div>
      <div className="text-left" dir="ltr">
        <p className={clsx("text-sm font-bold", type === 'in' ? "text-semantic-success" : "text-neutral-950")}>
          {type === 'in' ? '+' : '-'}{amount}
        </p>
        <p className="text-[10px] text-neutral-500">د.ل</p>
      </div>
    </div>
  );
}

