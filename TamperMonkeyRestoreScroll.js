// ==UserScript==
// @name         Restore Scrollbar Conditionally
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Restore scrollbar if a site removes it, only when overflow is actually hidden
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function isOverflowHidden(elem) {
        const style = window.getComputedStyle(elem);
        return (style.overflow === 'hidden' || style.overflowY === 'hidden');
    }

    function restoreScrollIfNeeded() {
        const html = document.documentElement;
        const body = document.body;

        const htmlHidden = isOverflowHidden(html);
        const bodyHidden = isOverflowHidden(body);

        // Only restore if one of them is hidden
        if (htmlHidden) {
            html.style.overflow = 'auto';
        }
        if (bodyHidden) {
            body.style.overflow = 'auto';
        }
    }

    // Initial check
    restoreScrollIfNeeded();

    const observer = new MutationObserver(mutations => {
        // Check if overflow is hidden; only then restore
        const htmlHidden = isOverflowHidden(document.documentElement);
        const bodyHidden = isOverflowHidden(document.body);

        if (htmlHidden || bodyHidden) {
            restoreScrollIfNeeded();
        }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
})();
