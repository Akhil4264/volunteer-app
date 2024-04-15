const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Copyleaks } = require('plagiarism-checker');
require('dotenv').config()
const port = process.env.PORT || 3001;

// const mongoUrl = 'mongodb+srv://pamulaparthimaheshreddy:g09PrNrjUTRd4iJx@chatapp.hq6nbsj.mongodb.net/?retryWrites=true&w=majority&appName=ChatApp';
const mongoUrl = "mongodb+srv://pamulaparthimaheshreddy:Dwi8DtnOFMOhnfbR@chatapp.hq6nbsj.mongodb.net/?retryWrites=true&w=majority&appName=ChatApp";

const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


// Chat Application server

const client = new MongoClient(mongoUrl);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed:', error);
  }
} 

connectToMongo();

const messageSchema = new mongoose.Schema({
  taskId: String,
  studentID: String,
  profID: String,
  content: String,
  isSender: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const Message = client.db("ChatApp").collection("messages");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


io.on('connection', (socket) => {
  // console.log('New client connected:', socket.id);

  socket.on('joinRoom', async ({ taskId, studentID, profID }) => {
    const roomName = `task_${taskId}_student_${studentID}_prof_${profID}`;
    socket.join(roomName);
    // console.log(`Joined room: ${roomName}`);
    try {
        const pastMessages = await Message.find({
        taskId,
        studentID,
        profID,
        }).toArray();
        
        // Send past messages to the user who just joined
        // console.log("Past messages at ", Date.now, "are", pastMessages)
        pastMessages.forEach(message => {
            // console.log(message);
            socket.emit('pastMessages', message);
        });
    } catch (error) {
        console.error('Error fetching past messages:', error);
    }
  });

  socket.on('sendMessage', async (message, {taskId, studentID, profID }) => {
    const roomName = `task_${taskId}_student_${studentID}_prof_${profID}`;
    const messageToSave = {
        taskId,
        studentID,
        profID,
        content: message.content,
        isSender: message.isSender,
        createdAt: new Date(),
    };

    // Save the message to MongoDB
    try {
        await Message.insertOne(messageToSave);
        io.to(roomName).emit('receiveMessage', message);
        console.log(`Message saved and sent in room: ${roomName}`);
    } catch (error) {
        console.error('Error saving message to MongoDB:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// File storge server

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    const { studentId, projectId, professorId, submissionNumber } = req.body;
    // console.log("variable names", studentId, projectId, professorId, submissionNumber);
    // const dir = `submissions/${studentId}_${projectId}_${professorId}`;
    const mainDir = `submissions/${projectId}_${studentId}_${professorId}`;
    const subDir = `${mainDir}/${projectId}_${studentId}_${professorId}_${submissionNumber}`;
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
      console.log(`Created directory: ${subDir}`);
    }
    cb(null, subDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


app.get('/',async (req,res) => [
  res.send({
    "msg" : "Node backend for volunteer-app"
  })
])

app.get('/submissions/:folderName/:subFolderName/details', (req, res) => {
  const { folderName, subFolderName } = req.params;
  const submissionDir = path.join(__dirname, 'submissions', folderName, subFolderName);
  const detailsFilePath = path.join(submissionDir, 'details.json');

  fs.readFile(detailsFilePath, 'utf8', (err, detailsContent) => {
    if (err) {
      return res.status(404).send({ message: 'Details file not found' });
    }

    const details = JSON.parse(detailsContent);

    fs.readdir(submissionDir, (err, files) => {
      if (err) {
        return res.status(500).send({ message: 'Error reading submission directory', error: err });
      }

      const submittedFile = files.find(file => file !== 'details.json');
      if (!submittedFile) {
        return res.status(404).send({ message: 'Submitted file not found' });
      }

      res.json({
        details,
        // submittedFile: fs.readFileSync(path.join(submissionDir, submittedFile), {encoding: 'base64'})
        submittedFile: {
            content: fs.readFileSync(path.join(submissionDir, submittedFile), { encoding: 'base64' }),
            extension: path.extname(submittedFile)
        }
      });
    });
  });
});



app.get('/submissions/:taskId/:studentId/:profId', (req, res) => {
  const { taskId, studentId, profId } = req.params;
  const mainDir = path.join(__dirname, 'submissions', `${taskId}_${studentId}_${profId}`);

  fs.readdir(mainDir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      return res.status(500).send({ message: 'Error reading submissions directory', error: err });
    }

    const matchingSubmissions = entries
      .filter((entry) => entry.isDirectory())
      .map((dir) => {
        const submissionNumber = dir.name.split('_').pop();

        const title = `Submission ${submissionNumber}`;
        return {
          id: taskId, // Assuming taskId is the same as id
          title,
          studentId,
          profId,
          submissionNumber
        };
      });

    res.json(matchingSubmissions);
  });
});


app.post('/submitForm', upload.single('file'), (req, res) => {
  console.log("required details of submit form from frontend in server.js backend",req);
//   const { studentId, projectId, professorId, ...rest } = req.body;
  const { projectId, studentId, professorId, submissionNumber, ...rest } = req.body;
  const folderName = `${projectId}_${studentId}_${professorId}`;
  const subFolderName = `${projectId}_${studentId}_${professorId}_${submissionNumber}`;
  const submissionDir = `submissions/${folderName}/${subFolderName}`;
  const detailsFilePath = path.join(submissionDir, 'details.json');
  console.log("file path name in server.js backend", detailsFilePath);
  fs.writeFile(detailsFilePath, JSON.stringify(rest), (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error writing file: ${detailsFilePath}', error: err });
    }
    res.send({ message: 'Form submitted successfully' });
  });
});

app.post('/checkPlagiarism', async (req, res) => {
  const { fileContent, filename } = req.body;
  const copyleaks = new Copyleaks();

  try {
    // Authentication with Copyleaks
    const authResponse = await copyleaks.loginAsync('pamulaparthimaheshreddy@gmail.com', 'a78c1045-7fb6-4ebf-8f2f-4c1b6c1d1156');
    console.log("Authorization completed:", authResponse);

    const accessToken = authResponse.access_token

    const scanId = await copyleaks.submitFileAsync(authResponse, filename, {
      base64: fileContent,
      filename: filename
    });

    res.json({ scanId });
  } catch (error) {
    console.error('Error checking plagiarism:', error);
    res.status(500).json({ message: 'Error checking plagiarism', error });
  }
});

app.post('/checkPlagiarism1', async (req, res) => {
  const { fileContent, filename } = req.body;

  try {
    // Step 1: Login to Copyleaks and get the access token
    const authResponse = await axios.post('https://id.copyleaks.com/v3/account/login/api', {
      email: 'pamulaparthimaheshreddy@gmail.com',
      key: 'a78c1045-7fb6-4ebf-8f2f-4c1b6c1d1156'
    });
    const accessToken = authResponse.data.access_token;

    // Step 2: Submit the file for a plagiarism check
    const submitResponse = await axios.post(
      'https://api.copyleaks.com/v3/scans/submit/file/', // Adjust the endpoint based on your use case (education/business)
      { base64: fileContent, filename },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    res.json({ scanId: submitResponse.data.processId });
  } catch (error) {
    console.error('Error checking plagiarism1:', error);
    res.status(500).json({ message: 'Error checking plagiarism1', error: error.response.data });
  }
});



// Simple in-memory store for verification codes
const verificationCodes = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pamulaparthimaheshreddy@gmail.com',
    pass: 'uzmzkvhlpcccgxjj'
  }
});

// Endpoint to send verification email
app.post('/api/send-verification', (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
  verificationCodes[email] = verificationCode;

  const mailOptions = {
    from: 'pamulaparthimaheshreddy@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${verificationCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Verification email sent');
    }
  });
});

// Endpoint to verify the code
app.post('/api/verify-code', (req, res) => {
  const { email, verificationCode } = req.body;
  if (verificationCodes[email] && verificationCodes[email] == verificationCode) {
    delete verificationCodes[email]; // Remove the code after successful verification
    res.send({ isVerified: true });
  } else {
    res.send({ isVerified: false });
  }
});


server.listen(port, () => console.log(`Server running on port ${port}`));
