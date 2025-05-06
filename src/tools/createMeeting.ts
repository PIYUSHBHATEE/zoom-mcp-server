import axios from 'axios';
import { createMeetingParams } from '../utils/types.js';
import { getZoomAccessToken } from '../utils/zoomApi.js';

export async function createZoomMeeting(params: createMeetingParams) {
  const {
    topic,
    start_time,
    duration = 30,
    timezone = 'UTC',
    agenda = '',
  } = params;

  const url = `https://api.zoom.us/v2/users/me/meetings`;
  
  try {
    const token = await getZoomAccessToken(); 
    const response = await axios.post(
      url,
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
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error creating Zoom meeting:', error.response?.data || error.message);
    throw error;
  }
}