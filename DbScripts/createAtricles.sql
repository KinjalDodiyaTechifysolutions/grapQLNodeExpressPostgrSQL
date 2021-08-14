CREATE TABLE article(
	id serial PRIMARY KEY,
    nickname VARCHAR(255),
    title VARCHAR(255),
    created TIMESTAMP,
    description TEXT
);

INSERT INTO article (nickname, title, created, description)
VALUES ('KinjalD', 'kinjal GraphQL Demo', current_timestamp, 'description');