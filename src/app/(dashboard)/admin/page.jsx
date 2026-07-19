"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/page-header";
import { apiClient } from "@/lib/api-client";
import { formatStatus } from "@/lib/formatters";

const moderationStatuses = [
  ["pending_review", "Pending review"],
  ["published", "Published"],
  ["rejected", "Rejected"],
  ["archived", "Archived"]
];

export default function AdminPage() {
  const [overview, setOverview] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const load = async () => {
    setError("");

    try {
      const [overviewResponse, opportunitiesResponse] = await Promise.all([
        apiClient("/api/v1/admin/overview"),
        apiClient("/api/v1/admin/opportunities")
      ]);

      setOverview(overviewResponse.data);
      setOpportunities(opportunitiesResponse.data || []);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (opportunity, status) => {
    let rejectionReason = "";

    if (status === "rejected") {
      rejectionReason = window.prompt(
        "Explain why this opportunity is being rejected:",
        opportunity.moderation?.rejectionReason || ""
      )?.trim() || "";

      if (!rejectionReason) {
        return;
      }
    }

    setUpdatingId(opportunity._id);
    setError("");

    try {
      await apiClient(`/api/v1/admin/opportunities/${opportunity._id}/status`, {
        method: "PATCH",
        body: { status, rejectionReason }
      });

      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Admin Dashboard"
        description="Review submitted opportunities and publish only verified official sources."
      />

      {overview && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(overview).map(([key, value]) => (
            <div key={key} className="card p-5">
              <p className="text-sm text-slate-500">{formatStatus(key)}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="card mt-6 overflow-auto p-5">
        <h2 className="text-xl font-bold">Opportunity moderation</h2>

        <table className="mt-4 min-w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="p-3">Opportunity</th>
              <th className="p-3">Official source</th>
              <th className="p-3">Status</th>
              <th className="p-3">Moderate</th>
            </tr>
          </thead>

          <tbody>
            {opportunities.map((opportunity) => (
              <tr key={opportunity._id} className="border-t align-top">
                <td className="p-3">
                  <p className="font-semibold">{opportunity.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{opportunity.providerName}</p>
                  {opportunity.moderation?.rejectionReason && (
                    <p className="mt-2 max-w-md text-xs text-red-700">
                      Reason: {opportunity.moderation.rejectionReason}
                    </p>
                  )}
                </td>

                <td className="p-3">
                  <a
                    href={opportunity.officialSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Verify source
                  </a>
                </td>

                <td className="p-3">{formatStatus(opportunity.status)}</td>

                <td className="p-3">
                  <select
                    value={opportunity.status}
                    disabled={updatingId === opportunity._id}
                    onChange={(event) => updateStatus(opportunity, event.target.value)}
                    className="rounded-lg border p-2 disabled:opacity-60"
                    aria-label={`Moderate ${opportunity.title}`}
                  >
                    {moderationStatuses.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
