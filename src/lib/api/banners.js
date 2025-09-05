import axiosInstance from "@/config/axios";

export async function getBanners() {
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner/list/?image_status=active`
      );
      return res.data?.data || [];
    } catch (error) {
      return [];
    }
  }