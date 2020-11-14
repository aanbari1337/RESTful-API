const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require("express");
const mongoose = require("mongoose");
const {User, validate} = require('../models/user')

const router = express.Router();



router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email})
  if (user) return res.status(400).send('the user already exist .')

  user = new User(_.pick(req.body, ['name','email','password']));
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save();
  res.send(_.pick(user, ['name','email']));
});

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     { new: true }
//   );
//   if (!genre)
//     return res.status(404).send("the genre with the given id doesn't exist");
//   res.send(genre);
// });

// router.delete("/:id", async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);
//   if (!genre)
//     return res.status(404).send("the genre with the given id doesn't exist");
//   res.send(genre);
// });

// router.get("/:id", async (req, res) => {
//   const genre = await Genre.findById(req.params.id);
//   if (!genre)
//     return res.status(404).send("the genre with the given id doesn't exist");
//   res.send(genre);
// });

module.exports = router;
