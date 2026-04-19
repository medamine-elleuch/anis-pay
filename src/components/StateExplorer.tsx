import { useAppStore } from '../store/useAppStore';
import { appStates, ScreenId } from '../data/states';
import { Settings, Info, AlertTriangle, ShieldAlert, CheckCircle2, CheckSquare } from 'lucide-react';
import clsx from 'clsx';

const SCREEN_NAMES: Record<ScreenId, string> = {
  'WELCOME': 'Welcome & Access',
  'GUEST_DASHBOARD': 'Guest Dashboard',
  'LOGIN': 'Login Entry',
  'REGISTER_ENTRY': 'Register Entry',
  'STEP_1_CONSENT': 'Step 1: Consent',
  'STEP_2_PHONE': 'Step 2: Phone & Password',
  'STEP_3_OTP': 'Step 3: OTP Verification',
  'STEP_4_NID': 'Step 4: National ID',
  'STEP_5_NAME': 'Step 5: Arabic Name',
  'STEP_6_FACE': 'Step 6: Facial Capture',
  'STEP_7A_PASSPORT': 'Step 7A: Passport',
  'STEP_7B_LIVENESS': 'Step 7B: Video Liveness',
  'STEP_8_FINAL': 'Step 8: Final Decision',
  'DASHBOARD_T0': 'T0+ Dashboard',
  'DASHBOARD_T1': 'T1 Dashboard',
  'DASHBOARD_T2': 'T2 Dashboard',
  'DASHBOARD_FROZEN': 'Restricted / Frozen',
  'PROFILE_HUB': 'Profile Hub',
  'PHONE_MGMT': 'Phone Management',
  'EMAIL_MGMT': 'Email Management',
  'PASSWORD_MGMT': 'Password & Security',
  'DEVICE_ALERTS': 'Trusted Device Alerts'
};

export function StateExplorer() {
  const { currentScreen, currentStateId, explorerMode, setScreen, setStateId, setExplorerMode } = useAppStore();

  const filteredStates = explorerMode === 'contextual' 
    ? appStates.filter(s => s.screenId === currentScreen)
    : appStates;

  const currentState = appStates.find(s => s.id === currentStateId);

  return (
    <div className="flex flex-col h-full bg-white text-right">
      <div className="p-6 border-b border-neutral-200 bg-neutral-100">
        <h2 className="text-xl font-bold text-neutral-950 mb-4">State Explorer</h2>
        
        <div className="flex gap-2 mb-4 bg-neutral-200 p-1 rounded-xl">
          <button 
            onClick={() => setExplorerMode('contextual')}
            className={clsx("flex-1 py-1.5 px-3 text-sm font-medium rounded-lg transition-colors", explorerMode === 'contextual' ? "bg-white shadow-sm text-neutral-950" : "text-neutral-500 hover:text-neutral-700")}
          >
            Contextual
          </button>
          <button 
            onClick={() => setExplorerMode('all')}
            className={clsx("flex-1 py-1.5 px-3 text-sm font-medium rounded-lg transition-colors", explorerMode === 'all' ? "bg-white shadow-sm text-neutral-950" : "text-neutral-500 hover:text-neutral-700")}
          >
            All States
          </button>
        </div>

        <div className="mb-2">
          <label className="block text-xs font-medium text-neutral-500 mb-1">Current Screen</label>
          <select 
            value={currentScreen}
            onChange={(e) => setScreen(e.target.value as ScreenId)}
            className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-sm text-neutral-950 focus:ring-2 focus:ring-brand-amber outline-none"
            dir="ltr"
          >
            {Object.entries(SCREEN_NAMES).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
      </div>



      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredStates.map(state => (
            <button
              key={state.id}
              onClick={() => {
                if (state.screenId !== currentScreen) {
                  setScreen(state.screenId);
                }
                setStateId(state.id);
              }}
              className={clsx(
                "w-full text-right p-3 rounded-xl border transition-all text-sm flex flex-col gap-1",
                currentStateId === state.id 
                  ? "border-brand-amber bg-orange-50 shadow-sm" 
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              )}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-semibold text-neutral-950">{state.name}</span>
                {getRiskBadge(state.riskLevel)}
              </div>
              {explorerMode === 'all' && (
                <span className="text-xs text-neutral-500" dir="ltr">{SCREEN_NAMES[state.screenId]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {currentState && (
        <div className="h-1/3 border-t border-neutral-200 bg-neutral-50 p-5 overflow-y-auto">
          <h3 className="font-bold text-neutral-950 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-amber" />
            State Details
          </h3>
          
          <div className="space-y-3 text-sm">
            {currentState.message && (
              <div>
                <span className="block text-xs text-neutral-500 mb-1">UI Message {currentState.isDerivedCopy ? '(Derived)' : '(PRD Exact)'}</span>
                <div className="bg-white p-2 rounded border border-neutral-200 text-neutral-950 font-medium">
                  {currentState.message}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="block text-xs text-neutral-500 mb-1">Gate</span>
                <span className="text-neutral-950 font-medium" dir="ltr">{currentState.gate || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-500 mb-1">Message Type</span>
                <span className="text-neutral-950 font-medium">{currentState.messageType}</span>
              </div>
            </div>

            <div>
              <span className="block text-xs text-neutral-500 mb-1">Why it appears</span>
              <span className="text-neutral-950">{currentState.reason}</span>
            </div>

            <div>
              <span className="block text-xs text-neutral-500 mb-1">System Action</span>
              <span className="text-neutral-950">{currentState.systemAction}</span>
            </div>

            <div>
              <span className="block text-xs text-neutral-500 mb-1">Next Steps</span>
              <span className="text-neutral-950">{currentState.userNextSteps}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getRiskBadge(risk?: string) {
  if (!risk || risk === 'None') return null;
  
  const colors = {
    Low: 'bg-blue-100 text-blue-700',
    Medium: 'bg-orange-100 text-orange-700',
    High: 'bg-red-100 text-red-700',
    Critical: 'bg-red-600 text-white'
  };

  return (
    <span className={clsx("text-[10px] px-2 py-0.5 rounded-full font-bold", colors[risk as keyof typeof colors])}>
      {risk}
    </span>
  );
}

