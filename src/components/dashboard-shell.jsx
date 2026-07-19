"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const path = usePathname();
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!user) {
    router.replace(`/login?redirect=${encodeURIComponent(path)}`);
    return null;
  }

  const links = isAdmin ? [...userLinks, ["Admin", "/admin", ShieldCheck]] : userLinks;

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[270px_1fr]">
      <aside className="border-r bg-slate-950 p-4 text-white">
        <Link href="/" className="block px-3 py-4 text-xl font-bold">
          GrantPilot AI
        </Link>

        <nav className="mt-4 grid gap-1">
          {links.map(([label, href, Icon]) => {
            const active = path === href || path.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                  active ? "bg-indigo-600" : "text-slate-300 hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={async () => {
            await logoutUser();
            router.push("/");
          }}
          className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10"
        >
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
