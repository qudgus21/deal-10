import pagetest from "./pages/pagetest.js";

if (window.location.href == "/page1") {
  console.log("dd");
}

new pagetest({ parent: document.querySelector("body") });
