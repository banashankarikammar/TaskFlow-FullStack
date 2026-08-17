# TaskFlow - Full Stack Task Management Application

TaskFlow is a full-stack task management web application built using React.js, Node.js, Express.js and MongoDB.

The application allows users to create, view, update, delete, search and filter tasks while providing a dashboard with task statistics and overall progress.

The project also includes automated backend integration tests using Jest and SuperTest.

---

## 🚀 Features

### Task Management
- Create new tasks
- View all tasks
- View a specific task
- Update existing tasks
- Delete tasks
- Set task priority
- Set task status

### Dashboard
- Total task count
- To-Do task count
- In-Progress task count
- Completed task count
- High-priority task count
- Overall completion percentage

### Search & Filtering
- Search tasks by title and description
- Filter tasks by status
- Filter tasks by priority

### Backend
- RESTful API architecture
- Express.js middleware
- MongoDB database integration
- Mongoose ODM
- Modular routes and controllers
- Error handling and validation

### Testing
- Jest test framework
- SuperTest API integration testing
- Health-check API testing
- CRUD API testing

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- Mongoose

### Testing
- Jest
- SuperTest

### Development Tools
- Git
- GitHub
- Visual Studio Code

---

## 🏗️ Application Architecture

```text
                ┌─────────────────────┐
                │     React.js UI     │
                │      Frontend       │
                └──────────┬──────────┘
                           │
                           │ REST API
                           ▼
                ┌─────────────────────┐
                │     Express.js      │
                │      REST API       │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      Controllers    │
                │    Business Logic   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │       Mongoose      │
                │        Model        │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │       MongoDB       │
                │      Database       │
                └─────────────────────┘