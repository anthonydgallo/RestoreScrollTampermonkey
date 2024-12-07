// ==UserScript==
// @name         Restore Scrollbar
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Restore scrollbar if a site removes it
// @author       You
// @match        *://example.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // A function to restore scrollbars by overriding the inline styles.
    function restoreScroll() {
        const html = document.documentElement;
        const body = document.body;

        // Check computed styles to see if overflow is hidden
        const htmlStyle = window.getComputedStyle(html).overflow;
        const bodyStyle = window.getComputedStyle(body).overflow;

        // If either is set to hidden, override it.
        if (htmlStyle === 'hidden' || html.style.overflow === 'hidden') {
            html.style.overflow = 'auto';
        }
        if (bodyStyle === 'hidden' || body.style.overflow === 'hidden') {
            body.style.overflow = 'auto';
        }

        // You can also remove known classes that disable scrolling if applicable
        // For example: html.classList.remove('no-scroll');
    }

    // Run once on page load
    restoreScroll();

    // Use a MutationObserver to watch for changes and restore if needed
    const observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            if (mutation.target && (mutation.target === document.documentElement || mutation.target === document.body)) {
                // If something changes in html or body, try restoring scroll again
                restoreScroll();
            }
        }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
})();
