const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
// app.use(express.jobtext({extended: false}))

app.use('/openai',require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`));

// console.log(1234);