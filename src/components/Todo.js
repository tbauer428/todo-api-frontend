import React, { useState } from "react";

const Todo = props => {
  const [editText, setEditText] = useState("");
  const [inEditMode, setEditMode] = useState(false);

  const handleInput = e => {
    e.preventDefault();
    setEditText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.handleEdit(e, props.todo.id, props.todo.completed, editText);
    setEditMode(false);
  };

  return (
    <div className="Todo">
      <div
        key={props.todo.id}
        className={props.todo.completed ? "complete" : "incomplete"}
      >
        <input
          type="checkbox"
          onClick={e =>
            props.handleComplete(
              e,
              props.todo.id,
              props.todo.completed,
              props.todo.todoText
            )
          }
        />
        {inEditMode ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={props.todo.todoText}
              onKeyUp={handleInput}
            />
          </form>
        ) : (
          <span>{props.todo.todoText}</span>
        )}
        <button onClick={e => props.handleDelete(e, props.todo.id)}>
          Delete Todo
        </button>
        {inEditMode ? (
          <button onClick={e => setEditMode(false)}>Edit Todo</button>
        ) : (
          <button onClick={e => setEditMode(true)}>Edit Todo</button>
        )}
      </div>
    </div>
  );
};

export default Todo;
