const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// info to be used to connect to database
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "3005",
    database: "students"
});

// connecting to database
pool.on('connect', () => {});


// launches html page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//add student function
app.post('/add-student', async (req, res) => {
    const { first_name, last_name, email, enrollment_date } = req.body;
    try {
        // query database to insert new student
        const result = await pool.query(
            `INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ('${first_name}', '${last_name}', '${email}', '${enrollment_date}') RETURNING *`
        );
        res.send('Successful');
    } catch (error) {
        res.status(500).send('Error: make sure all fields are properly formatted and not empty');
    }
});

app.post('/update-student-email', async (req, res) => {
    const { student_id, new_email } = req.body;
    try {
        // query database to update student email based on the student_id
        const result = await pool.query(
            `UPDATE students SET email = '${new_email}' WHERE student_id = ${student_id} RETURNING *`
        ); 
        res.send('successful');
    } catch (error) {
        res.status(500).send('Error: make sure the email is unique');
    }
});

app.post('/delete-student', async (req, res) => {
    const { student_id } = req.body;
    try {
        // query database to delete student based on the student_id
        const result = await pool.query(
            `DELETE FROM students WHERE student_id = ${student_id} RETURNING *`
        );
        res.send('successful');
    } catch (error) {
        res.status(500).send('Error: make sure the student_id is valid');
    }
});

app.get('/get-all-students', async (req, res) => {
    try {
        // query database to return array of all data
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, () => {});
