"use client";

import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  LoaderCircle,
  Settings2,
} from "lucide-react";
import { useEffect, useState } from "react";

import PageHeader from "@/components/page-header";
import { formatCurrency, formatDate } from "@/lib/formatters";
import {
  createCheckout,
  createPortal,
  getBillingPlans,
  getPayments,
  getSubscription,
} from "@/services/billing-service";

const usageLabels = {
  aiMatchesUsed: "AI opportunity matches",
  documentAnalysesUsed: "Document analyses",
  strategyRunsUsed: "Application strategies",
  chatMessagesUsed: "AI assistant messages",
};

export default function BillingPage() {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  const loadBilling = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const [subscriptionData, planData, paymentData] =
        await Promise.all([
          getSubscription(),
          getBillingPlans(),
          getPayments(),
        ]);

      setSubscription(subscriptionData);
      setPlans(planData);
      setPayments(paymentData);
    } catch (error) {
      setErrorMessage(
        error.message || "Billing information could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBilling();

    const searchParams = new URLSearchParams(
      window.location.search
    );

    if (searchParams.get("checkout") === "cancelled") {
      setNotice(
        "Checkout was cancelled. Your current plan was not changed."
      );
    }
  }, []);

  const startCheckout = async (billingCycle) => {
    setPendingAction(billingCycle);
    setErrorMessage("");

    try {
      const result = await createCheckout(billingCycle);
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setErrorMessage(
        error.message || "Checkout could not be started."
      );
      setPendingAction("");
    }
  };

  const openPortal = async () => {
    setPendingAction("portal");
    setErrorMessage("");

    try {
      const result = await createPortal();
      window.location.assign(result.portalUrl);
    } catch (error) {
      setErrorMessage(
        error.message || "Billing portal could not be opened."
      );
      setPendingAction("");
    }
  };

  const billingConfigured = Boolean(
    plans?.billingConfigured && subscription?.billingConfigured
  );

  return (
    <div>
      <PageHeader
        eyebrow="Subscription"
        title="Billing and Usage"
      />

      {notice && (
        <div className="mb-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {notice}
        </div>
      )}

      {errorMessage && (
        <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="card flex min-h-64 items-center justify-center p-6">
          <LoaderCircle className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <>
          {!billingConfigured && (
            <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
              Stripe credentials are not configured yet. You can review
              this billing design locally, but upgrade and portal buttons
              will remain disabled until the Stripe environment variables
              are added.
            </div>
          )}

          {subscription && (
            <section className="card p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">
                    Current plan
                  </p>

                  <h2 className="mt-2 text-2xl font-bold capitalize">
                    {subscription.plan} plan
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Status: {subscription.status}
                    {subscription.currentPeriodEnd
                      ? ` · Period ends ${formatDate(
                          subscription.currentPeriodEnd
                        )}`
                      : ""}
                  </p>

                  {subscription.cancelAtPeriodEnd && (
                    <p className="mt-2 text-sm font-semibold text-amber-700">
                      Cancellation is scheduled at the end of this
                      billing period.
                    </p>
                  )}
                </div>

                {subscription.hasProAccess && (
                  <button
                    type="button"
                    onClick={openPortal}
                    disabled={
                      !billingConfigured || pendingAction === "portal"
                    }
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pendingAction === "portal" ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Settings2 className="h-4 w-4" />
                    )}
                    Manage subscription
                  </button>
                )}
              </div>

              {!subscription.hasProAccess && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => startCheckout("monthly")}
                    disabled={
                      !billingConfigured || Boolean(pendingAction)
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pendingAction === "monthly" && (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    Upgrade monthly
                  </button>

                  <button
                    type="button"
                    onClick={() => startCheckout("yearly")}
                    disabled={
                      !billingConfigured || Boolean(pendingAction)
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pendingAction === "yearly" && (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    Upgrade yearly
                  </button>
                </div>
              )}

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {Object.entries(subscription.limits || {}).map(
                  ([feature, limit]) => {
                    const used = subscription.usage?.[feature] || 0;
                    const percentage = Math.min(
                      (used / Math.max(limit, 1)) * 100,
                      100
                    );

                    return (
                      <div
                        key={feature}
                        className="rounded-xl bg-slate-50 p-4"
                      >
                        <div className="flex justify-between gap-3 text-sm">
                          <span className="font-semibold text-slate-700">
                            {usageLabels[feature] || feature}
                          </span>
                          <span className="text-slate-500">
                            {used} / {limit}
                          </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-indigo-600"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          )}

          <section className="card mt-6 p-6">
            <h2 className="text-xl font-bold">Invoice history</h2>

            {payments.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                No Stripe invoices have been synchronized yet.
              </p>
            ) : (
              <div className="mt-4 grid gap-3">
                {payments.map((payment) => (
                  <div
                    key={payment._id}
                    className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {payment.invoiceNumber ||
                          payment.stripeInvoiceId}
                      </p>
                      <p className="mt-1 text-xs capitalize text-slate-500">
                        {payment.status} · {formatDate(payment.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <strong>
                        {formatCurrency(
                          payment.amountPaid || payment.amountDue,
                          payment.currency
                        )}
                      </strong>

                      {payment.hostedInvoiceUrl && (
                        <a
                          href={payment.hostedInvoiceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-indigo-600"
                        >
                          View
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {subscription?.hasProAccess && (
            <div className="mt-6 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              Pro access is granted only when the synchronized Stripe
              subscription status is active or trialing.
            </div>
          )}
        </>
      )}
    </div>
  );
}
