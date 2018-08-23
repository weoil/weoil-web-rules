import request from "../util/request";
import deKey from "../util/fembed";
import { Rule } from "../types/rule";
export default async function kaplog(
  url: string,
  content: string,
  options: Rule.ruleOption
): Promise<Rule.ruleResult> {
  let reg = /kaplog/.test(url);
  if (!reg) return { status: false };
  let title = /<h1[^>]*>([^<]*)</.exec(content)[1];
  let video = /file:[^h]*(http[^mp4]*mp4)/.exec(content)[1];
  let result = { title, video };
  return { status: true, data: result };
}
