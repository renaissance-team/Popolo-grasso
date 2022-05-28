CREATE SCHEMA popolodb AUTHORIZATION postgres;
CREATE TABLE popolodb."topic" (
  topic_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_date" timestamp NOT NULL 
);
CREATE TABLE popolodb."message" (
  message_id SERIAL PRIMARY KEY,
  topic_id INT NOT NULL REFERENCES popolodb."topic",
  "text" TEXT NOT NULL,
  "date" timestamp NOT NULL,
  "user" TEXT
);
