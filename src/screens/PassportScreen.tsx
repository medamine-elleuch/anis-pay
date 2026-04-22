import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { AlertCircle, ShieldAlert, Clock, ScanLine, CheckCircle2, User } from 'lucide-react';
import clsx from 'clsx';

export function PassportScreen() {
  const { currentStateId, setScreen, setStateId } = useAppStore();

  const isAlignmentState = ['alignment_in_progress'].includes(currentStateId);
  const isManualCapture = currentStateId === 'manual_capture_mode';
  
  // Intermediate states for transitions
  const isCapturePass = currentStateId === 'capture_pass';
  const isOcrPass = currentStateId === 'ocr_pass';
  const isProcessing = isCapturePass || isOcrPass;
  
  // Layer B & Layer C outcomes
  const isOcrReview = currentStateId === 'ocr_review';
  const isG3Review = currentStateId === 'g3_review';
  const isPendingReview = isOcrReview || isG3Review;
  
  const isG3Fail = currentStateId === 'g3_fail';
  const isAttemptExhausted = currentStateId === 'attempt_exhausted';
  const isExpired = currentStateId === 'expired_passport';
  const isHardFail = isG3Fail || isAttemptExhausted || isExpired;
  
  const isG3Pass = currentStateId === 'g3_pass';

  const errorMessages: Record<string, string> = {
    'glare_detected': 'يوجد انعكاس ضوء على وثيقتك، يرجى إمالة الهاتف قليلاً لتقليل الانعكاس.',
    'mrz_not_visible': 'يرجى إظهار الشريط السفلي للجواز (MRZ) بالكامل.',
    'unstable_capture': 'الهاتف غير ثابت. يرجى تثبيت الهاتف لإتمام الالتقاط.',
    'partial_scan': 'تأكد من ظهور زوايا الجواز الأربع داخل الإطار.',
    'ocr_fail': 'تعذّر قراءة بيانات الجواز. يرجى المحاولة مرة أخرى وتصوير الجواز بوضوح.',
  };

  const currentError = errorMessages[currentStateId];

  // Auto-capture simulation and layered stage processing
  useEffect(() => {
    let alignTimer: NodeJS.Timeout;
    let manualTimer: NodeJS.Timeout;
    let capTimer: NodeJS.Timeout;
    let ocrTimer: NodeJS.Timeout;

    if (isAlignmentState) {
      // Simulate multi-shot burst success
      alignTimer = setTimeout(() => {
        setStateId('capture_pass');
      }, 4000);

      // Simulate fallback to manual capture mode
      manualTimer = setTimeout(() => {
        setStateId('manual_capture_mode');
      }, 20000);
    }
    
    // Simulate OCR processing time
    if (isCapturePass) {
       capTimer = setTimeout(() => {
         setStateId('ocr_pass');
       }, 2000);
    }

    // Simulate G3 logic/comparisons after OCR is done
    if (isOcrPass) {
       ocrTimer = setTimeout(() => {
         setStateId('g3_pass'); // Default happy path mock
       }, 2000);
    }

    return () => {
      clearTimeout(alignTimer);
      clearTimeout(manualTimer);
      clearTimeout(capTimer);
      clearTimeout(ocrTimer);
    };
  }, [currentStateId, setStateId, isAlignmentState, isCapturePass, isOcrPass]);

  // Hidden manual trigger for developer presentation
  const handleHiddenTrigger = () => {
    if (isAlignmentState) {
      setStateId('capture_pass');
    }
  };

  if (isExpired) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">جواز سفر منتهي</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          عذراً، جواز السفر المستخدم منتهي الصلاحية. يرجى استخدام وثيقة سارية المفعول.
        </p>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
        >
          المتابعة بحساب أساسي (T0+)
        </button>
      </div>
    );
  }

  if (isHardFail) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <ShieldAlert className="w-16 h-16 text-semantic-error mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">تعذّر التحقق</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          {currentStateId === 'attempt_exhausted' 
            ? 'تم تجاوز عدد المحاولات المسموح بها. سيتم تحويلك للمراجعة اليدوية.' 
            : 'عذراً، لم نتمكن من اعتماد الوثيقة. يرجى مراجعة أحد مراكز الخدمة.'}
        </p>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="w-full py-4 rounded-[20px] bg-neutral-100 text-neutral-950 font-bold"
        >
          المتابعة بحساب أساسي (T0+)
        </button>
      </div>
    );
  }

  if (isPendingReview) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white text-center">
        <Clock className="w-16 h-16 text-brand-amber mb-6" />
        <h2 className="text-xl font-bold text-neutral-950 mb-2">قيد المراجعة اليدوية</h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          لم نتمكن من مطابقة البيانات تلقائياً، تم تحويل طلبك للمراجعة اليدوية، انتظر إشعاراً خلال 24 ساعة.
        </p>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="w-full py-4 rounded-[20px] bg-brand-gradient text-white font-bold shadow-brand-medium"
        >
          المتابعة بحساب أساسي مؤقتاً
        </button>
      </div>
    );
  }

  if (isG3Pass) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-neutral-950 text-center">
        <CheckCircle2 className="w-20 h-20 text-semantic-success mb-6" />
        <h2 className="text-xl font-bold text-white mb-2">تم التوثيق بنجاح</h2>
        <p className="text-sm text-neutral-400 mb-8">تم التحقق من بيانات جواز السفر المرجعية.</p>
        <button 
          onClick={() => setScreen('STEP_7B_LIVENESS')}
          className="px-8 py-4 bg-brand-gradient text-white font-bold rounded-[20px] shadow-brand-medium active:scale-[0.98] transition-all w-full"
        >
          المتابعة للتحقق الحي
        </button>
        <button 
          onClick={() => setScreen('STEP_8_FINAL')}
          className="mt-4 px-8 py-4 bg-transparent text-neutral-400 font-bold hover:text-white transition-colors w-full"
        >
          تخطي واستكمال برصيد محدود (T1)
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-neutral-950 relative overflow-hidden">
      {/* Camera Viewport Mock */}
      <div className="absolute inset-0 bg-neutral-800"></div>
      
      <div className="relative z-10 p-6 pt-16 flex flex-col h-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">مسح جواز السفر</h1>
          <p className="text-sm text-neutral-300">
            {isCapturePass ? 'جاري قراءة البيانات (MRZ)...' : 
             isOcrPass ? 'تمت القراءة بنجاح، جاري التحقق...' : 
             'ضع صفحة البيانات الشخصية لجواز السفر داخل الإطار'}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Passport Portrait/Landscape Guide */}
          <div 
            onClick={handleHiddenTrigger}
            className={clsx(
              "w-[90%] max-w-[340px] aspect-[1.4/1] rounded-xl border-2 transition-all duration-300 relative bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-pointer",
              currentError ? "border-semantic-error" : isProcessing ? "border-brand-gold animate-pulse" : "border-brand-gold/60"
            )}
          >
            {/* Z3 - Portrait block visual guide */}
            <div className="absolute left-4 top-4 bottom-12 w-20 border-2 border-dashed border-white/20 rounded-md flex items-center justify-center">
               <User className="w-8 h-8 text-white/20" />
            </div>

            {/* Z2 - MRZ Block visual guide */}
            <div className="absolute left-4 right-4 bottom-3 h-8 border-2 border-dashed border-white/20 rounded-sm"></div>

            {/* Corner Alignment Bracket Markers */}
            <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
            <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
            <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
            <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <ScanLine className={clsx("w-12 h-12", currentError ? "text-semantic-error" : "text-brand-gold")} />
            </div>
          </div>

          {currentError && (
            <div className="mt-8 px-4 py-3 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl flex items-center justify-center gap-3 w-[90%] max-w-[340px] text-center shadow-lg">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-white font-medium">{currentError}</p>
            </div>
          )}

          {(!currentError && isAlignmentState) && (
             <div className="mt-8 px-4 py-3 bg-neutral-800/80 backdrop-blur-md border border-neutral-700/80 rounded-2xl flex items-center justify-center text-center shadow-lg w-[90%] max-w-[340px]">
               <p className="text-xs text-neutral-300">سيتم التقاط البيانات تلقائياً عند الثبات.</p>
             </div>
          )}
        </div>

        <div className="mt-auto pb-8 flex flex-col gap-4 items-center">
          {isManualCapture && !currentError && (
            <button 
              onClick={() => setStateId('capture_pass')}
              className="px-8 py-4 rounded-[20px] bg-white text-neutral-950 font-bold shadow-brand-soft active:scale-[0.98] transition-all"
            >
              التقاط يدوي
            </button>
          )}

          {isProcessing && (
             <div className="flex items-center gap-3 text-brand-gold animate-pulse">
               <div className="w-4 h-4 rounded-full border-2 border-brand-gold border-t-transparent animate-spin"></div>
               <span className="text-sm font-medium">معالجة الوثيقة...</span>
             </div>
          )}

          {/* Hidden spacing preservation when no active buttons */}
          {(!isManualCapture && !isProcessing) && (
            <div className="h-14"></div>
          )}
        </div>
      </div>
    </div>
  );
}
