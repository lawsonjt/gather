const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('user visits create page', () => {
    describe('posts a new item', () => {
       it('renders item to page', () => {
           const itemToCreate = buildItemObject();
           browser.url('/items/create');

           browser.setValue('#title-input', itemToCreate.title);
           browser.setValue('#description-input', itemToCreate.description);
           browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
           browser.click('#submit-button');

           assert.include(browser.getText('body'), itemToCreate.title);
           assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
       });
    });
});
