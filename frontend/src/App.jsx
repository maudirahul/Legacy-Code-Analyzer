import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Documentation from "./components/documentation/Documentation";

function App() {
  return (
    <>
    console.log("THE API URL IS:", import.meta.env.VITE_API_URL);
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2000}
        hideProgressBar={false}
      />
    </>
  );
}

export default App;
