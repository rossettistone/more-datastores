CREATE DATABASE testchat;

USE testchat;

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  PRIMARY KEY (id),
  username varchar(16),
  message varchar(512),
  createdAt TIMESTAMP,
  chatroom varchar(16)
);


-- A foreign key approach that might be useful later

-- CREATE TABLE users (
--  id INT,
--  PRIMARY KEY (id),
--  username varchar(16)
-- );

-- CREATE TABLE messages (
--  id INT,
--  PRIMARY KEY (id),
--  userID INT,
--  FOREIGN KEY (userID) REFERENCES users (id),
--  message varchar(512),
--  createdAt TIMESTAMP
-- );

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql   
 *  to create the database and the tables.*/