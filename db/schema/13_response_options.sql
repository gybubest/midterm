DROP TABLE IF EXISTS response_options CASCADE;
CREATE TABLE response_options (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  response_id INTEGER REFERENCES responses(id) ON DELETE CASCADE,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  weighting REAL,
  display_order SMALLINT
);
-- After all tables have been created, this will grant access to user labber
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber
