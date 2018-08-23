import { Rule } from "../types/rule";
export default async function youjizz(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/youjizz\.com\/videos/.test(url)) return { status: false };
  let body = String(content);
  let start = body.indexOf("var encodings");
  start = body.indexOf("[", start);
  let end = body.indexOf(";", start);
  body = body.substring(start, end);
  return { status: true, data: JSON.parse(body) };
}
