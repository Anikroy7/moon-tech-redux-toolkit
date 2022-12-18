import { createBrowserRouter } from "react-router-dom";
import Main from '../layout/Main/Main';
import Home from '../pages/Main/Home';
import About from '../pages/Main/About';
import TopRated from '../pages/Main/TopRated';
import Cart from '../pages/Main/Cart';
import Dashboard from '../layout/Dashboard/Dashboard';
import UpdateProduct from '../pages/Dashboard/UpdatePrdocut'
import AddProduct from '../pages/Dashboard/AddProduct'
import ProductList from '../pages/Dashboard/ProductList.js'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "top-rated",
        element: <TopRated />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <ProductList></ProductList>
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "update-product/:_id",
        element: <UpdateProduct />,
      },
    ],
  },
]);

export default routes;
