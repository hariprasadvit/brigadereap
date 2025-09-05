import axiosInstance from "@/config/axios";

export async function getIndustries() {
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/industry/list/`
      );
      return res.data?.data || [];
    } catch (error) {
      return [];
    }
  }