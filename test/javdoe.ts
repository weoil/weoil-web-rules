import rule from "../src/index";

async function javdoe() {
  let r = await rule(
    "https://www.javdoe.com/movie/red-post-454-parisi-ntr-only-me-to-a-short-and-small-phimosis-she-is-stupid-i-invited-you-at-her-birthday-party-decquinnity-18-cm-friend-lost-asleep-4-when-i-got-drunk-i-woke-up-and-talked-about-having-fun-sex-with-her-friends-invited.html",
    { proxy: "http://127.0.0.1:1080" }
  );
  console.log(r.data);
}
javdoe();
