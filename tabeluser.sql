CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_nama VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_role ENUM('admin', 'nonadmin') NOT NULL DEFAULT 'nonadmin',
    user_api_key VARCHAR(10) NOT NULL,
    user_saldo INT NOT NULL DEFAULT 0
);

INSERT INTO users (user_nama, user_email, user_password, user_role, user_api_key, user_saldo) VALUES
('Admin Satu', 'admin1@example.com', '$2b$10$sXZGG2h3RwTFN3i7Syt7fOhD0iOtzKOYT4tKOrk.WN8AW8FZV/R7C', 'admin', 'A1B2C3D4E5', 100000),
('User Dua', 'user2@example.com', '$2b$10$sXZGG2h3RwTFN3i7Syt7fOhD0iOtzKOYT4tKOrk.WN8AW8FZV/R7C', 'nonadmin', 'Z9Y8X7W6V5', 50000),
('User Tiga', 'user3@example.com', '$2b$10$sXZGG2h3RwTFN3i7Syt7fOhD0iOtzKOYT4tKOrk.WN8AW8FZV/R7C', 'nonadmin', 'Q1W2E3R4T5', 25000);
