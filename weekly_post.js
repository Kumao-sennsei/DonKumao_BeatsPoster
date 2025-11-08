<<<<<<< HEAD
import cron from "node-cron";
import { exec } from "child_process";

console.log("🐻 Donくまおポスター 起動中...");

cron.schedule("0 9 * * 1", () => {
  console.log("⏰ 月曜9時！自動投稿実行！");
  exec("node get_token.cjs", (err, stdout, stderr) => {
    if (err) {
      console.error("💥 実行エラー:", err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
});
=======
import { TwitterApi } from "twitter-api-v2";

// === DonKumao 固定構成 ===
// Bearerは使わない！OAuth1.0a User Context 認証だけ使用
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

(async () => {
  try {
    console.log("🐻 DonKumao Weekly Poster started...");

    // 投稿テキスト
    const postText = "🔥 自動投稿テスト from DonKumao 🐾\nLondon wakes, charts shake.";

    // 投稿実行
    const tweet = await client.v2.tweet(postText);
    console.log("✅ Tweet posted successfully!");
    console.log("🆔 Tweet ID:", tweet.data.id);

  } catch (error) {
    console.error("❌ Error posting tweet:", error);
    if (error.code) console.error("Error code:", error.code);
    if (error.data) console.error("Error data:", error.data);
  }
})();
>>>>>>> f35b9e1e6def067d913d970458271f481c3df0d9
