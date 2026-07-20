"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const applicationStatuses = [
  {
    value: "planning",
    label: "Planning",
  },
  {
    value: "in-progress",
    label: "In Progress",
  },
  {
    value: "ready-for-review",
    label: "Ready for Review",
  },
  {
    value: "submitted",
    label: "Submitted",
  },
  {
    value: "accepted",
    label: "Accepted",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "withdrawn",
    label: "Withdrawn",
  },
];

function normalizeStatus(status = "") {
  return String(status)
    .trim()
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-");
}

export default function ApplicationStatusChart({
  applications = [],
}) {
  const chartData = useMemo(() => {
    const statusCounts = applications.reduce(
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
    }));
  }, [applications]);

  const totalApplications = applications.length;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-bold text-indigo-600">
          Application analytics
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Applications by status
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Track how your funding applications are progressing.
        </p>
      </div>

      {totalApplications === 0 ? (
        <div className="mt-6 flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <div>
            <p className="font-bold text-slate-700">
              No application data yet
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Start an opportunity application to see status
              analytics here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 45,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="status"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={75}
                tick={{
                  fontSize: 11,
                }}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  value,
                  "Applications",
                ]}
                labelFormatter={(label) =>
                  `Status: ${label}`
                }
              />

              <Bar
                dataKey="count"
                name="Applications"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
                maxBarSize={52}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}