import BottomNav from '@/components/BottomNav';
import DesktopSidebar from '@/components/DesktopSidebar';
import Providers from '@/components/Providers';
import { PushNotificationManager } from '@/components/PushNotificationManager';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <PushNotificationManager />
      <div className="flex h-screen h-[100dvh] bg-gray-50 dark:bg-slate-950 overflow-hidden">
      {/* Desktop Sidebar (hidden on mobile) */}
      <DesktopSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Scrollable Content wrapper with max-width for readability on large screens */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto min-h-full pb-20 md:pb-6">
            {children}
          </div>
        </main>
        
        {/* Mobile Bottom Navigation (hidden on desktop) */}
        <BottomNav />
      </div>
      </div>
    </Providers>
  );
}
