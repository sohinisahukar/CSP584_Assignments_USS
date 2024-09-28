const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const CustomerAddress = require('../models/CustomerAddress');

// POST: Add a new address
router.post('/', [
  check('userId', 'User ID is required').notEmpty(),
  check('street', 'Street is required').notEmpty(),
  check('city', 'City is required').notEmpty(),
  check('state', 'State is required').notEmpty(),
  check('zipCode', 'ZIP Code is required').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, street, city, state, zipCode, name } = req.body;

  try {
    // Create a new address in the database
    const newAddress = await CustomerAddress.create({
      userId,
      street,
      city,
      state,
      zipCode,
      name
    });

    res.status(201).json(newAddress); // Return the created address
  } catch (error) {
    console.error('Error creating new address:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Fetch all addresses for a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Fetch all addresses associated with the user
      const addresses = await CustomerAddress.findAll({
        where: { userId },
      });
  
      // If no addresses are found
      if (addresses.length === 0) {
        return res.status(200).json({ message: 'No addresses found', addresses: [] });
      }
  
      res.status(200).json(addresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
