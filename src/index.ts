import { Rule } from "./types/rule";
import request from "./util/request";

import javdoe from "./rule/javdoe";
import sis from "./rule/sis";
import eporner from "./rule/eporner";
import javfinder from "./rule/javfinder";
import kaplog from "./rule/kaplog";
import porn from "./rule/porn";
import pornhd from "./rule/pornhd";
import pornhub from "./rule/pornhub";
import redtube from "./rule/redtube";
import streamjav from "./rule/streamjav";
import xhamster from "./rule/xhamster";
import youjizz from "./rule/youjizz";
import porn91 from './rule/91porn'

const rules = {
    javdoe,
    sis,
    eporner,
    javfinder,
    kaplog,
    porn,
    pornhd,
    pornhub,
    redtube,
    streamjav,
    xhamster,
    porn91,
    youjizz
  },
  defaultOptions: Rule.ruleOption = {
    proxy: "",
    ruleName: ""
  };
async function rule(
  url: string,
  content: string,
  options: Rule.ruleOption
): Promise<Rule.ruleResult>;
async function rule(
  url: string,
  options: Rule.ruleOption
): Promise<Rule.ruleResult>;
async function rule(url: string): Promise<Rule.ruleResult>;
async function rule(
  url: string,
  content?: any,
  options?: any
): Promise<Rule.ruleResult> {
  options = { ...options, ...defaultOptions };
  if (!content || typeof content === "object") {
    if (typeof content === "object") {
      options = { ...options, ...content };
    }
    content = await request.get(url, { proxy: options.proxy });
  }
  let ruleItems = [];
  if (options.ruleName) {
    ruleItems.push(rules[options.ruleName]);
  } else {
    ruleItems = Object.keys(rules).map(ruleName => {
      return rules[ruleName];
    });
  }
  for (let ruleItem of ruleItems) {
    try {
      let result = await ruleItem(url, content, options);
      if (result.status) return result;
    } catch (e) {
      return {
        status: false,
        message: e.message
      };
    }
  }
  return {
    status: false,
    message: `No module for ${url}`
  };
}
export default rule;
module.exports = rule;
