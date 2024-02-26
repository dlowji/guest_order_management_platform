import { useEffect } from "react";
import MainContentHeader from "../common/MainContentHeader";
import MenuLeftHeader from "./MenuLeftHeader";
import LoadingCenter from "../common/LoadingCenter";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import useQueryString from "../../utils/queryString";
import kitchenApi from "../../api/kitchen";
import { useQuery } from "@tanstack/react-query";
import { useMenuItems } from "../../stores/useMenuItems";

const MenuLeftContent = () => {
  const { setMenuItems } = useMenuItems();
  const { q: category } = useQueryString();

  const {
    data: menuItems,
    isFetching,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["menuItems", category],
    queryFn: () => {
      return kitchenApi.getMenuItems(category);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setMenuItems(menuItems);
    }
  }, [isSuccess, menuItems, setMenuItems]);

  return (
    <div className="menu-left">
      <MenuLeftHeader></MenuLeftHeader>
      {isFetching && <LoadingCenter></LoadingCenter>}

      {!isFetching && !isError && menuItems && (
        <>
          <MainContentHeader
            title="Choose topping"
            quantity={`${menuItems.length} items`}
          ></MainContentHeader>
          {menuItems.length <= 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-2xl text-center font-bold">No items found</p>
            </div>
          ) : (
            <MenuList>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.dishId}
                  id={item.dishId}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  status="AVAILABLE"
                />
              ))}
            </MenuList>
          )}
        </>
      )}
    </div>
  );
};

export default MenuLeftContent;
