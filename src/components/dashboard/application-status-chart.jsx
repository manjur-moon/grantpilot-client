"use client";

import { BarChart3 } from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const applicationStatuses = [
  {
    value: "planning",
    label: "Planning",
    color: "#6366f1",
  },
  {
    value: "in-progress",
    label: "In Progress",
    color: "#8b5cf6",
  },
  {
    value: "ready-for-review",
    label: "Ready for Review",
    color: "#0ea5e9",
  },
  {
    value: "submitted",
    label: "Submitted",
    color: "#f59e0b",
  },
  {
    value: "accepted",
    label: "Accepted",
    color: "#10b981",
  },
  {
    value: "rejected",
    label: "Rejected",
    color: "#ef4444",
  },
  {
    value: "withdrawn",
    label: "Withdrawn",
    color: "#64748b",
  },
];

function normalizeStatus(status = "") {
  return String(status)
    .trim()
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-");
}

function CustomTooltip({
  active,
  payload,
  label,
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <p className="text-xs font-bold text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-black text-slate-950">
        {payload[0].value}
      </p>

      <p className="text-xs text-slate-500">
        Applications
      </p>
    </div>
  );
}

export default function ApplicationStatusChart({
  applications = [],
}) {
  const chartData = useMemo(() => {
    const safeApplications = Array.isArray(
      applications,
    )
      ? applications
      : [];

    const statusCounts = safeApplications.reduce(
      (counts, application) => {
        const normalizedStatus = normalizeStatus(
          application?.status,
        );

        counts[normalizedStatus] =
          (counts[normalizedStatus] || 0) + 1;

        return counts;
      },
      {},
    );

    return applicationStatuses.map((status) => ({
      status: status.label,
      count: statusCounts[status.value] || 0,
      color: status.color,
    }));
  }, [applications]);

  const totalApplications = Array.isArray(
    applications,
  )
    ? applications.length
    : 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
            <BarChart3 className="h-6 w-6" />
          </span>

          <div>
            <p className="text-sm font-bold text-indigo-600">
              Application analytics
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
              Applications by status
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review the current stage of every application
              in your workspace.
            </p>
          </div>
        </div>

        <div className="w-fit rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Total
          </p>

          <p className="mt-1 text-2xl font-black text-slate-950">
            {totalApplications}
          </p>
        </div>
      </div>

      {totalApplications === 0 ? (
        <div className="mt-7 flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <div>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <BarChart3 className="h-6 w-6" />
            </span>

            <h3 className="mt-5 font-black text-slate-800">
              No application analytics yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Start an opportunity application to view
              status-based analytics here.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-7 h-[340px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -18,
                  bottom: 48,
                }}
              >
                <CartesianGrid
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  height={78}
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    fill: "#f8fafc",
                  }}
                />

                <Bar
                  dataKey="count"
                  radius={[10, 10, 0, 0]}
                  maxBarSize={54}
                >
                  {chartData.map((item) => (
                    <Cell
                      key={item.status}
                      fill={item.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
            {chartData.map((item) => (
              <div
                key={item.status}
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                {item.status}

                <strong className="text-slate-950">
                  {item.count}
                </strong>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}