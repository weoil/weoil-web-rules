import { Rule } from "../types/rule";
export default async function eporner(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/eporner\.com\/hd-porn/.test(url)) return { status: false };
  let result = {};
  let body = String(content);
  let poster = body.match(/poster.*(http.*jpg)/);
  let key = /hd-porn\/([^/]*)/.exec(url)[1];
  let reg = new RegExp("/dload/" + key + '[^"]*', "g");
  let videos = body.match(reg);
  result["poster"] = poster[1];
  result["videos"] = videos.map(video => "https://www.eporner.com" + video);
  return {
    status: false,
    data: result
  };
}
