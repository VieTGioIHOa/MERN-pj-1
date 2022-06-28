require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mrtk4f8.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected...');
    } catch (error) {
        console.log(error);
    }
}

connectDB()

const app = express()

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

app.use(express.json())

app.use(express.urlencoded({
    extended: true,
}))

app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const POST = process.env.POST || 5000

app.listen(POST, () => {
    console.log(`Server running on ${POST}`);
})