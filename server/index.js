import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'

// --------- App Initilization ----
const app = express();


//---------- Request Middlewares ----

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

//-------- Server Routes -----
app.use('/posts', postRoutes)




//--------- Monogoose Connection ------
const CONNECTION_URL = "mongodb+srv://AliChaudahry:Bf489419@chaudhary.bks6h.mongodb.net/Memories?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => app.listen(PORT, () => console.log(`Your server is connected at Port: ${PORT}`)))
    .catch(error => console.log('Error in server Connection !!' + error.message))

// mongoose.set('useFindAndModify', false)