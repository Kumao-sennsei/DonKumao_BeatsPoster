import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import * as dotenv from "dotenv";
dotenv.config();

const {
  API_KEY,
  API_SECRET,
  ACCESS_TOKEN,
  ACCESS_SECRET,
} = process.env;

const oauth = new OAuth({
  consumer: { key: API_KEY, secret: API_SECRET },
  signature_method: "HMAC-SHA1",
  hash_function(base, key) {
    return crypto.createHmac("sha1", key).update(base).digest("base64");
  },
});

const url = "https://api.twitter.com/1.1/statuses/update.json";
const method = "POST";

const tweet = {
  status: "🐻Donくまおテスト投稿だモフ！#BeatsOfMarket",
};

const request_data = {
  url,
  method,
  data: tweet,
};

const token = {
  key: ACCESS_TOKEN,
  secret: ACCESS_SECRET,
};

try {
  const response = await axios.post(url, tweet, {
    headers: oauth.toHeader(oauth.authorize(request_data, token)),
  });
  console.log("✅ 投稿成功！🎉");
  console.log(response.data);
} catch (err) {
  console.error("❌ 投稿失敗：", err.response?.data || err);
}
