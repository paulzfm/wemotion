CREATE DATABASE wemotion;
USE wemotion;
CREATE TABLE user (
    uid VARCHAR(255) UNIQUE,
    token VARCHAR(255),
    score INT DEFAULT 0,
    PRIMARY KEY (uid)
);