import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

const footerGroups = [
  {
    title: "Platform",
    links: [
      ["Opportunities", "/opportunities"],
      ["AI Recommendations", "/recommendations"],
      ["Application Tracker", "/applications"],
      ["Pricing", "/#pricing"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Guides", "/resources"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">GrantPilot AI</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Discover verified funding opportunities, understand your
            eligibility and organize stronger applications through guided AI
            workflows.
          </p>
          <a
            href="mailto:support@grantpilot.ai"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            support@grantpilot.ai
          </a>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-bold text-white">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.links.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GrantPilot AI. All rights reserved.</p>
          <p>Verify all requirements through the official funding provider.</p>
        </div>
      </div>
    </footer>
  );
}
