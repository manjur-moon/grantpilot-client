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
<section className="relative isolate overflow-hidden border-b border-white/10 bg-slate-950 text-white">
  {/* Modern dark grid background */}
  <div className="pointer-events-none absolute inset-0 -z-30 bg-slate-950" />

  <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:52px_52px]" />

  <div className="pointer-events-none absolute -left-52 top-16 -z-10 h-[520px] w-[520px] rounded-full bg-indigo-700/30 blur-3xl" />

  <div className="pointer-events-none absolute -right-52 bottom-[-180px] -z-10 h-[560px] w-[560px] rounded-full bg-violet-700/25 blur-3xl" />

  <div className="pointer-events-none absolute left-1/2 top-[-320px] -z-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

  <div className="container-page grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24 xl:gap-20">
    {/* Left content */}
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-200 backdrop-blur">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </span>

        AI-powered funding intelligence
      </div>

      <h1 className="mt-7 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
        Discover funding that{" "}
        <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
          matches your goals.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
        Find verified scholarships, fellowships and research grants.
        Understand your eligibility, organize every requirement and
        build stronger applications with guided AI workflows.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/register"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
        >
          Create free account

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/opportunities"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:border-indigo-400/50 hover:bg-white/15"
        >
          <Search className="h-4 w-4" />
          Explore opportunities
        </Link>
      </div>

      {/* Trust points */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
          </span>

          Verified source links
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-400/15">
            <ShieldCheck className="h-4 w-4 text-indigo-300" />
          </span>

          Secure applicant workspace
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-400/15">
            <Bot className="h-4 w-4 text-violet-300" />
          </span>

          AI-guided workflows
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-7">
        <div>
          <p className="text-2xl font-black text-white sm:text-3xl">
            100%
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
            Verified sources
          </p>
        </div>

        <div className="border-x border-white/10 px-3 sm:px-6">
          <p className="text-2xl font-black text-white sm:text-3xl">
            AI
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
            Eligibility guidance
          </p>
        </div>

        <div className="pl-1 sm:pl-4">
          <p className="text-2xl font-black text-white sm:text-3xl">
            24/7
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
            Application access
          </p>
        </div>
      </div>
    </div>

    {/* Right preview */}
    <div className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div className="relative rounded-[32px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-4">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-950">
          {/* Card header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <Sparkles className="h-5 w-5" />
              </span>

              <div>
                <p className="text-sm font-bold text-slate-950">
                  GrantPilot Match
                </p>

                <p className="text-xs text-slate-500">
                  Opportunity intelligence
                </p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
              Excellent match
            </span>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Graduate scholarship
                </p>

                <h2 className="mt-2 text-xl font-black text-slate-950 sm:text-2xl">
                  Global Computer Science Scholarship
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  International Technology Foundation
                </p>
              </div>

              <div className="w-fit shrink-0 rounded-2xl bg-indigo-50 p-4 text-center">
                <p className="text-3xl font-black text-indigo-700">
                  91%
                </p>

                <p className="mt-1 text-xs font-bold text-indigo-600">
                  Match score
                </p>
              </div>
            </div>

            {/* Compatibility */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">
                  Profile compatibility
                </span>

                <span className="text-indigo-700">91%</span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-indigo-600 to-violet-500" />
              </div>
            </div>

            {/* Eligibility matches */}
            <div className="mt-6 grid gap-3">
              {[
                {
                  title: "Academic level",
                  value: "Perfect match",
                },
                {
                  title: "Preferred field",
                  value: "Computer Science",
                },
                {
                  title: "Funding preference",
                  value: "Fully funded",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      {item.title}
                    </span>
                  </div>

                  <span className="pl-11 text-xs font-bold text-slate-500 sm:pl-0">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <Target className="h-4 w-4 text-amber-700" />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                    Recommended next action
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-900">
                    Upload your academic transcript and confirm the
                    language requirement before applying.
                  </p>
                </div>
              </div>
            </div>

            {/* Deadline */}
            <div className="mt-5 border-t border-slate-200 pt-5">
              <p className="text-xs text-slate-500">
                Application deadline
              </p>

              <p className="mt-1 text-sm font-bold text-slate-950">
                30 September 2027
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 2. Problems */}
<section className="relative isolate overflow-hidden border-y border-slate-200 bg-white py-20 sm:py-24">
  {/* Background */}
  <div className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-b from-white via-indigo-50/40 to-white" />

  <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.12)_1px,transparent_0)] bg-[size:28px_28px] opacity-60" />

  <div className="pointer-events-none absolute -left-40 top-16 -z-10 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl" />

  <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

  <div className="container-page">
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700 shadow-sm backdrop-blur">
        <Sparkles className="h-4 w-4" />
        The application challenge
      </div>

      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        Funding discovery should not feel{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          disorganized
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Applicants lose valuable time switching between provider
        websites, checking complex eligibility rules and managing
        disconnected requirements.
      </p>
    </div>

    <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
      {problems.map((problem, index) => {
        const Icon = problem.icon;

        return (
          <article
            key={problem.title}
            className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60 sm:p-7"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 transition group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 text-indigo-700 ring-1 ring-indigo-100">
                <Icon className="h-6 w-6" />
              </span>

              <span className="text-4xl font-black text-slate-100 transition group-hover:text-indigo-100">
                0{index + 1}
              </span>
            </div>

            <h3 className="mt-6 text-lg font-black text-slate-950">
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
<section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
  {/* Background */}
  <div className="pointer-events-none absolute inset-0 -z-30 bg-slate-950" />

  <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />

  <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-[430px] w-[430px] rounded-full bg-indigo-700/30 blur-3xl" />

  <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[430px] w-[430px] rounded-full bg-violet-700/25 blur-3xl" />

  <div className="container-page">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
          <ListChecks className="h-4 w-4" />
          How it works
        </div>

        <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          From discovery to{" "}
          <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            submission
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          GrantPilot turns a complex funding journey into three
          clear and manageable stages.
        </p>
      </div>

      <Link
        href="/register"
        className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:border-indigo-400/50 hover:bg-white/15"
      >
        Start your journey
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>

    <div className="relative mt-14">
      {/* Desktop connection line */}
      <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-9 hidden h-px bg-gradient-to-r from-indigo-500/20 via-indigo-400 to-violet-500/20 lg:block" />

      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <article
            key={step.number}
            className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.09] hover:shadow-2xl hover:shadow-indigo-950/40"
          >
            <div className="relative z-10 flex items-center justify-between gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/15 text-2xl font-black text-indigo-200 shadow-lg shadow-indigo-950/30">
                {step.number}
              </span>

              {index < processSteps.length - 1 ? (
                <ArrowRight className="hidden h-5 w-5 text-indigo-300/70 lg:block" />
              ) : (
                <CheckCircle2 className="hidden h-5 w-5 text-emerald-300 lg:block" />
              )}
            </div>

            <h3 className="mt-7 text-xl font-black text-white">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              {step.description}
            </p>

            <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                style={{
                  width: `${((index + 1) / processSteps.length) * 100}%`,
                }}
              />
            </div>
          </article>
        ))}
      </div>
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
<section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
  {/* Background decoration */}
  <div className="pointer-events-none absolute inset-0 -z-30 bg-slate-950" />

  <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:52px_52px]" />

  <div className="pointer-events-none absolute -left-48 top-10 -z-10 h-[460px] w-[460px] rounded-full bg-indigo-700/25 blur-3xl" />

  <div className="pointer-events-none absolute -right-48 bottom-[-120px] -z-10 h-[500px] w-[500px] rounded-full bg-violet-700/20 blur-3xl" />

  <div className="container-page">
    {/* Header */}
    <div className="flex flex-col gap- rounded-full bg-violet-700/20 blur-3xl" />

  <div className="container-page">
    
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
          <Sparkles className="h-4 w-4" />
          Funding categories
        </div>

        <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Explore opportunities by{" "}
          <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            funding goal
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Choose a funding category to quickly discover scholarships,
          grants, fellowships and competitions relevant to your
          academic or professional goals.
        </p>
      </div>

      <Link
        href="/opportunities"
        className="group inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:border-indigo-400/50 hover:bg-white/15"
      >
        View all opportunities

        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>

    {/* Category cards */}
    <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => {
        const Icon = category.icon;

        return (
          <Link
            key={category.title}
            href={category.href}
            aria-label={`Explore ${category.title}`}
            className="group relative flex h-full min-h-[150px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.1] hover:shadow-2xl hover:shadow-indigo-950/40"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 transition group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/15 text-indigo-200 transition group-hover:scale-105 group-hover:bg-indigo-500/25">
                <Icon className="h-6 w-6" />
              </span>

              <span className="text-sm font-black text-white/10 transition group-hover:text-indigo-300/30">
                0{index + 1}
              </span>
            </div>

            <div className="mt-6 flex flex-1 items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Browse verified opportunities in this category.
                </p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition group-hover:border-indigo-400/30 group-hover:bg-indigo-500/20 group-hover:text-indigo-200">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>

    {/* Bottom summary */}
    <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.05] px-6 py-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-bold text-white">
          Can&apos;t find the right category?
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Use advanced filters to search by country, education level,
          funding type and deadline.
        </p>
      </div>

      <Link
        href="/opportunities"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5"
      >
        Search all funding
        <ArrowRight className="h-4 w-4" />
      </Link>
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
