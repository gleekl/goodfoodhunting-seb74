CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300),
  image_url TEXT,
  description TEXT 
);

INSERT INTO dishes (title, image_url, description) VALUES 
('cake', 'https://www.recipetineats.com/tachyon/2020/08/My-best-Vanilla-Cake_9-SQ.jpg', 'vanilla cake');

INSERT INTO dishes (title, image_url, description) VALUES 
('burger', 'https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg', 'hamburger');


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  password_digest TEXT
);

-- insert into users (email, password_digest)
-- values ('dt@ga.co', 'dsouosifsdofujwlekrns'); 

-- insert into users (email, password_digest)
-- values ('dt@ga.co', 'werwoiusdflkswersdf'); 
