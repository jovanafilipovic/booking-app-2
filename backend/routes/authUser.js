// const express = require('express');
// const router = express.Router();
// const Item = require('../models/item'); // Use the shared model

// router.post('/signUp', async (req, res) => {

//     console.log("JOVANA")
//   const { email, password } = req.body;

//   try {
//     const existingUser = await Item.findOne({ itemType: 'user', email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const newUser = new Item({ itemType: 'user', email, password });
//     await newUser.save();

//     res.status(200).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const {
  login,
  register,
  getAllUsers,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;
