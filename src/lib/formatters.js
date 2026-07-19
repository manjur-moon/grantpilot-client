export const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(value)
      )
    : "Not available";

export const formatStatus = (value = "") =>
  String(value)
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const formatCurrency = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
