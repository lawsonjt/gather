const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
    const items = await Item.find({});

    res.render('index', { items });
});

// Add additional routes below:
router.get('/items/create',  (req, res, next) => {
    res.render('create');
});

router.post('/items/create', async (req, res, next) => {
    const items = [req.body];

    res.render('index', { items });
});

module.exports = router;
