import axios from "axios";
import { fetchZoomAccessToken } from "../utils/zoomApi.js";

export async function fetchMeetings() {
  try {
    const token = await fetchZoomAccessToken();
    const response = await axios.get("https://api.zoom.us/v2/users/me/meetings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch Zoom meetings:", error.response?.data || error.message);
    return null;
  }
}
