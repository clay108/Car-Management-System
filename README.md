# CarSavvyApp

CarSavvyApp is a full-stack web application for managing blog posts, user profiles, and analytics. This documentation provides an overview of the project, setup instructions, and basic API information. For full API details, see the [API Documentation](./API_DOCUMENTATION.md).

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
CarSavvyApp allows users to manage blog posts, user profiles, and basic analytics. The application utilizes JWT-based authentication for secure access control.

## Features
- User registration and login/logout
- Role-based authorization
- CRUD functionality for blogs
- User profile management
- Analytics tracking

## Tech Stack
- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/CarSavvyApp.git
   cd CarSavvyApp


---

### `API_DOCUMENTATION.md`

```markdown
# CarSavvyApp API Documentation

This document provides detailed information on each API endpoint available in the CarSavvyApp.

## Table of Contents
- [Authentication](#authentication)
  - [Register](#register)
  - [Login](#login)
  - [Logout](#logout)
  - [My Profile](#my-profile)
- [Blog Management](#blog-management)
  - [Get All Blogs](#get-all-blogs)
  - [Get Blog by ID](#get-blog-by-id)
  - [Create Blog](#create-blog)
  - [Update Blog](#update-blog)
  - [Delete Blog](#delete-blog)
- [Author Management](#author-management)
  - [Get All Authors](#get-all-authors)

---

## Authentication

### Register
- **Endpoint**: `/api/v1/user/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
```
### Response:
### Success (201 Created):
```
{
  "success": true,
  "message": "User registered successfully",
  "user": { "id": "string", "name": "string", "email": "string" }
}
```
###Failure (400 Bad Request):
```
{
  "success": false,
  "message": "Error message"
}
```

## Login
### Endpoint: /api/v1/user/login
- **Method**: `POST`
Description: Logs in an existing user.
Request Body:
```
Copy code
{
  "email": "string",
  "password": "string"
}
```
Response:
Success (200 OK):
```
{
  "success": true,
  "token": "string"
}
```
Failure (401 Unauthorized):
```
{
  "success": false,
  "message": "Invalid credentials"
}
```
Logout
Endpoint: /api/v1/user/logout
- **Method**: `POST`
Description: Logs out the current user by clearing their session token.
Authentication: Requires a valid JWT token.
Response:
```
{
  "success": true,
  "message": "Logged out successfully"
}
```
My Profile
Endpoint: /api/v1/user/myprofile
- **Method**: `GET`
Description: Retrieves the profile details of the logged-in user.
Authentication: Requires a valid JWT token.
Response:
Success (200 OK):
```
{
  "success": true,
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```
Failure (401 Unauthorized):
```
{
  "success": false,
  "message": "User is not authenticated"
}
```
Blog Management
Get All Blogs
Endpoint: /api/v1/blog/all
- **Method**: `GET`
Description: Retrieves all blogs.
Authentication: None.
Response:
Success (200 OK):
```
{
  "success": true,
  "allBlogs": [
    { "id": "string", "title": "string", "content": "string" }
  ]
}
```
Get Blog by ID
Endpoint: /api/v1/blog/:id
- **Method**: `GET`
Description: Retrieves details of a single blog by ID.
Response:
Success (200 OK):
```
{
  "success": true,
  "blog": {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": "string"
  }
}
```
Failure (404 Not Found):
```
{
  "success": false,
  "message": "Blog not found"
}
```
Create Blog
Endpoint: /api/v1/blog/create
- **Method**: `POST`
Description: Creates a new blog.
Authentication: Requires a valid JWT token.
Request Body:
```
{
  "title": "string",
  "content": "string"
}
```
Response:
Success (201 Created):
```
{
  "success": true,
  "blog": {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": "string"
  }
}
```
Update Blog
Endpoint: /api/v1/blog/update/:id
- **Method**: `PUT`
Description: Updates a blog by ID.
Authentication: Requires a valid JWT token and authorization.
Request Body:
```
{
  "title": "string",
  "content": "string"
}
```
Response:
Success (200 OK):
```
{
  "success": true,
  "message": "Blog updated successfully"
}
```
Delete Blog
Endpoint: /api/v1/blog/delete/:id
- **Method**: `DELETE`
Description: Deletes a blog by ID.
Authentication: Requires a valid JWT token and authorization.
Response:
Success (200 OK):
```
{
  "success": true,
  "message": "Blog deleted successfully"
}
```
Author Management
Get All Authors
Endpoint: /api/v1/user/authors
- **Method**: `GET`
Description: Retrieves all registered authors.
Response:
Success (200 OK):
```
{
  "success": true,
  "authors": [
    { "id": "string", "name": "string" }
  ]
}
```
- **Method**: `GET`
Description: Retrieves all registered authors.
Response:
Success (200 OK)
```
