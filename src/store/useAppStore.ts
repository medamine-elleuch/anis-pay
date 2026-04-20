import { create } from 'zustand';
import { ScreenId } from '../data/states';

interface AppState {
  currentScreen: ScreenId;
  currentStateId: string;
  explorerMode: 'contextual' | 'all';
  setScreen: (screen: ScreenId) => void;
  setStateId: (stateId: string) => void;
  setExplorerMode: (mode: 'contextual' | 'all') => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: 'WELCOME',
  currentStateId: 'welcome_default',
  explorerMode: 'contextual',
  setScreen: (screen) => set({ currentScreen: screen, currentStateId: getDefaultStateForScreen(screen) }),
  setStateId: (stateId) => set({ currentStateId: stateId }),
  setExplorerMode: (mode) => set({ explorerMode: mode }),
}));

function getDefaultStateForScreen(screen: ScreenId): string {
  switch (screen) {
    case 'WELCOME': return 'welcome_default';
    case 'STEP_1_CONSENT': return 'step_1_default';
    case 'STEP_2_PHONE': return 'phone_default';
    case 'STEP_3_OTP': return 'otp_default';
    case 'STEP_4_NID': return 'nid_default';
    case 'STEP_5_NAME': return 'name_default';
    case 'STEP_6_FACE': return 'face_default';
    case 'STEP_7A_PASSPORT': return 'passport_default';
    case 'STEP_7B_LIVENESS': return 'liveness_default';
    case 'STEP_8_FINAL': return 'final_default';
    case 'DASHBOARD_T0': return 't0_active';
    case 'DASHBOARD_FROZEN': return 't0_frozen';
    default: return '';
  }
}
