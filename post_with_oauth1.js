import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET,
} = process.env;

const oauth = new OAuth({
  consumer: {
    key: TWITTER_CONSUMER_KEY,
    secret: TWITTER_CONSUMER_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto
      .createHmac("sha1", key)
      .update(base_string)
      .digest("base64");
  },
});

const token = {
  key: TWITTER_ACCESS_TOKEN,
  secret: TWITTER_ACCESS_SECRET,
};

export async function postTweet(bodyText) {
  const request_data = {
    url: "https://api.twitter.com/1.1/statuses/update.json",
    method: "POST",
    data: {
      status: bodyText,
    },
  };

  try {
    const response = await axios.post(
      request_data.url,
      new URLSearchParams(request_data.data),
      {
        headers: {
          ...oauth.toHeader(oauth.authorize(request_data, token)),
        },
      }
    );

    console.log("✅ 投稿成功！ツイートID:", response.data.id_str);
  } catch (error) {
    console.error("💥 投稿失敗:", error.response?.data || error.message);
  }
}
