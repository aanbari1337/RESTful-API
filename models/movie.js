const moongose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = moongose.model(
  "Movie",
  new moongose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(50),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required().min(0),
    dailyRentalRate: Joi.number().required().min(0),
  });

  return schema.validate(movie)
}

exports.Movie = Movie
exports.validate = validateMovie