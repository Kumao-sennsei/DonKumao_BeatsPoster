import { TwitterApi } from "twitter-api-v2";

console.log("🐻 DonKumao Weekly Poster started...");

// Twitterクライアント作成
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// 投稿内容（テスト用）
const tweetText = "🎯 DonKumao test post success! (≧▽≦)";

async function postTweet() {
  try {
    await client.v2.tweet(tweetText);
    console.log("✅ Tweet posted successfully!");
  } catch (error) {
    console.error("💥 Error posting tweet:", error);
  }
}

postTweet();
