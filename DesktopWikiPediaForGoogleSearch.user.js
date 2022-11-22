// ==UserScript==
// @name            DesktopWikiPediaForGoogleSearch
// @namespace       DesktopWikiPediaForGoogleSearch
// @description     Replace the google search reesult of wikipedia from mobile to desktop
// @version         0.1.0
// @license         MIT
// @author          rod24574575
// @homepageURL     https://github.com/rod24574575/DesktopWikiPediaForGoogleSearch
// @supportURL      https://github.com/rod24574575/DesktopWikiPediaForGoogleSearch/issues
// @include         /^https://[^/]*google.com[^/]*/search.*$/
// @run-at          document-idle
// ==/UserScript==

(function() {
  function hasWiki(str) {
    return /\.m\.wikipedia\.org/.test(str);
  }

  function replaceWiki(str) {
    return str.replace('.m.wikipedia.org', '.wikipedia.org');
  }

  for (const anchorElement of document.querySelectorAll('a[href][data-ved]')) {
    if (!hasWiki(anchorElement.href)) {
      continue;
    }

    anchorElement.href = replaceWiki(anchorElement.href);

    // Only for chrome.
    const pingAttribute = anchorElement.getAttribute('ping');
    if (pingAttribute) {
      anchorElement.setAttribute('ping', replaceWiki(pingAttribute));
    }

    const citeText = anchorElement.querySelector('cite')?.firstChild;
    if (citeText && citeText.nodeType === citeText.TEXT_NODE) {
      citeText.data = replaceWiki(citeText.data);
    }

    // Bypass google's link redirection warning.
    anchorElement.removeAttribute('data-jsarwt');
  }
})();
