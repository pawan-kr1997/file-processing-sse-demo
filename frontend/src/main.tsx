import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Explanation from "./pages/Explanation/Explanation.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/explanation", element: <Explanation /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
