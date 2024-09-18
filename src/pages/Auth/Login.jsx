import { Form, Nav } from "react-bootstrap";
import ButtonCustom from "/src/components/Button/ButtonCustom";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth/ContextApiAuth";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Преобразуем данные формы в JSON
    const formDataToSend = JSON.stringify(formData);

    const url = "https://ecoton-backend.ivgpu.ru/user/login";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Указываем, что отправляем JSON
      },
      body: formDataToSend, // Отправляем JSON-данные
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          login(data.token); // Авторизация через контекст
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Layout>
      <Form onSubmit={handleSubmit} className="mb-5">
        <h2>Войти</h2>
        {/* Email */}
        <Form.Group controlId="formEmail" className="mt-5 mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Введите ваш email"
            required
          />
        </Form.Group>

        {/* Пароль */}
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            required
          />
        </Form.Group>

        {/* Кнопка отправки */}
        <ButtonCustom type="submit">Авторизоваться</ButtonCustom>
      </Form>
      <Nav.Link>
        <Link to="/register">
          <p>Нет аккаунта? Зарегистрируйся!</p>
        </Link>
      </Nav.Link>
    </Layout>
  );
};

export default Login;
