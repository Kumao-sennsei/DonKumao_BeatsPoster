import cron from "node-cron";
import { exec } from "child_process";

console.log("🐻 Donくまおポスター 起動中...");

cron.schedule("0 9 * * 1", () => {
  console.log("⏰ 月曜9時！自動投稿実行！");
  exec("node get_token.cjs", (err, stdout, stderr) => {
    if (err) {
      console.error("💥 実行エラー:", err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
});
