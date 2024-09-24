// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Sign Up
router.post(
  '/signup',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required and must be valid').isIn(['Customer', 'StoreManager', 'Salesman'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;

    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = await User.create({
        username,
        email,
        password: hashedPassword,
        role
      });

      const payload = {
        user: {
          id: user.user_id,
          role: user.role
        }
      };

      const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(201).json({
        token,
        userId: user.user_id,
        username: user.username,
        userRole: user.role
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid email' });
            }

            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid password' });
            }

            // Generate JWT token
            const payload = {
                user: {
                    id: user.user_id,
                    role: user.role
                }
            };
            const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

            res.json({ 
                token,
                userId: user.user_id,
                username: user.username,
                userRole: user.role
             });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


module.exports = router;
