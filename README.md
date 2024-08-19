# Task Management API
This is a RESTful API for a task management API built using Node.js and Express.js framework, integrated with a PostgresSQL database server for data storage. 
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/sinngam-khaidem/task-management-api.git
   cd api
   ```

2. Install the dependencies:
   ```bash
   yarn install
   ```

## Usage

1. Start the server
   ```bash
   yarn start
   ```

2. Once the server is running, you can access the API at:
   ```
   http://localhost:<port>
   ```

3. Use any API client (such as Postman) to interact with the API by making GET, POST, PUT, or DELETE requests to the defined endpoints.

## Environment Variables

Create a `.env` file in the api directory of the project and add the following variables:

```
SERVER_PORT = <your nodejs server port>
DB_PORT = <your postgres database port>
DB_NAME = <your postgres database name>
DB_PASSWORD = <postgres user password>
DB_USER = <postgres user name>
JWT = <jwt secret or private key>
```

> Update the values accordingly based on your environment.