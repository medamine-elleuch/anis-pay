/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAppStore } from './store/useAppStore';
import { MobileSimulator } from './components/MobileSimulator';
import { StateExplorer } from './components/StateExplorer';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-neutral-100 overflow-hidden font-sans" dir="rtl">
      {/* State Explorer Panel */}
      <div className="w-96 bg-white border-l border-neutral-200 flex flex-col h-full z-10 shadow-brand-soft">
        <StateExplorer />
      </div>
      
      {/* Mobile Simulator Area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto relative">
        <div className="absolute inset-0 bg-brand-gradient opacity-5 pointer-events-none"></div>
        <MobileSimulator />
      </div>
    </div>
  );
}

