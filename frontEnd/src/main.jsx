import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/global.css";
import RouterConfig from "./config/router.config";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <RouterConfig />
      </PersistGate>
    </Provider>
  </StrictMode>
);
