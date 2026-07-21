"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
// import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  loginWithDemoAccount,
  loginWithEmail,
  loginWithGoogle,
} from "@/lib/auth-service";

const benefits = [
  "Discover verified funding opportunities",
  "Track applications from one dashboard",
  "Get AI-powered application guidance",
];

export default function LoginPage() {
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  const completeLogin = () => {
  const requestedRedirect =
    new URLSearchParams(window.location.search).get(
      "redirect",
    ) || "/dashboard";

  const safeRedirect =
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/dashboard";

  window.location.replace(safeRedirect);
};

  const getErrorMessage = (result, fallbackMessage) => {
    return (
      result?.error?.message ||
      result?.message ||
      fallbackMessage
    );
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();

    if (loadingAction) {
      return;
    }

    setError("");
    setLoadingAction("email");

    try {
      const result = await loginWithEmail({
        email: email.trim(),
        password,
      });

      if (result?.error) {
        setError(
          getErrorMessage(
            result,
            "Email or password is incorrect.",
          ),
        );
        return;
      }

      completeLogin();
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to log in. Please try again.",
      );
    } finally {
      setLoadingAction("");
    }
  };

  const handleGoogleLogin = async () => {
    if (loadingAction) {
      return;
    }

    setError("");
    setLoadingAction("google");

    try {
      const result = await loginWithGoogle();

      if (result?.error) {
        setError(
          getErrorMessage(
            result,
            "Google login could not be started.",
          ),
        );
        setLoadingAction("");
      }
    } catch (requestError) {
      setError(
        requestError.message ||
          "Google login could not be started.",
      );
      setLoadingAction("");
    }
  };

  const handleDemoLogin = async () => {
    if (loadingAction) {
      return;
    }

    setError("");
    setLoadingAction("demo");

    try {
      const result = await loginWithDemoAccount();

      if (result?.error) {
        setError(
          getErrorMessage(
            result,
            "Demo login could not be completed.",
          ),
        );
        return;
      }

      completeLogin();
    } catch (requestError) {
      setError(
        requestError.message ||
          "Demo login could not be completed.",
      );
    } finally {
      setLoadingAction("");
    }
  };

  const isSubmitting = Boolean(loadingAction);

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
                <Sparkles className="h-5 w-5" />
              </span>

              <span>
                <span className="block font-bold">
                  GrantPilot AI
                </span>
                <span className="block text-xs text-slate-400">
                  Funding intelligence
                </span>
              </span>
            </Link>

            <div className="mt-16 max-w-md">
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">
                Welcome back
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight">
                Continue building stronger funding
                applications.
              </h1>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                Sign in to manage saved opportunities,
                application progress, documents and AI-powered
                recommendations.
              </p>
            </div>
          </div>

          <div className="relative mt-12 space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 text-sm text-slate-200"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-300" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 sm:p-10 xl:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>

                <span className="font-bold text-slate-950">
                  GrantPilot AI
                </span>
              </Link>
            </div>

            <div className="mt-8 lg:mt-0">
              <p className="text-sm font-bold text-indigo-600">
                Account access
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Log in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your account details or continue with
                Google.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingAction === "google" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs font-bold">
                  G
                </span>
              )}

              {loadingAction === "google"
                ? "Connecting to Google..."
                : "Continue with Google"}
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Or use email
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form
              onSubmit={handleEmailLogin}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error ? (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                >
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingAction === "email" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Log in
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 text-sm font-bold text-amber-900 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingAction === "demo" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Opening demo account...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5" />
                  Log in with demo account
                </>
              )}
            </button>

            <p className="mt-7 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-indigo-600 hover:text-indigo-800"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to GrantPilot AI&apos;s{" "}
              <Link
                href="/terms"
                className="font-semibold text-slate-600 hover:text-indigo-600"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-semibold text-slate-600 hover:text-indigo-600"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}