import { useState, useEffect } from 'react';
import { Form, FormControl, Button, Col } from 'react-bootstrap';
import styles from './Search.module.scss'; // пример подключения стилей, если нужно
import { useNavigate } from 'react-router-dom';

const Search = ({ placeholder="Поиск", search = "", keyData="species", path="animal" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState(''); // Состояние для хранения поискового запроса
    const [results, setResults] = useState([]); // Состояние для хранения результатов поиска
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    const [showResults, setShowResults] = useState(false); // Состояние для отображения окна с результатами

    // Хук для выполнения динамического поиска
    useEffect(() => {
        const fetchData = async () => {
            if (query.trim() === "") {
                setResults([]); // Если запрос пустой, очищаем результаты
                setShowResults(false); // Прячем окно с результатами
                return;
            }

            setIsLoading(true); // Показываем состояние загрузки

            try {
                // Выполняем запрос к вашему API
                const response = await fetch(`https://ecoton-backend.ivgpu.ru/${search}${query}`);
                const data = await response.json();
                // Проверяем, что данные содержат ключ 'species', и он является массивом
                if (data && Array.isArray(data[keyData])) {
                    setResults(data[keyData]);
                } else {
                    setResults([]); // Если нет данных, сбрасываем в пустой массив
                }

                // Показываем окно с результатами, если они есть
                setShowResults(true);
            } catch (error) {
                console.error('Ошибка при поиске:', error);
                setResults([]); // В случае ошибки сбрасываем результаты
            } finally {
                setIsLoading(false); // Скрываем состояние загрузки
            }
        };

        // Задержка перед выполнением поиска (debounce)
        const debounceTimeout = setTimeout(() => {
            fetchData();
        }, 500);

        // Очистка таймера при изменении запроса
        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const handleInputChange = (event) => {
        setQuery(event.target.value); // Обновляем состояние запроса
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // Выполняем поиск при отправке формы (если нужно)
        console.log('Поиск:', query);
    };
    const navigate = useNavigate()
    const HandleClick = ({id}) => {
        navigate(`/${path}/${id}`)
    }
    return (
        <div className="position-relative">
            <Form className="d-flex position-relative" onSubmit={handleSearch}>
                {/* Поле ввода поиска */}
                <FormControl
                    type="text"
                    placeholder={placeholder}
                    className={`${styles.formcontrol}`} // Использование Bootstrap или кастомных стилей
                    aria-label="Search"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {/* Кнопка с иконкой поиска */}
                <Button
                    type="submit"
                    className={`${styles.search} btn position-absolute`}
                >
                    {!isFocused && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                        >
                            <path
                                d="M12.7414 12.7394L16.0007 15.9987M1.33398 7.85055C1.33398 9.57937 2.02075 11.2374 3.24321 12.4598C4.46567 13.6823 6.12368 14.3691 7.8525 14.3691C9.58132 14.3691 11.2393 13.6823 12.4618 12.4598C13.6843 11.2374 14.371 9.57937 14.371 7.85055C14.371 6.12173 13.6843 4.46372 12.4618 3.24126C11.2393 2.0188 9.58132 1.33203 7.8525 1.33203C6.12368 1.33203 4.46567 2.0188 3.24321 3.24126C2.02075 4.46372 1.33398 6.12173 1.33398 7.85055Z"
                                stroke="#C8DB31"
                                strokeOpacity="0.5"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </Button>
            </Form>

            {/* Всплывающее окно с результатами поиска */}
            {showResults && (
                <Col xxl="4" className={`${styles.resultsWindow}`}>
                    {isLoading && <p>Загрузка...</p>} {/* Показываем загрузку */}

                    {!isLoading && results.length > 0 && (
                        <ul>
                            {results.map((result, index) => (
                                <li className={`${styles.li}`} onClick={()=>HandleClick(result)} key={index}>{result.title}</li>
                            ))}
                        </ul>
                    )}

                    {!isLoading && results.length === 0 && (
                        <p>Ничего не найдено</p>
                    )}
                </Col>
            )}
        </div>
    );
};

export default Search;