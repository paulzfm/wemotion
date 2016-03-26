CREATE DATABASE wemotion;
USE wemotion;
CREATE TABLE user (
    uid VARCHAR(255) UNIQUE,
    token VARCHAR(255),
    PRIMARY KEY (uid)
);