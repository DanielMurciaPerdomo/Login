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


router.route('/').get(getUsers).post(createUser);
router.post('/register', register);
router.post('/login', login);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;