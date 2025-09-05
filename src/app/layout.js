import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import ProviderWrapper from "./ProviderWrapper";
import { cookies } from "next/headers";
import ToastProvider from "@/components/ToastProvider";
import { Montserrat } from "next/font/google";
import { fetchUser } from "@/lib/api/user"; // ⬅️ imported from new file

const montserrat = Montserrat({
  weight: [
    "100", // Thin
    "200", // Extra Light
    "300", // Light
    "400", // Regular
    "500", // Medium
    "600", // Semi Bold
    "700", // Bold
    "800", // Extra Bold
    "900", // Black
  ],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = token ? await fetchUser(token) : {}; // ⬅️ now coming from helper

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ProviderWrapper user={user}>
          <StyledComponentsRegistry>
            <ToastProvider />
            <>{children}</>
          </StyledComponentsRegistry>
        </ProviderWrapper>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: "Brigade Reap",
    template: "%s | Brigade Reap",
  },
  description: "Brigade Reap.",
};
