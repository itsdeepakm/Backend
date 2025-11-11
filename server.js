const express =require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');   
const mongoose = require('mongoose');
const User = require('./schema');


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const mongoURI = 'mongodb+srv://deepaklewiskumar19:pythonjs1962@cluster0.p959xj8.mongodb.net/bookstore?retryWrites=true&w=majority';
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(' MongoDB connected successfully!');
  } catch (err) {
    console.error(` MongoDB connection error: ${err.message}`);
    
  }
};
connectDB();
app.get('/test', (req, res) => {
  res.send('Express route works!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  };
});
app.post('/api/users', async (req, res) => {
  try {
    console.log(req.body);
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const userCount = await User.countDocuments();
    const username = `${name}_${role === 'admin' ? 'admin' : 'student'}${userCount + 1}`;

    const newUser = new User({ name, phone, email, password, role, username });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});