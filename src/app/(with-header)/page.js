/** @format */

import StartupListing from "@/components/CompanyDetail/StartupListing";
import { cookies } from "next/headers";
import { getStartups } from "@/lib/api/startups";
import { fetchUser } from "@/lib/api/user";
import { getIndustries } from "@/lib/api/industries";
import { getBanners } from "@/lib/api/banners";
import dynamic from "next/dynamic";
const BuilderEventPage = dynamic(() => import('../../builder-extensions/BuilderEventPage'), { ssr: false });

const pageSize = 10;
const allowedQueryKeys = [
  "page",
  "search",
  "industry_id",
  "batch_id",
  "is_reap_company",
];

export default async function Landing({ searchParams }) {
  const params = await searchParams;
  const queryObject = Object.fromEntries(
    Object.entries(params).filter(
      ([key, value]) =>
        allowedQueryKeys.includes(key) && typeof value === "string"
    )
  );
  const queryItemsPerPage = Object.fromEntries(
    Object.entries(params).filter(
      ([key, value]) => key === "items_per_page" && typeof value === "string"
    )
  );
  const filterObject = { ...queryObject };
  // Remove is_reap_company if both true and false are selected
  if (
    queryObject.is_reap_company &&
    queryObject.is_reap_company.split(",").sort().join(",") === "false,true"
  ) {
    delete queryObject.is_reap_company;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  // Run all API calls in parallel
  const [user, startups, industries, banners] = await Promise.all([
    token ? fetchUser(token) : {},
    getStartups(queryObject, queryItemsPerPage?.items_per_page),
    getIndustries(),
    getBanners()
  ]);

  return (
    <StartupListing
      initialData={startups || {}}
      searchParams={filterObject}
      pageSize={pageSize}
      page={queryObject.page || 1}
      items_per_page={queryItemsPerPage?.items_per_page}
      industries={industries}
      loggeduser={user}
      banners={banners}
    />
  );
}
