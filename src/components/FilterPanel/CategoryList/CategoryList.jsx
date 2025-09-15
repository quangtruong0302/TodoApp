import React, { useContext, useMemo } from "react";
import "./CategoryList.css";
import { CATEGORY_ITEMS } from "../../../constant.js";
import { AppContext } from "../../../contexts/AppContext.jsx";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId, todoList } =
    useContext(AppContext);
  const countByCategory = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => ({ ...acc, [cur.category]: acc[cur.category] + 1 }),
      {
        personal: 0,
        company: 0,
        travel: 0,
        sport: 0,
      }
    );
  }, [todoList]);

  return (
    <div className="category-list">
      <div className="title">Chủ đề</div>
      {CATEGORY_ITEMS.map((item) => {
        return (
          <div
            className={`category-group ${
              item.id === selectedCategoryId ? "active-category" : ""
            }`}
            key={item.id}
            onClick={() => {
              if (item.id === selectedCategoryId) {
                setSelectedCategoryId(null);
              } else {
                setSelectedCategoryId(item.id);
              }
            }}
          >
            <span className="catogory-name">{item.label}</span>
            <span className="category-count">{countByCategory[item.id]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
