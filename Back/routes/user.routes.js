const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// auth routes
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user routes

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);

module.exports = router;
