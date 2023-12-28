const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Your routes
app.use('/api', require("./Routes/toll"));

app.get('/', (req, res) => {
  res.send('Hello, MERN Stack!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
