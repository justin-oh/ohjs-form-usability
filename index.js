import { isInstanceOf } from '../ohjs-is/index.js';

/**
 * Ensures all form inputs are tied to a corresponding label.
 *
 * @param {HTMLFormElement} form
 */
export function connectLabels(form) {
    if (!isInstanceOf(form, HTMLFormElement)) {
        throw '`form` must be an HTMLFormElement';
    }

    Array.from(form.elements).forEach((input) => {
        if (!input.name) {
            return;
        }

        // set an "id" attribute if necessary
        if (!input.id) {
            input.id = input.name.replace(/\[|\]/g, '_');

            if ('radio' === input.type || 'checkbox' === input.type) {
                input.id += '_' + input.value;
            }
        }

        let label;

        // try to find the corresponding label
        const candidates = [
            input.parentNode,
            input.previousElementSibling,
            input.nextElementSibling,
        ];

        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];

            if (!candidate) {
                continue;
            }

            if ('LABEL' === candidate.tagName) {
                label = candidate;

                break;
            }
        }

        // if we found one and it does not have a "for" attribute
        // we will set that attribute
        if (label && !label.htmlFor) {
            label.htmlFor = input.id;
        }
    });
}

export default function(form) {
    if (!isInstanceOf(form, HTMLFormElement)) {
        throw '`form` must be an HTMLFormElement';
    }

    connectLabels(form);
}
