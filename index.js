const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;
const path = require('path');

const app = express();

//enable body parse
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//set static folders
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai',require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));

// console.log(1234);