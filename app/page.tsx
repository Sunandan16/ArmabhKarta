import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Demo } from '@/components/Demo';
import { HowItWorks } from '@/components/HowItWorks';
import { Roles } from '@/components/Roles';
import { TechStack } from '@/components/TechStack';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Demo />
      <HowItWorks />
      <Roles />
      <TechStack />
      <Footer />
    </main>
  );
}
