// Node modules
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Project files
import Faker from "components/Faker.tsx";
import Products from "pages/Products.tsx";
import Detail from "pages/Detail.tsx";
import Cart from "pages/Cart.tsx";
import Checkout from "pages/Checkout.tsx";
import { Account } from "pages/Account.tsx";
import { Layout } from "./Layout.tsx";
import "./App.css";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={<h1>Welcome to the store! Click on "shoes" to start</h1>}
        />
        <Route
          path="/:category"
          element={<Products />}
          errorElement={<h1>Sorry, failed to load products.</h1>}
        />
        <Route path="/:category/:id" element={<Detail />} />
        <Route
          path="/cart"
          element={<Cart />}
          errorElement={<h1>Sorry, failed to load cart.</h1>}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/faker" element={<Faker />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
