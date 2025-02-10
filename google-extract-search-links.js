// ==UserScript==
// @name         Google - Extract links to LS and paginate
// @namespace    http://tampermonkey.net/
// @version      2025-02-10
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

// This script listens for Ctrl+shift+E
// When pressed, it will extract the google search links using a document.querySelectorAll
// And store them inside the local storage for cross-page-memory. The key is called collectedLinks
// It will then press "Next" on the results to automatically load the next page
// Keep pressing Ctrl+Shift+E and go brrr
// Use the other tampermonkey script to retrieve the results in your clipboard and auto-download them to the disk
// export-dl-clear-collectedLinks.js

// replace the @run at by :
// // @run-at       context-menu
// to remove the hotkey shortcut and trigger it by right click > tampermonkey



(function() {
    'use strict';
    console.log("tampered");

    // Function to collect and process links
    function processLinks() {
        // Initialize localStorage if it doesn't exist
        if (!localStorage.getItem('collectedLinks')) {
            localStorage.setItem('collectedLinks', JSON.stringify([]));
        }

        // Get current links and add them to localStorage
        let currentLinks = [...document.querySelectorAll('a')]
            .map(n => n.href)
            .filter(url => !url.includes('.google') && !url.startsWith('javascript:') && url !== '');

        let storedLinks = JSON.parse(localStorage.getItem('collectedLinks'));
        storedLinks.push(...currentLinks);
        localStorage.setItem('collectedLinks', JSON.stringify([...new Set(storedLinks)])); // Remove duplicates

        console.log("Current storage:", JSON.parse(localStorage.getItem('collectedLinks')));
        console.log("Next page...");

        // Click next and wait for page load
        const nextButton = document.getElementById('pnnext');
        if (nextButton) {
            nextButton.click();

            setTimeout(() => {
                console.log("Links before:", JSON.parse(localStorage.getItem('collectedLinks')));

                // Get new links and add them to localStorage
                let newLinks = [...document.querySelectorAll('a')]
                    .map(n => n.href)
                    .filter(url => !url.includes('.google') && !url.startsWith('javascript:') && url !== '');

                let updatedLinks = JSON.parse(localStorage.getItem('collectedLinks'));
                updatedLinks.push(...newLinks);
                localStorage.setItem('collectedLinks', JSON.stringify([...new Set(updatedLinks)])); // Remove duplicates

                console.log("Links after:", JSON.parse(localStorage.getItem('collectedLinks')));
            }, 2000); // Adjust timeout as needed
        }

        console.log("pause");
        console.log("Current storage:", JSON.parse(localStorage.getItem('collectedLinks')));
    }

    // Add keyboard shortcut listener
    document.addEventListener('keydown', function(e) {
        // Check if Ctrl+Shift+E is pressed
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault(); // Prevent default browser behavior
            processLinks();
        }
    });
})();
