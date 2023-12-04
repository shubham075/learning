const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('conference');
});
router.get('/home', async (req, res) => {
  res.render('homepage');
});
router.get('/login', async (req, res) => {
  res.render('login');
});
module.exports = router;
