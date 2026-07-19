import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  FileSearch,
  FileText,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

const problems = [
  {
    title: "Scattered opportunities",
    description:
      "Scholarships and grants are published across many provider websites, making discovery slow and difficult.",
    icon: Search,
  },
  {
    title: "Unclear eligibility",
    description:
      "Applicants often spend hours reviewing programs that do not match their academic background or nationality.",
    icon: Target,
  },
  {
    title: "Complex requirements",
    description:
      "Documents, essays, references, deadlines and application steps are hard to coordinate in one place.",
    icon: ListChecks,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Build your profile",
    description:
      "Add your education, interests, destination preferences and funding goals.",
  },
  {
    number: "02",
    title: "Generate matches",
    description:
      "GrantPilot compares active opportunities with your profile and explains each recommendation.",
  },
  {
    number: "03",
    title: "Prepare your application",
    description:
      "Track documents, tasks, readiness, notes and submission deadlines in one workspace.",
  },
];

const aiFeatures = [
  {
    title: "Opportunity Matching Agent",
    description:
      "Combines eligibility rules with contextual ranking and clearly explains strengths, concerns and missing information.",
    icon: Lightbulb,
  },
  {
    title: "Application Strategy Agent",
    description:
      "Turns official requirements into a practical task plan, document checklist and readiness review.",
    icon: Bot,
  },
  {
    title: "Document Intelligence",
    description:
      "Reviews uploaded CVs, statements and supporting documents to surface evidence gaps and improvement ideas.",
    icon: FileSearch,
  },
  {
    title: "Application Workspace",
    description:
      "Keeps deadlines, documents, tasks, notes and official source links connected for each application.",
    icon: FileText,
  },
];

const categories = [
  {
    title: "Graduate Scholarships",
    icon: GraduationCap,
    href: "/opportunities?category=graduate-scholarship",
  },
  {
    title: "Research Grants",
    icon: FileSearch,
    href: "/opportunities?category=research-grant",
  },
  {
    title: "Fellowships",
    icon: UsersRound,
    href: "/opportunities?category=fellowship",
  },
  {
    title: "PhD Funding",
    icon: BriefcaseBusiness,
    href: "/opportunities?category=phd-funding",
  },
  {
    title: "Travel Grants",
    icon: CircleDollarSign,
    href: "/opportunities?category=travel-grant",
  },
  {
    title: "Innovation Funding",
    icon: Sparkles,
    href: "/opportunities?category=innovation-competition",
  },
];

const freeFeatures = [
  "Opportunity discovery and filtering",
  "Saved opportunities",
  "Application tracking",
  "Limited AI workflow usage",
];

const proFeatures = [
  "Higher AI matching limits",
  "Document intelligence",
  "Application strategy reports",
  "Advanced readiness guidance",
];

export const metadata = {
  title: "Funding Discovery and Application Intelligence",
  description:
    "Discover verified scholarships, fellowships and grants, evaluate eligibility and organize stronger funding applications.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200">
              <Sparkles className="h-4 w-4" />
              AI-guided funding discovery
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Find the right funding.
              <span className="block text-indigo-300">
                Build a stronger application.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Discover verified scholarships, fellowships and grants. Compare
              eligibility, organize requirements and prepare every application
              through guided AI workflows.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white transition hover:bg-indigo-500"
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/opportunities"
                className="inline-flex min-h-13 items-center justify-center rounded-xl border border-slate-600 px-6 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore opportunities
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                Verified source links
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Private application workspace
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-white p-5 text-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                      AI Match
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                      Graduate Funding Program
                    </h2>
                  </div>
                  <span className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-700">
                    91% match
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Academic level matches",
                    "Preferred field matches",
                    "Funding preference matches",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-amber-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                    Recommended next action
                  </p>
                  <p className="mt-2 text-sm leading-6 text-amber-900">
                    Review the language requirement and upload your latest
                    academic transcript.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problems */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
              The application challenge
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Funding discovery should not feel disorganized
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon;

              return (
                <article key={problem.title} className="card p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {problem.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              From discovery to submission
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.number} className="card relative p-7">
                <span className="text-5xl font-black text-indigo-100">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI features */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
              Agentic AI workflows
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              AI that helps you take the next step
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Each workflow combines applicant context, opportunity
              requirements and structured actions instead of returning a generic
              answer.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="flex gap-5 rounded-2xl border border-slate-200 p-6 shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Categories */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="container-page">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">
                Funding categories
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Explore opportunities by goal
              </h2>
            </div>

            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-300 hover:text-indigo-200"
            >
              View all opportunities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-indigo-400/50 hover:bg-white/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold">{category.title}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Pricing */}
      <section id="pricing" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Start free and upgrade when needed
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">Free</h3>
              <p className="mt-3 text-slate-600">
                Essential funding discovery and application organization.
              </p>
              <p className="mt-7 text-4xl font-bold text-slate-950">$0</p>

              <ul className="mt-7 space-y-3">
                {freeFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-8 flex min-h-12 items-center justify-center rounded-xl border border-slate-300 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Create free account
              </Link>
            </article>

            <article className="rounded-3xl border border-indigo-500 bg-white p-8 shadow-xl ring-4 ring-indigo-100">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-slate-950">Pro</h3>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                  Advanced workflows
                </span>
              </div>
              <p className="mt-3 text-slate-600">
                Higher usage limits and advanced application intelligence.
              </p>
              <p className="mt-7 text-4xl font-bold text-slate-950">
                Flexible billing
              </p>

              <ul className="mt-7 space-y-3">
                {proFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-8 flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Start with GrantPilot
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-indigo-600 px-6 py-14 text-center text-white sm:px-12">
            <Sparkles className="mx-auto h-10 w-10 text-indigo-200" />
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-4xl">
              Build your funding application workspace today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-indigo-100">
              Create your applicant profile, discover relevant opportunities and
              organize each application in one secure workspace.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-indigo-700 hover:bg-indigo-50"
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-indigo-300 px-6 text-sm font-bold text-white hover:bg-indigo-500"
              >
                Browse opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
