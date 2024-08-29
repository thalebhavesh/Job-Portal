const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'jobportal'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Database connected...');
});

// Get jobs
app.get('/jobs', (req, res) => {
  const sql = 'SELECT * FROM jobs';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving job data' });
    }
    res.status(200).json(results);
  });
});

// Get job by ID
app.get('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM jobs WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving job data' });
    }
    res.status(200).json(result[0]);
  });
});

// Get employees
app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving employee data' });
    }
    res.status(200).json(results);
  });
});


// Add a new job
app.post('/jobs', (req, res) => {
  const newJob = req.body;
  const sql = 'INSERT INTO jobs SET ?';
  db.query(sql, newJob, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving job data' });
    }
    res.status(201).json({ ...newJob, id: result.insertId });
  });
});

// Upload image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl: imageUrl });
});

app.use('/uploads', express.static(uploadPath));

// Upload resume
app.post('/upload-resume', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const resumeUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ resumeUrl: resumeUrl });
});

// Add employee application
app.post('/apply', (req, res) => {
  const newEmployee = req.body;
  const sql = 'INSERT INTO employees SET ?';
  db.query(sql, newEmployee, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving application' });
    }
    res.status(201).json({ ...newEmployee, id: result.insertId });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
