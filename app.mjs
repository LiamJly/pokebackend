import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import usersRoute from './routes/users.mjs'


const app = express();
app.use(express.json())


const port = process.env.PORT
const mongoUrl = process.env.MONGO_CONNECT_URL
const corsOptions={
    origin:"http://localhost:3000"
};

app.use(cors(corsOptions))

app.listen(
    port,
    ()=>{console.log(`Server listening on port ${port} `);}
);
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on('error', (error)=>{
    console.log(error)
})
db.once('connected', ()=>{
    console.log('DB Connected')
})

app.use('/auth', usersRoute)