import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
});

(async () => {
  try {
    console.log("🐻 DonKumao Weekly Poster started...");
    await client.v2.tweet("テスト投稿 from DonKumao 🐾");
    console.log("✅ Tweet posted successfully!");
  } catch (error) {
    console.error("❌ Error posting tweet:", error);
  }
})();
