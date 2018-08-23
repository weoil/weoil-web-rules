import * as cheerio from "cheerio";
import { Rule } from "../types/rule";
export default async function fembed(
  url: string,
  content: string,
  options: Rule.ruleItemOption
): Promise<Rule.ruleResult> {
  if (!/sis001/.test(url)) return { status: false };
  let result = {};
  let $ = cheerio.load(content);
  let usernames = $("cite > a");
  let targetName = usernames.eq(0).text();
  let indexs = [0];
  usernames.each((index, value) => {
    if (index === 0) return;
    if ($(value).text() === targetName) indexs.push(index);
  });
  let text = "";
  let texts = $("div .t_msgfont .noSelect");
  texts.each((index, value) => {
    if (!indexs.includes(index)) return;
    let t = $(value).text();
    if (t.length < 200) return;
    text += t;
  });
  let title = $("div .postmessage>h2").text();
  let type = $("div .mainbox.viewthread>h1>a").text();
  let date = /([\d]*-[\d]*-[\d]* [\d]*:[\d]*)/.exec(content)[1];
  type = type.substring(1, type.length - 1);
  result = { text, title, type, date };
  return {
    status: true,
    data: result
  };
}
