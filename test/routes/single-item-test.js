const { assert } = require('chai');
const request = require('supertest');

const app = require('../../app');

const { parseTextFromHTML, seedItemToDatabase } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe('GET', () => {
        it('create and view a single item', async () => {
            const item = await seedItemToDatabase();
            const itemId = item._id;

            const response = await request(app)
                .get('/items/' + itemId)
                .send(itemId);

            assert.equal(response.status, 200);
            assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
            assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
        });
    });
});
