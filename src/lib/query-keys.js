export const queryKeys = {
  opportunities: {
    all: ["opportunities"],

    lists: () => ["opportunities", "list"],

    list: (filters = {}) => [
      "opportunities",
      "list",
      {
        search: filters.search?.trim() || "",
        category: filters.category || "",
        educationLevel: filters.educationLevel || "",
        fundingType: filters.fundingType || "",
        country: filters.country || "",
        nationality: filters.nationality || "",
        fieldOfStudy: filters.fieldOfStudy || "",
        deadlineTo: filters.deadlineTo || "",
        minFunding: filters.minFunding || "",
        maxFunding: filters.maxFunding || "",
        sort: filters.sort || "deadline-nearest",
        page: Number(filters.page) || 1,
        limit: Number(filters.limit) || 12,
      },
    ],

    filterOptions: () => [
      "opportunities",
      "filter-options",
    ],

    details: () => [
      "opportunities",
      "detail",
    ],

    detail: (identifier) => [
      "opportunities",
      "detail",
      identifier,
    ],
  },

  applications: {
    all: ["applications"],

    list: () => [
      "applications",
      "list",
    ],

    detail: (applicationId) => [
      "applications",
      "detail",
      applicationId,
    ],
  },

  savedOpportunities: {
    all: ["saved-opportunities"],

    list: () => [
      "saved-opportunities",
      "list",
    ],

    status: (opportunityId) => [
      "saved-opportunities",
      "status",
      opportunityId,
    ],
  },
};