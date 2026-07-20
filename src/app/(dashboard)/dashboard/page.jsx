"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import ApplicationStatusChart from "@/components/dashboard/application-status-chart";
import PageHeader from "@/components/page-header";
import { useAuth } from "@/hooks/use-auth";
import { queryKeys } from "@/lib/query-keys";
import { getApplications } from "@/services/application-service";

const navigationCards = [
  {
    title: "Complete Profile",
    href: "/profile",
    description:
      "Update your academic background and preferences.",
  },
  {
    title: "Explore Opportunities",
    href: "/opportunities",
    description:
      "Discover scholarships, grants and fellowships.",
  },
  {
    title: "Track Applications",
    href: "/applications",
    description:
      "Manage application tasks, notes and status.",
  },
  {
    title: "Ask AI Assistant",
    href: "/assistant",
    description:
      "Get guidance for your funding applications.",
  },
];

export default function Page() {
  const { user } = useAuth();

  const applicationsQuery = useQuery({
    queryKey: queryKeys.applications.list(),

    queryFn: ({ signal }) =>
      getApplications({ signal }),

    staleTime: 0,
    refetchOnMount: "always",
  });

  const applications =
    applicationsQuery.data || [];

  const activeApplications =
    applications.filter(
      (application) =>
        ![
          "accepted",
          "rejected",
          "withdrawn",
        ].includes(application.status),
    ).length;

  const submittedApplications =
    applications.filter(
      (application) =>
        application.status === "submitted",
    ).length;

  const completedApplications =
    applications.filter((application) =>
      [
        "accepted",
        "rejected",
        "withdrawn",
      ].includes(application.status),
    ).length;

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title={`Welcome, ${
          user?.name || "Applicant"
        }`}
        description="Manage your funding discovery and application workflow."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {navigationCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="card p-6 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="font-bold text-slate-950">
              {card.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {card.description}
            </p>

            <p className="mt-4 text-sm font-bold text-indigo-600">
              Open workspace →
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card p-5">
          <p className="text-sm font-semibold text-slate-500">
            Total applications
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {applicationsQuery.isPending
              ? "—"
              : applications.length}
          </p>
        </div>

        <div className="card p-5">
          <p className="text-sm font-semibold text-slate-500">
            Active applications
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {applicationsQuery.isPending
              ? "—"
              : activeApplications}
          </p>
        </div>

        <div className="card p-5">
          <p className="text-sm font-semibold text-slate-500">
            Submitted
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {applicationsQuery.isPending
              ? "—"
              : submittedApplications}
          </p>
        </div>

        <div className="card p-5">
          <p className="text-sm font-semibold text-slate-500">
            Closed applications
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {applicationsQuery.isPending
              ? "—"
              : completedApplications}
          </p>
        </div>
      </section>

      <div className="mt-7">
        {applicationsQuery.isPending ? (
          <div className="h-[450px] animate-pulse rounded-2xl bg-white" />
        ) : null}

        {applicationsQuery.isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            <p>
              {applicationsQuery.error.message ||
                "Application analytics could not be loaded."}
            </p>

            <button
              type="button"
              onClick={() =>
                applicationsQuery.refetch()
              }
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
            >
              Try again
            </button>
          </div>
        ) : null}

        {applicationsQuery.isSuccess ? (
          <ApplicationStatusChart
            applications={applications}
          />
        ) : null}
      </div>
    </div>
  );
}