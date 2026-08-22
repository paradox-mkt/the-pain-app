import BottomNav from '@/components/BottomNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app-container bg-gray-50 dark:bg-slate-950">
      <div className="scroll-area">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
