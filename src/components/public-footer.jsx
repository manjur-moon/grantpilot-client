import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";

const contactEmail = "moon.rzs09@gmail.com";
const githubUrl = "https://github.com/manjur-moon";
const linkedinUrl = "https://www.linkedin.com/in/md-manjurul-islam-616701295/";

const footerGroups = [
  {
    title: "Platform",
    links: [
      {
        label: "Explore Opportunities",
        href: "/opportunities",
      },
      {
        label: "AI Recommendations",
        href: "/recommendations",
      },
      {
        label: "Application Tracker",
        href: "/applications",
      },
      {
        label: "AI Assistant",
        href: "/assistant",
      },
    ],
  },
  {
    title: "Workspace",
    links: [
      {
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        label: "My Profile",
        href: "/profile",
      },
      {
        label: "Home",
        href: "/",
      },
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: githubUrl,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: linkedinUrl,
    icon: Linkedin,
  },
];

export default function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link
            href="/"
            aria-label="GrantPilot AI home"
            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
              <Sparkles
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <span className="text-lg font-bold">
              GrantPilot AI
            </span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Discover verified funding opportunities, understand
            your eligibility and organize stronger applications
            through guided AI workflows.
          </p>

          <div className="mt-6">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Mail
                aria-hidden="true"
                className="h-4 w-4"
              />

              {contactEmail}
            </a>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label} profile`}
                  title={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {footerGroups.map((group) => (
          <nav
            key={group.title}
            aria-label={`${group.title} footer links`}
          >
            <h2 className="text-sm font-bold text-white">
              {group.title}
            </h2>

            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md text-sm text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GrantPilot AI. All
            rights reserved.
          </p>

          <p>
            Verify all requirements through the official funding
            provider.
          </p>
        </div>
      </div>
    </footer>
  );
}