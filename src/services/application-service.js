import { apiClient } from "@/lib/api-client";

export const getApplications = ({ signal } = {}) =>
  apiClient("/api/v1/applications", {
    signal,
  }).then((response) => response.data);

export const getApplication = (
  applicationId,
  { signal } = {},
) =>
  apiClient(
    `/api/v1/applications/${applicationId}`,
    {
      signal,
    },
  ).then((response) => response.data);

export const createApplication = (opportunityId) =>
  apiClient("/api/v1/applications", {
    method: "POST",
    body: {
      opportunityId,
    },
  }).then((response) => response.data);

export const updateApplication = (
  applicationId,
  body,
) =>
  apiClient(
    `/api/v1/applications/${applicationId}`,
    {
      method: "PATCH",
      body,
    },
  ).then((response) => response.data);

export const updateStatus = (
  applicationId,
  status,
) =>
  apiClient(
    `/api/v1/applications/${applicationId}/status`,
    {
      method: "PATCH",
      body: {
        status,
      },
    },
  ).then((response) => response.data);

export const createTask = (
  applicationId,
  body,
) =>
  apiClient(
    `/api/v1/applications/${applicationId}/tasks`,
    {
      method: "POST",
      body,
    },
  ).then((response) => response.data);

export const updateTask = (
  applicationId,
  taskId,
  body,
) =>
  apiClient(
    `/api/v1/applications/${applicationId}/tasks/${taskId}`,
    {
      method: "PATCH",
      body,
    },
  ).then((response) => response.data);

export const generateStrategy = (
  applicationId,
) =>
  apiClient(
    `/api/v1/applications/${applicationId}/strategy`,
    {
      method: "POST",
    },
  ).then((response) => response.data);