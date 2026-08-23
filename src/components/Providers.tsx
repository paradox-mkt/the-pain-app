'use client';

import { MockDataProvider } from '@/lib/MockDataContext';
import { CrisisModal, MedModal } from '@/components/Modals';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MockDataProvider>
      {children}
      <CrisisModal />
      <MedModal />
    </MockDataProvider>
  );
}
