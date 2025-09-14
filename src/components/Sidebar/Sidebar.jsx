import React, { useState, useEffect, useRef } from "react";
import "./sidebar.css";

const Sidebar = ({ activeTodoItem, handleTodoItemChange, setShowSidebar }) => {
  const [title, setTitle] = useState(activeTodoItem.title);
  const [isCompleted, setIsCompleted] = useState(activeTodoItem.isCompleted);
  const [isImportant, setIsImportant] = useState(activeTodoItem.isImportant);

  const sidebarRef = useRef(null);

  // Lắng nghe click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSidebar]);

  const handleSave = () => {
    const newTodo = { ...activeTodoItem, title, isCompleted, isImportant };
    handleTodoItemChange(newTodo);
  };

  return (
    <div className="sidebar" ref={sidebarRef}>
      <form className="sb-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <label htmlFor="sb-name">Tên việc cần làm</label>
          <input
            id="sb-name"
            name="name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="checkbox-group" style={{ color: "gold" }}>
          <label htmlFor="sb-isImportant">Việc quan trọng</label>
          <input
            id="sb-isImportant"
            name="isImportant"
            type="checkbox"
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
          />
        </div>

        <div className="checkbox-group" style={{ color: "#2ecc71" }}>
          <label htmlFor="sb-isCompleted">Đã hoàn thành</label>
          <input
            id="sb-isCompleted"
            name="isCompleted"
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
        </div>
      </form>

      <div className="sb-footer">
        <button type="button" className="button-save" onClick={handleSave}>
          <i className="fa-solid fa-floppy-disk"></i>
          <span>Lưu</span>
        </button>
        <button
          type="button"
          className="button-exit"
          onClick={() => setShowSidebar(false)}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Thoát</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
