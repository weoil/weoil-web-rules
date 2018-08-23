const IconvLite = require("iconv-lite");
const request = require("request-promise");
interface option {
  proxy?: string;
  headers?: object;
  jar?: boolean;
  encoding?: string;
}

const default_option = {
  proxy: "",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
  },
  jar: false,
  encoding: null
};

export default class Fetch {
  static async get(
    url: string,
    options: option = default_option
  ): Promise<string> {
    let resp = await request.get(url, { ...default_option, ...options });
    let body = encoding(resp);
    return body;
  }
  static async post(...args) {
    return await request.post(...args);
  }
}

function encoding(body: string, encoding?: string): string {
  //自动推断charset
  let content = null;
  if (!encoding) {
    try {
      content = body.toString();
      let charset = /charset\=[^"].*"|charset\="[^"].*"/.exec(content)[0];
      encoding = charset
        .replace("charset=", "")
        .replace(/"/g, "")
        .trim();
    } catch (e) {
      encoding = "UTF8";
    }
  }
  if (encoding.toUpperCase().replace("-", "") === "UTF8") {
    return content ? content : body.toString();
  } else {
    return IconvLite.decode(body, encoding);
  }
}
