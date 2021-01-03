# Api-JWT-Login

## What is this project doing ?

This little project was about using the library express, the hashes function and the JSON Web Token (JWT). 
It's a small API that allows to register a new user and/or to log in to then access private data. It sends information in a mongoDB database. 

## How is this working ?

### The register part

With a POST request on the url ***localhost://3000/api/user/register***, we send a user (name, mail, password and date) to a DB. In order to do that, we created a model User and then we used the library **@hapi/joi** to make sure that those informations were correct. Once it is verified, we hash the password using **bcript** and then send everything on the DB.

### The login and JWT part

With a POST request on the url ***localhost://3000/api/user/login***, we send the email adress and the password. We checked if those respect the User model, then if the email exists. If those two conditions are reunited, we use **bcript** to compare the hashed password in the DB and the password and if those two match, the user is verified. Once it is verified, we put an **auth-token** inside the header of the answer. The **auth-token** is using a **secret token** and **jwt**.

## How to use it ?

Here is a list of what you need to download with **npm** : 

 - **express** library for the routes and the middleware
 - **mongoose** library for connecting to a MongoDB DataBase and send information to it
 - **dotenv** library for stocking sensible information that cannot be in the code
 - **@hapi/joi** library for checking if the sent information is respecting the built model for the user
 - **bcryptjs** library for hashing the password before sending it to the DataBase
 - **jsonwebtoken** library for creating an auth-token

Inside the .env file, there is the link to the Database that I used and the Secret Token used to create the JWT.