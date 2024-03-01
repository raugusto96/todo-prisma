import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./reset.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TaskProvider } from "./presentation/context/providers/task-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
      <ToastContainer />
    </TaskProvider>
  </React.StrictMode>
);
