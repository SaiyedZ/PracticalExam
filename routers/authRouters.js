const express = require('express');
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

const router = express.Router();


router.get('/register', (req, res) => res.render('register')); 
router.post('/register', registerUser); 


router.get('/login', (req, res) => res.render('login')); 
router.post('/login', loginUser); 


router.get('/logout', logoutUser);

module.exports = router;
