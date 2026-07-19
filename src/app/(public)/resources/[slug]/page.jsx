import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { getResourceBySlug, resources } from "@/data/resources";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return { title: "Resource Not Found" };
  }

  return {
    title: resource.title,
    description: resource.excerpt,
  };
}

export default async function ResourceDetailsPage({ params }) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" />
          All resources
        </Link>

        <header className="mt-8 rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">
            {resource.category}
          </p>
          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">
            {resource.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            {resource.excerpt}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-400">
            <Clock3 className="h-4 w-4" />
            {resource.readMinutes} minute read
          </p>
        </header>

        <div className="mt-8 space-y-6">
          {resource.sections.map((section) => (
            <section key={section.title} className="card p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
          Always confirm requirements, deadlines and document rules through the
          official funding provider.
        </div>
      </article>
    </main>
  );
}
