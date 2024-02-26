import React, { useEffect } from "react";
import categoriesMenuItems from "../../constants/CategoriesMenuItems";
import CategoriesHeader from "../common/CategoriesHeader";
import { useQuery } from "@tanstack/react-query";
import kitchenApi from "../../api/kitchen";

const MenuLeftHeader = () => {
  const [categories, setCategories] = React.useState(categoriesMenuItems);

  const { isSuccess, data } = useQuery({
    queryKey: ["categoriesItem"],
    queryFn: () => {
      return kitchenApi.getAllCategories();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (data.length > 0) {
        const formattedCategories = data.map((item) => {
          return {
            id: item.categoryId,
            name: item.categoryName,
            icon: item.icon,
            link: item.link,
          };
        });
        setCategories([
          {
            id: "All",
            name: "All",
            icon: "fas fa-utensils",
            link: "#",
          },
          ...formattedCategories,
        ]);
      }
    }
  }, [data, isSuccess]);
  return (
    <div className="menu-left-header">
      {/* <div className="menu-left-search">
				<input type="text" placeholder="Search for a menu" />
				<div className="menu-left-header-icon">
					<i className="fas fa-search"></i>
				</div>
			</div> */}
      <CategoriesHeader categories={categories}></CategoriesHeader>
    </div>
  );
};

export default MenuLeftHeader;
