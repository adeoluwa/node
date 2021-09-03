const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.ejs', {
    title: 'Home | Welcome',
  });
});

router.get('/about-us', (req, res, next) => {
  res.render('about.ejs', {
    title: 'About my App😎',
    description: 'A very smooth application done by me',
  });
});

router.get('/contact-us', (req, res, next) => {
  res.render('contact.ejs', {
    title: 'Contact us',
  });
});

router.post('/contact-us', (req, res, next) => {
  console.log(req.body);
});

router.post('/description', (req, res, next) => {
  res.redirect('/')
});

module.exports = router;
