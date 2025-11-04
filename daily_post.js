// daily_post.js  ― 毎日ポスト：英語ブラックスラング＋日本語訳＋フッター
require('dotenv').config();

let postToX;
try {
  ({ postToX } = require('./x_client')); // 週次と同じ投稿関数を使う
} catch (e) {
  console.warn('⚠️ postToX が見つかりません。プレビューのみ動作します。');
  postToX = async (txt) => {
    console.log('===== [FALLBACK PREVIEW] =====');
    console.log(txt);
    console.log('==============================');
  };
}

// ✨ ドンくまおの一言リスト（増やしてOK）
const LINES = [
  { en: "Market’s cold, keep your stop tight.", ja: "相場は冷たい。損切りはタイトに。", tag: "#AIドンくまお #BeatsOfMarket" },
  { en: "Don’t chase—let the bag come to you.", ja: "追いかけるな。獲物を待て。", tag: "#相場一言 #RiskFirst" },
  { en: "Green today? Cool. Lock some and breathe.", ja: "今日は含み益？ いいね。少し利確して深呼吸。", tag: "#利確は善 #トレード習慣" },
  { en: "Red candle don’t scare me—plan does.", ja: "怖いのは赤じゃない。無計画だ。", tag: "#計画トレード #規律" },
  { en: "Breakouts lie. Retests testify.", ja: "ブレイクは嘘をつく。再テストが真実。", tag: "#テクニカル #再確認" },
  { en: "Cash is a position. Sit pretty.", ja: "ノーポジも立派なポジ。美しく待て。", tag: "#資金管理 #ノーポジ力" },
  { en: "Trend’s your cousin—keep it in the family.", ja: "トレンドは身内。身内に従え。", tag: "#トレンドフォロー" },
];

// 📅 JSTベースで日替わり
function pickByJSTDate(arr) {
  const jstNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const dayCount = Math.floor(jstNow.getTime() / 86400000);
  return arr[dayCount % arr.length];
}

const pick = pickByJSTDate(LINES);

// 💥 採用済みドンくまおフッター
const FOOTER = `💥 まもなく開幕だぜ。
LINEでチャートをパシャッと送るだけ。
あとはオレが“相場の鼓動（Beats of Market）”を読み取って、
次の一手を教えてやる🐻💬

📢 リアルタイム相場解析サービス、もうすぐ始動だ。`;

const body = `🎤 Don Kumao’s Daily
${pick.en}
— ${pick.ja}
${pick.tag}

${FOOTER}`;

const TEST_MODE = (process.env.TEST_MODE || 'true') === 'true';

(async () => {
  if (TEST_MODE) {
    console.log('===== [TEST MODE] Daily Preview =====');
    console.log(body);
    console.log('=====================================');
    return;
  }
  await postToX(body);
  console.log('✅ Daily post: OK');
})();
