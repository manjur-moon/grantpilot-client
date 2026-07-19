import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/lib/api-client";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("apiClient", () => {
  it("adds non-empty query parameters and includes credentials", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] })
    });
    vi.stubGlobal("fetch", fetchMock);

    await apiClient("/api/v1/opportunities", {
      query: { search: "robotics", page: 2, category: "" }
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/opportunities?search=robotics&page=2",
      expect.objectContaining({
        method: "GET",
        credentials: "include"
      })
    );
  });

  it("serializes JSON request bodies", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });
    vi.stubGlobal("fetch", fetchMock);

    await apiClient("/api/v1/profile/me", {
      method: "PATCH",
      body: { fullName: "Demo Applicant" }
    });

    const options = fetchMock.mock.calls[0][1];
    expect(options.headers["Content-Type"]).toBe("application/json");
    expect(options.body).toBe(JSON.stringify({ fullName: "Demo Applicant" }));
  });

  it("does not force a JSON content type for FormData", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });
    vi.stubGlobal("fetch", fetchMock);

    const formData = new FormData();
    formData.append("documentType", "cv");

    await apiClient("/api/v1/documents", {
      method: "POST",
      body: formData
    });

    const options = fetchMock.mock.calls[0][1];
    expect(options.headers["Content-Type"]).toBeUndefined();
    expect(options.body).toBe(formData);
  });

  it("throws the API error message for failed responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => ({ message: "Request validation failed." })
      })
    );

    await expect(apiClient("/api/v1/test")).rejects.toThrow(
      "Request validation failed."
    );
  });
});
