import { Rule } from "../types/rule";
import request from "../util/request";
export default async function streamjav(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/streamjav/.test(url)) return { status: false };
  let result = {};
  let PlayFilm = /PlayFilm.*\"(.*)\"/.exec(content)[1];
  let PlayEp = /PlayEp.*\"(.*)\"/.exec(content)[1];
  let headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
  };
  let rhtml = await request.post("http://streamjav.net/", {
    ...options,
    formData: { server: PlayFilm, id: PlayEp },
    headers: headers
  });
  let video = /https:.[^\"]*\"/.exec(rhtml)[0];
  video = video.replace(/\\/g, "");
  let title = /strong>([^<]*)</.exec(content)[1].trim();
  let duration = /ระยะเวลา:([^<]*)</.exec(content)[1].trim();
  let poster = /http:\/\/streamjav\.net\/img\/poster\/[^\"]*/.exec(content)[0];
  result = { title, duration, video, poster };
  return {
    status: false,
    data: result
  };
}
