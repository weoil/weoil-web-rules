import { Rule } from "../types/rule";
export default async function xhamster(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/xhamster\.com\/videos/.test(url)) return { status: false };
  let result = {};
  let body = String(content);
  let start = body.indexOf('}},"sources":');
  start = body.indexOf("{", start);
  let end = body.indexOf("}]}", start);
  let sub = body.substring(start, end + 3);
  let r = eval("(" + sub + ")");
  result["videos"] = {};
  for (let key in r) {
    let kmap = {};
    for (let video of r[key]) {
      kmap[video["quality"]] = video["fallback"];
    }
    result["videos"][key] = kmap;
  }
  start = body.indexOf('poster":"');
  end = body.indexOf('"', start + 10);
  let poster = body.substring(start + 9, end).replace(/\\/g, "");
  result["poster"] = poster;
  return {
    status: false,
    data: result
  };
}
