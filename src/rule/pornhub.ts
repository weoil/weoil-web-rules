import { Rule } from "../types/rule";
export default async function pornhub(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/pornhub\.com\/view_video\.php\?viewkey=/.test(url))
    return { status: false };
  let body = String(content);
  let start = body.indexOf("var flashvars_");
  start = body.indexOf("{", start);
  let end = body.indexOf(";", start);
  body = body.substring(start, end);
  let result = JSON.parse(body);
  return { status: true, data: result };
}
