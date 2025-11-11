const express =require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');   
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());    
app.use(bodyParser.urlencoded({ extended: true }));
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



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});