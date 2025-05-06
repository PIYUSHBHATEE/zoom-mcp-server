import axios from 'axios';
import { getZoomAccessToken } from '../utils/zoomApi.js';
import { updateMeetingParams } from '../utils/types.js';

export async function updateZoomMeeting(params: updateMeetingParams) {
    if(!params.id) {
        throw new Error('Id is required to update the meeting!');
    }

    const {
        id,
        topic,
        start_time,
        duration,
        timezone,
        agenda
    } = params;

    const url = `https://api.zoom.us/v2/meetings/${id}`;

    try {
        const token = await getZoomAccessToken();
        const response = await axios.patch(
            url,
            {
                ...(topic && {topic}),
                ...(start_time && {start_time}),
                ...(duration && {duration}),
                ...(timezone && {timezone}),
                ...(agenda && {agenda})
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }}
        );

        return response.data || {success: true};
    } catch(error: any) {
        console.log('Error updating the meeting:', error.response?.data || error.message);
        throw error;
    }
}