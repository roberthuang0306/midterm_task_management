const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

router.get('/', (req, res) => {
  Item.find()
    .sort({ end: 1 })
    .then(items => res.json(items));
});


router.post('/', (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
  });

  newItem.save().then(item => res.json(item));
});


router.put('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.title = req.body.title;
      item.start = req.body.start;
      item.end = req.body.end;

      item.save().then(() => {
        res.json(item);
      })
    })
    .catch(err => {
      res.status(400).json({ success: false });
    })
})


router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;