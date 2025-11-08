// get_token.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const getBearerToken = async () => {
  try {
    const response = await axios.post(
      'https://api.twitter.com/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );
    console.log("🐻 Bearer Token 発行成功！👇");
    console.log(response.data.access_token);
  } catch (error) {
    console.error("💥 エラー発生:", error.response?.data || error);
  }
};

getBearerToken();
