# Favorite-Recipe-Book

A recipe book which uses the Spoonacular API to search for recipes + allow users to add/delete favorite recipes + make/edit/delete reviews</br>
It includes the express authentication template which uses Passport + flash messages + custom middleware

## User Story

A user must be made to have access all routes. A user can be made on the signup route. The user can login on the login route. After login, the user can search for recipes by keyword or cuisine. The user can view recipes with reviews. The user can add/delete favorite recipes. The user can add/edit/delete reviews.

## What it includes

* Sequelize user/favorite/review model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts
* Spoonacular API requests through Axios
* Method-override for PUT/DELETE routes
* Dotenv for .env file

## Diagrams

### ERD

### Wireframe

## Steps To Use

### Deployed on Heroku

[Heroku](https://favorite-recipe-book.herokuapp.com/)

1. Sign up for an account
2. Login with account
3. Start searching for recipes

### Install on Local Machine

#### 1. Fork and clone gitHub repo into local machine

[GitHub Repo](https://github.com/richardleung1/favorite-recipe-book)

#### 2. Install Node Modules

Type `npm install` or `npm i` in terminal to install node modules

#### 3. Create database

Type `sequelize db:create` in terminal to create database

#### 4. Migrate models

Type `sequelize db:migrate` in terminal to migrate models

#### 5. Create a `.env` file

1. Create a variable `SESSION_SECRET` and set it equal to any random string.
2. Go to the [Spoonacular API](https://spoonacular.com/food-api) and get a free api
2. Create a variable `API_KEY` and set it equal to the given api key.


#### 6. Run server

Type `nodemon` or `node server.js` in terminal to run server

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Favorite Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| userId | Integer | Foreign Key |
| recipeId | Integer | Must be unique / used to find recipe |
| title | String | Must be provided |
| image | String | Must be provided |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Review Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| userId | Integer | Foreign Key |
| name | String | Must be provided |
| recipeId | Integer | Must be unique / used to find recipe |
| score | Integer | Must be provided |
| content | Text | Must be provided |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home Page |
| GET | /auth/login | auth.js | Login Form |
| GET | /auth/signup | auth.js | Signup Form |
| POST | /auth/login | auth.js | Login User |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes Session Info |
| GET | /profile | server.js | Regular User Profile |
| GET | /recipe | recipe.js | Recipe Search Index |
| GET | /recipe/cuisines | recipe.js | Recipe Search By Cuisine |
| GET | /recipe/results | recipe.js | Recipe Search Results |
| POST | /recipe/review | recipe.js | Add Review |
| GET | /recipe/edit/:id | recipe.js | Edit Review |
| PUT | /recipe/:id | recipe.js | Edit Review |
| DELETE | /recipe/review/:id | recipe.js | Delete Review |
| POST | /recipe | recipe.js | Add Favorite |
| DELETE | /recipe/:id | recipe.js | Delete Favorite |
| GET | /recipe/favorites | recipe.js | Favorite Recipes |
| GET | /recipe/:id | recipe.js | Recipe |