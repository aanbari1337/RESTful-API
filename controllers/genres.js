const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save(genre);
  res.send(genre);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("the genre with the given id doesn't exist");
  res.send(genre);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("the genre with the given id doesn't exist");
  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("the genre with the given id doesn't exist");
  res.send(genre);
});

module.exports = router;
