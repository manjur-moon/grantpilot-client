"use client";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import OpportunityCard from "@/components/opportunity-card";
import {
  educationLevels,
  fundingTypes,
  opportunityCategories,
  opportunitySortOptions,
} from "@/constants/opportunity-options";
import {
  getOpportunities,
  getOpportunityFilterOptions,
} from "@/services/opportunity-service";

const defaultFilters = {
  search: "",
  category: "",
  educationLevel: "",
  fundingType: "",
  country: "",
  nationality: "",
  fieldOfStudy: "",
  deadlineTo: "",
  minFunding: "",
  maxFunding: "",
  sort: "deadline-nearest",
  page: 1,
  limit: 12,
};

const inputClassName =
  "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const labelClassName =
  "mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500";

export default function OpportunitiesPage() {
  const [draftFilters, setDraftFilters] =
    useState(defaultFilters);

  const [appliedFilters, setAppliedFilters] =
    useState(defaultFilters);

  const [options, setOptions] = useState({
    countries: [],
    nationalities: [],
    fieldsOfStudy: [],
  });

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getOpportunityFilterOptions({
      signal: controller.signal,
    })
      .then((filterOptions) => {
        setOptions(
          filterOptions || {
            countries: [],
            nationalities: [],
            fieldsOfStudy: [],
          },
        );
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadOpportunities = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getOpportunities(
          appliedFilters,
          controller.signal,
        );

        setData(response.data || []);
        setMeta(response.meta || {});
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(
            requestError.message ||
              "Opportunities could not be loaded.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();

    return () => controller.abort();
  }, [appliedFilters]);

  const activeFilterCount = useMemo(() => {
    const ignoredFields = new Set([
      "page",
      "limit",
      "sort",
    ]);

    return Object.entries(appliedFilters).filter(
      ([field, value]) =>
        !ignoredFields.has(field) &&
        value !== "" &&
        value !== null &&
        value !== undefined,
    ).length;
  }, [appliedFilters]);

  const paginationItems = useMemo(() => {
    const totalPages = Number(meta.totalPages) || 0;
    const currentPage = Number(meta.page) || 1;

    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    const pages = [1];

    if (currentPage > 4) {
      pages.push("start-ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(
      totalPages - 1,
      currentPage + 1,
    );

    for (
      let page = startPage;
      page <= endPage;
      page += 1
    ) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push("end-ellipsis");
    }

    pages.push(totalPages);

    return pages;
  }, [meta.page, meta.totalPages]);

  const updateDraftFilter = (field, value) => {
    setDraftFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const applyFilters = (event) => {
    event.preventDefault();

    setAppliedFilters({
      ...draftFilters,
      search: draftFilters.search.trim(),
      page: 1,
    });

    setFiltersOpen(false);
  };

  const resetFilters = () => {
    setDraftFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setFiltersOpen(false);
  };

  const changePage = (page) => {
    setDraftFilters((current) => ({
      ...current,
      page,
    }));

    setAppliedFilters((current) => ({
      ...current,
      page,
    }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changeSort = (sort) => {
    setDraftFilters((current) => ({
      ...current,
      sort,
      page: 1,
    }));

    setAppliedFilters((current) => ({
      ...current,
      sort,
      page: 1,
    }));
  };

  return (
    <main className="min-h-screen bg-slate-50/70 pb-16">
      {/* Page heading */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-8 sm:py-10">
          <div className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-9 text-white sm:px-9 lg:px-12">
            <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-violet-700/25 blur-3xl" />

            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-200">
                  <Sparkles className="h-4 w-4" />
                  Verified funding opportunities
                </div>

                <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Explore opportunities built around your goals
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Search scholarships, fellowships,
                  competitions and research grants using
                  eligibility, education, funding and deadline
                  filters.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <p className="text-2xl font-black">
                    {loading ? "—" : meta.total || 0}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Opportunities
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <p className="text-2xl font-black">
                    {activeFilterCount}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Active filters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page pt-7">
        {/* Mobile filter trigger */}
        <button
          type="button"
          onClick={() =>
            setFiltersOpen((current) => !current)
          }
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />

          {filtersOpen ? "Hide filters" : "Show filters"}

          {activeFilterCount > 0 ? (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-indigo-600 px-2 text-xs text-white">
              {activeFilterCount}
            </span>
          ) : null}
        </button>

        <div className="mt-5 grid items-start gap-6 lg:mt-0 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Filters */}
          <aside
            className={`${
              filtersOpen ? "block" : "hidden"
            } lg:block`}
          >
            <form
              onSubmit={applyFilters}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                      <Filter className="h-4 w-4" />
                    </span>

                    <h2 className="font-bold text-slate-950">
                      Filter opportunities
                    </h2>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Refine results using your eligibility and
                    funding preferences.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-indigo-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="opportunity-search"
                    className={labelClassName}
                  >
                    Search
                  </label>

                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="opportunity-search"
                      value={draftFilters.search}
                      onChange={(event) =>
                        updateDraftFilter(
                          "search",
                          event.target.value,
                        )
                      }
                      placeholder="Title, provider or field"
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClassName}>
                    Category
                  </label>

                  <select
                    value={draftFilters.category}
                    onChange={(event) =>
                      updateDraftFilter(
                        "category",
                        event.target.value,
                      )
                    }
                    className={inputClassName}
                  >
                    <option value="">
                      All categories
                    </option>

                    {opportunityCategories.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>
                    Education level
                  </label>

                  <select
                    value={draftFilters.educationLevel}
                    onChange={(event) =>
                      updateDraftFilter(
                        "educationLevel",
                        event.target.value,
                      )
                    }
                    className={inputClassName}
                  >
                    <option value="">
                      All education levels
                    </option>

                    {educationLevels.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>
                    Funding type
                  </label>

                  <select
                    value={draftFilters.fundingType}
                    onChange={(event) =>
                      updateDraftFilter(
                        "fundingType",
                        event.target.value,
                      )
                    }
                    className={inputClassName}
                  >
                    <option value="">
                      All funding types
                    </option>

                    {fundingTypes.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>
                    Eligible country
                  </label>

                  <input
                    list="opportunity-countries"
                    value={draftFilters.country}
                    onChange={(event) =>
                      updateDraftFilter(
                        "country",
                        event.target.value,
                      )
                    }
                    className={inputClassName}
                    placeholder="Example: Bangladesh"
                  />

                  <datalist id="opportunity-countries">
                    {(options.countries || []).map(
                      (country) => (
                        <option
                          key={country}
                          value={country}
                        />
                      ),
                    )}
                  </datalist>
                </div>

                <div>
                  <label className={labelClassName}>
                    Eligible nationality
                  </label>

                  <input
                    list="opportunity-nationalities"
                    value={draftFilters.nationality}
                    onChange={(event) =>
                      updateDraftFilter(
                        "nationality",
                        event.target.value,
                      )
                    }
                    className={inputClassName}
                    placeholder="Example: Bangladeshi"
                  />

                  <datalist id="opportunity-nationalities">
                    {(options.nationalities || []).map(
                      (nationality) => (
                        <option
                          key={nationality}
                          value={nationality}
                        />
                      ),
                    )}
                  </datalist>
                </div>

                <div>
                  <label className={labelClassName}>
                    Field of study
                  </label>

                  <input
                    list="opportunity-fields"
                    value={draftFilters.fieldOfStudy}
                    onChange={(event) =>
                      updateDraftFilter(
                        "fieldOfStudy",
                        event.target.value,
                      )
                    }
                    className={inputClassName}
                    placeholder="Example: Computer Science"
                  />

                  <datalist id="opportunity-fields">
                    {(options.fieldsOfStudy || []).map(
                      (field) => (
                        <option
                          key={field}
                          value={field}
                        />
                      ),
                    )}
                  </datalist>
                </div>

                <div>
                  <label className={labelClassName}>
                    Deadline before
                  </label>

                  <input
                    type="date"
                    value={draftFilters.deadlineTo}
                    onChange={(event) =>
                      updateDraftFilter(
                        "deadlineTo",
                        event.target.value,
                      )
                    }
                    className={inputClassName}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClassName}>
                      Min funding
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={draftFilters.minFunding}
                      onChange={(event) =>
                        updateDraftFilter(
                          "minFunding",
                          event.target.value,
                        )
                      }
                      placeholder="0"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>
                      Max funding
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={draftFilters.maxFunding}
                      onChange={(event) =>
                        updateDraftFilter(
                          "maxFunding",
                          event.target.value,
                        )
                      }
                      placeholder="Any"
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Search className="h-4 w-4" />
                Apply filters
              </button>
            </form>
          </aside>

          {/* Results */}
          <section className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-slate-950">
                    {loading
                      ? "Finding opportunities..."
                      : `${meta.total || 0} opportunities found`}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {meta.page
                      ? `Page ${meta.page} of ${meta.totalPages}`
                      : "Results matching your current preferences"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activeFilterCount > 0 ? (
                    <span className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">
                      {activeFilterCount} active{" "}
                      {activeFilterCount === 1
                        ? "filter"
                        : "filters"}
                    </span>
                  ) : null}

                  <label className="flex items-center gap-2">
                    <span className="hidden text-xs font-bold uppercase tracking-wide text-slate-500 sm:inline">
                      Sort
                    </span>

                    <select
                      value={appliedFilters.sort}
                      onChange={(event) =>
                        changeSort(event.target.value)
                      }
                      className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    >
                      {opportunitySortOptions.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                <p className="font-bold">
                  Opportunities could not be loaded
                </p>

                <p className="mt-1">{error}</p>
              </div>
            ) : null}

            {loading ? (
              <div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 8 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                    >
                      <div className="h-48 animate-pulse bg-slate-200" />

                      <div className="space-y-4 p-5">
                        <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                        <div className="h-6 animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                        <div className="h-16 animate-pulse rounded bg-slate-100" />
                        <div className="h-11 animate-pulse rounded-xl bg-slate-200" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : null}

            {!loading && !error && data.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                  <Search className="h-6 w-6" />
                </span>

                <h2 className="mt-5 text-xl font-bold text-slate-950">
                  No matching opportunities
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try changing your country, education,
                  funding or deadline filters to discover more
                  results.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset filters
                </button>
              </div>
            ) : null}

            {!loading && data.length > 0 ? (
              <div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {data.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity._id}
                    opportunity={opportunity}
                  />
                ))}
              </div>
            ) : null}

            {meta.totalPages > 1 ? (
              <nav
                aria-label="Opportunity pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                <button
                  type="button"
                  disabled={!meta.hasPreviousPage}
                  onClick={() =>
                    changePage(meta.page - 1)
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </button>

                {paginationItems.map((item) =>
                  typeof item === "string" ? (
                    <span
                      key={item}
                      className="flex h-10 min-w-8 items-center justify-center text-slate-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => changePage(item)}
                      aria-current={
                        item === meta.page
                          ? "page"
                          : undefined
                      }
                      className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition ${
                        item === meta.page
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                          : "border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-700"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  disabled={!meta.hasNextPage}
                  onClick={() =>
                    changePage(meta.page + 1)
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">
                    Next
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}