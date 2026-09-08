const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));

app.get('/',(req,res) => {
    res.send("Welcome")
});

require('./config/db').dbConnect();

const user = require('./routes/user_routes')
const courseRoutes = require('./routes/course_routes')
app.use('/api/v1', user)
app.use('/api/v1', courseRoutes)

app.listen(PORT, () =>{
    console.log(`Server successfully started at PORT NO: ${PORT}`)
})

