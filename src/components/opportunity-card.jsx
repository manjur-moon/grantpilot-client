import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";

import {
  formatCurrency,
  formatDate,
  formatStatus,
} from "@/lib/formatters";

export default function OpportunityCard({
  opportunity,
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="relative overflow-hidden">
        <img
          src={opportunity.coverImage}
          alt={opportunity.title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-indigo-700 shadow-sm backdrop-blur">
            {formatStatus(opportunity.category)}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/35 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {opportunity.providerName}
        </p>

        <h2 className="mt-2 line-clamp-2 text-lg font-black leading-7 text-slate-950 transition group-hover:text-indigo-700">
          {opportunity.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {opportunity.shortDescription}
        </p>

        <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CircleDollarSign className="h-4 w-4" />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Funding
              </p>

              <p className="truncate text-sm font-bold text-slate-800">
                {formatCurrency(
                  opportunity.funding?.amount,
                  opportunity.funding?.currency,
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <CalendarDays className="h-4 w-4" />
            </span>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Deadline
              </p>

              <p className="text-sm font-bold text-slate-800">
                {formatDate(opportunity.deadline)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={`/opportunities/${opportunity.slug}`}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-bold text-white shadow-md shadow-indigo-100 transition hover:shadow-lg"
          >
            View details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}