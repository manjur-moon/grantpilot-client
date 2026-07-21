"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import ApplicationStatusChart from "@/components/dashboard/application-status-chart";
import { queryKeys } from "@/lib/query-keys";
import { getApplications } from "@/services/application-service";

const quickActions = [
  {
    title: "Explore Opportunities",
    description:
      "Discover scholarships, fellowships and grants that match your goals.",
    href: "/opportunities",
    icon: Search,
    iconClassName: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Track Applications",
    description:
      "Manage tasks, requirements, notes and application progress.",
    href: "/applications",
    icon: FileText,
    iconClassName: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "AI Assistant",
    description:
      "Get personalized guidance for your funding applications.",
    href: "/assistant",
    icon: Bot,
    iconClassName: "bg-violet-100 text-violet-700",
  },
  {
    title: "Complete Profile",
    description:
      "Improve your profile to receive more relevant recommendations.",
    href: "/profile",
    icon: Target,
    iconClassName: "bg-amber-100 text-amber-700",
  },
];

function normalizeStatus(status = "") {
  return String(status)
    .trim()
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-");
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  loading,
}) {
  return (
    <article className="group h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">
            {title}
          </p>

          {loading ? (
            <div className="mt-3 h-10 w-16 animate-pulse rounded-xl bg-slate-200" />
          ) : (
            <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              {value}
            </p>
          )}
        </div>

        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </article>
  );
}

export default function DashboardPage() {
  const applicationsQuery = useQuery({
    queryKey: queryKeys.applications.list(),
    queryFn: ({ signal }) =>
      getApplications({ signal }),
    staleTime: 30 * 1000,
    refetchOnMount: true,
  });

  const applications = Array.isArray(
    applicationsQuery.data,
  )
    ? applicationsQuery.data
    : [];

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (application) => {
      const status = normalizeStatus(
        application?.status,
      );

      return ![
        "accepted",
        "rejected",
        "withdrawn",
      ].includes(status);
    },
  ).length;

  const submittedApplications = applications.filter(
    (application) =>
      normalizeStatus(application?.status) ===
      "submitted",
  ).length;

  const closedApplications = applications.filter(
    (application) =>
      [
        "accepted",
        "rejected",
        "withdrawn",
      ].includes(
        normalizeStatus(application?.status),
      ),
  ).length;

  const closedRate =
    totalApplications > 0
      ? Math.round(
          (closedApplications / totalApplications) *
            100,
        )
      : 0;

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <section className="relative isolate overflow-hidden rounded-[32px] bg-slate-950 px-6 py-9 text-white shadow-xl shadow-slate-300/40 sm:px-8 sm:py-10 lg:px-10">
        <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-indigo-600/35 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-violet-600/25 blur-3xl" />

        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-200">
              <Sparkles className="h-4 w-4" />
              Applicant workspace
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Welcome back
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Discover relevant funding opportunities, prepare
              stronger applications and track your entire
              workflow from one secure dashboard.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/opportunities"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
              >
                Explore opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/applications"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                View applications
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <p className="text-2xl font-black">
                {applicationsQuery.isPending
                  ? "—"
                  : totalApplications}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Total applications
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <p className="text-2xl font-black">
                {applicationsQuery.isPending
                  ? "—"
                  : `${closedRate}%`}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Closed rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Error state */}
      {applicationsQuery.isError ? (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-bold">
            Dashboard analytics could not be loaded
          </p>

          <p className="mt-1 text-sm">
            {applicationsQuery.error.message ||
              "Please try again shortly."}
          </p>

          <button
            type="button"
            onClick={() =>
              applicationsQuery.refetch()
            }
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white"
          >
            Try again
          </button>
        </section>
      ) : null}

      {/* Metrics */}
      <section className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total applications"
          value={totalApplications}
          description="All applications currently available in your workspace."
          icon={FileText}
          iconClassName="bg-indigo-100 text-indigo-700"
          loading={applicationsQuery.isPending}
        />

        <MetricCard
          title="Active applications"
          value={activeApplications}
          description="Applications that still require preparation, review or submission."
          icon={Clock3}
          iconClassName="bg-amber-100 text-amber-700"
          loading={applicationsQuery.isPending}
        />

        <MetricCard
          title="Submitted"
          value={submittedApplications}
          description="Applications already submitted to their official provider."
          icon={TrendingUp}
          iconClassName="bg-violet-100 text-violet-700"
          loading={applicationsQuery.isPending}
        />

        <MetricCard
          title="Closed applications"
          value={closedApplications}
          description="Accepted, rejected or withdrawn application records."
          icon={CheckCircle2}
          iconClassName="bg-emerald-100 text-emerald-700"
          loading={applicationsQuery.isPending}
        />
      </section>

      {/* Analytics and quick actions */}
      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          {applicationsQuery.isPending ? (
            <div className="h-[470px] animate-pulse rounded-3xl bg-white" />
          ) : (
            <ApplicationStatusChart
              applications={applications}
            />
          )}
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <BarChart3 className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-bold text-indigo-600">
                Quick actions
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-950">
                Continue your workflow
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Open the tools you use most frequently.
          </p>

          <div className="mt-6 grid gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.iconClassName}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-black text-slate-950">
                      {action.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                </Link>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
}