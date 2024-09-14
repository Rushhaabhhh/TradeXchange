const router = require('express').Router();
const UserController = require('../Controllers/UserController');

router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUser);

module.exports = router;