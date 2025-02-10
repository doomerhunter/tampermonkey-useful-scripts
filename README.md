## Context

This repo will contain useful tampermonkey scripts that I use during bug hunting. 
The idea is to setup a collection of easily available / adaptable scripts to quickly modify the DOM's properties, such as unlocking hidden fields, enabling fields...

Feel free to PR / submit ideas ans scripts.

Blog post : 
- [https://blog.doomer.fr/dynamic-dom-rewriting-to-bypass-client-side-controls](https://blog.doomer.fr/dynamic-dom-rewriting-to-bypass-client-side-controls)

Tampermonkey : 
- [https://www.tampermonkey.net/](https://www.tampermonkey.net/)

## Scripts 

- rewrite-element-class.js
  - Get all the elements by their tag name, in this case `div`
  - Iterate over these elements and check if they have a certain attribute (`class`)
  - If that attribute contains a string that I don't like (`disabled`)
  - Then rewrite that attribute 

- Google Search tools
  - google-extract-search-links.js
  - export-dl-clear-collectedLinks.js
 
Press Ctrl+Shift+E to extract all the links on a Google Search page (ex : Google Dorks) and go to the next page of search results.
The links are stored inside the local storage for cross-page-memory. The key is called collectedLinks.

Keep pressing Ctrl+Shift+E and go brrr

Use the other tampermonkey script to retrieve the results in your clipboard and auto-download them to the disk (export-dl-clear-collectedLinks.js) :
Right Click > Tampermonkey > Export

GIF : 

![https://raw.githubusercontent.com/doomerhunter/tampermonkey-useful-scripts/refs/heads/main/media/google-search.gif](https://raw.githubusercontent.com/doomerhunter/tampermonkey-useful-scripts/refs/heads/main/media/google-search.gif)
