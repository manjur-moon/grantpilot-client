import { apiClient } from "@/lib/api-client";

export const getOpportunities = (filters = {}, signal) =>
  apiClient("/api/v1/opportunities", {
    query: filters,
    signal,
  });

export const getOpportunityFilterOptions = ({ signal } = {}) =>
  apiClient("/api/v1/opportunities/filter-options", { signal }).then(
    (response) => response.data
  );

export const getOpportunity = (slug) =>
  apiClient(`/api/v1/opportunities/${slug}`).then((response) => response.data);

export const getMyOpportunities = ({ signal } = {}) =>
  apiClient("/api/v1/opportunities/mine", { signal }).then(
    (response) => response.data
  );

export const getMyOpportunityById = (id, { signal } = {}) =>
  apiClient(`/api/v1/opportunities/mine/${id}`, { signal }).then(
    (response) => response.data
  );

export const createOpportunity = (body) =>
  apiClient("/api/v1/opportunities", {
    method: "POST",
    body,
  }).then((response) => response.data);

export const updateOpportunity = ({ id, body }) =>
  apiClient(`/api/v1/opportunities/mine/${id}`, {
    method: "PATCH",
    body,
  }).then((response) => response.data);

export const deleteOpportunity = (id) =>
  apiClient(`/api/v1/opportunities/mine/${id}`, {
    method: "DELETE",
  });

export const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  return apiClient("/api/v1/uploads/images", {
    method: "POST",
    body: formData,
  }).then((response) => response.data);
};
