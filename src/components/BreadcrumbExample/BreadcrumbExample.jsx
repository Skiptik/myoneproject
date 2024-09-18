import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./BreadcrumbExample.module.scss";

// Словарь для переименования определённых маршрутов
const routeNames = {
  "/login": "Вход",
  "/profile": "Профиль",
  "/library": "Библиотека",
  "/register": "Регистрация",
  "/section": "Раздел(ы)",
  "/species": "Виды"
};

function BreadcrumbExample() {
  const location = useLocation();
  
  // Разбиваем текущий путь на части
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className={styles.breadcrumb}>
      {/* Начальная ссылка на главную страницу */}
      <Breadcrumb.Item 
        className={styles.breadcrumb__item} 
        linkAs={Link} 
        linkProps={{ to: "/" }}
      >
        Главная
      </Breadcrumb.Item>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1; // Проверка, последний ли это элемент
        return (
          <Breadcrumb.Item
            key={to}
            className={isLast ? `${styles.breadcrumb__item} ${styles.active}` : styles.breadcrumb__item}
            active={isLast} // Отметка как активного элемента
            as={isLast ? 'span' : Link} // Если последний, отображаем как span
            to={isLast ? undefined : to} // Последний элемент не должен быть ссылкой
          >
            {routeNames[to] || value.charAt(0).toUpperCase() + value.slice(1)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
