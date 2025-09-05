import CompanyDetailCard from "@/components/CompanyDetail/CompanyDetailCard";
import { getStartupDetail } from "@/lib/api/startups";
import { cookies } from "next/headers";

export default async function CompanyDetail({ params }) {
  const { id } = params; // ✅ Access dynamic route param
  const cookieStore = await cookies(); // ✅ directly in this function
  const token = cookieStore.get("access_token")?.value;
  const startupDetail = token ? await getStartupDetail(id, token) : {};

  return (
    <>
      <CompanyDetailCard
        detail={startupDetail || {}}
        showStatus={true}
        isEdit
      />
    </>
  );
}
