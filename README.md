## The Project

A simple api that allows you to create a user, login and retrieve the information about the user.

# Tecnology

- Typescript
- NodeJS
- Express
- Postgres
- jwt
- bcrypt
- Jest
- TypeORM

# How to run
Create postgres container
- docker run --name backend-ae -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Install dependencies
npm i

Create migrations
- npm run typeorm migration:run

Run app
- npm start

To run tests
- npm run test
