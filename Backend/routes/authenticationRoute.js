const express = require('express');

const router=express.Router();
const { redirectToGoogleLogin } = require('../controllers/auth');


router.post('/google', (req, res) => {
  const authUrl = redirectToGoogleLogin(); 
  res.redirect(authUrl); 
});


module.exports = router;