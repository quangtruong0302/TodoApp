import React, { useMemo } from "react";
import CategoryList from "../CategoryList/CategoryList";
import "./FilterPanel.css";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "Tất cả",
    iconClass: "fa-solid fa-border-all",
  },
  {
    id: "completed",
    label: "Đã hoàn thành",
    iconPath: "./public/images/completed.png",
    iconClass: "fa-solid fa-circle-check",
  },
  {
    id: "important",
    label: "Quan trọng",
    iconClass: "fa-solid fa-flag",
  },
  {
    id: "deleted",
    label: "Đã xóa",
    iconClass: "fa-solid fa-trash",
  },
];
const FilterPanel = ({
  selectedFilterId,
  setSelectedFilterId,
  todoList,
  searchText,
  setSearchText,
}) => {
  // const countByFilterType = todoList.reduce(
  //   (acc, current) => {
  //     let newAcc = { ...acc };
  //     if (current.isCompleted) {
  //       newAcc = { ...acc, completed: acc.completed + 1 };
  //     }
  //     if (current.isImportant) {
  //       newAcc = { ...acc, important: acc.important + 1 };
  //     }
  //     if (current.isDeleted) {
  //       newAcc = { ...acc, deleted: acc.deleted + 1 };
  //     }
  //     return newAcc;
  //   },
  //   {
  //     all: todoList.length,
  //     important: 0,
  //     completed: 0,
  //     deleted: 0,
  //   }
  // );
  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, current) => {
        if (current.isCompleted) {
          acc.completed++;
        }
        if (current.isImportant) {
          acc.important++;
        }
        if (current.isDeleted) {
          acc.deleted++;
        }
        return acc;
      },
      {
        all: todoList.length,
        important: 0,
        completed: 0,
        deleted: 0,
      }
    );
  }, [todoList]);
  console.log(countByFilterType);
  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <div className="grid-filter">
        {FILTER_ITEMS.map((item) => {
          return (
            <div
              key={item.id}
              className={`filter-item ${selectedFilterId} ${
                item.id === selectedFilterId ? `active-${item.id}` : "inactive"
              }`}
              onClick={() => setSelectedFilterId(item.id)}
            >
              <div
                className={`item-title ${
                  item.id === selectedFilterId
                    ? `active-${item.id}`
                    : `default-${item.id}`
                }`}
              >
                <i className={item.iconClass}></i>
                <span>{item.label}</span>
              </div>
              <div className="count">{countByFilterType[item.id]}</div>
            </div>
          );
        })}
      </div>
      <CategoryList></CategoryList>
    </div>
  );
};

export default FilterPanel;
