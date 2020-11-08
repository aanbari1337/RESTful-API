const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://aanbari:MJAocyUpUidaPiIR@restfulapi.b0q7e.mongodb.net/DbRestfulApi?retryWrites=true&w=majority",
    { useNewUrlParser: true ,  useUnifiedTopology: true }
  )
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("couldn't connect"));

app.use("/api/genres", genres);
app.use("/api/customer", customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));
