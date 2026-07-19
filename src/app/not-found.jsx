import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
          <SearchX className="h-8 w-8" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          Page not found
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          The page may have been moved, removed or the address may be
          incorrect.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Return home
        </Link>
      </div>
    </main>
  );
}
