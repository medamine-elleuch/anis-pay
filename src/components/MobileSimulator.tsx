import { useAppStore } from '../store/useAppStore';
import { ScreenRenderer } from '../screens/ScreenRenderer';

export function MobileSimulator() {
  return (
    <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-brand-medium overflow-hidden border-[8px] border-neutral-900 relative flex flex-col">
      {/* Status Bar Mock */}
      <div className="h-12 w-full flex items-center justify-between px-6 text-xs font-medium text-neutral-950 absolute top-0 z-50">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-neutral-950 rounded-sm"></div>
          <div className="w-3 h-3 bg-neutral-950 rounded-full"></div>
          <div className="w-5 h-3 bg-neutral-950 rounded-sm"></div>
        </div>
      </div>
      
      {/* Dynamic Screen Content */}
      <div className="flex-1 overflow-y-auto bg-neutral-100 relative">
        <ScreenRenderer />
      </div>

      {/* Home Indicator Mock */}
      <div className="h-8 w-full absolute bottom-0 flex items-center justify-center bg-transparent pointer-events-none z-50">
        <div className="w-32 h-1 bg-neutral-950 rounded-full"></div>
      </div>
    </div>
  );
}
