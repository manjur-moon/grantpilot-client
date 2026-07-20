import "./globals.css";
import Providers from "@/components/providers";

export const metadata = {
  title: {
    default: "GrantPilot AI",
    template: "%s | GrantPilot AI",
  },
  description: "Funding discovery and application intelligence platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}