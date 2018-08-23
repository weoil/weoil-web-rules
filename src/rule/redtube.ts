import { Rule } from "../types/rule";
export default async function redtube(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/redtube\.com/.test(url)) return { status: false };
  let result = { videos: [] };
  let body = String(content);
  let start = body.indexOf("mainRoll");
  start = body.indexOf("{", start);
  let end = body.indexOf("duration", start);
  end = body.indexOf("}", end);
  body = body.substring(start, end + 1);
  let tmp = eval("(" + body + ")");
  tmp["mediaDefinition"].forEach(v => {
    result.videos.push({ quality: v["quality"], video: v["videoUrl"] });
  });
  result["poster"] = tmp["poster"];
  result["title"] = tmp["title"];
  result["duration"] = tmp["duration"];
  return { status: true, data: result };
}
