# Task Management API

## Overview
Task Management API is a RESTful API built with Node.js and TypeScript for managing tasks. It provides endpoints for user authentication, task creation, and management.

## Features
- User registration and login
- Task creation, retrieval, updating, and deletion
- Secure authentication using JWT
- Input validation using class-validator
- Migration support with Sequelize

YARN version 1.22.19
NODE version v20.16.0

## Installation

- install YARN
   ```
   npm install --global yarn
   ```

1. Clone the repository:
   ```bash
   git clone https://github.com/webmihail/task-management-api.git
   cd task-management-api
   ```
2. Up the local database in Docker container
   ```
   docker compose up -d
   ```
3. Create the .env file in the root of project and copy data from the .env.example
4. Install all dependencies
   ```
   yarn
   ```
5. Run the migrations
   ```
   yarn migration:run
   ```
6. Run project on dev
   ```
   yarn dev
   ```
   
- For common migration generation
   ```
   yarn migration:generate
   ```
- For building project
   ```
   yarn build
   ```
