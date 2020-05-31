import React from "react";

export default function FilterButton(props) {
  const { name, isPressed, setFilter } = props;
  return (
    <button
      onClick={() => setFilter(name)}
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
    >
      <span className="visually-hidden">Show </span>
      <span>{name} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
