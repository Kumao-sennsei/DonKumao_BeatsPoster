import { TwitterApi } from "twitter-api-v2";

console.log("🐻 DonKumao Weekly Poster started...");

const client = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  refreshToken: process.env.TWITTER_REFRESH_TOKEN,
});

const rwClient = client.readWrite;

import { TwitterApi } from "twitter-api-v2";
console.log("🐻 DonKumao Weekly Poster started...");
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});
// 🧪 Test Tweet
(async () => {
  try {
    const tweetText = "🐻 Test tweet from DonKumao Bot! ワッショイモード全開🔥 #DonKumao";
    const response = await client.v2.tweet(tweetText);
    console.log("✅ Tweet sent successfully:", response);
  } catch (error) {
    console.error("💥 Tweet failed:", error);
  }
})();
