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
    <div className="rounded-xl border border-primary-light bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 inline-flex rounded-lg bg-surface p-3 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-muted">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-surface px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            What SkillPilot does
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
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
