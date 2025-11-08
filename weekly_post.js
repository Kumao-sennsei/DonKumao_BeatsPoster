import dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v1";
import fs from "fs/promises";
import path from "path";
import cron from "node-cron";

dotenv.config();

const client = new TwitterApi({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

async function postTweetFromFile() {
  const filePath = path.join(process.cwd(), "donkumao_stories.json");
  const data = await fs.readFile(filePath, "utf-8");
  const tweets = JSON.parse(data);

  const now = new Date();
  const today = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  const tweet = tweets.find((t) => t.date === today);

  if (!tweet) {
    console.log("✅ 本日の投稿はありません");
    return;
  }

  try {
    const { data } = await client.post("statuses/update", {
      status: tweet.text
    });
    console.log("✅ 投稿完了:", data.text);
  } catch (err) {
    console.error("❌ 投稿エラー:", err);
  }
}

// 月〜金の9:00に投稿（Railway実行時間がUTCのため、0時＝JST9時）
cron.schedule("0 0 * * 1-5", () => {
  console.log("🐻 Donくまお投稿Bot 起動中...");
  postTweetFromFile();
});
