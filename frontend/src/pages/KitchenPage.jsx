import React from "react";
import CategoriesHeader from "../modules/common/CategoriesHeader";
import LoadingCenter from "../modules/common/LoadingCenter";
import useQueryString from "../utils/queryString";
import { useNavigate } from "react-router-dom";
import MainContentHeader from "../modules/common/MainContentHeader";
import { categoriesKitchenOrder } from "../constants/CategoriesKitchenOrder";
import KitchenMain from "../modules/kitchen/KitchenMain";

const KitchenPage = () => {
  const { q: status } = useQueryString();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    if (!status) {
      navigate(`/kitchen/${categoriesKitchenOrder[0].link}`);
    }
    setIsLoading(false);
  }, [status, navigate]);

  return (
    <div className="mt-3">
      <CategoriesHeader categories={categoriesKitchenOrder}></CategoriesHeader>
      {!isLoading ? (
        <>
          <MainContentHeader title="Orders"></MainContentHeader>
          <KitchenMain></KitchenMain>
        </>
      ) : (
        <LoadingCenter></LoadingCenter>
      )}
    </div>
  );
};

export default KitchenPage;
