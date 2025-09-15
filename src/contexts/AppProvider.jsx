import { useState } from "react";
import { AppContext } from "./AppContext";
// import { data } from "../data.js";

const defaultTodoList = [
  {
    id: 1,
    title: "Đi chợ mua đồ ăn cho cả tuần",
    isImportant: true,
    isCompleted: false,
    isDeleted: false,
    category: "personal",
  },
  {
    id: 2,
    title: "Viết báo cáo tiến độ dự án",
    isImportant: true,
    isCompleted: false,
    isDeleted: false,
    category: "company",
  },
  {
    id: 3,
    title: "Chạy bộ 5km buổi sáng",
    isImportant: false,
    isCompleted: true,
    isDeleted: false,
    category: "sport",
  },
  {
    id: 4,
    title: "Chuẩn bị slide thuyết trình nhóm",
    isImportant: true,
    isCompleted: false,
    isDeleted: false,
    category: "company",
  },
  {
    id: 5,
    title: "Đặt vé máy bay đi Đà Nẵng",
    isImportant: false,
    isCompleted: false,
    isDeleted: false,
    category: "travel",
  },
  {
    id: 6,
    title: "Hẹn gặp bạn uống cà phê",
    isImportant: false,
    isCompleted: false,
    isDeleted: false,
    category: "personal",
  },
  {
    id: 7,
    title: "Họp nhóm dự án lúc 9h sáng",
    isImportant: true,
    isCompleted: true,
    isDeleted: false,
    category: "company",
  },
  {
    id: 8,
    title: "Tham gia lớp yoga buổi tối",
    isImportant: false,
    isCompleted: false,
    isDeleted: false,
    category: "sport",
  },
  {
    id: 9,
    title: "Chuẩn bị vali du lịch",
    isImportant: true,
    isCompleted: false,
    isDeleted: false,
    category: "travel",
  },
  {
    id: 10,
    title: "Gọi điện hỏi thăm gia đình",
    isImportant: false,
    isCompleted: true,
    isDeleted: false,
    category: "personal",
  },
];

const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
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
    setShowSidebar(false);
  };
  const handleCompleteCheckboxChange = (todoId) => {
    // console.log({todoId});
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        todoList,
        setTodoList,
        showSidebar,
        setShowSidebar,
        activeTodoItemId,
        setActiveTodoItemId,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        handleTodoItemClick,
        handleTodoItemChange,
        handleCompleteCheckboxChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
