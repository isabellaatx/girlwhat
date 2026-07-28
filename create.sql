DROP TABLE IF EXISTS inputs;
DROP TABLE IF EXISTS responses;

CREATE TABLE inputs {
    id SERIAL PRIMARY KEY,
    user_input TEXT NOT NULL
};

CREATE TABLE responses {
    id SERIAL PRIMARY KEY,
    input_id INT REFERENCES inputs(id),
    response_text TEXT NOT NULL
};