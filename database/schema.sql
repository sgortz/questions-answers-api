BEGIN;
DROP DATABASE IF EXISTS nutmeg;
CREATE DATABASE nutmeg;
CREATE TABLE answers_photos (
  id bigserial,
  answer_id integer NOT NULL,
  url text NOT NULL,
  PRIMARY KEY (id)
);
CREATE SEQUENCE answer_photo_id_seq START 1;
CREATE TABLE answers (
  answer_id bigserial,
  question_id integer NOT NULL,
  answer_body character varying(1000) NOT NULL,
  date_written text NOT NULL,
  answerer_name character varying(60) NOT NULL,
  answerer_email character varying(60) NOT NULL,
  reported boolean NOT NULL DEFAULT false,
  helpfulness integer NOT NULL DEFAULT 0,
  PRIMARY KEY (answer_id)
);
CREATE SEQUENCE answer_id_seq START 1;
CREATE TABLE questions (
  question_id bigserial,
  product_id text NOT NULL,
  question_body character varying(1000) NOT NULL,
  date_written text NOT NULL,
  asker_name character varying(60) NOT NULL,
  asker_email character varying(60) NOT NULL,
  reported boolean NOT NULL DEFAULT false,
  helpfulness integer NOT NULL DEFAULT 0,
  PRIMARY KEY (question_id)
);
CREATE SEQUENCE question_id_seq START 1;
\ COPY questions
FROM
  '/Users/sgortz/Downloads/SDC CSV/questions.csv' DELIMITERS ',' CSV header;
SELECT
  setval('question_id_seq', max(question_id))
FROM
  questions;
\ COPY answers
FROM
  '/Users/sgortz/Downloads/SDC CSV/answers.csv' DELIMITERS ',' CSV header;
SELECT
  setval('answer_id_seq', max(answer_id))
FROM
  answers;
\ COPY answers_photos
FROM
  '/Users/sgortz/Downloads/SDC CSV/answers_photos.csv' DELIMITERS ',' CSV header;
SELECT setval('answer_photo_id_seq', max(id)) FROM answers_photos;
ALTER TABLE
  IF EXISTS answers_photos
ADD
  FOREIGN KEY (answer_id) REFERENCES answers (answer_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID;
ALTER TABLE
  IF EXISTS answers
ADD
  FOREIGN KEY (question_id) REFERENCES questions (question_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID;
CREATE INDEX product_id_idx ON questions(product_id);
CREATE INDEX question_id_idx ON questions(question_id);
CREATE INDEX question_id_answers_idx ON answers (question_id);
CREATE INDEX answer_id_idx ON answers(answer_id);
CREATE INDEX answer_id_photos_idx ON answers_photos(answer_id);
CREATE INDEX answer_photos_id_idx ON answers_photos(id);
END;
--SELECT jsonb_agg(photos) FROM (SELECT answers_photos.url FROM answers_photos WHERE answer_id = '5') AS photos;
--outputs a object of strings:
--SELECT ARRAY_AGG(answers_photos.url) AS photos FROM answers_photos WHERE answer_id = '5';