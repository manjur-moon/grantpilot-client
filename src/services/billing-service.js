import { apiClient } from "@/lib/api-client";

const createRequestKey = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `checkout_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}`;
};

export const getBillingPlans = () => {
  return apiClient("/api/v1/subscriptions/plans").then(
    (response) => response.data
  );
};

export const getSubscription = () => {
  return apiClient("/api/v1/subscriptions/me").then(
    (response) => response.data
  );
};

export const createCheckout = (billingCycle) => {
  return apiClient("/api/v1/payments/checkout-session", {
    method: "POST",
    body: {
      billingCycle,
      requestKey: createRequestKey(),
    },
  }).then((response) => response.data);
};

export const createPortal = () => {
  return apiClient("/api/v1/payments/customer-portal", {
    method: "POST",
  }).then((response) => response.data);
};

export const verifyCheckoutSession = (sessionId) => {
  return apiClient(
    `/api/v1/payments/checkout-session/${encodeURIComponent(
      sessionId
    )}`
  ).then((response) => response.data);
};

export const getPayments = () => {
  return apiClient("/api/v1/payments/history").then(
    (response) => response.data
  );
};
