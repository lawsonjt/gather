const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe('POST', () => {
        it('Removes the item by :id', async () => {
            const item = await seedItemToDatabase();
            // CastError: Cast to ObjectId failed for value "5bfb18c8861c0faadbfa77671" at path "_id" for model "Item"

            await request(app).post(`/items/${item._id}/delete`);
            const response = await request(app).get('/');

            assert.notInclude(response.text, `item-${item._id}`);
        });

        it('Should not remove the item if id is different', async () => {
            const item = await seedItemToDatabase();
            const wrongItemId = item._id + 1;

            await request(app).post(`/items/${wrongItemId}/delete`);
            const response = await request(app).get('/');

            assert.include(response.text, `item-${item._id}`);
        });

        it('Redirects to home after removing', async () => {
            const item = await seedItemToDatabase();

            const response = await request(app)
                .post(`/items/${item._id}/delete`);

            assert.equal(response.status, 302);
            assert.equal(response.headers.location, '/');
        });

        it('Redirects to home if no item is removed', async () => {
            const item = await seedItemToDatabase();
            const wrongItemId = item._id + 1;

            const response = await request(app)
                .post(`/items/${wrongItemId}/delete`);

            assert.equal(response.status, 302);
            assert.equal(response.headers.location, '/');
        });
    });
});