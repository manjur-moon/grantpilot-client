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
  Sparkles,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  loginWithGoogle,
  registerWithEmail,
} from "@/lib/auth-service";

const benefits = [
  "Discover verified scholarships and grants",
  "Save and track funding opportunities",
  "Get AI-powered application guidance",
];

function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return {
      label: "Weak",
      width: "w-1/4",
      barClassName: "bg-red-500",
      textClassName: "text-red-600",
    };
  }

  if (score <= 3) {
    return {
      label: "Medium",
      width: "w-2/4",
      barClassName: "bg-amber-500",
      textClassName: "text-amber-600",
    };
  }

  if (score === 4) {
    return {
      label: "Good",
      width: "w-3/4",
      barClassName: "bg-blue-500",
      textClassName: "text-blue-600",
    };
  }

  return {
    label: "Strong",
    width: "w-full",
    barClassName: "bg-emerald-500",
    textClassName: "text-emerald-600",
  };
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const [error, setError] = useState("");

  const passwordStrength = useMemo(
    () => getPasswordStrength(form.password),
    [form.password],
  );

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  const getErrorMessage = (result, fallbackMessage) =>
    result?.error?.message ||
    result?.message ||
    fallbackMessage;

  const completeRegistration = () => {
    router.push("/dashboard");
    router.refresh();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loadingAction) {
      return;
    }

    const normalizedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    if (normalizedForm.name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (normalizedForm.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setError("");
    setLoadingAction("email");

    try {
      const result = await registerWithEmail(normalizedForm);

      if (result?.error) {
        setError(
          getErrorMessage(
            result,
            "Account could not be created.",
          ),
        );
        return;
      }

      completeRegistration();
    } catch (requestError) {
      setError(
        requestError.message ||
          "Account could not be created. Please try again.",
      );
    } finally {
      setLoadingAction("");
    }
  };

  const handleGoogleRegistration = async () => {
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
            "Google registration could not be started.",
          ),
        );

        setLoadingAction("");
      }
    } catch (requestError) {
      setError(
        requestError.message ||
          "Google registration could not be started.",
      );

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
                Start your journey
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight">
                Find the right funding opportunity for your
                future.
              </h1>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                Create your account to discover opportunities,
                manage applications and receive personalized
                guidance.
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
                New applicant
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Register with Google or create an account using
                your email address.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleRegistration}
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
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

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
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(event) =>
                      updateField(
                        "password",
                        event.target.value,
                      )
                    }
                    placeholder="Create a secure password"
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

                {form.password ? (
                  <div className="mt-3">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${passwordStrength.width} ${passwordStrength.barClassName}`}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500">
                        Use 8+ characters with letters, numbers
                        and symbols.
                      </span>

                      <span
                        className={`font-bold ${passwordStrength.textClassName}`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">
                    Password must contain at least 8 characters.
                  </p>
                )}
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 hover:text-indigo-800"
              >
                Log in
              </Link>
            </p>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              By creating an account, you agree to GrantPilot
              AI&apos;s{" "}
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