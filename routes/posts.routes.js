const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.query);
  res.send('hey my post');
});

router.get('/:name', (req, res, next) => {
  console.log(req.params);
  res.send('hey my post');
});

module.exports = router;
