const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
    const items = await Item.find({});

    res.render('index', { items });
});

// items routes
router.get('/items/create', (req, res, next) => {
    res.render('create');
});

router.post('/items/create', async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const newItem = new Item({ title, description, imageUrl });

    newItem.validateSync();
    if (newItem.errors) {
        res.status(400).render('create', { newItem: newItem });
    } else {
        await newItem.save();
        res.redirect('/');
    }
});

router.get('/items/:itemId', async (req, res, next) => {
    const id = req.params.itemId;
    const item = await Item.findById(id);

    res.render('single-item', { item });
});

router.post('/items/:itemId/delete', async (req, res, next) => {
    const id = req.params.itemId;

    try {
        await Item.findByIdAndRemove(id);
    } catch (e) {
        // what to do if there's an error?
        console.log(e);
    }

    res.redirect('/');

});

module.exports = router;
