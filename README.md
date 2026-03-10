# Excel Number Filter Web Application

A full-stack web application that allows users to upload an Excel file, filter numbers based on a prefix, and download the filtered results as a new Excel file.

## Live Demo

Frontend: https://num-filter-1.onrender.com/
Backend API: https://num-filter.onrender.com/

## Features

* Upload Excel files containing numbers
* Filter numbers based on a prefix
* Display filtered numbers on the UI
* Show total number of matches
* Download filtered results as an Excel file
* Responsive and simple user interface

## Tech Stack

Frontend:

* React.js
* Axios
* CSS

Backend:

* Node.js
* Express.js
* Multer (file upload handling)
* XLSX (Excel file processing)
* CORS

Deployment:

* Render (Frontend + Backend)

## Project Structure

Num_Filter
├── backend
│   ├── server.js
│   ├── package.json
│   └── uploads
│
└── frontend
├── src
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public
└── package.json

## How It Works

1. User uploads an Excel file containing numbers.
2. User enters a prefix number.
3. Frontend sends the file and prefix to the backend API.
4. Backend reads the Excel file using XLSX.
5. Numbers matching the prefix are filtered.
6. Results are returned to the frontend and displayed.
7. Users can download the filtered numbers as a new Excel file.

## API Endpoints

Filter Numbers

POST /filter

Request Body (multipart/form-data):

* file: Excel file
* number: prefix to filter

Response Example:

{
"numbers": ["9876543210", "9812345678"],
"count": 2
}

Download Filtered Excel

POST /download

Returns a downloadable Excel file containing filtered numbers.

## Installation (Local Setup)

Clone the repository:

git clone https://github.com/AKSHATVERMA628/Num_Filter.git

Install backend dependencies:

cd backend
npm install

Start backend server:

node server.js

Install frontend dependencies:

cd ../frontend
npm install

Run frontend:

npm start

## Deployment

Backend deployed as a Render Web Service.

Frontend deployed as a Render Static Site.

## Author

Akshat Verma

GitHub: https://github.com/AKSHATVERMA628
LinkedIn: https://www.linkedin.com/in/akshatverma629
