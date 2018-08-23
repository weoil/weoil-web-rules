export declare namespace Rule {
  interface ruleOption {
    proxy?: string;
    ruleName?: string;
  }
  interface ruleResult {
    status: boolean;
    data?: any;
    message?: string;
  }
  export interface ruleItemOption {
    proxy: string;
  }
}
