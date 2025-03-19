# Backend

This is the backend server for the Smart-Brain face recognition app. It handles user authentication, image processing, and database operations using Node.js, Express, PostgreSQL, and the Clarifai API.

## Live API URL
The project was deployed on **Render** and you can find the backend here: (https://pythia-api.onrender.com/)

## Features
- User registration and authentication (with bcrypt hashing)
- Secure database storage with PostgreSQL
- Face detection via the Clarifai API
- Tracks user image submission count

## Technologies Used
- Node.js with Express
- PostgreSQL (via Knex.js)
- Bcrypt.js (for password hashing)
- CORS (Cross-Origin Resource Sharing)

## Installation & Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [PostgreSQL](https://www.postgresql.org/download/)
- Set up a database and configure the connection URL

### Environment Variables
Create a `.env` file in the root directory and set up:
```
DATABASE_URL=your_postgresql_connection_string
CLARIFAI_KEY=*****
```
