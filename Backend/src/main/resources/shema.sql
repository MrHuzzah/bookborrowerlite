DROP TABLE IF EXISTS Book;

CREATE TABLE Book (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(30) NOT NULL,
                      author VARCHAR(30) NOT NULL,
                      genre VARCHAR(20) NOT NULL,
                      borrow_date DATE NOT NULL,
                      rating INT CHECK (rating >= 1 AND rating <= 5)
);