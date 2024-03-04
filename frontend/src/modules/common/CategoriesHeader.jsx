import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const CategoriesHeader = ({ categories, className = "" }) => {
  const location = useLocation();
  const query = React.useMemo(() => {
    const re = new RegExp(/^\?q=*/);
    return location.search.replace(re, "");
  }, [location.search]);
  const [activeCategory, setActiveCategory] = React.useState(query);
  React.useEffect(() => {
    if (!query) {
      setActiveCategory("all");
    } else {
      setActiveCategory(query);
    }
  }, [query]);
  return (
    <div className={`categories ${className}`}>
      <div className="categories-list">
        {categories.map((category) => {
          return (
            <NavLink
              to={category.link ? category.link : "/"}
              className={() =>
                activeCategory === category.name?.toLowerCase() ||
                activeCategory === category.id?.toString()?.toLowerCase()
                  ? `categories-item categories-item-active`
                  : `categories-item`
              }
              key={category.id}
            >
              {category.icon && (
                <div className="categories-item-icon">
                  {typeof category.icon === "string" ? (
                    <i className={category.icon}></i>
                  ) : (
                    category.icon
                  )}
                </div>
              )}
              <div className="categories-item-title">
                <h4>{category.name}</h4>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

CategoriesHeader.propTypes = {
  categories: PropTypes.array,
  className: PropTypes.string,
};

export default CategoriesHeader;
