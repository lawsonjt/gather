const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User deletes an item', () => {
    describe('item exists', () => {
        it('Removes the item and renders without the item', () => {
            const {title, description, imageUrl} = buildItemObject();

            browser.url('/items/create');
            browser.setValue('#title-input', title);
            browser.setValue('#description-input', description);
            browser.setValue('#imageUrl-input', imageUrl);
            browser.click('#submit-button');
            // assert item is rendered
            assert.include(browser.getText('body'), title);
            assert.include(browser.getAttribute('body img', 'src'), imageUrl);

            browser.submitForm('.delete-form'); // submit is deprecated WDIO.  unable to find alternative

            assert.notInclude(browser.getText('body'), title);
            assert.notInclude(browser.getAttribute('body img', 'src'), imageUrl);
        });
    });
});