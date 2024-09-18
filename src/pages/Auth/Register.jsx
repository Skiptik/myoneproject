import { Form, Nav } from "react-bootstrap";
import ButtonCustom from "/src/components/Button/ButtonCustom"
import Layout from "../../components/Layout/Layout";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        second_name: '',
        email: '',
        password: '',
        avatar: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleAvatarChange = (e) => {
        setFormData({
          ...formData,
          avatar: e.target.files[0], // Сохраняем файл аватара
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Создаем экземпляр FormData
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
        if (key === 'avatar') {
            formDataToSend.append(key, formData[key]); // Добавляем файл
        } else {
            formDataToSend.append(key, formData[key]); // Добавляем текстовые поля
        }
        });
        var url = "https://ecoton-backend.ivgpu.ru/user/register"
        fetch(url, {
            method: 'POST',
            body: formDataToSend, // Отправляем FormData
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    // Устанавливаем куку после успешного входа
                    Cookies.set('authToken', data.token, { expires: 7, path: '/', secure: true });
                }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      };
    return (
        <Layout>
            <Form onSubmit={handleSubmit} className="mb-5">
            <h2>Регистрация</h2>
            {/* Имя */}
            <Form.Group controlId="formFirstName" className="mt-5 mb-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                required
                />
            </Form.Group>

            {/* Фамилия */}
            <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                type="text"
                name="second_name"
                value={formData.second_name}
                onChange={handleChange}
                placeholder="Введите вашу фамилию"
                required
                />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                name="email"
                value={formData.email}
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

            {/* Аватар */}
            <Form.Group controlId="formAvatar" className="mb-3">
                <Form.Label>Аватар</Form.Label>
                <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                />
                {formData.avatar && (
                <div className="mt-3">
                    <strong>Выбран файл:</strong> {formData.avatar.name}
                </div>
                )}
            </Form.Group>

            <ButtonCustom type="submit">
                Зарегистрироваться
            </ButtonCustom>
            </Form>
            <Nav.Link>
              <Link to="/login">
                <p>Уже есть аккаунт? Нажми для входа!</p>
              </Link>
            </Nav.Link>
        </Layout>
      );
  };
  
  export default Register;