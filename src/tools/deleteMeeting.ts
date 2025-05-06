import axios from 'axios';
import { getZoomAccessToken } from '../utils/zoomApi.js';

export async function deleteZoomMeeting({ id }: { id: string }) {

    const url = `https://api.zoom.us/v2/meetings/${id}`;
    
    try {
        const token = await getZoomAccessToken();

        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return { success: true, message: `Meeting ${id} deleted.` };
    } catch (error: any) {
        console.error('Error deleting Zoom meeting:', error.response?.data || error.message);
        throw error;
    }
}
