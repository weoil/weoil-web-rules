import { Rule } from "../types/rule";
export default async function kaplog(
  url: string,
  content: string,
  options: Rule.ruleOption
): Promise<Rule.ruleResult> {
  let reg = /porn\.com\/videos/.test(url);
  if (!reg) return { status: false };
  let result = {};
  let body = String(content);
  let start = body.indexOf("streams:");
  start = body.indexOf("[", start);
  let end = body.indexOf("]", start);
  let sub = body.substring(start, end + 1);
  let vr = eval("(" + sub + ")");
  vr = vr.map(v => {
    let id = v["id"];
    let u = v["url"];
    return { [id]: u };
  });
  result["videos"] = vr;
  start = body.indexOf('poster:"', end);
  end = body.indexOf('"', start + 9);
  sub = body.substring(start + 8, end);
  result["poster"] = "https://mediav.porn.com" + sub;
  return {
    data: result,
    status: true
  };
}
