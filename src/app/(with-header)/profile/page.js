import ProfileDetailContainer from "@/components/Profile/ProfileDetailContainer";
import { getMyStartups } from "@/lib/api/startups";
import { fetchUser } from "@/lib/api/user";
import { cookies } from "next/headers";

export default async function Profile() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const [startups, user] = token
    ? await Promise.all([
        getMyStartups(token),
        fetchUser(token),
      ])
    : [{}, {}];

  return (
    <ProfileDetailContainer startups={startups || {}} loggeduser={user} />
  );
}
