export default {
    qs: (selector = '*', element = document) => {
        return element.querySelector(selector);
    },
    qsa: (selector = '*', element = document) => {
        return [...element.querySelectorAll(selector)];
    },
    createElement: (obj) => {
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
    }
}
