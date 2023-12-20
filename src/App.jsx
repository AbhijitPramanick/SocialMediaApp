import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <div className="appContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
