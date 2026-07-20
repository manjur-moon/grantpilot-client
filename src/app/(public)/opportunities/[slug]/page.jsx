"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { apiClient } from "@/lib/api-client";
import {
  formatCurrency,
  formatDate,
  formatStatus,
} from "@/lib/formatters";
import { queryKeys } from "@/lib/query-keys";
import {
  getSavedOpportunityStatus,
  saveOpportunity,
  unsaveOpportunity,
} from "@/services/saved-opportunity-service";
import { getOpportunity } from "@/services/opportunity-service";

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();

  const [notice, setNotice] = useState({
    type: "",
    message: "",
  });

  const opportunityQuery = useQuery({
    queryKey: queryKeys.opportunities.detail(slug),
    queryFn: () => getOpportunity(slug),
    enabled: Boolean(slug),
  });

  const opportunity = opportunityQuery.data;

  const savedStatusQuery = useQuery({
    queryKey:
      queryKeys.savedOpportunities.status(
        opportunity?._id,
      ),

    queryFn: ({ signal }) =>
      getSavedOpportunityStatus(
        opportunity._id,
        { signal },
      ),

    enabled:
      isAuthenticated &&
      Boolean(opportunity?._id),

    staleTime: 0,
  });

  const isSaved =
    savedStatusQuery.data?.isSaved || false;

  const ensureAuthentication = () => {
    if (authLoading) {
      setNotice({
        type: "error",
        message:
          "Please wait while your account is being checked.",
      });

      return false;
    }

    if (!isAuthenticated) {
      router.push(
        `/login?redirect=/opportunities/${slug}`,
      );

      return false;
    }

    return true;
  };

  const savedMutation = useMutation({
    mutationFn: async () => {
      if (!opportunity?._id) {
        throw new Error(
          "Opportunity information is unavailable.",
        );
      }

      if (isSaved) {
        return unsaveOpportunity(
          opportunity._id,
        );
      }

      return saveOpportunity(
        opportunity._id,
      );
    },

    onSuccess: async (result) => {
      queryClient.setQueryData(
        queryKeys.savedOpportunities.status(
          opportunity._id,
        ),
        result,
      );

      setNotice({
        type: "success",
        message: result.isSaved
          ? "Opportunity saved successfully."
          : "Opportunity removed from saved items.",
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey:
            queryKeys.savedOpportunities.list(),
        }),

        queryClient.invalidateQueries({
          queryKey:
            queryKeys.opportunities.all,
        }),
      ]);
    },

    onError: (error) => {
      setNotice({
        type: "error",
        message:
          error.message ||
          "Saved status could not be updated.",
      });
    },
  });

  const handleSavedToggle = () => {
    setNotice({
      type: "",
      message: "",
    });

    if (!ensureAuthentication()) {
      return;
    }

    savedMutation.mutate();
  };

  const startApplication = async () => {
    setNotice({
      type: "",
      message: "",
    });

    if (!ensureAuthentication()) {
      return;
    }

    try {
      const response = await apiClient(
        "/api/v1/applications",
        {
          method: "POST",
          body: {
            opportunityId:
              opportunity._id,
          },
        },
      );

      router.push(
        `/applications/${response.data._id}`,
      );
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error.message ||
          "Application could not be started.",
      });
    }
  };

  if (opportunityQuery.isPending) {
    return (
      <main className="container-page py-16">
        Loading opportunity...
      </main>
    );
  }

  if (opportunityQuery.isError) {
    return (
      <main className="container-page py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p>
            {opportunityQuery.error.message ||
              "Opportunity could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() =>
              opportunityQuery.refetch()
            }
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!opportunity) {
    return (
      <main className="container-page py-16">
        Opportunity not found.
      </main>
    );
  }

  const sections = [
    {
      title: "Requirements",
      items: opportunity.requirements,
    },
    {
      title: "Required Documents",
      items: opportunity.requiredDocuments,
    },
    {
      title: "Benefits",
      items: opportunity.benefits,
    },
    {
      title: "Application Steps",
      items: opportunity.applicationSteps,
    },
  ];

  const savedButtonLoading =
    savedMutation.isPending ||
    savedStatusQuery.isFetching;

  return (
    <main className="container-page py-12">
      <img
        src={opportunity.coverImage}
        alt={opportunity.title}
        className="h-80 w-full rounded-3xl object-cover"
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <article>
          <p className="font-bold text-indigo-600">
            {formatStatus(
              opportunity.category,
            )}
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {opportunity.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {opportunity.providerName}
          </p>

          <p className="mt-6 whitespace-pre-line leading-8 text-slate-700">
            {opportunity.fullDescription}
          </p>

          {sections.map((section) => {
            const items =
              section.items || [];

            if (items.length === 0) {
              return null;
            }

            return (
              <section
                key={section.title}
                className="mt-8"
              >
                <h2 className="text-2xl font-bold">
                  {section.title}
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {items.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </article>

        <aside className="card h-fit p-6">
          <h2 className="text-xl font-bold">
            Key information
          </h2>

          <div className="mt-4 grid gap-3 text-sm">
            <span>
              Deadline:{" "}
              {formatDate(
                opportunity.deadline,
              )}
            </span>

            <span>
              Funding:{" "}
              {formatCurrency(
                opportunity.funding?.amount,
                opportunity.funding?.currency,
              )}
            </span>

            <span>
              Type:{" "}
              {formatStatus(
                opportunity.funding?.type,
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={startApplication}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700"
          >
            Start Application
          </button>

          <button
            type="button"
            disabled={
              authLoading ||
              savedButtonLoading
            }
            onClick={handleSavedToggle}
            className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-800 hover:border-indigo-500 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savedMutation.isPending
              ? isSaved
                ? "Removing..."
                : "Saving..."
              : savedStatusQuery.isFetching
                ? "Checking saved status..."
                : isSaved
                  ? "Remove from Saved"
                  : "Save Opportunity"}
          </button>

          <a
            href={
              opportunity.officialSourceUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center font-bold text-indigo-600 hover:text-indigo-800"
          >
            Official source
          </a>

          {notice.message ? (
            <p
              className={`mt-4 rounded-xl p-3 text-sm ${
                notice.type === "error"
                  ? "border border-red-200 bg-red-50 text-red-700"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {notice.message}
            </p>
          ) : null}

          {savedStatusQuery.isError ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              Saved status could not be
              checked. You can retry by
              refreshing the page.
            </p>
          ) : null}
        </aside>
      </div>
    </main>
  );
}