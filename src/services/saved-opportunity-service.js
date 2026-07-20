import { apiClient } from "@/lib/api-client";

export const getSavedOpportunityStatus = (
  opportunityId,
  { signal } = {},
) =>
  apiClient(
    `/api/v1/saved-opportunities/check/${opportunityId}`,
    { signal },
  ).then((response) => response.data);

export const saveOpportunity = (opportunityId) =>
  apiClient(
    `/api/v1/saved-opportunities/${opportunityId}`,
    {
      method: "POST",
    },
  ).then((response) => response.data);

export const unsaveOpportunity = (opportunityId) =>
  apiClient(
    `/api/v1/saved-opportunities/${opportunityId}`,
    {
      method: "DELETE",
    },
  ).then((response) => response.data);

export const getSavedOpportunities = ({ signal } = {}) =>
  apiClient("/api/v1/saved-opportunities", {
    signal,
  }).then((response) => response.data);