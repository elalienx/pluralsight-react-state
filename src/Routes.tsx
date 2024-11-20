// Node modules
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Project files
import Faker from "components/Faker.tsx";
import Account from "pages/Account.tsx";
import Cart from "pages/Cart.tsx";
import Checkout from "pages/Checkout.tsx";
import Detail from "pages/Detail.tsx";
import Home from "pages/Home.tsx";
import Products from "pages/Products.tsx";
import { Layout } from "./Layout.tsx";
import "./App.css";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Products />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/faker" element={<Faker />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
