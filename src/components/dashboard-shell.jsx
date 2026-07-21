"use client";

import Link from "next/link";
import {
  Bookmark,
  Bot,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";
import { logoutUser } from "@/lib/auth-service";

const userLinks = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Profile", "/profile", UserRound],
  ["Saved", "/saved", Bookmark],
  ["Applications", "/applications", ClipboardList],
  ["Documents", "/documents", FileText],
  ["Recommendations", "/recommendations", Sparkles],
  ["Assistant", "/assistant", Bot],
  ["Billing", "/billing", CreditCard],
  ["Submit Opportunity", "/items/add", PlusCircle],
  ["Manage Opportunities", "/items/manage", ListChecks],
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    isAdmin,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      const redirectPath =
        pathname || "/dashboard";

      router.replace(
        `/login?redirect=${encodeURIComponent(
          redirectPath,
        )}`,
      );
    }
  }, [isLoading, user, pathname, router]);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  const links = isAdmin
    ? [
        ...userLinks,
        ["Admin", "/admin", ShieldCheck],
      ]
    : userLinks;

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[270px_1fr]">
      <aside className="border-r border-slate-800 bg-slate-950 p-4 text-white">
        <Link
          href="/"
          className="block rounded-xl px-3 py-4 text-xl font-black"
        >
          GrantPilot AI
        </Link>

        <nav className="mt-4 grid gap-1">
          {links.map(([label, href, Icon]) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={
                  active ? "page" : undefined
                }
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  size={18}
                />

                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut
            aria-hidden="true"
            size={18}
          />

          Log out
        </button>
      </aside>

      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}