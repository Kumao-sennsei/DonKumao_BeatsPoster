// ======================================
// 💣 AIドンくまお — Beats of Market
// Weekly Auto Poster for X (Twitter)
// ======================================

import fs from "fs";
import { TwitterApi } from "twitter-api-v2";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
dayjs.extend(dayOfYear);
// ====== 環境変数 ======
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET
});

// ====== JSON読込 ======
const data = JSON.parse(fs.readFileSync("./donkumao_stories.json", "utf8"));

// ====== 今週の話を決定 ======
function getStoryOfWeek() {
  const weekOfYear = Math.ceil(dayjs().dayOfYear() / 7);
  const allStories = [];

  data.chapters.forEach(ch => {
    ch.stories.forEach(story => {
      allStories.push({
        title: `第${ch.chapter}章 ${ch.title}・エピソード${story.id % 100}`,
        story: story.story,
        footer: data.footer
      });
    });
  });

  const story = allStories[weekOfYear % allStories.length];
  return story;
}

// ====== 投稿文作成 ======
function buildPostText(story) {
  return `📅 ${story.title}\n${story.story}\n\n${story.footer}`;
}

// ====== 投稿処理 ======
async function postToX() {
  try {
    const story = getStoryOfWeek();
    const postText = buildPostText(story);

    console.log("🐻 投稿準備:", story.title);
    console.log(postText);

    // 実際の投稿：Railwayで動かすときだけコメントアウト解除！
    // await client.v2.tweet(postText);

    console.log("✅ 投稿（テスト出力）完了:", dayjs().format("YYYY-MM-DD HH:mm"));
  } catch (err) {
    console.error("❌ エラー:", err);
  }
}

// 実行
postToX();
