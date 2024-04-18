// ==UserScript==
// @name         Button Remove Disabled Attribute
// @namespace    http://tampermonkey.net/
// @version      2024-04-10
// @description  Enable all disabled buttons and fields on the page.
// @author       You
// @match        https://www.target.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';

    // Select all elements with the 'disabled' attribute
    var alldisabled = document.querySelectorAll('[disabled]');

    // Loop through the found elements
    for (var index = 0; index < alldisabled.length; index++) {
        // Log each disabled element
        console.log('Removing disabled from:', alldisabled[index]);

        // Remove the 'disabled' attribute
        alldisabled[index].removeAttribute('disabled');
    }

})();
