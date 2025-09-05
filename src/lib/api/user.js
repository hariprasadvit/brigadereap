import axios from "axios";

export async function fetchUser(token) {
  if (!token) return null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data?.data || {};
  } catch (error) {
    if (error.response?.status === 401) {
      return { user: null, error: "Token expired" };
    }
    return { user: null, error: "Fetch user failed" };
  }
}
