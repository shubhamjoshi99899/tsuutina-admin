const express = require("express");
const UserService = require('../services/userService');
const router = express.Router();


const register = async (req, res) => {
  try {
    console.log(req.body)
    const user = await UserService.registerUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const token = await UserService.authenticateUser(username, password);
      res.status(200).json({ success: true, token });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  };
  
  const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization header missing or invalid' });
    }
  
    const token = authHeader.split(' ')[1];
    try {
      const decoded = await UserService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ success: false, message: 'Token invalid or expired' });
    }
  };

  const fetchUser = async (req, res, next) => {
    const username = req.user.userId;
    try {
        console.log(req.user)
      const user = await UserService.fetchUser(username);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  };
  
module.exports = {
  register,
  login,
  authenticate,
  fetchUser
};

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, fetchUser);

module.exports = router;