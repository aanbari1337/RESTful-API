const moongose = require("mongoose");
const Joi = require("joi");

const Genre = moongose.model(
  "Genre",
  new moongose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(genre);
}

module.exports.Genre = Genre
module.exports.validate = validateGenre