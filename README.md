Job Search Portal
Welcome to the Job Search Portal project! This is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) with CSS for styling. The portal provides a comprehensive platform for job seekers and employers to connect seamlessly.

Table of Contents
Introduction
Features
Technologies Used
Installation
Usage
Introduction
The Job Search Portal aims to bridge the gap between job seekers and employers by offering a user-friendly interface and efficient job matching functionalities. The portal allows job seekers to search and apply for jobs, while employers can post job openings and manage applications.

Features
Job Seeker Features:

User registration and authentication
Profile creation and management
Job search
Job application submission and deletion
Employer Features:

Employer registration and authentication
Job posting and management
Viewing and managing job application
General Features:

Responsive design for various devices
Secure user authentication
Technologies Used
Frontend

React.js
CSS
Backend:

JWT (for authentication)
MongoDB (for data storage)
Socket.io (for real-time notification)
Installation
To run this project locally, follow these steps:

Clone the repository
  git clone https://github.com/yourusername/job-search-portal.git
  cd job-search-portal
Install the dependencies

For the backend:
    cd backend
    npm install
For the frontend:
    cd ../frontend
    npm install
Set up environment variables:

Create a .env file in the backend directory with the following variables:
    PORT=5000
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
Start the development servers:

For the backend:
    cd backend
    npm run dev
For the frontend:
    cd ../frontend
    npm start
Open your browser and navigate to http://localhost:5173/ to see the application running.

Usage
Job Seekers:
Register and create a profile.
Search for jobs using various filters.
Apply for jobs and track the application status.
Employers:
Register and create a company profile.
Post job openings.
Manage applications received for job postings.
We hope you enjoy using the Job Search Portal and find it useful for your job search or hiring needs!

Happy coding!
