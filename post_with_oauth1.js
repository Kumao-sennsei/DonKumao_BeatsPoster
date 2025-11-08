// ✅ OAuth1.0a × twitter-api-v2（v1.1投稿）
// Railway環境対応・最小構成の投稿ツール

import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

// OAuth1.0a 認証（v1.1 API用）
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// ✏ 投稿内容（Railway本番ではここを自動化してもOK）
const status = 'これはOAuth1.0a認証からのテスト投稿です！（By くまお先生🐻）';

// 📤 投稿処理
(async () => {
  try {
    const res = await client.v1.tweet(status);
    console.log('✅ 投稿成功:', res.id_str);
  } catch (err) {
    console.error('❌ 投稿失敗:', err);
  }
})();
