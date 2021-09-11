import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'

// --------- App Initilization ----
const app = express();

//---------- Request Middlewares ----

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

//-------- Server base Routes -----
app.use('/posts', postRoutes)
app.use('/user', userRoutes)




//--------- Monogoose Connection transferred to env ------

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => app.listen(PORT, () => console.log(`Your server is connected at Port: ${PORT}`)))
    .catch(error => console.log('Error in server Connection !!' + error))

// mongoose.set('useFindAndModify', false)