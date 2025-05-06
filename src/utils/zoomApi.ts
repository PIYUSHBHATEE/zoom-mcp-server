import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.ZOOM_CLIENT_ID ?? '';
const clientSecret = process.env.ZOOM_CLIENT_SECRET ?? '';
const accountId = process.env.ZOOM_ACCOUNT_ID ?? '';

if (!clientId || !clientSecret || !accountId) {
  throw new Error('Missing Zoom credentials in environment variables.');
}

export async function getZoomAccessToken(): Promise<string> {
  const tokenUrl = 'https://zoom.us/oauth/token';
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      `${tokenUrl}?grant_type=account_credentials&account_id=${accountId}`,
      {},
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error('Failed to fetch Zoom access token:', error.response?.data || error.message);
    throw new Error('Could not get Zoom access token');
  }
}