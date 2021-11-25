require('express-async-errors');
const winston = require('./util/logger')
const morgan = require('morgan')
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
Joi.objectId = require("joi-objectid")(Joi);



const app = express()
const jwtPrivateKey = config.get("jwtPrivateKey")
const dbURL = config.get('dbURL')
if (!jwtPrivateKey || !dbURL) {
  console.log("FATAL ERROR");
  process.exit(1)
}

app.use(express.json());
mongoose
.connect(dbURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  )
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("couldn't connect"));
  
app.use(morgan('combined', { stream: winston.stream }));
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));
