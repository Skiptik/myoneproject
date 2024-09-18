import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Провайдер для управления авторизацией
export const AuthProvider = ({ children }) => {
  // Состояние авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('authToken'));
  const navigate = useNavigate();
  // Проверка наличия cookie при монтировании компонента
  useEffect(() => {
    try {
      const token = Cookies.get('authToken');
      console.log('Ищем куку, значение токена:', token);
  
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Ошибка при чтении куки:', error);
    }
  }, []);
  const login = (token) => {
    Cookies.set("authToken", token, { expires: 7, path: "/", secure: true });
    setIsAuthenticated(true);
    navigate('/profile');
  };
  // Функции для управления авторизацией
  const logout = () => {
    // Удаление cookie при выходе
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    navigate('/'); // Перенаправляем пользователя на главную страницу
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};