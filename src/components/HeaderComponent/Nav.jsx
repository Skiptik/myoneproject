import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Импортируем Link
import styles from "./Nav.module.scss";
import {useAuth} from '/src/components/Auth/ContextApiAuth'
const NavCustom = () => {
  const location = useLocation();
  const { isAuthenticated, logout, isAdmin } = useAuth();
  return (
    <>
      <Nav className={`me-auto`}>
        <Nav.Link as={Link} className={`${styles.hover}`} to="/section">
          Разделы
        </Nav.Link>
      </Nav>
      <Nav className={`me-auto`}>
        <Nav.Link as={Link} className={`${styles.hover}`} to="/habitat">
          Ареал обитания
        </Nav.Link>
      </Nav>
      <Nav className={`me-auto`}>
      {isAuthenticated ? (
        <>
          {/* Если пользователь на странице профиля, показываем только кнопку выхода */}
          {location.pathname === "/profile" ? (
            <Nav.Link className={`${styles.hover}`} onClick={logout}>
              Выйти
            </Nav.Link>
          ) : (
            <>
              {/* Если пользователь не на странице профиля, показываем "Личный кабинет" */}
              <Nav.Link as={Link} className={`${styles.hover}`} to="/profile">
                Личный кабинет
              </Nav.Link>
            </>
          )}
        </>
      ) : (
        <>
          {/* Кнопка авторизации, если пользователь не авторизован */}
          <Nav.Link as={Link} className={`${styles.hover}`} to="/login">
            Войти
          </Nav.Link>
        </>
      )}
    </Nav>
    {isAdmin ? (
  <>
    <Nav className="me-auto">
      <Nav.Link target="_blank" className={styles.hover} href="https://ecoton-backend.ivgpu.ru/admin">
        Админ панель
      </Nav.Link>
    </Nav>
  </>
) : null }

    </>

  );
};

export default NavCustom;
