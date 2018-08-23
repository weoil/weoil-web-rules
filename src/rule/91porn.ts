import { Rule } from "../types/rule";
export default async function porn91(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/91porn/.test(url)) return { status: false };
  let result = {};
  let title = /viewvideo-title\">([^<]*)</.exec(content)[1].trim();
  let video = /<source[^http]*(http[^\"]*)\"/.exec(content)[1];
  let poster = /poster=[^http]*(http[^\"]*)\"/.exec(content)[1];
  let duration = /(\d\d:\d\d:\d\d)|(\d\d:\d\d)/.exec(content)[0];
  result = { title, video, poster, duration };
  return { status: true, data: result };
}
