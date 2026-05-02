'use client';

import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';
import Toast from '@/components/ui/Toast';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="page-content animate-fadeUp">
        {children}
      </main>
      <TabBar />
      <Toast />
    </>
  );
}
