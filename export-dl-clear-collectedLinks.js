// ==UserScript==
// @name         Export and clear Collected Links
// @namespace    http://tampermonkey.net/
// @version      2025-02-10
// @description  Automatically export and clear collected links as simple list
// @author       You
// @match      *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       context-menu
// ==/UserScript==

// right click -> Export and Clear Collected Links
// copied to clipboard
// downloaded to disk

(function() {
    'use strict';

    // Get links from localStorage
    const links = localStorage.getItem('collectedLinks');

    if (!links) {
        alert('No links found in localStorage!');
        return;
    }

    // Convert JSON array to simple list of URLs (one per line)
    const urlList = JSON.parse(links).join('\n');

    // Copy to clipboard
    navigator.clipboard.writeText(urlList)
        .then(() => console.log('Links copied to clipboard'))
        .catch(err => console.error('Failed to copy:', err));

    // Download file
    const blob = new Blob([urlList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collected_links_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Clear localStorage
    localStorage.removeItem('collectedLinks');
    console.log('Links cleared from localStorage');

    // Notify user
    alert('Links have been copied to clipboard, downloaded, and cleared from storage!');
})();
