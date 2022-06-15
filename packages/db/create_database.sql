CREATE SCHEMA popolo AUTHORIZATION postgres;
CREATE TABLE popolo."topic" (
  topic_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_date" timestamp NOT NULL 
);
CREATE TABLE popolo."message" (
  message_id SERIAL PRIMARY KEY,
  topic_id INT NOT NULL REFERENCES popolo."topic",
  "text" TEXT NOT NULL,
  "date" timestamp NOT NULL,
  "user" TEXT
);
CREATE TABLE popolo."theme" (
  theme_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);
CREATE TABLE popolo."user_theme" (
  user_theme_id SERIAL PRIMARY KEY,
  theme_id INT NOT NULL REFERENCES popolo."theme",
  "device" TEXT,
  "user_id" INT
);
CREATE VIEW popolo.forum_topics as 
SELECT  t.name,
    	  t.created_date,
        t.topic_id, 
        res.message_id,
        res.date,
        res.text,
        res."user"
FROM popolo.topic as t
LEFT JOIN
  (SELECT m.message_id,
          m.topic_id,
          m.date,
          m.text,
          m."user"
  FROM popolo.message as m 
  JOIN 
    (SELECT max(message.message_id) as last_msg_id
    FROM popolo.message
    GROUP BY topic_id) lm ON m.message_id = lm.last_msg_id) res ON res.topic_id = t.topic_id
ORDER BY topic_id desc;
INSERT INTO popolo.theme (name) 
VALUES ('light'), ('dark');
