import { useAppStore } from '../store/useAppStore';
import { WelcomeScreen } from './WelcomeScreen';
import { RegisterEntryScreen } from './RegisterEntryScreen';
import { GuestDashboardScreen } from './GuestDashboardScreen';
import { LoginScreen } from './LoginScreen';
import { PhoneScreen } from './PhoneScreen';
import { OtpScreen } from './OtpScreen';
import { NidScreen } from './NidScreen';
import { NameScreen } from './NameScreen';
import { FaceScreen } from './FaceScreen';
import { PassportScreen } from './PassportScreen';
import { LivenessScreen } from './LivenessScreen';
import { FinalScreen } from './FinalScreen';
import { DashboardScreen } from './DashboardScreen';
import { ProfileHubScreen } from './ProfileHubScreen';
import { PhoneMgmtScreen } from './PhoneMgmtScreen';
import { EmailMgmtScreen } from './EmailMgmtScreen';
import { PasswordMgmtScreen } from './PasswordMgmtScreen';
import { DeviceAlertsScreen } from './DeviceAlertsScreen';

export function ScreenRenderer() {
  const { currentScreen } = useAppStore();

  switch (currentScreen) {
    case 'WELCOME':
      return <WelcomeScreen />;
    case 'GUEST_DASHBOARD':
      return <GuestDashboardScreen />;
    case 'LOGIN':
      return <LoginScreen />;
    case 'REGISTER_ENTRY':
      return <RegisterEntryScreen />;
    case 'STEP_1_CONSENT':
      return <WelcomeScreen />; // Step 1 is handled by WelcomeScreen in this prototype
    case 'STEP_2_PHONE':
      return <PhoneScreen />;
    case 'STEP_3_OTP':
      return <OtpScreen />;
    case 'STEP_4_NID':
      return <NidScreen />;
    case 'STEP_5_NAME':
      return <NameScreen />;
    case 'STEP_6_FACE':
      return <FaceScreen />;
    case 'STEP_7A_PASSPORT':
      return <PassportScreen />;
    case 'STEP_7B_LIVENESS':
      return <LivenessScreen />;
    case 'STEP_8_FINAL':
      return <FinalScreen />;
    case 'DASHBOARD_T0':
    case 'DASHBOARD_T1':
    case 'DASHBOARD_T2':
    case 'DASHBOARD_FROZEN':
      return <DashboardScreen tier={currentScreen} />;
    case 'PROFILE_HUB':
      return <ProfileHubScreen />;
    case 'PHONE_MGMT':
      return <PhoneMgmtScreen />;
    case 'EMAIL_MGMT':
      return <EmailMgmtScreen />;
    case 'PASSWORD_MGMT':
      return <PasswordMgmtScreen />;
    case 'DEVICE_ALERTS':
      return <DeviceAlertsScreen />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-neutral-500 p-6 text-center">
          <div>
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="font-bold text-lg mb-2">Screen Not Implemented Yet</h3>
            <p className="text-sm">{currentScreen}</p>
          </div>
        </div>
      );
  }
}


