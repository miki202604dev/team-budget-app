CREATE TABLE IF NOT EXISTS users (
                                     user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     position VARCHAR(50),
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
    );

INSERT INTO users (position, name, email, password) VALUES
                                                        ('主任', '山田太郎', 'taro@example.com', '$2a$10$wE9Kz2b6sPZg.qG7y0T89O.y7jV9zMdfnN4j8zVl1q9c6H9p1y4xG'),
                                                        ('一般', '佐藤花子', 'hanako@example.com', '$2a$10$wE9Kz2b6sPZg.qG7y0T89O.y7jV9zMdfnN4j8zVl1q9c6H9p1y4xG'),
                                                        ('manager', 'John Manager', 'john@example.com', '$2a$10$wE9Kz2b6sPZg.qG7y0T89O.y7jV9zMdfnN4j8zVl1q9c6H9p1y4xG');