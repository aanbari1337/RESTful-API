const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require("express");
const mongoose = require("mongoose");
const {User, validate} = require('../models/user')
const config = require("config");
const jwt = require('jsonwebtoken')

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

  user = new User(_.pick(req.body, ['name','email','password','isAdmin']));
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save();

  const token = user.generateToken()
  res.header('x-auth-token',token).send(_.pick(user, ['name','email']));
});

module.exports = router;
