// ==UserScript==
// @name         Pull Request description generator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  GitHub Commit history retrieval for Pull Requests
// @author       BucurEva87
// @match        https://github.com/*/compare/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const qs = (selector = '*', element = document) => {
        return element.querySelector(selector);
    };
    const qsa = (selector = '*', element = document) => {
        return [...element.querySelectorAll(selector)];
    };
    const createElement = (obj) => {
        const element = document.createElement(obj.tagName ? obj.tagName : 'div');
        delete obj.tagName;

        Object.entries(obj).forEach(([prop, value]) => {
            if (prop === 'class') {
                if (typeof value === 'object') {
                    element.classList.add(...value);
                } else {
                    element.classList.add(value);
                }
            } else if (prop === 'data' && typeof value === 'object') {
                Object.entries(value).forEach(([prop, value]) => {
                    element.dataset[prop] = value;
                });
            } else {
                element[prop] = value;
            }
        });

        return element;
    };

    const grabCommitHistory = () => {
        const maxCommits = 40;
        const maxSynthesizedCommits = 12;
        const commitsNumber = +qs('svg.octicon.octicon-git-commit').nextElementSibling.textContent.trim();

        if (commitsNumber > maxCommits) {
            if (!confirm(`Your commit history has ${commitsNumber} commits. Using this tool is not recomended when more than ${maxCommits} are present in the branch. Are you sure you want to continue?`)) {
                return;
            }
        }

        const commitHistoryLists = qsa('ol.Box.Box--condensed');
        const commitHistoryLis = commitHistoryLists.map(list => qsa('li', list)).flat();
        const commits = new Set(commitHistoryLis.map(li => `"${qs('div > p > a', li).textContent.toLowerCase()}"`));
        const excludePatterns = ['merge', 'delete', 'fix', 'clean'];
        const pattern = new RegExp(`^"(${excludePatterns.join('|')})`)
        const message = `This is an array of all the commits that were made inside a branch:

        [${ [...commits].filter( commit => !pattern.test(commit) ).join(', ') }]

        Synthesize the essential achievements made and write a proper pull request message.
        UNDER NO CIRCUMSTANCES list more than ${maxSynthesizedCommits} points, even if the commits array
        holds more entries than that. The description should be explicit, but brief. Keep it simple.
        The message must be structured and professional. Format the message in markdown language notation,
        as it is going to be used inside a textarea box that supports (and expects) such a notation.
        List with markdown checkboxes the most important changes made in the current branch.
        Please end the message by thanking for the review.`;

        navigator.clipboard.writeText(message)
            .then(() => { alert('Your message has been generated!'); })
            .catch(error => { alert(`There was an error while generating the message: ${error}`); });
    };

    const pullRequestBtn = qs('button[type=submit].hx_create-pr-button');
    const commitHistoryBtn = createElement({
        tagName: 'button',
        class: [...pullRequestBtn.classList],
        textContent: 'Generate commit history'
    });

    commitHistoryBtn.style.borderRadius = '6px';
    commitHistoryBtn.style.marginRight = '5px';
    commitHistoryBtn.style.backgroundColor = '#000080';
    commitHistoryBtn.addEventListener('mouseover', () => { commitHistoryBtn.style.backgroundColor = '#1818b5'; });
    commitHistoryBtn.addEventListener('mouseout', () => { commitHistoryBtn.style.backgroundColor = '#000080'; });
    commitHistoryBtn.addEventListener('click', grabCommitHistory);

    pullRequestBtn.parentElement.parentElement.prepend(commitHistoryBtn);
})();