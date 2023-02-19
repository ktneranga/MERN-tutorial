const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/UserController');
const {authHandler} = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me',authHandler, getMe);

module.exports = router;