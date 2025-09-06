import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import NavBar from "./components/ui/NavBar.tsx";
import Home from "./components/Home.tsx";

import { Provider } from "react-redux";
import { setupStore } from "./store/store.ts";
import FlightOfferSearch from "./components/flightOfferSearch/FlightOfferSearch.tsx";
import FlightOfferPrice from "./components/flightOfferPrice/FlightOfferPrice.tsx";
import FlightCreateOrder from "./components/flightCreateOrder/FlightCreateOrder.tsx";
import FlightOrderManagement from "./components/flightOrderManagement/FlightOrderManagement.tsx";

const store = setupStore();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route path="/search" element={<FlightOfferSearch />} />
      <Route path="/price" element={<FlightOfferPrice />} />
      <Route path="/order" element={<FlightCreateOrder />} />
      <Route path="/order/:orderId" element={<FlightOrderManagement />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
