// ==========================
// DonKumao Weekly Poster（Bearer認証版）
// ==========================

import { TwitterApi } from "twitter-api-v2";

// Bearerトークンだけで認証（OAuth2.0）
const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

(async () => {
  try {
    console.log("🐻 DonKumao Weekly Poster started...");
    await client.v2.tweet("テスト投稿 from DonKumao 🐾");
    console.log("✅ Tweet posted successfully!");
  } catch (error) {
    console.error("❌ Error posting tweet:", error);
  }
})();
