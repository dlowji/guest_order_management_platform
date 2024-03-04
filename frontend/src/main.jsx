// import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticateLayout from "./layouts/AuthenticateLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import TablePage from "./pages/TablePage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import MenuRightContent from "./modules/common/MenuRightContent.jsx";
import KitchenPage from "./pages/KitchenPage.jsx";
import { OrderDetailProvider } from "./context/useOrderDetail";
import KitchenOrder from "./modules/kitchen/KitchenOrder.jsx";
import HistoryDetail from "./modules/history/HistoryDetail.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RedirectPage from "./pages/RedirectPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProtectedRoute from "./modules/common/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/home" element={<DashboardPage />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/history/:orderId" element={<HistoryDetail />}></Route>
        </Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEE", "CHEF"]} />
          }
        >
          <Route path="/" element={<RedirectPage />}></Route>
          <Route path="/table" element={<TablePage />} />
          <Route path="/menu" element={<MenuPage />}>
            <Route
              path="/menu/order/:id"
              element={<MenuRightContent></MenuRightContent>}
            />
          </Route>
          <Route path="/order" element={<OrderPage />}></Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["CHEF"]} />}>
          <Route path="/kitchen" element={<KitchenPage />}></Route>
          <Route
            path="/kitchen/:orderId"
            element={
              <OrderDetailProvider>
                <KitchenOrder />
              </OrderDetailProvider>
            }
          ></Route>
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEE"]} />}>
        <Route path="/checkout/:orderId" element={<CheckoutPage />}></Route>
        <Route
          path="/checkout/:orderId/:step"
          element={<CheckoutPage />}
        ></Route>
      </Route>
      <Route
        element={
          <AuthenticateLayout
            heading="Welcome Back!"
            subheading="Sign in to your account to continue"
          ></AuthenticateLayout>
        }
      >
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30 * 1,
      cacheTime: 1000 * 60 * 1,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("root");
  if (!container) throw new Error("No root element found!");
  const root = ReactDOM.createRoot(container);
  root.render(
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
      <ToastContainer
        bodyClassName="font-primary text-sm"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={2000}
      ></ToastContainer>
    </>
  );
});
