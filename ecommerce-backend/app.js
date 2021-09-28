const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// importation routes:
const userRoutes = require('./routes/user')


// load env variables
const dotenv = require('dotenv');
dotenv.config()


// la connexion avec la BD :
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
  )
  .then(() => console.log('DB Marche'))
  
  mongoose.connection.on('error', err => {
    console.log(`Erreur de la BD: ${err.message}`)
  });
  




//Notre application :
const app = express();



// les middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());





// Routes middlewares

app.use("/api",userRoutes)


const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('Connected to port ' + port)
}
);
