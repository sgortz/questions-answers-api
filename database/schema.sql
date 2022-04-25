BEGIN;

DROP DATABASE IF EXISTS nutmeg;

CREATE DATABASE nutmeg;
CREATE TABLE answers_photos
(
    id serial,
    answer_id integer NOT NULL,
    url text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE answers
(
    answer_id serial,
    question_id integer NOT NULL,
    answer_body character varying(1000) NOT NULL,
    date_written text NOT NULL,
    answerer_name character varying(60) NOT NULL,
    answerer_email character varying(60) NOT NULL,
    reported boolean NOT NULL DEFAULT false,
    helpfulness integer NOT NULL DEFAULT 0,
    PRIMARY KEY (answer_id)
);

CREATE TABLE questions
(
    question_id serial,
    product_id text NOT NULL,
    question_body character varying(1000) NOT NULL,
    date_written text NOT NULL,
    asker_name character varying(60) NOT NULL,
    asker_email character varying(60) NOT NULL,
    reported boolean NOT NULL DEFAULT false,
    helpfulness integer NOT NULL DEFAULT 0,
    PRIMARY KEY (question_id)
);

\COPY questions FROM '/Users/sgortz/Downloads/SDC CSV/questions.csv' DELIMITERS ',' CSV header;
\COPY answers FROM '/Users/sgortz/Downloads/SDC CSV/answers.csv' DELIMITERS ',' CSV header;
\COPY answers_photos FROM '/Users/sgortz/Downloads/SDC CSV/answers_photos.csv' DELIMITERS ',' CSV header;

ALTER TABLE IF EXISTS answers_photos
    ADD FOREIGN KEY (answer_id)
    REFERENCES answers (answer_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS answers
    ADD FOREIGN KEY (question_id)
    REFERENCES questions (question_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;