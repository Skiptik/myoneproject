import Pagination from "react-bootstrap/Pagination";
import styles from "./PaginationList.module.scss";
import { useState } from "react";


function PaginationList({ }) {  // ! Тест-режим. totalPages нужно вставить как пропс, а константу удалить. Далее доделать для приёма данных с сервера

  const totalPages = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <Pagination className={`${styles.pagination}`}>
      <Pagination.Prev
        className={`${styles.pagination__item} ${styles.pagination__item_prev}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          className={`${styles.pagination__item}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        className={`${styles.pagination__item} ${styles.pagination__item_next}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default PaginationList;
