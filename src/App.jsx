import "./App.css";
import { useRef, useMemo, useContext } from "react";
import TodoItem from "./components/TodoItem/TodoItem.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import FilterPanel from "./components/FilterPanel/FilterPanel.jsx";
import { AppContext } from "./contexts/AppContext.jsx";

function App() {
  const {
    selectedCategoryId,
    todoList,
    setTodoList,
    showSidebar,
    activeTodoItemId,
    selectedFilterId,
    searchText,
    handleTodoItemChange,
    setShowSidebar,
    handleCompleteCheckboxChange,
    handleTodoItemClick,
  } = useContext(AppContext);
  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);
  const inputRef = useRef();
  const handleAddNewTask = (e) => {
    if (e.key == "Enter" && e.target.value) {
      setTodoList([
        ...todoList,
        {
          id: crypto.randomUUID(),
          title: e.target.value,
          isImportant: false,
          isCompleted: false,
          isDeleted: false,
          category: "personal",
        },
      ]);
      inputRef.current.value = "";
    }
  };

  const filteredTodos = useMemo(() => {
    const q = (searchText || "").trim().toLowerCase();
    return todoList.filter((todo) => {
      if (q && !todo.title.includes(searchText)) {
        return false;
      }
      if (selectedCategoryId && selectedCategoryId !== todo.category) {
        return false;
      }
      switch (selectedFilterId) {
        case "all":
          return !todo.isDeleted;
        case "important":
          return todo.isImportant && !todo.isDeleted;
        case "completed":
          return todo.isCompleted && !todo.isDeleted;
        case "deleted":
          return todo.isDeleted;
        default:
          break;
      }
    });
  }, [selectedFilterId, todoList, searchText, selectedCategoryId]);

  return (
    <div className="container">
      <FilterPanel></FilterPanel>
      <div className="main-content">
        <input
          type="text"
          name="add-new-task"
          placeholder="Thêm việc cần làm"
          className="task-input"
          ref={inputRef}
          // onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleAddNewTask(e)}
        />
        <div>
          {
            <div>
              {filteredTodos
                .slice()
                .reverse()
                .map((todo) => (
                  <TodoItem
                    id={todo.id}
                    value={todo.title}
                    isImportant={todo.isImportant}
                    isCompleted={todo.isCompleted}
                    handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                    handleTodoItemClick={handleTodoItemClick}
                    key={todo.id}
                  />
                ))}
            </div>
          }
        </div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItem.id}
            activeTodoItem={activeTodoItem}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          ></Sidebar>
        )}
      </div>
    </div>
  );
}

export default App;
