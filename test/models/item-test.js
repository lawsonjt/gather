const Item = require('../../models/item');
const { assert } = require('chai');
const { mongoose, databaseUrl, options } = require('../../database');

describe('Model: Item', () => {
    beforeEach(async () => {
        await mongoose.connect(databaseUrl, options);
        await mongoose.connection.db.dropDatabase();
    });

    afterEach(async () => {
        await mongoose.disconnect();
    });

    describe('#title', () => {
        it('is a String', () => {
            const titleAsNonString = 1;
            const item = new Item({ title: titleAsNonString });

            assert.strictEqual(item.title, titleAsNonString.toString());
        });

        it('requires a title', ()=> {
            const item = new Item({title: ''});
            item.validateSync();
            assert.equal(item.errors.title.message, 'Path `title` is required.');
        });

        it('requires a description', ()=> {
            const item = new Item({description: ''});
            item.validateSync();
            assert.equal(item.errors.description.message, 'Path `description` is required.');
        });

        it('requires an imageUrl', ()=> {
            const item = new Item({imageUrl: ''});
            item.validateSync();
            assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
        });
    });
});
