```markdown
# BlogApp

## Project Overview
BlogApp is a web application designed to provide users with a platform to create, edit, and share blog posts. It is built using EJS, JavaScript, and CSS, ensuring a dynamic and interactive user experience.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Switch-is-case/BlogApp.git
   cd BlogApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

![image](https://github.com/user-attachments/assets/2af62b4f-399b-4416-a411-3db0f77a68a4)

![image](https://github.com/user-attachments/assets/c63f05e6-a1ab-4c58-84a6-940496864447)

## API Documentation

### Endpoints

#### 1. Create a new blog post
- **URL:** `/api/posts`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Post Title",
    "content": "Post Content"
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "title": "Post Title",
    "content": "Post Content",
    "createdAt": "2025-02-26T10:28:27.000Z"
  }
  ```

#### 2. Get all blog posts
- **URL:** `/api/posts`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": "1",
      "title": "Post Title",
      "content": "Post Content",
      "createdAt": "2025-02-26T10:28:27.000Z"
    },
    ...
  ]
  ```

#### 3. Get a single blog post
- **URL:** `/api/posts/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "id": "1",
    "title": "Post Title",
    "content": "Post Content",
    "createdAt": "2025-02-26T10:28:27.000Z"
  }
  ```

#### 4. Update a blog post
- **URL:** `/api/posts/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content"
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
    "title": "Updated Title",
    "content": "Updated Content",
    "updatedAt": "2025-02-26T10:30:00.000Z"
  }
  ```

#### 5. Delete a blog post
- **URL:** `/api/posts/:id`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```
```

You can now create or update the README.md file in your repository with this content. Let me know if you need any further modifications!
