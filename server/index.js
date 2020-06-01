const express = require("express");
const monk = require("monk");
const cors = require("cors");
const morgan = require("morgan");
// const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({ status: "sexy" });
});

app.listen(5000, () => console.log("listening at port 5000"));
