import "./App.css";
import { useState, useRef, useMemo } from "react";
import TodoItem from "./components/TodoItem/TodoItem.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import FilterPanel from "./components/FilterPanel/FilterPanel.jsx";

function App() {
  const defaultTodoList = [
    {
      id: 8,
      title: "Chuẩn bị slide thuyết trình nhóm",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 9,
      title: "Hẹn gặp bạn để thảo luận đồ án",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 10,
      title: "Đi khám sức khỏe định kỳ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 11,
      title: "Thanh toán tiền điện và internet",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 12,
      title: "Làm sạch bàn học và sắp xếp tài liệu",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 13,
      title: "Học thêm về Express.js và MongoDB",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 14,
      title: "Đi cà phê với bạn cũ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 15,
      title: "Viết nhật ký học tập tuần này",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 16,
      title: "Chuẩn bị CV để nộp thực tập",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 17,
      title: "Xem phim thư giãn cuối tuần",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
  ];

  const [todoList, setTodoList] = useState(defaultTodoList);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [seachText, setSearchText] = useState("");
  console.log(seachText);

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
        },
      ]);
      inputRef.current.value = "";
      // setInput("");
    }
  };
  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };
  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
    setShowSidebar(!showSidebar);
  };

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.title.includes(seachText)) {
        return false;
      }
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [selectedFilterId, todoList, seachText]);

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        todoList={todoList}
        seachText={seachText}
        setSearchText={setSearchText}
      ></FilterPanel>
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
          {filteredTodos
            .map((todo) => {
              return (
                <TodoItem
                  id={todo.id}
                  value={todo.title}
                  isImportant={todo.isImportant}
                  isCompleted={todo.isCompleted}
                  handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                  handleTodoItemClick={handleTodoItemClick}
                  key={todo.id}
                ></TodoItem>
              );
            })
            .reverse()}
        </div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItem.id}
            activeTodoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          ></Sidebar>
        )}
      </div>
    </div>
  );
}

export default App;
