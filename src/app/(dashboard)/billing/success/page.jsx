import BillingSuccessClient from "@/components/billing/billing-success-client";

export default async function BillingSuccessPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  if (!sessionId) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center">
        <h1 className="text-3xl font-bold text-red-700">
          Checkout Session missing
        </h1>
        <p className="mt-4 text-slate-600">
          Stripe did not provide a Checkout Session ID in this URL.
        </p>
      </div>
    );
  }

  return <BillingSuccessClient sessionId={sessionId} />;
}
