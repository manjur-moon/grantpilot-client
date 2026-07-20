"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Edit3,
  ExternalLink,
  Eye,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import {
  formatCurrency,
  formatDate,
  formatStatus,
} from "@/lib/formatters";
import {
  deleteOpportunity,
  getMyOpportunities,
} from "@/services/opportunity-service";

const statusStyles = {
  draft: "bg-slate-100 text-slate-700",
  pending_review: "bg-amber-100 text-amber-800",
  published: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-700",
  archived: "bg-slate-200 text-slate-700",
};

export default function ManageOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const loadOpportunities = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMyOpportunities();
      setOpportunities(data || []);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Your opportunities could not be loaded.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, []);

  useEffect(() => {
    if (!selectedOpportunity) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedOpportunity(null);
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [selectedOpportunity]);

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return opportunities.filter((opportunity) => {
      const title = (
        opportunity.title || ""
      ).toLowerCase();

      const providerName = (
        opportunity.providerName || ""
      ).toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        providerName.includes(normalizedSearch);

      const matchesStatus =
        !status ||
        opportunity.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [opportunities, search, status]);

  const removeOpportunity = async (
    opportunity,
  ) => {
    const confirmed = window.confirm(
      `Delete “${opportunity.title}”? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(opportunity._id);
    setError("");

    try {
      await deleteOpportunity(
        opportunity._id,
      );

      setOpportunities((current) =>
        current.filter(
          (item) =>
            item._id !== opportunity._id,
        ),
      );

      if (
        selectedOpportunity?._id ===
        opportunity._id
      ) {
        setSelectedOpportunity(null);
      }
    } catch (requestError) {
      setError(
        requestError.message ||
          "The opportunity could not be deleted.",
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Opportunity workspace"
        title="Manage Opportunities"
        description="Review, preview, edit or delete your submitted funding opportunities."
        action={
          <Link
            href="/items/add"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Submit opportunity
          </Link>
        }
      />

      <div className="card grid gap-3 p-4 md:grid-cols-[1fr_220px]">
        <label className="relative">
          <span className="sr-only">
            Search submissions
          </span>

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by title or provider"
            className="min-h-11 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label>
          <span className="sr-only">
            Filter by status
          </span>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">
              All statuses
            </option>

            <option value="draft">
              Draft
            </option>

            <option value="pending_review">
              Pending Review
            </option>

            <option value="published">
              Published
            </option>

            <option value="rejected">
              Rejected
            </option>

            <option value="archived">
              Archived
            </option>
          </select>
        </label>
      </div>

      {error ? (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>

          <button
            type="button"
            onClick={loadOpportunities}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white"
          >
            Try again
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-white"
              />
            ),
          )}
        </div>
      ) : null}

      {!loading &&
      filteredOpportunities.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
          <EmptyState
            title="No opportunity submissions found"
            description="Submit a genuine opportunity or change the current search filters."
          />
        </div>
      ) : null}

      {!loading &&
      filteredOpportunities.length > 0 ? (
        <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
          {filteredOpportunities.map(
            (opportunity) => {
              const canModify =
                opportunity.status !==
                "published";

              const isDeleting =
                deletingId ===
                opportunity._id;

              return (
                <article
                  key={opportunity._id}
                  className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="grid h-full sm:grid-cols-[180px_1fr]">
                    <img
                      src={
                        opportunity.coverImage
                      }
                      alt={opportunity.title}
                      className="h-52 w-full object-cover sm:h-full"
                    />

                    <div className="flex h-full flex-col p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            statusStyles[
                              opportunity.status
                            ] ||
                            statusStyles.draft
                          }`}
                        >
                          {formatStatus(
                            opportunity.status,
                          )}
                        </span>

                        <span className="text-xs text-slate-500">
                          Updated{" "}
                          {formatDate(
                            opportunity.updatedAt,
                          )}
                        </span>
                      </div>

                      <h2 className="mt-4 line-clamp-2 text-xl font-bold text-slate-950">
                        {opportunity.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          opportunity.providerName
                        }
                      </p>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {
                          opportunity.shortDescription
                        }
                      </p>

                      {opportunity.status ===
                        "rejected" &&
                      opportunity.moderation
                        ?.rejectionReason ? (
                        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                          <strong>
                            Rejection reason:
                          </strong>{" "}
                          {
                            opportunity
                              .moderation
                              .rejectionReason
                          }
                        </div>
                      ) : null}

                      {opportunity.status ===
                      "published" ? (
                        <p className="mt-4 text-xs leading-5 text-slate-500">
                          Published records are
                          locked for submitters.
                          Contact an administrator
                          to request a change.
                        </p>
                      ) : null}

                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedOpportunity(
                              opportunity,
                            )
                          }
                          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-700"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>

                        {opportunity.status ===
                        "published" ? (
                          <Link
                            href={`/opportunities/${opportunity.slug}`}
                            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live page
                          </Link>
                        ) : null}

                        <Link
                          href={`/items/edit/${opportunity._id}`}
                          aria-disabled={
                            !canModify
                          }
                          tabIndex={
                            canModify ? 0 : -1
                          }
                          className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${
                            canModify
                              ? "bg-indigo-600 text-white transition hover:bg-indigo-700"
                              : "pointer-events-none bg-slate-200 text-slate-500"
                          }`}
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </Link>

                        <button
                          type="button"
                          disabled={
                            !canModify ||
                            isDeleting
                          }
                          onClick={() =>
                            removeOpportunity(
                              opportunity,
                            )
                          }
                          title={
                            canModify
                              ? "Delete opportunity"
                              : "Published opportunities cannot be deleted"
                          }
                          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />

                          {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      ) : null}

      {selectedOpportunity ? (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedOpportunity(null);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="opportunity-preview-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="relative">
              <img
                src={
                  selectedOpportunity.coverImage
                }
                alt={
                  selectedOpportunity.title
                }
                className="h-56 w-full rounded-t-3xl object-cover sm:h-72"
              />

              <button
                type="button"
                onClick={() =>
                  setSelectedOpportunity(null)
                }
                aria-label="Close preview"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-slate-950"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    statusStyles[
                      selectedOpportunity.status
                    ] || statusStyles.draft
                  }`}
                >
                  {formatStatus(
                    selectedOpportunity.status,
                  )}
                </span>

                <span className="text-sm font-semibold text-indigo-600">
                  {formatStatus(
                    selectedOpportunity.category,
                  )}
                </span>
              </div>

              <h2
                id="opportunity-preview-title"
                className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl"
              >
                {selectedOpportunity.title}
              </h2>

              <p className="mt-2 text-slate-500">
                {
                  selectedOpportunity.providerName
                }
              </p>

              <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-500">
                    Deadline
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {formatDate(
                      selectedOpportunity.deadline,
                    )}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-500">
                    Funding
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {formatCurrency(
                      selectedOpportunity
                        .funding?.amount,
                      selectedOpportunity
                        .funding?.currency,
                    )}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-500">
                    Funding type
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {formatStatus(
                      selectedOpportunity
                        .funding?.type,
                    )}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-500">
                    Last updated
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {formatDate(
                      selectedOpportunity.updatedAt,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-slate-950">
                  Short description
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {
                    selectedOpportunity.shortDescription
                  }
                </p>
              </div>

              {selectedOpportunity.fullDescription ? (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-950">
                    Full description
                  </h3>

                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {
                      selectedOpportunity.fullDescription
                    }
                  </p>
                </div>
              ) : null}

              {selectedOpportunity.status ===
                "rejected" &&
              selectedOpportunity.moderation
                ?.rejectionReason ? (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <strong>
                    Rejection reason:
                  </strong>{" "}
                  {
                    selectedOpportunity
                      .moderation
                      .rejectionReason
                  }
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedOpportunity(null)
                  }
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700"
                >
                  Close
                </button>

                {selectedOpportunity.status ===
                "published" ? (
                  <Link
                    href={`/opportunities/${selectedOpportunity.slug}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View live page
                  </Link>
                ) : (
                  <Link
                    href={`/items/edit/${selectedOpportunity._id}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit opportunity
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}