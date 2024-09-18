// src/routes/RoutesConfig.jsx
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../Auth/ContextApiAuth"; // Для проверки авторизации
import React from "react";
import Home from '../../pages/Home/Home';
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Section from "../../pages/Sections/Section";
import ListSpecies from "../../pages/ListSpecies/ListSpecies";
import Animal from "../../pages/Animal/Animal";
import Profile from "../../pages/Profile/Profile";
import Habitat from "../../pages/Habitat/Habitat";
import HabitatDetail from "../../pages/Habitat/HabitatDetail/Detail";

// Компонент для защищённых маршрутов
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Получаем состояние авторизации
  console.log(isAuthenticated)
  // Если не авторизован, перенаправляем на страницу логина
  if (!isAuthenticated) {
    return <Login />;
  }

  // Если авторизован, рендерим дочерний компонент
  return <Profile />;
}

const RoutesConfig = () => {
    return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/section" element={<Section />} />
        <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
        <Route path="/section/:id" element={<ListSpecies />} />
        <Route path="/animal/:id" element={<Animal />} />
        <Route path="/habitat" element={<Habitat />} />
        <Route path="/habitat/:id" element={<HabitatDetail />} />
      </Routes>
    );
  };
export default RoutesConfig;