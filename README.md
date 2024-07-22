# Todo App API

Welcome to the Todo App API repository! This project provides a RESTful API for managing todos with user authentication.

## Overview

The Todo App API allows you to:

- **Manage Todos**: Create, read, update, and delete todos.
- **User Authentication**: Register, login, and logout users.

## Getting Started

Follow these instructions to set up and run the Todo App API locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/dks-codes/Todo-app.git
   cd Todo-app
   ```

2. **Set Up Backend**
   Navigate to the backend directory and install dependencies:

   ```sh
   cd Todo-app/backend
   npm install
   ```

   Create a .env file in the backend directory with the required environment variables:-

    ```
   PORT = <YOUR FREE PORT>
   MONGODB_URI = <Your MongoDB URI Connection String>
   FRONTEND_URL = <FRONTEND_URL>
   JWT_SECRET_KEY = <Your SECRET KEY>
   JWT_EXPIRES = <Days after which JWT expires>d
   COOKIE_EXPIRES = <Days after which Cookie Expires>
   ```

   Example of .env file:-
   ```
   PORT = 4001
   MONGODB_URI = mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net
   FRONTEND_URL = ``
   JWT_SECRET_KEY = jwtSECRETkey
   JWT_EXPIRES = 7d
   COOKIE_EXPIRES = 7
   ```

   Replace `<YOUR FREE PORT>` , `<Your MongoDB URI Connection String>` and ``<Your SECRET KEY>` with any free port on your system, your actual MongoDB connection string and JWT secret key, respectively.

   Also, you can provide your own JWT token expiration days and Cookie expiration days by replacing `<Days after which JWT expires>` and `<Days after which Cookie Expires>` respectively.

   Additionally, if you create your own frontend to use this API, then provide your frontend URL by replacing `<FRONTEND_URL>`

3. **Start the Backend server**

   ```
   npm run dev
   ```

   The server is running at: `http://localhost:<YOUR FREE PORT>` ( Eg: [http://localhost:4001](http://localhost:4001) )

## API Documentation

API documentation is available at  [Todo-app Documentation](https://documenter.getpostman.com/view/29222665/2sA3kUHhVq)

Alternatively, you can also see the documentation at: http://localhost:`<YOUR FREE PORT>`/api-docs ( Eg: [http://localhost:4001/api-docs/](http://localhost:4001/api-docs/) )

## Contributing

You are welcomed to contribute to the Todo App API! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them with meaningful messages.
4. Push your changes to your forked repository.
5. Open a pull request with a description of your changes.


## Contact

For any questions or issues, please contact us via the GitHub Issues page or at [deepakkumarsahoo2002@gmail.com](mailto:deepakkumarsahoo2002@gmail.com).
