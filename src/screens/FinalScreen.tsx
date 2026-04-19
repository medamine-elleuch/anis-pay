import { useAppStore } from '../store/useAppStore';
import { ShieldAlert, Loader2, CheckCircle2, Clock } from 'lucide-react';

export function FinalScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isPending = currentStateId === 'pending';
  const isDelay = currentStateId === 'delay';
  const isManualReview = currentStateId === 'manual_review';
  const isT0Approved = currentStateId === 't0_approved';
  const isT1Approved = currentStateId === 't1_approved';
  const isT2Approved = currentStateId === 't2_approved';
  const isFailed = currentStateId === 'failed_masked';
  const isHighRisk = currentStateId === 'high_risk_blocked';
  const isSanctions = currentStateId === 'sanctions_match';

  if (isPending || isDelay) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Loader2 className="w-12 h-12 text-brand-amber animate-spin mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">
          {isDelay ? 'قد تستغرق العملية بعض الوقت' : 'جاري التحقق من بياناتك'}
        </h2>
        <p className="text-sm text-neutral-500">
          {isDelay ? 'يرجى الانتظار.' : '...'}
        </p>
      </div>
    );
  }

  if (isManualReview) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Clock className="w-16 h-16 text-brand-amber mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">قيد المراجعة</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          يتم مراجعة بياناتك من قبل فريقنا. سيتم إخطارك عند اتخاذ القرار.
        </p>
        <button 
          onClick={() => setScreen('WELCOME')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  if (isFailed || isHighRisk || isSanctions) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">
          {isFailed ? 'فشل التحقق' : isSanctions ? 'نعتذر منك' : 'تعذّر إتمام العملية'}
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          {isSanctions 
            ? 'لا يمكن إتمام عملية التسجيل في الوقت الحالي. يرجى التواصل مع مركز خدمة العملاء.'
            : 'يرجى التواصل مع الدعم الفني للمساعدة.'}
        </p>
        <button 
          onClick={() => setScreen('WELCOME')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  if (isT0Approved || isT1Approved || isT2Approved) {
    let tier = 'T0+';
    let nextScreen: any = 'DASHBOARD_T0';
    if (isT1Approved) { tier = 'T1'; nextScreen = 'DASHBOARD_T1'; }
    if (isT2Approved) { tier = 'T2'; nextScreen = 'DASHBOARD_T2'; }

    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-semantic-success" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-950 mb-2">!مرحباً بك في أنيس باي</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          تم تفعيل حسابك بنجاح بمستوى ({tier}).
        </p>
        <button 
          onClick={() => setScreen(nextScreen)}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium"
        >
          الذهاب إلى المحفظة
        </button>
      </div>
    );
  }

  // Default: PIN Setup
  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="p-6 pt-16 pb-6 border-b border-neutral-100">
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">إعداد رمز المرور</h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          قم بإنشاء رمز مرور مكون من 6 أرقام لحماية محفظتك.
        </p>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center mt-8">
        <div className="flex gap-3 mb-12" dir="ltr">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="w-4 h-4 rounded-full bg-neutral-200"
            ></div>
          ))}
        </div>

        {/* Numpad Mock */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full max-w-[280px] mx-auto" dir="ltr">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium text-neutral-950 hover:bg-neutral-50 active:bg-neutral-100 transition-colors mx-auto">
              {num}
            </button>
          ))}
          <div></div>
          <button className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium text-neutral-950 hover:bg-neutral-50 active:bg-neutral-100 transition-colors mx-auto">
            0
          </button>
          <button className="w-16 h-16 rounded-full flex items-center justify-center text-neutral-950 hover:bg-neutral-50 active:bg-neutral-100 transition-colors mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
          </button>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-neutral-100">
        <button 
          onClick={() => setScreen('DASHBOARD_T0')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium active:scale-[0.98] transition-all"
        >
          تأكيد الرمز
        </button>
      </div>
    </div>
  );
}
