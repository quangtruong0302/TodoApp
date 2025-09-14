import React from "react";
import "./TodoItem.css";

const TodoItem = ({
  id,
  value,
  isImportant,
  isCompleted,
  // handleCompleteCheckboxChange,
  handleTodoItemClick,
}) => {
  // const handleClick = () => {
  //   alert(value);
  // };
  return (
    <div className="todo-item" onClick={() => handleTodoItemClick(id)}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => handleCompleteCheckboxChange(id)}
        /> */}
        {isCompleted ? (
          <div style={{ color: "#2ecc71" }}>
            <i className="fa-regular fa-circle-check"></i>
          </div>
        ) : (
          <div style={{ color: "#bdc3c7" }}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        )}

        <p>{value}</p>
      </div>
      {isImportant && (
        <div className="buton-isImportant">
          <button>{isImportant && <i className="fa-solid fa-star"></i>}</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
