import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SkillPilot | AI Skill Gap Analyzer',
  description:
    'Analyze your skills, discover role gaps, and get a personalized career roadmap with SkillPilot.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
