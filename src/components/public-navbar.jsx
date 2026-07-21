"use client";

import Link from "next/link";
import {
  ChevronRight,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { logoutUser } from "@/lib/auth-service";

const links = [
  ["Home", "/"],
  ["Opportunities", "/opportunities"],
  ["Resources", "/resources"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logoutUser();
      setOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="container-page py-3">
          <div className="flex min-h-[72px] items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur xl:px-5">
            <Link
              href="/"
              aria-label="GrantPilot AI home"
              className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
                <Sparkles className="h-5 w-5" />
              </span>

              <span>
                <span className="block text-base font-extrabold tracking-tight text-slate-950">
                  GrantPilot AI
                </span>
                <span className="block text-xs font-medium text-slate-500">
                  Funding intelligence
                </span>
              </span>
            </Link>

            <nav
              aria-label="Primary navigation"
              className="mx-6 hidden flex-1 justify-center lg:flex"
            >
              <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 p-1.5 shadow-inner">
                {links.map(([label, href]) => {
                  const active = isActive(href);

                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100",
                        active
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-slate-600 hover:bg-white hover:text-slate-950",
                      ].join(" ")}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="h-11 w-24 animate-pulse rounded-xl bg-slate-100" />
                  <div className="h-11 w-28 animate-pulse rounded-xl bg-slate-100" />
                </div>
              ) : isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px] hover:shadow-xl hover:shadow-indigo-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    disabled={isLoggingOut}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-5 text-sm font-bold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100"
                  >
                    <LogIn className="h-4 w-4" />
                    Log in
                  </Link>

                  <Link
                    href="/register"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px] hover:shadow-xl hover:shadow-indigo-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
              className="ml-4 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
          />

          <aside className="absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl font-bold"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <span className="block text-sm font-extrabold text-slate-950">
                    GrantPilot AI
                  </span>
                  <span className="block text-xs text-slate-500">
                    Funding intelligence
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 space-y-2">
              {links.map(([label, href]) => {
                const active = isActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition",
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    <span>{label}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-950">
                Discover better funding matches
              </p>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                Explore opportunities, organize documents and manage
                your application workflow from one place.
              </p>
            </div>

            <div className="mt-auto border-t border-slate-200 pt-6">
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
                  <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    href="/dashboard"
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    disabled={isLoggingOut}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-5 text-sm font-bold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50"
                  >
                    <LogIn className="h-4 w-4" />
                    Log in
                  </Link>

                  <Link
                    href="/register"
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}