"use client";

import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import { verifyCheckoutSession } from "@/services/billing-service";

export default function BillingSuccessClient({ sessionId }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const verifySession = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await verifyCheckoutSession(sessionId);
      setResult(data);
    } catch (error) {
      setErrorMessage(
        error.message || "Checkout verification could not be completed."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifySession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="card mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center p-10 text-center">
        <LoaderCircle className="h-10 w-10 animate-spin text-indigo-600" />
        <h1 className="mt-5 text-2xl font-bold">
          Verifying your Stripe checkout
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          The Checkout Session and subscription ownership are being
          verified with Stripe.
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
        <h1 className="mt-5 text-2xl font-bold">
          Checkout verification failed
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {errorMessage}
        </p>
        <button
          type="button"
          onClick={verifySession}
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const hasProAccess = result?.subscription?.hasProAccess;

  return (
    <div className="card mx-auto max-w-xl p-10 text-center">
      {hasProAccess ? (
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
      ) : (
        <Clock3 className="mx-auto h-14 w-14 text-amber-600" />
      )}

      <h1 className="mt-5 text-3xl font-bold">
        {hasProAccess
          ? "Subscription activated"
          : "Checkout completed — synchronization pending"}
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        {hasProAccess
          ? "Stripe confirmed an active or trialing subscription for your account."
          : `The Checkout Session is ${
              result?.session?.status || "being processed"
            }, but Pro access will only activate after Stripe reports an active or trialing subscription.`}
      </p>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-600">
        <p>
          Checkout status: <strong>{result?.session?.status}</strong>
        </p>
        <p className="mt-1">
          Payment status: <strong>{result?.session?.paymentStatus}</strong>
        </p>
        <p className="mt-1">
          Subscription status:{" "}
          <strong>{result?.subscription?.status}</strong>
        </p>
      </div>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/billing"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white"
        >
          View billing
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
