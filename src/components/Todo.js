import React, { useState } from "react";

export default function Todo(props) {
  const {
    name,
    completed,
    id,
    toggleTaskCompleted,
    deleteTask,
    editTask,
  } = props;
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, e.target[0].value);
    setEditing(!isEditing);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input id={props.id} className="todo-text" type="text" />
      </div>
      <div className="btn-group">
        <button
          onClick={() => setEditing(false)}
          type="button"
          className="btn todo-cancel"
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button onClick={() => setEditing(true)} type="button" className="btn">
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
