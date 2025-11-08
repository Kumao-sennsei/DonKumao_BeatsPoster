import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

// ===============================
// 投稿する内容
// ===============================
const postText = '🐻ドンくまお物語 第1話\n今日もマーケットでモフモフしてます（●＾o＾●）\n#ドンくまお #FX #ゴールド';

// ===============================
// OAuth 1.0a 認証情報
// ===============================
const client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// ===============================
// 投稿処理
// ===============================
async function postTweet() {
  try {
    const response = await client.v1.tweet(postText);
    console.log('✅ 投稿完了！Tweet ID:', response.id_str);
  } catch (error) {
    console.error('❌ 投稿に失敗しました:', error);
  }
}

postTweet();
