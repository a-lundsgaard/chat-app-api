
DROP TABLE IF EXISTS conversation_participants CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  conversation_id INTEGER REFERENCES conversations(id) NOT NULL
);


CREATE TABLE conversation_participants (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  conversation_id INTEGER REFERENCES conversations(id) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);