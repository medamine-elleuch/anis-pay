export type ScreenId = 
  | 'WELCOME' 
  | 'GUEST_DASHBOARD' 
  | 'LOGIN' 
  | 'REGISTER_ENTRY' 
  | 'STEP_1_CONSENT' 
  | 'STEP_2_PHONE' 
  | 'STEP_3_OTP' 
  | 'STEP_4_NID' 
  | 'STEP_5_NAME' 
  | 'STEP_6_FACE' 
  | 'STEP_7A_PASSPORT' 
  | 'STEP_7B_LIVENESS' 
  | 'STEP_8_FINAL' 
  | 'DASHBOARD_T0' 
  | 'DASHBOARD_T1' 
  | 'DASHBOARD_T2' 
  | 'DASHBOARD_FROZEN' 
  | 'PROFILE_HUB' 
  | 'PHONE_MGMT' 
  | 'EMAIL_MGMT' 
  | 'PASSWORD_MGMT' 
  | 'DEVICE_ALERTS';

export type RiskLevel = 'None' | 'Low' | 'Medium' | 'High' | 'Critical';

export interface AppStateDef {
  id: string;
  name: string;
  screenId: ScreenId;
  gate?: string;
  message?: string;
  reason: string;
  systemAction: string;
  userNextSteps: string;
  fallbackBehavior?: string;
  messageType: 'Explicit' | 'Neutral' | 'Masked';
  riskLevel?: RiskLevel;
  isDerivedCopy?: boolean;
}

export const appStates: AppStateDef[] = [
  // WELCOME / ACCESS
  {
    id: 'welcome_default',
    name: 'Default',
    screenId: 'WELCOME',
    reason: 'Initial load',
    systemAction: 'Display welcome screen',
    userNextSteps: 'Accept consent or choose guest access',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'vpn_detected',
    name: 'VPN Detected',
    screenId: 'WELCOME',
    gate: 'Pre-G1',
    message: 'تعذّر إتمام العملية',
    reason: 'IP analysis + geolocation flag',
    systemAction: 'Flag or block; audit log entry created',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'emulator_detected',
    name: 'Emulator Detected',
    screenId: 'WELCOME',
    gate: 'Pre-G1',
    message: 'تعذّر إتمام العملية',
    reason: 'Device fingerprint check',
    systemAction: 'Immediate block; no bypass path',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'root_jailbreak',
    name: 'Root / Jailbreak',
    screenId: 'WELCOME',
    gate: 'Pre-G1',
    message: 'تعذّر إتمام العملية',
    reason: 'Device integrity check',
    systemAction: 'Block; session terminated',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'permission_denied',
    name: 'Camera / Location Permission Denied',
    screenId: 'WELCOME',
    gate: 'Pre-G1',
    message: 'التطبيق يحتاج للوصول للكاميرا والموقع الجغرافي لإتمام التحقق.',
    reason: 'User denied permissions',
    systemAction: 'Permission prompt shown',
    userNextSteps: 'Grant permissions to proceed',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  // STEP 1 - CONSENT
  {
    id: 'step_1_default',
    name: 'Default',
    screenId: 'STEP_1_CONSENT',
    reason: 'Initial load of consent screen',
    systemAction: 'Display consent forms checked by default',
    userNextSteps: 'Tap Agree to proceed',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'consent_declined',
    name: 'Consent Declined',
    screenId: 'STEP_1_CONSENT',
    gate: 'Pre-G1',
    reason: 'User declined consent',
    systemAction: 'Agree button disabled',
    userNextSteps: 'Accept consent to proceed',
    messageType: 'Neutral',
    riskLevel: 'None'
  },

  // PHONE / PASSWORD
  {
    id: 'phone_default',
    name: 'Default',
    screenId: 'STEP_2_PHONE',
    reason: 'Initial load',
    systemAction: 'Empty phone field',
    userNextSteps: 'Enter phone and password',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'invalid_phone',
    name: 'Invalid Phone Format',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'رقم الهاتف غير صحيح، يرجى التحقق منه.',
    reason: 'Format validation failed',
    systemAction: 'Inline format error; field highlighted',
    userNextSteps: 'Correct phone number',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'voip_detected',
    name: 'VoIP Detected',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'تعذّر إتمام العملية',
    reason: 'VoIP number fingerprint flagged',
    systemAction: 'Silent block; audit log',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'blacklisted_number',
    name: 'Blacklisted Number',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'تعذّر إتمام العملية',
    reason: 'National / internal blacklist match',
    systemAction: 'Block',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'sim_swap',
    name: 'SIM Swap Detected',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'تعذّر إتمام العملية',
    reason: 'Recent SIM swap flag',
    systemAction: 'G2b enrichment triggered; audit log',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'linked_account',
    name: 'Linked Account (Active Exists)',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'هذا الرقم مرتبط بحساب أنيس باي نشط. هل ترغب في تسجيل الدخول أم استخدام رقم آخر؟',
    reason: 'Phone number already registered',
    systemAction: 'Modal shown with two CTAs',
    userNextSteps: 'Login or use another number',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'inactive_number',
    name: 'Inactive / Suspended Number',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'رقم الهاتف غير نشط أو معلق. يرجى التحقق من الرقم أو استخدام رقم آخر.',
    reason: 'Carrier reports number inactive',
    systemAction: 'Inline error; field highlighted',
    userNextSteps: 'Use another number',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'weak_password',
    name: 'Weak Password',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'كلمة المرور ضعيفة، يرجى استخدام مزيج من الحروف والأرقام والرموز.',
    reason: 'Password does not meet complexity',
    systemAction: 'Strength meter updates; Send OTP disabled',
    userNextSteps: 'Enter stronger password',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'password_mismatch',
    name: 'Password Mismatch',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'كلمتا المرور غير متطابقتين، يرجى التأكد والمحاولة مرة أخرى.',
    reason: 'Confirm password does not match',
    systemAction: 'Field highlighted; Send OTP disabled',
    userNextSteps: 'Correct password confirmation',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'rate_limit',
    name: 'Rate Limit Exceeded',
    screenId: 'STEP_2_PHONE',
    gate: 'G1',
    message: 'تعذّر إتمام العملية',
    reason: 'IP-level OTP throttle triggered',
    systemAction: 'Silent log; MLRO notified if >3 blocks in 7 days',
    userNextSteps: 'Wait before trying again',
    messageType: 'Masked',
    riskLevel: 'High'
  },

  // OTP
  {
    id: 'otp_default',
    name: 'OTP Sent',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    reason: 'OTP dispatched',
    systemAction: 'Countdown timer visible',
    userNextSteps: 'Enter OTP',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'incorrect_otp_1',
    name: 'Incorrect OTP (Attempt 1-2)',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    message: 'رمز غير صحيح، يرجى المحاولة مرة أخرى.',
    reason: 'Wrong OTP entered',
    systemAction: 'Inline error; attempt counter incremented',
    userNextSteps: 'Try again',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'incorrect_otp_3',
    name: 'Incorrect OTP (Attempt 3 - Lock)',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    message: 'رمز غير صحيح، يرجى المحاولة مرة أخرى.',
    reason: '3 wrong attempts',
    systemAction: 'OTP invalidated; 5-min cooldown',
    userNextSteps: 'Wait 5 mins and request new OTP',
    messageType: 'Explicit',
    riskLevel: 'High'
  },
  {
    id: 'otp_expired',
    name: 'OTP Expired',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    message: 'انتهت صلاحية الرمز. يرجى طلب رمز جديد.',
    reason: 'Countdown reached 0',
    systemAction: 'OTP invalidated; resend panel shown',
    userNextSteps: 'Request new OTP',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'resend_panel',
    name: 'Resend Options Panel',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    reason: 'User tapped resend',
    systemAction: 'Slide-up panel with channels',
    userNextSteps: 'Select channel',
    messageType: 'Neutral',
    riskLevel: 'Low'
  },
  {
    id: 'max_resends',
    name: 'Max Resends Exceeded',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    message: 'تم تجاوز الحد المسموح به من الرسائل لهذا اليوم.',
    reason: '5 resends per day reached',
    systemAction: 'All resend channels disabled; session hold',
    userNextSteps: 'Contact support or wait 24h',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'otp_replay',
    name: 'OTP Replay Detected',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    message: 'تعذّرت العملية',
    reason: 'Used OTP token submitted',
    systemAction: 'Reject replay',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'session_hijack',
    name: 'Session Hijack / Mismatch',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    message: 'تعذّرت العملية',
    reason: 'Cross-device OTP submission',
    systemAction: 'Block',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'session_timeout',
    name: 'Session Timeout',
    screenId: 'STEP_3_OTP',
    gate: 'G1',
    message: 'انتهت صلاحية الجلسة. تم حفظ تقدمك، يرجى إعادة تسجيل الدخول للمتابعة.',
    reason: 'Session expired',
    systemAction: 'Reset to Step 2; Smart Resumption active',
    userNextSteps: 'Re-login',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },

  // NID / CRA
  {
    id: 'nid_default',
    name: 'Default',
    screenId: 'STEP_4_NID',
    reason: 'Initial load',
    systemAction: 'Empty NID field',
    userNextSteps: 'Enter NID',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'invalid_nid',
    name: 'Invalid NID',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: 'رقم غير صالح، يرجى التحقق من الرقم الوطني المدوّن في مستنداتك الرسمية.',
    reason: 'Format/checksum failed',
    systemAction: 'Inline validation error',
    userNextSteps: 'Correct NID',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'incomplete_nid',
    name: 'Incomplete NID',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: 'الرقم غير مكتمل',
    reason: 'Length insufficient',
    systemAction: 'Highlight field; submit disabled',
    userNextSteps: 'Complete NID',
    messageType: 'Explicit',
    riskLevel: 'Low',
    isDerivedCopy: true
  },
  {
    id: 'age_under_18',
    name: 'Age < 18 Hard Stop',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: 'عذراً، يجب أن يكون العمر 18 عاماً فما فوق لفتح حساب.',
    reason: 'DOB from NID < 18',
    systemAction: 'HARD STOP - block registration',
    userNextSteps: 'Cannot proceed',
    messageType: 'Explicit',
    riskLevel: 'High'
  },
  {
    id: 'cra_pending',
    name: 'CRA Pending',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: '...جاري التحقق من هويتك، يرجى الانتظار',
    reason: 'Background CRA call initiated',
    systemAction: 'G2 running in background',
    userNextSteps: 'Wait',
    messageType: 'Neutral',
    riskLevel: 'Low'
  },
  {
    id: 'brute_force_nid',
    name: 'Brute Force: 3rd NID Fail',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: 'تعذّرت العملية. يرجى المحاولة بعد 30 دقيقة.',
    reason: '3 consecutive NID format/CRA-FAIL events',
    systemAction: '30-min device lock activated',
    userNextSteps: 'Wait 30 mins',
    messageType: 'Explicit',
    riskLevel: 'High'
  },
  {
    id: 'duplicate_nid',
    name: 'Duplicate NID',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: 'هذا الرقم الوطني مرتبط بحساب نشط بالفعل. يمكنك تسجيل الدخول مباشرة أو استعادة كلمة المرور في حال نسيانها.',
    reason: 'NID already registered',
    systemAction: 'Block new registration',
    userNextSteps: 'Login or recover password',
    messageType: 'Explicit',
    riskLevel: 'High'
  },
  {
    id: 'blacklist_match',
    name: 'Blacklist Match',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: 'تعذّر إتمام العملية',
    reason: 'Permanent block',
    systemAction: 'MLRO notified',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'cra_downtime',
    name: 'CRA Downtime',
    screenId: 'STEP_4_NID',
    gate: 'G2',
    message: 'نواجه حالياً صعوبة في الاتصال بمنظومة السجل المدني. سنقوم بإخطارك فور عودة الخدمة لتتمكن من إكمال عملية التسجيل.',
    reason: 'CRA API unavailable',
    systemAction: 'T0 view-only hold; auto-retry every 30 min',
    userNextSteps: 'Wait for notification',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },

  // ARABIC NAME / G2
  {
    id: 'name_default',
    name: 'Default',
    screenId: 'STEP_5_NAME',
    reason: 'Initial load',
    systemAction: 'Four empty Arabic RTL input fields',
    userNextSteps: 'Enter name',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'invalid_arabic',
    name: 'Invalid Arabic Characters',
    screenId: 'STEP_5_NAME',
    gate: 'G2',
    message: '.أدخل اسمك بالعربي فقط',
    reason: 'Latin characters detected',
    systemAction: 'Reject input; language error shown',
    userNextSteps: 'Use Arabic keyboard',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'incomplete_name',
    name: 'Incomplete Name Fields',
    screenId: 'STEP_5_NAME',
    gate: 'G2',
    message: '.هذا الحقل مطلوب',
    reason: 'Missing required fields',
    systemAction: 'Highlight empty field(s)',
    userNextSteps: 'Complete all fields',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'symbols_numbers',
    name: 'Symbols / Numbers Not Allowed',
    screenId: 'STEP_5_NAME',
    gate: 'G2',
    message: 'حروف عربية فقط، بدون أرقام أو رموز.',
    reason: 'Special characters detected',
    systemAction: 'Reject input',
    userNextSteps: 'Remove symbols',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'g2_review',
    name: 'G2 Review',
    screenId: 'STEP_5_NAME',
    gate: 'G2',
    message: 'جاري مراجعة بياناتك، سنُعلمك بالنتيجة قريباً.',
    reason: 'Borderline name match',
    systemAction: 'Manual/queued resolution',
    userNextSteps: 'Wait for resolution',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'g2_fail',
    name: 'G2 Fail - CRA Mismatch',
    screenId: 'STEP_5_NAME',
    gate: 'G2',
    message: 'بيانات الاسم لا تتطابق مع الرقم الوطني المُدخل. يرجى إدخال اسمك الرباعي كما هو مُسجل في السجل المدني بدقة.',
    reason: 'Hard identity mismatch',
    systemAction: 'Block; attempt counter incremented',
    userNextSteps: 'Correct name',
    messageType: 'Explicit',
    riskLevel: 'High'
  },

  // FACIAL CAPTURE
  {
    id: 'face_default',
    name: 'Default',
    screenId: 'STEP_6_FACE',
    reason: 'Initial load',
    systemAction: 'Camera active; face guide displayed; capture auto-triggers when alignment is stable',
    userNextSteps: 'Position face',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'no_face',
    name: 'No Face Detected',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'لم يتم العثور على وجه، يرجى وضع وجهك داخل الإطار.',
    reason: 'Detection fail',
    systemAction: 'Retry prompt with guidance',
    userNextSteps: 'Position face in frame',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'face_too_small',
    name: 'Face Too Small / Far',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'يرجى تقريب وجهك ليملأ الإطار المخصص.',
    reason: 'Bounding-box check',
    systemAction: 'User guided to move closer',
    userNextSteps: 'Move closer',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'blur_detected',
    name: 'Blur Detected',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'الصورة غير واضحة، يرجى تثبيت هاتفك أثناء التصوير.',
    reason: 'Blur / sharpness threshold not met across burst frames',
    systemAction: 'Retry with steadiness guidance',
    userNextSteps: 'Hold phone steady',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'glare_reflection',
    name: 'Glare / Reflection',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'يوجد انعكاس ضوء، يرجى التصوير في مكان بإضاءة هادئة.',
    reason: 'Reflection / highlight threshold exceeded',
    systemAction: 'Retry with lighting guidance',
    userNextSteps: 'Change lighting',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'low_luminance',
    name: 'Low Luminance',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'الإضاءة غير كافية، يرجى التصوير في مكان مضاء جيداً.',
    reason: 'Luminance threshold not met',
    systemAction: 'Retry with lighting guidance',
    userNextSteps: 'Move to brighter area',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'multiple_faces',
    name: 'Multiple Faces',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'يجب أن يكون شخص واحد فقط أمام الكاميرا.',
    reason: 'More than one face detected',
    systemAction: 'Reject and log suspicious context',
    userNextSteps: 'Ensure only one face in frame',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'unstable_burst',
    name: 'Unstable Burst Capture',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'يرجى إبقاء وجهك ثابتاً داخل الإطار للحظة قصيرة.',
    reason: 'Burst capture unable to extract a stable best frame',
    systemAction: 'Retry; no progress loss',
    userNextSteps: 'Hold face still',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'passive_spoof_detected',
    name: 'Printed Photo / Screen Replay / Passive Spoof',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'تعذّر التحقق',
    reason: 'Passive anti-spoof score exceeds fraud threshold',
    systemAction: 'Block; no detailed reason disclosed',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'spoof_detected',
    name: 'Deepfake / Synthetic Signal',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'تعذّر التحقق',
    reason: 'AI-model detection',
    systemAction: 'Block',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'soft_block_3_fails',
    name: '3 Failures -> Soft Block',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'لنحاول مجدداً بعد بضع دقائق. تقدمك محفوظ.',
    reason: '3 attempts per session',
    systemAction: '5-minute soft block; resume from Step 6',
    userNextSteps: 'Wait 5 mins',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 's6_facial_captured',
    name: 'S6_FACIAL_CAPTURED',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    reason: 'Successful multi-frame burst capture',
    systemAction: 'Best frame stored as encrypted immutable facial reference; proceed to Step 7',
    userNextSteps: 'Proceed to Step 7',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'stale_record',
    name: 'Stale Record > 1 week',
    screenId: 'STEP_6_FACE',
    gate: 'G3b',
    message: 'يرجى إعادة التقاط صورتك لتحديث السجل البيومتري.',
    reason: 'Record older than 1 week',
    systemAction: 'Recapture required; resume from this step — no skip path',
    userNextSteps: 'Recapture face',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },

  // PASSPORT / STEP 7A
  {
    id: 'alignment_in_progress',
    name: 'Alignment In Progress',
    screenId: 'STEP_7A_PASSPORT',
    reason: 'Initial load / Live camera active',
    systemAction: 'Camera active; passport overlay displayed; multi-shot sensing',
    userNextSteps: 'Align passport inside frame',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'glare_detected',
    name: 'Glare Detected (Z2/Z5)',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'يوجد انعكاس ضوء على وثيقتك، يرجى إمالة الهاتف قليلاً لتقليل الانعكاس.',
    reason: 'Specular highlight on MRZ zone or Core Data zone',
    systemAction: 'Retry prompt',
    userNextSteps: 'Adjust lighting / angle',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'mrz_not_visible',
    name: 'MRZ Not Visible',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'يرجى إظهار الشريط السفلي للجواز (MRZ) بالكامل.',
    reason: 'MRZ missing from Z2',
    systemAction: 'Retry prompt',
    userNextSteps: 'Align MRZ',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'unstable_capture',
    name: 'Unstable Capture',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'الهاتف غير ثابت. يرجى تثبيت الهاتف لإتمام الالتقاط.',
    reason: 'Accelerometer variance high during burst',
    systemAction: 'Retry prompt',
    userNextSteps: 'Hold steady',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'partial_scan',
    name: 'Partial Scan / Crop Loss',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'تأكد من ظهور زوايا الجواز الأربع داخل الإطار.',
    reason: 'Corners missing or hard crop loss',
    systemAction: 'Retry prompt',
    userNextSteps: 'Align document',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'manual_capture_mode',
    name: 'Manual Capture Mode',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    reason: 'Auto-capture stability timeout',
    systemAction: 'Activate manual shutter button',
    userNextSteps: 'Tap capture button',
    messageType: 'Neutral',
    riskLevel: 'Low'
  },
  {
    id: 'capture_pass',
    name: 'Layer A: Capture Pass',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'جاري قراءة البيانات...',
    reason: 'Multi-shot burst complete; best frame selected',
    systemAction: 'Proceeds to OCR Sequence (Layer B)',
    userNextSteps: 'Wait',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'ocr_pass',
    name: 'Layer B: OCR Pass',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'تمت قراءة البيانات بنجاح، جاري مطابقة السجل...',
    reason: 'MRZ and checksum valid',
    systemAction: 'Proceeds to CRA Comparison (Layer C)',
    userNextSteps: 'Wait',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'ocr_fail',
    name: 'Layer B: OCR Fail',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'تعذّر قراءة بيانات الجواز. يرجى المحاولة مرة أخرى وتصوير الجواز بوضوح.',
    reason: 'Checksum or MRZ read fail',
    systemAction: 'Retry prompt',
    userNextSteps: 'Clean lens, remove glare',
    messageType: 'Explicit',
    riskLevel: 'Low'
  },
  {
    id: 'ocr_review',
    name: 'Layer B: OCR Review',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    reason: 'MRZ vs Visual mismatch or low confidence',
    systemAction: 'Flags for manual review',
    userNextSteps: 'Routed to review',
    messageType: 'Masked',
    riskLevel: 'Medium'
  },
  {
    id: 'g3_fail',
    name: 'Layer C: G3 Fail',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'عذراً، لم نتمكن من اعتماد الوثيقة. يرجى مراجعة أحد مراكز الخدمة.',
    reason: 'CRA contradiction, document reuse, or fake',
    systemAction: 'HARD STOP - T1 not granted',
    userNextSteps: 'Agent/Support path',
    messageType: 'Explicit',
    riskLevel: 'High'
  },
  {
    id: 'expired_passport',
    name: 'Expired Passport',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'جواز السفر المستخدم منتهي الصلاحية.',
    reason: 'Expiry date before today',
    systemAction: 'HARD STOP - fallback to Outcome A',
    userNextSteps: 'Proceed to Step 8 at T0+',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'g3_review',
    name: 'Layer C: G3 Review',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'الوثيقة قيد المراجعة اليدوية',
    reason: 'Expiring soon, ambiguity',
    systemAction: 'Manual Review Case created',
    userNextSteps: 'Wait for notification',
    messageType: 'Neutral',
    riskLevel: 'Medium'
  },
  {
    id: 'attempt_exhausted',
    name: 'Attempt Exhausted',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    message: 'تم تجاوز عدد المحاولات المسموح بها. سيتم تحويلك للمراجعة اليدوية.',
    reason: 'Max retakes or sessions reached',
    systemAction: 'Fallback / agent path triggered',
    userNextSteps: 'Manual review',
    messageType: 'Explicit',
    riskLevel: 'Medium'
  },
  {
    id: 'g3_pass',
    name: 'Layer C: G3 Pass',
    screenId: 'STEP_7A_PASSPORT',
    gate: 'G3',
    reason: 'Document verified, CRA matches',
    systemAction: 'T1 Eligibility Established -> Proceed to 7B',
    userNextSteps: 'Proceed to Liveness',
    messageType: 'Neutral',
    riskLevel: 'None'
  },

  // LIVENESS / STEP 7B
  {
    id: 'liveness_default',
    name: 'Default',
    screenId: 'STEP_7B_LIVENESS',
    reason: 'Initial load',
    systemAction: 'Video liveness instructions',
    userNextSteps: 'Follow prompts',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'anti_handoff',
    name: 'Anti-Handoff Detected',
    screenId: 'STEP_7B_LIVENESS',
    gate: 'G4',
    message: 'لم نتمكن من مطابقة الصورة الحالية مع بيانات الهوية. يرجى المحاولة مرة أخرى في مكان ذي إضاءة أوضح، مع إزالة النظارات أو أي غطاء للرأس.',
    reason: '3-point biometric chain mismatch',
    systemAction: 'Immediate T2 rejection; account flagged',
    userNextSteps: 'Fallback to T1',
    messageType: 'Neutral',
    riskLevel: 'High'
  },
  {
    id: 'cooling_off_3_fails',
    name: '3 Session Failures Cooling-Off',
    screenId: 'STEP_7B_LIVENESS',
    gate: 'G4',
    message: 'تعذّرت العملية. يرجى المحاولة بعد 30 دقيقة.',
    reason: '3 consecutive liveness failures',
    systemAction: '30-minute device-level cooling-off',
    userNextSteps: 'Wait 30 mins',
    messageType: 'Explicit',
    riskLevel: 'Medium',
    isDerivedCopy: true
  },
  {
    id: 'escalation_5_fails',
    name: '5 Cumulative Failures Escalation',
    screenId: 'STEP_7B_LIVENESS',
    gate: 'G4',
    message: 'تم تعليق الترقية. يرجى المتابعة لإكمال التسجيل.',
    reason: '5 total liveness failures across sessions',
    systemAction: 'T2 path suspended; fallback to T1',
    userNextSteps: 'Proceed to Step 8 at T1',
    messageType: 'Neutral',
    riskLevel: 'High',
    isDerivedCopy: true
  },

  // FINAL DECISION / STEP 8
  {
    id: 'final_default',
    name: 'Default',
    screenId: 'STEP_8_FINAL',
    reason: 'Initial load',
    systemAction: 'PIN setup',
    userNextSteps: 'Set PIN',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'pending',
    name: 'Pending',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: '...جاري التحقق من بياناتك',
    reason: 'Processing',
    systemAction: 'Processing animation displayed',
    userNextSteps: 'Wait',
    messageType: 'Neutral',
    riskLevel: 'Low'
  },
  {
    id: 'delay',
    name: 'Delay',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: 'قد تستغرق العملية بعض الوقت، يرجى الانتظار.',
    reason: 'Extended processing',
    systemAction: 'Extended wait indicator shown',
    userNextSteps: 'Wait',
    messageType: 'Neutral',
    riskLevel: 'Low'
  },
  {
    id: 'manual_review',
    name: 'Manual Review',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: 'يتم مراجعة بياناتك من قبل فريقنا. سيتم إخطارك عند اتخاذ القرار.',
    reason: 'Medium risk score',
    systemAction: 'Queue state; user informed',
    userNextSteps: 'Wait for notification',
    messageType: 'Neutral',
    riskLevel: 'Medium'
  },
  {
    id: 't0_approved',
    name: 'T0+ Approved',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: '!مرحباً بك في أنيس باي',
    reason: 'Low risk, T0+ eligibility',
    systemAction: 'T0+ wallet ACTIVE',
    userNextSteps: 'Go to Dashboard',
    messageType: 'Explicit',
    riskLevel: 'None'
  },
  {
    id: 't1_approved',
    name: 'T1 Approved',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: '!مرحباً بك في أنيس باي',
    reason: 'Low risk, T1 eligibility',
    systemAction: 'T1 wallet ACTIVE',
    userNextSteps: 'Go to Dashboard',
    messageType: 'Explicit',
    riskLevel: 'None'
  },
  {
    id: 't2_approved',
    name: 'T2 Approved',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: '!مرحباً بك في أنيس باي',
    reason: 'Low risk, T2 eligibility',
    systemAction: 'T2 wallet ACTIVE',
    userNextSteps: 'Go to Dashboard',
    messageType: 'Explicit',
    riskLevel: 'None'
  },
  {
    id: 'failed_masked',
    name: 'Failed (MASKED)',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: 'فشل التحقق',
    reason: 'Generic fail',
    systemAction: 'No reason shown to user',
    userNextSteps: 'Contact support',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'high_risk_blocked',
    name: 'High Risk / Block (MASKED)',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: 'تعذّر إتمام العملية',
    reason: 'High risk score',
    systemAction: 'Permanent block',
    userNextSteps: 'Cannot proceed',
    messageType: 'Masked',
    riskLevel: 'High'
  },
  {
    id: 'sanctions_match',
    name: 'Sanctions Match (MASKED)',
    screenId: 'STEP_8_FINAL',
    gate: 'Decision Engine',
    message: 'نعتذر منك، لا يمكن إتمام عملية التسجيل في الوقت الحالي. يرجى التواصل مع مركز خدمة العملاء.',
    reason: 'Sanctions/TFS Match',
    systemAction: 'IMMEDIATE FREEZE',
    userNextSteps: 'Contact support',
    messageType: 'Masked',
    riskLevel: 'Critical'
  },

  // DASHBOARDS
  {
    id: 't0_active',
    name: 'T0+ Active',
    screenId: 'DASHBOARD_T0',
    reason: 'Normal state',
    systemAction: 'Show dashboard',
    userNextSteps: 'Use wallet',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 't0_frozen',
    name: 'T0+ Frozen',
    screenId: 'DASHBOARD_FROZEN',
    message: 'حسابك مجمد مؤقتاً. يرجى ترقية حسابك لاستعادة الخدمات.',
    reason: '30 days passed or 5 uses reached',
    systemAction: 'Restrict services',
    userNextSteps: 'Upgrade to T1',
    messageType: 'Explicit',
    riskLevel: 'Medium',
    isDerivedCopy: true
  },
  {
    id: 'under_review',
    name: 'Under Review / Restricted',
    screenId: 'DASHBOARD_FROZEN',
    message: 'حسابك قيد المراجعة. يرجى الانتظار.',
    reason: 'Compliance review',
    systemAction: 'Restrict services',
    userNextSteps: 'Wait',
    messageType: 'Neutral',
    riskLevel: 'Medium',
    isDerivedCopy: true
  },
  {
    id: 'login_default',
    name: 'Default',
    screenId: 'LOGIN',
    reason: 'Initial load',
    systemAction: 'Show login',
    userNextSteps: 'Enter credentials',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'register_entry_default',
    name: 'Default',
    screenId: 'REGISTER_ENTRY',
    reason: 'Initial load',
    systemAction: 'Show register entry',
    userNextSteps: 'Proceed to consent',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'guest_dashboard_default',
    name: 'Default',
    screenId: 'GUEST_DASHBOARD',
    reason: 'Initial load',
    systemAction: 'Show guest dashboard',
    userNextSteps: 'Register or login',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 't1_active',
    name: 'T1 Active',
    screenId: 'DASHBOARD_T1',
    reason: 'Normal state',
    systemAction: 'Show dashboard',
    userNextSteps: 'Use wallet',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 't2_active',
    name: 'T2 Active',
    screenId: 'DASHBOARD_T2',
    reason: 'Normal state',
    systemAction: 'Show dashboard',
    userNextSteps: 'Use wallet',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'profile_hub_default',
    name: 'Default',
    screenId: 'PROFILE_HUB',
    reason: 'Initial load',
    systemAction: 'Show profile options',
    userNextSteps: 'Select option',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'phone_mgmt_default',
    name: 'Default',
    screenId: 'PHONE_MGMT',
    reason: 'Initial load',
    systemAction: 'Show phone mgmt',
    userNextSteps: 'Manage phone',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'email_mgmt_default',
    name: 'Default',
    screenId: 'EMAIL_MGMT',
    reason: 'Initial load',
    systemAction: 'Show email mgmt',
    userNextSteps: 'Manage email',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'password_mgmt_default',
    name: 'Default',
    screenId: 'PASSWORD_MGMT',
    reason: 'Initial load',
    systemAction: 'Show password mgmt',
    userNextSteps: 'Manage password',
    messageType: 'Neutral',
    riskLevel: 'None'
  },
  {
    id: 'device_alerts_default',
    name: 'Default',
    screenId: 'DEVICE_ALERTS',
    reason: 'Initial load',
    systemAction: 'Show device alerts',
    userNextSteps: 'View alerts',
    messageType: 'Neutral',
    riskLevel: 'None'
  }
];
