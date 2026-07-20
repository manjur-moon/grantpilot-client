"use client";

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import {
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

import OpportunityCard from "@/components/opportunity-card";
import {
  educationLevels,
  fundingTypes,
  opportunityCategories,
  opportunitySortOptions,
} from "@/constants/opportunity-options";
import { queryKeys } from "@/lib/query-keys";
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
  "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export default function OpportunitiesPage() {
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filterOptionsQuery = useQuery({
    queryKey: queryKeys.opportunities.filterOptions(),
    queryFn: ({ signal }) =>
      getOpportunityFilterOptions({ signal }),
    staleTime: 10 * 60 * 1000,
  });

  const opportunitiesQuery = useQuery({
    queryKey: queryKeys.opportunities.list(appliedFilters),
    queryFn: ({ signal }) =>
      getOpportunities(appliedFilters, signal),
    placeholderData: keepPreviousData,
  });

  const options = filterOptionsQuery.data || {
    countries: [],
    nationalities: [],
    fieldsOfStudy: [],
  };

  const data = opportunitiesQuery.data?.data || [];
  const meta = opportunitiesQuery.data?.meta || {};

  const loading = opportunitiesQuery.isPending;
  const updating =
    opportunitiesQuery.isFetching &&
    !opportunitiesQuery.isPending;

  const error = opportunitiesQuery.error
    ? opportunitiesQuery.error.message ||
      "Opportunities could not be loaded."
    : "";

  const updateDraftFilter = (field, value) => {
    setDraftFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const applyFilters = (event) => {
    event.preventDefault();

    const nextFilters = {
      ...draftFilters,
      search: draftFilters.search.trim(),
      page: 1,
    };

    setDraftFilters(nextFilters);
    setAppliedFilters(nextFilters);
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
    <main className="container-page py-12 sm:py-16">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-bold text-indigo-600">
            Verified funding
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-950">
            Explore Opportunities
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Search published scholarships, fellowships,
            competitions and research grants using eligibility
            and funding filters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setFiltersOpen((current) => !current)
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>

          <select
            value={appliedFilters.sort}
            onChange={(event) =>
              changeSort(event.target.value)
            }
            className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700"
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
        </div>
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-[290px_1fr]">
        <aside
          className={`${
            filtersOpen ? "block" : "hidden"
          } lg:block`}
        >
          <form
            onSubmit={applyFilters}
            className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-indigo-600" />

                <h2 className="font-bold text-slate-950">
                  Filter opportunities
                </h2>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Search
                </label>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
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
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                    All levels
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
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
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
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white hover:bg-indigo-700"
            >
              <Search className="h-4 w-4" />
              Apply filters
            </button>
          </form>
        </aside>

        <section>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              {loading
                ? "Loading opportunities..."
                : updating
                  ? "Updating opportunities..."
                  : `${meta.total || 0} opportunities found`}
            </p>

            {meta.page ? (
              <p className="text-xs text-slate-400">
                Page {meta.page} of {meta.totalPages}
              </p>
            ) : null}
          </div>

          {error ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{error}</p>

              <button
                type="button"
                onClick={() =>
                  opportunitiesQuery.refetch()
                }
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white"
              >
                Try again
              </button>
            </div>
          ) : null}

          {loading ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-[420px] animate-pulse rounded-2xl bg-white"
                  />
                ),
              )}
            </div>
          ) : null}

          {!loading &&
          !error &&
          data.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <h2 className="text-xl font-bold text-slate-950">
                No matching opportunities
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing the country, education,
                funding or deadline filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
              >
                Reset filters
              </button>
            </div>
          ) : null}

          {!loading && data.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {data.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          ) : null}

          {meta.totalPages > 1 ? (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                disabled={
                  !meta.hasPreviousPage ||
                  opportunitiesQuery.isFetching
                }
                onClick={() =>
                  changePage(meta.page - 1)
                }
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: meta.totalPages },
                (_, index) => index + 1,
              )
                .filter(
                  (page) =>
                    page === 1 ||
                    page === meta.totalPages ||
                    Math.abs(page - meta.page) <= 1,
                )
                .map((page) => (
                  <button
                    key={page}
                    type="button"
                    disabled={
                      opportunitiesQuery.isFetching
                    }
                    onClick={() => changePage(page)}
                    className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50 ${
                      page === meta.page
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                type="button"
                disabled={
                  !meta.hasNextPage ||
                  opportunitiesQuery.isFetching
                }
                onClick={() =>
                  changePage(meta.page + 1)
                }
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}