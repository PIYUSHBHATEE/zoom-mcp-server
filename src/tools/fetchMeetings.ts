import axios from 'axios';
import { getZoomAccessToken } from '../utils/zoomApi.js';

async function get_meetings() {
  try {
    const token = await getZoomAccessToken();
    const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    return err.message;
  }
}

export default get_meetings;
