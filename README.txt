Alex Janes 101230369
YOUTUBE LINK: https://youtu.be/-BxFZSQn3cQ

Setup:
-install postgresSQl
-create a databse within postgresSQl using the PgAdmin 4 view
-run these SQL scripts within that data to create the tables and load the initial data

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    enrollment_date DATE
);

INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');


Run Application:
-install the required JS npm modules (npm init, npm install pg, npm install express)
-run node database.js 
-go to http://localhost:3000/


Functions:
add student
-gets first_name, last_name, email, enrollment_date data from index page
-runs INSERT sql command to insert data into database
-returns a success or error message 

update email
-gets student_id, email data from index page
-runs UPDATE sql command to insert data into database where the student_id matches the data passed in
-returns a success or error message 

delete student
-gets student_id data from index page
-runs DELETE sql command to delete row from database where the student_id matches the data passed in
-returns a success or error message 

get all students
-takes in no data
-runs SELECTsql command return all data in the database
-returns the data or error message 