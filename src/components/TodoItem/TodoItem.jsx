import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./TodoItem.css";

const TodoItem = ({ id, value, isImportant, isCompleted }) => {
  const { handleTodoItemClick } = useContext(AppContext);
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
