import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert, Clock, MessageSquare, Phone } from 'lucide-react';
import clsx from 'clsx';

export function OtpScreen() {
  const { currentStateId, setScreen } = useAppStore();

  const isBlocked = ['otp_replay', 'session_hijack'].includes(currentStateId);
  const isIncorrect = ['incorrect_otp_1', 'incorrect_otp_3'].includes(currentStateId);
  const isLocked = currentStateId === 'incorrect_otp_3';
  const isExpired = currentStateId === 'otp_expired';
  const isMaxResends = currentStateId === 'max_resends';
  const showResendPanel = currentStateId === 'resend_panel';
  const isTimeout = currentStateId === 'session_timeout';

  if (isBlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّرت العملية</h2>
        <p className="text-sm text-neutral-500">تم إيقاف العملية لأسباب أمنية.</p>
      </div>
    );
  }

  if (isTimeout) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Clock className="w-16 h-16 text-brand-amber mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">انتهت صلاحية الجلسة</h2>
        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
          تم حفظ تقدمك، يرجى إعادة تسجيل الدخول للمتابعة.
        </p>
        <button 
          onClick={() => setScreen('STEP_2_PHONE')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium"
        >
          العودة لتسجيل الدخول
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="p-6 pt-16 pb-6 border-b border-neutral-100">
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">رمز التحقق</h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          أدخل الرمز المكون من 6 أرقام المرسل إلى <span className="font-medium text-neutral-950" dir="ltr">+218 9X XXX XXXX</span>
        </p>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="flex gap-2 mb-6" dir="ltr">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className={clsx(
                "w-12 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold border transition-all",
                isIncorrect ? "border-semantic-error bg-red-50 text-semantic-error" : 
                (isLocked || isExpired) ? "border-neutral-200 bg-neutral-100 text-neutral-400" :
                "border-neutral-200 bg-neutral-50 text-neutral-950"
              )}
            >
              {isIncorrect ? 'X' : ''}
            </div>
          ))}
        </div>

        {isIncorrect && !isLocked && (
          <p className="text-sm text-semantic-error flex items-center gap-1.5 mb-6">
            <AlertCircle className="w-4 h-4" />
            رمز غير صحيح، يرجى المحاولة مرة أخرى.
          </p>
        )}

        {isLocked && (
          <p className="text-sm text-semantic-error flex items-center gap-1.5 mb-6">
            <AlertCircle className="w-4 h-4" />
            رمز غير صحيح، يرجى المحاولة مرة أخرى. (تم القفل مؤقتاً)
          </p>
        )}

        {isExpired && (
          <p className="text-sm text-brand-amber flex items-center gap-1.5 mb-6">
            <Clock className="w-4 h-4" />
            انتهت صلاحية الرمز. يرجى طلب رمز جديد.
          </p>
        )}

        {isMaxResends && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-right w-full mb-6">
            <AlertCircle className="w-5 h-5 text-semantic-error shrink-0" />
            <p className="text-sm text-red-800 font-medium leading-relaxed">
              تم تجاوز الحد المسموح به من الرسائل لهذا اليوم.
            </p>
          </div>
        )}

        {!isLocked && !isExpired && !isMaxResends && (
          <div className="flex items-center gap-2 text-sm font-medium text-brand-amber mb-8">
            <Clock className="w-4 h-4" />
            <span>04:59</span>
          </div>
        )}

        {!isMaxResends && (
          <button className="text-sm font-bold text-brand-red underline underline-offset-4">
            لم أستلم الرمز
          </button>
        )}
      </div>

      <div className="p-6 bg-white border-t border-neutral-100">
        <button 
          onClick={() => setScreen('STEP_4_NID')}
          disabled={isLocked || isExpired || isMaxResends}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
        >
          تحقق
        </button>
      </div>

      {/* Resend Options Panel */}
      {showResendPanel && (
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm flex items-end z-50">
          <div className="w-full bg-white rounded-t-[32px] p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-neutral-950 mb-6">خيارات إعادة الإرسال</h3>
            
            <div className="space-y-3">
              <button className="w-full p-4 rounded-2xl border border-neutral-200 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-neutral-950">إرسال عبر واتساب</span>
                </div>
              </button>
              
              <button className="w-full p-4 rounded-2xl border border-neutral-200 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-neutral-950">اتصال صوتي</span>
                </div>
              </button>

              <button className="w-full p-4 rounded-2xl border border-neutral-200 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-neutral-950">إعادة إرسال عبر SMS</span>
                </div>
                <span className="text-sm text-neutral-500 font-medium" dir="ltr">00:60</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
