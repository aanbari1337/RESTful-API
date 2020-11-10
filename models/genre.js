const moongose = require("mongoose");
const Joi = require("joi");

const genreSchema = new moongose.model({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = moongose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(genre);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;
