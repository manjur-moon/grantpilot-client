"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import OpportunityForm from "@/components/opportunities/opportunity-form";
import PageHeader from "@/components/page-header";
import {
  getMyOpportunityById,
  updateOpportunity,
} from "@/services/opportunity-service";

export default function EditOpportunityPage() {
  const params = useParams();
  const router = useRouter();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadOpportunity = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMyOpportunityById(params.id, {
          signal: controller.signal,
        });
        setOpportunity(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Opportunity could not be loaded.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadOpportunity();

    return () => controller.abort();
  }, [params.id]);

  const submitUpdate = async (payload) => {
    await updateOpportunity({ id: params.id, body: payload });
    router.push("/items/manage?updated=true");
    router.refresh();
  };

  if (loading) {
    return <div className="h-[700px] animate-pulse rounded-2xl bg-white" />;
  }

  if (error || !opportunity) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-950">Opportunity unavailable</h1>
        <p className="mt-3 text-sm text-red-700">{error || "Opportunity was not found."}</p>
        <Link
          href="/items/manage"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to submissions
        </Link>
      </div>
    );
  }

  if (opportunity.status === "published") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-950">Published opportunity is locked</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Submitters cannot edit a published opportunity. Contact an administrator when an official detail changes.
        </p>
        <Link
          href="/items/manage"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to submissions
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Opportunity workspace"
        title="Edit Opportunity"
        description="Any change will return this opportunity to the admin review queue."
        action={
          <Link
            href="/items/manage"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Manage submissions
          </Link>
        }
      />

      <OpportunityForm
        initialOpportunity={opportunity}
        onSubmit={submitUpdate}
        submitLabel="Save and resubmit"
      />
    </div>
  );
}
