import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Loading from "./components/Loading";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);
const URL = "http://localhost:5000/tasks";

function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loaded, toggleLoaded] = useState(false);

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await fetch(URL);
        setTasks(await response.json());
        toggleLoaded(true);
      } catch (err) {
        toggleLoaded(false);
      }
    }
    getTasks();
    // add animation stuff
  }, []);

  function toggleTaskCompleted(id) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (id === task._id) return { ...task, completed: !task.completed };
        return task;
      });
    });
  }

  async function addTask(name) {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, completed: false }),
    });
    const newTask = await res.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function deleteTask(id) {
    // need to delete from server
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task._id !== id);
    });
  }

  async function editTask(id, name) {
    const res = await fetch(URL + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, name }),
    });
    const json = await res.json();

    json.ok &&
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (id === task._id) return { ...task, name };
          return task;
        });
      });
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task._id}
        name={task.name}
        completed={task.completed}
        key={task._id}
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

  const loadingDiv = (
    <div className="loading">
      <Loading />
    </div>
  );

  const done = (
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

  return loaded ? done : loadingDiv;
}

export default App;
