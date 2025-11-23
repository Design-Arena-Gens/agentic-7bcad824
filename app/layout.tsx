import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'B2B Outreach Generator',
  description: 'Generate empathetic, high-value outreach messages for local businesses.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header className="app-header">
            <h1>B2B Outreach Generator</h1>
            <p className="subtitle">
              Draft concise, empathetic messages focused on Reactivation, Optimization, and Client Retention.
            </p>
          </header>
          <main>{children}</main>
          <footer className="app-footer">
            <span>Built for professional, respectful outreach.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}

