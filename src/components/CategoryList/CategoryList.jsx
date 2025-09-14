import React from "react";
import "./CategoryList.css";

const CATEGORY_ITEMS = [
  {
    id: "personal",
    label: "Cá nhân",
  },
  {
    id: "company",
    label: "Công ty",
  },
  {
    id: "sport",
    label: "Thể thao",
  },
  {
    id: "travel",
    label: "Du lịch",
  },
];
const CategoryList = () => {
  return (
    <div className="category-list">
      <div className="title">Chủ đề</div>
      {CATEGORY_ITEMS.map((item) => {
        return (
          <div className="category-group" key={item.id}>
            <span className="catogory-name">{item.label}</span>
            <span className="category-count">23</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
