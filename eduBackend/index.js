const express = require('express');

const app = express();

const PORT = require('dotenv').config() || 8000;

app.use(express.json());

app.get('/',(req,res) => {
    res.send("Welcome")
});

require('./config/db').dbConnect();

const user = require('./routes/user_routes')
app.use('/api/v1', user)

app.listen(PORT, () =>{
    console.log(`Server successfully started at PORT NO: ${PORT}`)
})

