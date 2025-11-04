// daily_post.js  ― 毎日ポスト：英語ブラックスラング＋日本語訳＋フッター
require('dotenv').config();

// 既存の weekly_post.js と同じ送信関数がある想定：./x_client.js に postToX(text)
// なければ、weekly_post.js で実際にX投稿に使っている関数を require してください。
let postToX;
try {
  // 例：x_client.js に postToX を定義している場合
  ({ postToX } = require('./x_client'));
} catch (e) {
  // 週次と同じ送信関数名に合わせて差し替えてください（暫定プレビューにフォールバック）
  console.warn('⚠️ postToX が見つかりません。プレビューのみで動作します。');
  postToX = async (txt) => {
    console.log('===== [FALLBACK PREVIEW] =====');
    console.log(txt);
    console.log('==============================');
  };
}

// 🔁 黒スラ＆日本語訳のペア（必要に応じて増やしてOK）
const LINES = [
  { en: "Market’s cold, keep your stop tight.", ja: "相場は冷たい。損切りはタイトに。", tag: "#AIドンくまお #BeatsOfMarket" },
  { en: "Don’t chase—let the bag come to you.", ja: "追いかけるな。獲物を待て。", tag: "#相場一言 #RiskFirst" },
  { en: "Green today? Cool. Lock some and breathe.", ja: "今日は含み益？ いいね。少し利確して深呼吸。", tag: "#利確は善 #トレード習慣" },
  { en: "Red candle don’t scare me—plan does.", ja: "怖いのは赤じゃない。無計画だ。", tag: "#計画トレード #規律" },
  { en: "Breakouts lie. Retests testify.", ja: "ブレイクは嘘をつく。再テストが真実。", tag: "#テクニカル #再確認" },
  { en: "Cash is a position. Sit pretty.", ja: "ノーポジも立派なポジ。美しく待て。", tag: "#資金管理 #ノーポジ力" },
  { en: "Trend’s your cousin—keep it in the family.", ja: "トレンドは身内。身内に従え。", tag: "#トレンドフォロー" },
];

// 📍JST 日付で循環（状態保存いらず）
function pickByJSTDate(arr) {
  const jstNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const dayCount = Math.floor(jstNow.getTime() / 86400000); // 24*60*60*1000
  return arr[dayCount % arr.length];
}

const pick = pickByJSTDate(LINES);

// ✅ 採用済みフッター（ブランド統一）
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
  console.log('Daily post: OK');
})();

