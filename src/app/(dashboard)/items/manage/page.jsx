"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Edit3, ExternalLink, Plus, Search, Trash2 } from "lucide-react";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import { formatDate, formatStatus } from "@/lib/formatters";
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
      setError(requestError.message || "Your opportunities could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, []);

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const matchesSearch =
        !normalizedSearch ||
        opportunity.title.toLowerCase().includes(normalizedSearch) ||
        opportunity.providerName.toLowerCase().includes(normalizedSearch);
      const matchesStatus = !status || opportunity.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [opportunities, search, status]);

  const removeOpportunity = async (opportunity) => {
    const confirmed = window.confirm(
      `Delete “${opportunity.title}”? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(opportunity._id);
    setError("");

    try {
      await deleteOpportunity(opportunity._id);
      setOpportunities((current) =>
        current.filter((item) => item._id !== opportunity._id)
      );
    } catch (requestError) {
      setError(requestError.message || "The opportunity could not be deleted.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Opportunity workspace"
        title="Manage Opportunities"
        description="Review the moderation status of your submissions and edit or delete eligible records."
        action={
          <Link
            href="/items/add"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Submit opportunity
          </Link>
        }
      />

      <div className="card grid gap-3 p-4 md:grid-cols-[1fr_220px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your submissions"
            className="min-h-11 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm"
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="pending_review">Pending Review</option>
          <option value="published">Published</option>
          <option value="rejected">Rejected</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {error ? (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : null}

      {!loading && filteredOpportunities.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
          <EmptyState
            title="No opportunity submissions found"
            description="Submit a genuine opportunity or change the current search filters."
          />
        </div>
      ) : null}

      {!loading && filteredOpportunities.length > 0 ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {filteredOpportunities.map((opportunity) => {
            const canModify = opportunity.status !== "published";

            return (
              <article
                key={opportunity._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="grid sm:grid-cols-[180px_1fr]">
                  <img
                    src={opportunity.coverImage}
                    alt={opportunity.title}
                    className="h-48 w-full object-cover sm:h-full"
                  />

                  <div className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          statusStyles[opportunity.status] || statusStyles.draft
                        }`}
                      >
                        {formatStatus(opportunity.status)}
                      </span>

                      <span className="text-xs text-slate-500">
                        Updated {formatDate(opportunity.updatedAt)}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-slate-950">
                      {opportunity.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {opportunity.providerName}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                      {opportunity.shortDescription}
                    </p>

                    {opportunity.status === "rejected" &&
                    opportunity.moderation?.rejectionReason ? (
                      <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                        <strong>Rejection reason:</strong>{" "}
                        {opportunity.moderation.rejectionReason}
                      </div>
                    ) : null}

                    {opportunity.status === "published" ? (
                      <p className="mt-4 text-xs leading-5 text-slate-500">
                        Published records are locked for submitters. Contact an administrator to request a change.
                      </p>
                    ) : null}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {opportunity.status === "published" ? (
                        <Link
                          href={`/opportunities/${opportunity.slug}`}
                          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View live page
                        </Link>
                      ) : null}

                      <Link
                        href={`/items/edit/${opportunity._id}`}
                        aria-disabled={!canModify}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${
                          canModify
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "pointer-events-none bg-slate-200 text-slate-500"
                        }`}
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Link>

                      <button
                        type="button"
                        disabled={!canModify || deletingId === opportunity._id}
                        onClick={() => removeOpportunity(opportunity)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        {deletingId === opportunity._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
