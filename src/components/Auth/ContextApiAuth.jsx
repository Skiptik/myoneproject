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

  const fetchUrl = '/user_info'
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('authToken'));
  const navigate = useNavigate();
  // Проверка наличия cookie при монтировании компонента
  useEffect(() => {
    const FetchAdmin = () =>{
      const token = Cookies.get('authToken');
      fetch(`https://ecoton-backend.ivgpu.ru/user/info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.user_info.role === "admin") {
            setIsAdmin(true); // Set admin state if user role is "admin"
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    const FetchData = () => {
      try {
        const token = Cookies.get('authToken');
        // console.log('Ищем куку, значение токена:', token);
    
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Ошибка при чтении куки:', error);
      }
    }
    FetchData();
    FetchAdmin();
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
    setIsAdmin(false)
    navigate('/'); // Перенаправляем пользователя на главную страницу
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};