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
