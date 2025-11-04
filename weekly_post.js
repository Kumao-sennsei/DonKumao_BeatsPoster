// weekly_post.js ー 安全モード版（Xに投稿しない）
// ----------------------------------------------

import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
dayjs.extend(dayOfYear);

// （必要に応じて他のプラグインも）
import weekOfYear from "dayjs/plugin/weekOfYear.js";
dayjs.extend(weekOfYear);

// 投稿内容を生成する関数
function generatePost() {
  const now = dayjs();
  const week = now.week();
  const title = `📮 第${week}週 ドンくまおの相場一言`;
  const message = [
    "💬『市場は波。乗るも沈むも己次第。』",
    "🐻 くまおは今日もチャートを睨んでる…",
    "💰 #AIドンくまお #BeatsOfMarket"
  ].join("\n");
  return `${title}\n\n${message}`;
}

// 安全モード出力
async function main() {
  const tweetContent = generatePost();

  console.log("=================================");
  console.log("🧪 [TEST MODE] 投稿内容プレビュー");
  console.log("=================================\n");
  console.log(tweetContent);
  console.log("\n✅ （安全モード中：Xには投稿されません）");
  console.log("=================================");
}

main().catch((err) => {
  console.error("💥 エラー発生:", err);
});
const FOOTER = `💥 まもなく開幕だぜ。
LINEでチャートをパシャッと送るだけ。
あとはオレが“相場の鼓動（Beats of Market）”を読み取って、
次の一手を教えてやる🐻💬

📢 リアルタイム相場解析サービス、もうすぐ始動だ。`;

