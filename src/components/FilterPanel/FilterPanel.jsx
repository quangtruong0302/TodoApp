import React, { useMemo, useContext } from "react";
import CategoryList from "./CategoryList/CategoryList";
import { AppContext } from "../../contexts/AppContext";
import { FILTER_ITEMS } from "../../constant.js";
import "./FilterPanel.css";

const FilterPanel = () => {
  const {
    selectedFilterId,
    setSelectedFilterId,
    todoList,
    searchText,
    setSearchText,
  } = useContext(AppContext);
  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, current) => {
        if (!current.isDeleted) {
          acc.all++;
        }
        if (current.isCompleted && !current.isDeleted) {
          acc.completed++;
        }
        if (current.isImportant && !current.isDeleted) {
          acc.important++;
        }
        if (current.isDeleted) {
          acc.deleted++;
        }
        return acc;
      },
      {
        all: 0,
        important: 0,
        completed: 0,
        deleted: 0,
      }
    );
  }, [todoList]);
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
