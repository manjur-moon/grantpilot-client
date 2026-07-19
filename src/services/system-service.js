import { apiClient } from "@/lib/api-client";

export const getAIStatus = () =>
  apiClient("/api/v1/ai-status").then((response) => response.data);
