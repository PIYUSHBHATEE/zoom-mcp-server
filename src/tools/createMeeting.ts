import axios from "axios";
import { CreateMeetingParams } from "../utils/types.js";
import { fetchZoomAccessToken } from "../utils/zoomApi.js";

export async function createZoomMeeting(params: CreateMeetingParams) {
  const {
    topic,
    start_time,
    duration = 30,
    timezone = "UTC",
    agenda = "",
  } = params;

  const endpoint = "https://api.zoom.us/v2/users/me/meetings";

  try {
    const token = await fetchZoomAccessToken();

    const response = await axios.post(
      endpoint,
      {
        topic,
        type: 2,
        start_time,
        duration,
        timezone,
        agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to create Zoom meeting:", error.response?.data || error.message);
    throw new Error("Unable to create meeting");
  }
}
