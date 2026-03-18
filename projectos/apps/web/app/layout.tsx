import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'ProjectOS Dashboard',
  description: 'AI Project Company OS MVP dashboard'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
