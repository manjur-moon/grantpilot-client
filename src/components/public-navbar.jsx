"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut, Menu, Sparkles, X } from "lucide-react";
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
    await logoutUser();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-18 items-center">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-bold text-slate-950">GrantPilot AI</span>
            <span className="block text-xs text-slate-500">
              Funding intelligence
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={[
                "rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                isActive(href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-4 hidden items-center gap-2 lg:flex">
          {!isLoading &&
            (isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl border border-slate-300 p-3 text-slate-600 hover:bg-slate-50 hover:text-red-600"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </>
            ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ml-auto rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
            aria-label="Close navigation"
          />

          <div className="absolute right-0 top-0 h-full w-[min(86vw,360px)] bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 font-bold">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                GrantPilot AI
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 space-y-2">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "block rounded-xl px-4 py-3 text-sm font-semibold",
                    isActive(href)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t border-slate-200 pt-6">
              {!isLoading &&
                (isAuthenticated ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      className="flex min-h-12 items-center justify-center rounded-xl border border-slate-300 text-sm font-semibold text-slate-700"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white"
                    >
                      Register
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
