import { useRoutes } from "react-router-dom";
import LayoutClient from "./page/website/LayoutClient";
import HomePage from "./page/website/Home/HomePage";
import "./index.css";
import ProductDetail from "./page/website/Home/products/ProductDetail";
import NotFound from "./page/website/Home/NotFound/NotFound";
import RegisterForm from "./page/website/auth/Singup";
import "react-toastify/dist/ReactToastify.css";
import CategoryList from "./page/website/Home/Category/CategoryList";
import Singin from "./page/website/auth/Singin";
import ListProducts from "./page/(dashboard)/products/ListProducts";
import PrivateRouter from "./page/website/Private/PrivateRouter";
import ProductAddPage from "./page/(dashboard)/products/ProductAddPage ";
import LayoutAdmin from "./page/(dashboard)/Layout/LayoutAdmin";
import ProductEdit from "./page/(dashboard)/products/ProductEdit";
import Checkout from "./page/website/Home/Cart/Order";
import { AuthProvider } from "./services/Auth/AuthContext";
import ProductsLiked from "./page/website/Home/products/ProductsLiked";
import AdminCategory from "./page/(dashboard)/category/ListCategory";
import AddCategory from "./page/(dashboard)/category/AddCategory";
import EditCategory from "./page/(dashboard)/category/EditCategory";
import OrderDetails from "./page/(dashboard)/Order/OrderDetails";
import OrderList from "./page/(dashboard)/Order/OrderList";
const routeConfig = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "products", element: <HomePage /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "category/:id", element: <CategoryList /> },
      { path: "category/:id/product/:id", element: <ProductDetail /> },
      { path: "signup", element: <RegisterForm /> },
      { path:"products/Liked", element: <ProductsLiked />  },
      { path: "signin", element: <Singin /> },
      { path: "signin", element: <Singin /> },
      {
        path: "checkOut",
        element: <Checkout />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRouter>
        <LayoutAdmin />
      </PrivateRouter>
    ),
    children: [
      {
        path: "products",
        element: <ListProducts />,
      },
      {
        path: "category",
        element: <AdminCategory />,
      },
      {
        path: "category/add",
        element: <AddCategory />,
      },
      {
        path: "productAdd",
        element: <ProductAddPage />,
      },
      {
        path: "category/edit/:id",
        element: <EditCategory />,
      },
      {
        path: "order",
        element: <OrderList />,
      },
      {
        path: "orders/:userId/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "product/edit/:id",
        element: <ProductEdit />,
      },
     
      { path: "*", element: <NotFound /> },
    ],
  },
];
function App() {
  const routers = useRoutes(routeConfig);
  return (
    <>
      <AuthProvider>
      {routers}
        </AuthProvider>
    </>
  );
}

export default App;
