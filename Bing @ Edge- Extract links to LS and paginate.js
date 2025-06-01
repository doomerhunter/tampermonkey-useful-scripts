// ==UserScript==
// @name         Bing - Extract links to LS and paginate
// @namespace    http://tampermonkey.net/
// @version      2025-06-01
// @description  Extract Bing search links to localStorage and auto-paginate
// @author       You
// @match        https://www.bing.com/search?*
// @icon         https://www.bing.com/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    console.log("تم تفعيل السكربت");

    // Function to clean Bing tracking URLs
    function cleanUrl(url) {
        try {
            const urlObj = new URL(url);
            const redirectUrl = urlObj.searchParams.get('u');
            if (redirectUrl && redirectUrl.startsWith('a1')) {
                return atob(redirectUrl.slice(2)); // Decode base64 after removing 'a1' prefix
            }
            return url; // Return original URL if no redirect
        } catch (e) {
            console.error("فشل فك تشفير الرابط:", url, e);
            return null; // Return null for invalid URLs
        }
    }

    // Function to collect and process links
    function processLinks() {
        // Initialize localStorage if it doesn't exist
        if (!localStorage.getItem('collectedLinks')) {
            localStorage.setItem('collectedLinks', JSON.stringify([]));
        }

        // Wait for search results to load
        const waitForResults = setInterval(() => {
            const results = document.querySelectorAll('#b_results li.b_algo a[href]');
            const resultsContainer = document.querySelector('#b_results');
            if (resultsContainer) {
                clearInterval(waitForResults); // Stop waiting once results container is found

                // Get current links from Bing search results
                let currentLinks = [...results]
                    .map(n => cleanUrl(n.href)) // Clean tracking URLs
                    .filter(url => url && !url.includes('bing.com') && !url.startsWith('javascript:') && url !== '');

                if (currentLinks.length === 0) {
                    console.log("لم يتم العثور على روابط في نتائج البحث");
                    console.log("حاوية النتائج موجودة:", !!resultsContainer);
                } else {
                    let storedLinks = JSON.parse(localStorage.getItem('collectedLinks'));
                    storedLinks.push(...currentLinks);
                    localStorage.setItem('collectedLinks', JSON.stringify([...new Set(storedLinks)])); // Remove duplicates
                    console.log("الروابط المجمعة:", currentLinks);
                    console.log("التخزين الحالي:", JSON.parse(localStorage.getItem('collectedLinks')));
                }

                // Click next page
                const nextButton = document.querySelector('a[title="Next page"], a.sb_pagN, a[aria-label="Next Page"], a.b_pag a');
                if (nextButton) {
                    console.log("الانتقال إلى الصفحة التالية...");
                    nextButton.click();
                } else {
                    console.log("لا توجد صفحة تالية");
                    alert("تم جمع كل الروابط! استخدم 'Export and Clear' لتصديرها.");
                }
            }
        }, 2000); // Check every 2000ms
    }

    // Add keyboard shortcut listener with explicit key check
    document.addEventListener('keydown', function(e) {
        // Check if Ctrl+Shift+E is pressed (case-insensitive)
        if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
            e.preventDefault(); // Prevent default browser behavior
            console.log("تم الضغط على Ctrl+Shift+E");
            processLinks();
        }
    });
})();
