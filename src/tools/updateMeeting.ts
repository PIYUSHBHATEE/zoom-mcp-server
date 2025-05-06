import axios from 'axios';
import { fetchZoomAccessToken } from '../utils/zoomApi.js';
import { UpdateMeetingParams } from '../utils/types.js';

export async function updateZoomMeeting(params: UpdateMeetingParams) {
  if (!params.id) {
    throw new Error('Meeting ID is required to update the meeting.');
  }

  const { id, topic, start_time, duration, timezone, agenda } = params;
  const url = `https://api.zoom.us/v2/meetings/${id}`;

  try {
    const token = await fetchZoomAccessToken();
    const response = await axios.patch(
      url,
      {
        ...(topic && { topic }),
        ...(start_time && { start_time }),
        ...(duration && { duration }),
        ...(timezone && { timezone }),
        ...(agenda && { agenda }),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data || { success: true };
  } catch (error: any) {
    console.error('Error updating Zoom meeting:', error.response?.data || error.message);
    throw new Error('Could not update Zoom meeting.');
  }
}
