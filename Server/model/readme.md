#User, message and friends schema

CREATE TABLE user_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
	uuid VARCHAR(50),
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255),
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE message_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_text TEXT NOT NULL,
    sender_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user_table (id)
);

CREATE TABLE friend_table (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   friend_id INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES user_table(id),
   FOREIGN KEY (friend_id) REFERENCES user_table(id)
);
