const express =require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');   


app.use(bodyParser.json());
app.use(cors());    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});