import AddStartup from "@/components/AddStartup";
import { getIndustries } from "@/lib/api/industries";
import { getStartupDetail } from "@/lib/api/startups";
import { fetchUser } from "@/lib/api/user";
import { cookies } from "next/headers";

export default async function AddStartUp({ searchParams }) {
  const params = await searchParams;
  const { id } = params;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const [startupDetail, industries, user] = await Promise.all([
    token ? getStartupDetail(id, token) : {},
    getIndustries(),
    token ? fetchUser(token) : {},
  ]);

  return (
    <AddStartup
      startupId={id}
      detail={startupDetail || {}}
      industries={industries || []}
      loggeduser={user}
    />
  );
}
