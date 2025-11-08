import { postTweet } from "./post_with_oauth1.js";
import fs from "fs/promises";
import path from "path";

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

  console.log("📦 今日のドンくまお物語を投稿します！");
  console.log(tweet.body);
  await postTweet(tweet.body);
}

postTweetFromFile();
