const express = require("express");
const monk = require("monk");
const cors = require("cors");
const morgan = require("morgan");
// const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const db = monk("localhost/todo");
const tasks = db.get("tasks");

app.get("/", (req, res) => {
  res.json({ status: "sexy" });
});

app.get("/tasks", async (req, res) => {
  const taskList = await tasks.find();
  res.status(200).json(taskList);
});

app.post("/tasks", async (req, res) => {
  const { name, completed } = req.body;
  if (!validateTask(name, completed)) {
    return res.status(405).json({ status: "invalid task" });
  }
  const newTask = await tasks.insert(req.body);
  res.status(200).json(newTask);
});

app.patch("/tasks/:id", async (req, res) => {
  // console.log(req.params.id);
  const _id = req.params.id;
  const { name } = req.body;

  const task = await tasks.findOne(req.params.id);
  if (task) {
    res.status(200).json(await tasks.update({ _id }, { $set: { name: name } }));
  }
});

app.get("/test", (req, res) => {
  res.status(200).json([
    { name: "make breakfast", completed: false, id: 420 },
    { name: "make dinner", completed: true, id: 69 },
  ]);
});

function validateTask(name, completed) {
  return (
    name !== "" && typeof completed === "boolean" && typeof name === "string"
  );
}

app.listen(5000, () => console.log("listening at port 5000"));
