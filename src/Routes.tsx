// Node modules
import { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Project files
import Spinner from "components/Spinner.tsx";
import Account from "pages/Account.tsx";
import Cart from "pages/Cart.tsx";
import Checkout from "pages/Checkout.tsx";
import Detail from "pages/Detail.tsx";
import Home from "pages/Home.tsx";
import Products from "pages/Products.tsx";
import { Layout } from "./Layout.tsx";
import "./App.css";

export default function App() {
  // Pages
  const DetailPage = (
    <Suspense fallback={<Spinner />}>
      <Detail />
    </Suspense>
  );

  // Components
  const ErrorPage = <h1>Sorry, failed to load the page.</h1>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Products />} errorElement={ErrorPage}/>
        <Route path="/:category/:id" element={DetailPage} />
        <Route path="/cart" element={<Cart />} errorElement={ErrorPage} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
