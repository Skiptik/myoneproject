import styles from './Search.module.scss';
import { Form, FormControl, Button } from "react-bootstrap";
import React, { useState } from 'react';

const Search = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState(''); // State to store the search query

    const handleInputChange = (event) => {
        setQuery(event.target.value); // Update query state on input change
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // Handle search logic
        console.log('Поиск:', query);
        // You can add search or redirection logic here
    };

    return (
        <Form className="d-flex position-relative" onSubmit={handleSearch}>
            {/* Search input field */}
            <FormControl
                type="text"
                placeholder="Поиск"
                className={`${styles.formcontrol}`} // Use Bootstrap or custom styles
                aria-label="Search"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {/* SVG search icon button */}
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
    );
};

export default Search;
