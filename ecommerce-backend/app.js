const express = require('express');
const mongoose = require('mongoose');


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




// Les routes

app.get('/',(req,res)=>{
res.send('Test');
});
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('Connected to port ' + port)
}
);
