import rule from "../src/index";
// const request =require() "../util/request";

async function sis() {
  let r = await rule("http://sis001.com/forum/thread-10046515-1-22.html", {
    proxy: "http://127.0.0.1:1080"
  });
}
sis();
