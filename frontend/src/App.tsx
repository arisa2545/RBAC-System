import { RouterProvider } from "@tanstack/react-router";
import { router } from "./AppRouter";
import './App.css'

export default function App() {
  return <RouterProvider router={router} />;
}
