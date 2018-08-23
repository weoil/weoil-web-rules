import { Rule } from "../types/rule";
export default async function pornhd(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/pornhd\.com\/videos/.test(url)) return { status: false };
  let result = {};
  let body = String(content);
  let start = body.indexOf("players.push(");
  start = body.indexOf("{", start);
  let end = body.indexOf(")", start);
  body = body.substring(start, end);
  let r = eval("(" + body + ")");
  let posters = [];
  posters.push(r["poster"]);
  posters = posters.concat(r["previewSprites"]);
  result["poster"] = posters;
  result["videos"] = r["sources"];
  return { status: true, data: result };
}
