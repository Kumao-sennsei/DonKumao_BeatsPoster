// =======================================
// 🧭 AI DonKumao Beats of MarkeT
// 配信スケジュール試験版（安全モード）
// =======================================

import cron from "node-cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

// ✅ JSTを固定
const JST = "Asia/Tokyo";

// 🕓 各市場の設定（10分前送信）
const schedules = [
  { market: "Tokyo", time: "08:50", message: "🇯🇵 東京市場 開始10分前" },
  { market: "London", time: "15:50", message: "🇬🇧 ロンドン市場 開始10分前" },
  { market: "NewYork", time: "21:20", message: "🇺🇸 NY市場 開始10分前" }
];

// 🧠 ダミー投稿関数
function generateReport(market) {
  return `🕓 ${dayjs().tz(JST).format("YYYY/MM/DD HH:mm")} JST\n📈 ${market} セッション開始10分前\n💬 “London wakes, charts shake.”`;
}

// 🚀 スケジュール登録
for (const s of schedules) {
  const [hour, minute] = s.time.split(":");
  cron.schedule(`${minute} ${hour} * * *`, () => {
    const now = dayjs().tz(JST);
    console.log("=================================");
    console.log(`🧪 [TEST MODE] ${s.market} 配信プレビュー`);
    console.log(generateReport(s.market));
    console.log("=================================\n");
  });
}

console.log("✅ AI DonKumao Scheduler 起動中…（TEST_MODE: true）");
