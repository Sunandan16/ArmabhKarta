import { Search, Target, TrendingUp, Map, Database, Zap, LucideIcon } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Skill Extraction',
    description:
      'Paste your background in plain text. SkillPilot extracts and normalizes your skills automatically.',
  },
  {
    icon: Target,
    title: 'Gap Analysis',
    description:
      'Compare your skills against market-driven role profiles for Data Scientist, Analyst, Engineer, and ML Engineer.',
  },
  {
    icon: TrendingUp,
    title: 'Salary & Success Predictions',
    description:
      'Trained classifiers predict salary-hike potential and career success probability.',
  },
  {
    icon: Map,
    title: 'Personalized Roadmap',
    description:
      'Get a phased learning plan with the top skills you need to reach your target role.',
  },
  {
    icon: Database,
    title: 'Built on Real Data',
    description:
      'Role-skill matrices derived from thousands of real job postings and standardized outcomes.',
  },
  {
    icon: Zap,
    title: 'Fast & Lightweight',
    description:
      'No heavy cloud setup needed. Models run locally and respond in milliseconds.',
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-brand-border bg-white/80 p-7 shadow-warm-md backdrop-blur-sm transition hover:-translate-y-1 hover:border-primary-light hover:shadow-warm-lg">
      <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-primary to-secondary p-3.5 text-white shadow-orange-200 transition group-hover:scale-105">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-brand-navy">{title}</h3>
      <p className="leading-relaxed text-brand-muted">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-surface/50 px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Capabilities
          </span>
          <h2 className="mb-4 text-3xl font-bold text-brand-navy md:text-4xl">
            What SkillPilot does
          </h2>
          <p className="mx-auto max-w-2xl text-brand-muted">
            A complete pipeline from raw skills to actionable career guidance.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
