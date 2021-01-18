const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const error = require("./middleware/error");

const app = express();
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR");
  process.exit(1);
}
Joi.objectId = require("joi-objectid")(Joi);

app.use(express.json());
mongoose
  .connect(
    "*************",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("couldn't connect"));

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));
