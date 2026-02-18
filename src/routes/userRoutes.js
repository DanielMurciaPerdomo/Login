const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.route('/').get( authMiddleware, getUsers).post( authMiddleware, createUser);
router.route('/:id').get(authMiddleware, getUserById).put(authMiddleware, updateUser).delete(authMiddleware,deleteUser);

module.exports = router;