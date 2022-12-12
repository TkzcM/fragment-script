// ==UserScript==
// @name         Fragment - Reveal the masked random number
// @namespace    http://t.me/TkzcM
// @version      0.1
// @description  Durov's number is nowhere to hide!
// @author       Tkzc
// @connect      fragment.com
// @match        https://fragment.com/number/random
// @grant none
// ==/UserScript==

(async function () {
  "use strict";
  const apiHash = document.body.innerHTML.match(/hash=(.+?)"/)[1];
  const apiReq = await fetch("https://fragment.com/api?hash=" + apiHash, {
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    referrer: "https://fragment.com/number/random",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: "method=getRandomNumberLink",
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const apiJSON = await apiReq.json();
  const realLink = apiJSON.link.replace(
    "https://app.tonkeeper.com/v1/txrequest-url/",
    ""
  );
  const api2Req = await fetch("https://" + realLink, {
    referrer: "https://fragment.com/number/random",
    referrerPolicy: "strict-origin-when-cross-origin",
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const api2JSON = await api2Req.json();
  const realNumber = atob(
    api2JSON.body.params.messages[0].payload.match(/aHR0.+?qc29u/)[0]
  )
    .replace("https://nft.fragment.com/number/", "")
    .replace(".json", "")
    .replace("888", "");

  const div = document.getElementsByClassName("tm-number-codes")[0];
  const button = document.createElement("button");
  button.className = "btn btn-primary btn-block tm-number-code-button";
  const span = document.createElement("span");
  span.textContent = "Reveal Number";
  span.className = "tm-button-label";
  button.appendChild(span);
  button.addEventListener("click", function () {
    document.getElementsByClassName(
      "tm-number-code-field tm-nocopy"
    )[0].textContent = ` +888 ${realNumber.slice(0, 4)} ${realNumber.slice(
      4,
      8
    )} `;
    try {
      document.getElementsByClassName("js-spoiler")[0].remove();
    } catch (e) {}
  });
  div.insertBefore(
    button,
    document.getElementsByClassName(
      "btn btn-primary btn-block tm-number-code-button js-buy-random-btn"
    )[0]
  );
})();
