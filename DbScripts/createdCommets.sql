CREATE TABLE comments(
	id serial PRIMARY KEY,
    article_id INTEGER,
    comment TEXT,
    subcomments JSONB
);

INSERT INTO comments(article_id, comment, subcomments)
VALUES (1, 'kinjal GraphQL Demo Comment', '[{"comment":"description 1"},{"comment":"description 2"}]'::JSONB);