import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
// import logo from "./logo.svg";
// import "./App.css";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={filter === name}
      setFilter={setFilter}
    />
  ));
  const taskNoun = taskList.length === 1 ? "task" : "tasks";
  const taskHeading = `${taskList.length} ${taskNoun} remaining`;

  function toggleTaskCompleted(id) {
    const newTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(newTasks);
  }

  function addTask(name) {
    const task = { name, id: "todo-" + nanoid(), completed: false };
    setTasks([...tasks, task]);
  }

  function deleteTask(id) {
    const arr = tasks.filter((task) => task.id !== id);
    setTasks(arr);
  }

  function editTask(id, name) {
    const arr = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: name };
      }
      return task;
    });
    setTasks(arr);
  }

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{taskHeading}</h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
