# Tecnology

- Typescript
- NodeJS
- Express
- Postgres
- jwt
- bcryptCancel changes

# How to run
Create postgres container
- docker run --name backend-ae -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Install dependencies
npm i

Create migrations
- npm run typeorm migration:run

Run app
- npm start

In progress, still missing mock the custom repositories to make tests.
