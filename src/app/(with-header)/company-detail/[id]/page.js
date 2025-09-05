import CompanyDetailCard from "@/components/CompanyDetail/CompanyDetailCard";
import { getStartupDetailBySlug } from "@/lib/api/startups";
import { fetchUser } from "@/lib/api/user";
import { cookies } from "next/headers";

export default async function CompanyDetail({ params }) {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const [startupDetail, user] = await Promise.all([
    getStartupDetailBySlug(id),
    token ? fetchUser(token) : {},
  ]);

  return (
    <CompanyDetailCard
      detail={startupDetail || {}}
      loggeduser={user}
      isSlugSame={startupDetail?.slug_id == id && startupDetail?.status === "approved"}
    />
  );
}
