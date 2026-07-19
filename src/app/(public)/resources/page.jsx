import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { resources } from "@/data/resources";

export const metadata = {
  title: "Application Resources",
  description:
    "Practical guides for scholarship discovery, document preparation and funding applications.",
};

export default function ResourcesPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-slate-950 py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">
            Application resources
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
            Practical preparation guides for funding applicants
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Review structured guidance for eligibility checks, documents,
            essays, references and application planning.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.slug}
              className="card flex h-full flex-col p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <BookOpen className="h-5 w-5" />
              </span>

              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-indigo-600">
                {resource.category}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">
                {resource.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {resource.excerpt}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  {resource.readMinutes} minute read
                </span>
                <Link
                  href={`/resources/${resource.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Read guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
