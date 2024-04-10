// ==UserScript==
// @name         demo
// @namespace    http://tampermonkey.net/
// @version      2024-04-10
// @description  try to take over the world!
// @author       You
// @match        https://www.yourtarget.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';

var divs = document.getElementsByTagName('div');
for (var indexdivs = 0; indexdivs < divs.length; ++indexdivs) {
    var classAttribute = divs[indexdivs].getAttribute("class");

    // Check if class attribute exists and contains the string "disabled"
    if (classAttribute && classAttribute.includes("your-pattern-that-contains-something-you-dont-like-such-as-disabled")) {
        console.log("FOUND " + classAttribute);
        // Remove "disabled" from the class list
        divs[indexdivs].setAttribute("class", "your-new-class-without-the-disabled-value");

    }
}


})();
