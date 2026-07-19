"use client";

import { useRouter } from "next/navigation";

import OpportunityForm from "@/components/opportunities/opportunity-form";
import PageHeader from "@/components/page-header";
import { createOpportunity } from "@/services/opportunity-service";

export default function AddOpportunityPage() {
  const router = useRouter();

  const submitOpportunity = async (payload) => {
    await createOpportunity(payload);
    router.push("/items/manage?created=true");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Community submission"
        title="Submit Opportunity"
        description="Submit only genuine funding opportunities with an official provider source. Every submission requires admin approval."
      />

      <OpportunityForm onSubmit={submitOpportunity} submitLabel="Submit for review" />
    </div>
  );
}
