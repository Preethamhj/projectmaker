const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authrouter = require('./routers/auth');
const teamRoutes = require('./routers/team');
const projectRoutes = require('./routers/project');


// Load env variables first
dotenv.config();

const app = express();
app.use(express.json());

// Add error handling for MongoDB connection
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed:", err.message));

app.use('/auth', authrouter);
app.use('/teams', teamRoutes);
app.use('/projects', projectRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});
