const router = require('express').Router();

const UserController = require('../Controllers/UserController');
const { authenticateToken } = require('../Middleware/authMiddleware');

router.post('/login', UserController.loginUser);
router.post('/signup', UserController.signupUser);
router.post('/logout', UserController.logoutUser);
router.put('/update/:userId', UserController.updateUserDetails);

router.get('/',UserController.getAllUsers);
router.get('/:userId', UserController.getUser);

module.exports = router;