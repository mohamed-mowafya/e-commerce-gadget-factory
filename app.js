const express = require('express');
const app = express();
require('dotenv').config()


app.get('/',(req,res)=>{
res.send('Test');
});
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('Connected to port ' + port)
}
);
