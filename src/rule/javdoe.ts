import request from "../util/request";
import deKey from "../util/fembed";
import { Rule } from "../types/rule";
let token = "";

export default async function javdoe(
  url: string,
  content: string,
  options: Rule.ruleOption
): Promise<Rule.ruleResult> {
  let reg = /javdoe/.test(url);
  if (!reg) return { status: false };
  let embedKey: any = /embedUrl.*embed\/(.*)\"/;
  embedKey = embedKey.exec(content)[1];
  let skey = await request.get(
    "https://www.javdoe.com/stream/sw0/" + embedKey,
    { proxy: options.proxy }
  );
  skey = JSON.parse(skey).data;
  if (!token) {
    let tokenFn = await request.get("https://cdndoe.me/player/token.js");
    token = /return[^\"]*\"([^\"]*)\"/.exec(tokenFn)[1];
  }
  let key = deKey(skey, token);
  key = /:\/\/(.*)/.exec(key)[1];
  let videos;
  if (/fembed/.test(content)) {
    videos = await request.post("https://www.fembed.com/api/sources/" + key, {
      proxy: options.proxy,
      json: true
    });
    videos = videos.data;
  } else {
    let rapidvideo = await request.get("https://www.rapidvideo.com/e/" + key, {
      proxy: options.proxy
    });
    let file = /source src=\"([^\"]*)\"/.exec(rapidvideo)[1];
    let label = /data-res=\"([^\"]*)\"/.exec(rapidvideo)[1];
    videos = [
      {
        file: file,
        label: label,
        type: "mp4"
      }
    ];
  }
  let result = { videos };
  return {
    status: true,
    data: result
  };
}
