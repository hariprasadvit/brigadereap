import axiosInstance from "@/config/axios";
import axios from "axios";

const pageSize = 10;

export async function getStartups(query, items_per_page = pageSize) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/start-up/list_all_startup`,
      {
        params: {
          ...query,
          paginate: 1,
          items: items_per_page,
          page: query?.page || 1,
        },
      }
    );
    return res.data || {};
  } catch (error) {
    return {};
  }
}

export async function getMyStartups(token) {
  try {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/start-up/list`,
      {
        params: {
          paginate: 1,
          items: 50,
          page: 1,
          filter_type: "my_companies",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data || {};
  } catch (error) {
    return {};
  }
}

export async function getStartupDetail(id, token) {
  try {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/start-up/detail/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // You can optionally disable caching behavior manually here
      }
    );

    return res.data?.data || {};
  } catch (error) {
    return {};
  }
}

export async function getStartupDetailBySlug(id) {
  try {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/start-up/detail/${id}/`
    );

    return res.data?.data || {};
  } catch (error) {
    return {};
  }
}