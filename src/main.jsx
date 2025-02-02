import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainAuthPage from "./components/MainAuthPage.jsx";
import DashboardPage from "./components/MainDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {store,persistor} from "./store/index.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />,
      <Route path="/auth" element={<MainAuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
      
    </Provider>
  </StrictMode>
);
