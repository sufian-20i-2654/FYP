const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/TalkTales', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
  
    const newUser = new User({
      email,
      password,
    });
  
    try {
      await newUser.save(); // Use await with the save method
  
      res.json({ message: 'User data saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving user data' });
    }
  });

  app.post('/api/signin', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password match a user in your database
    const user = await User.findOne({ email: username, password: password });
  
    if (user) {
      // User is authenticated
      res.json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
