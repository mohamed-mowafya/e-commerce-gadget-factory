const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
before((done) =>{
    mongoose.connect("mongodb://localhost/TestDB")
    mongoose.connection.once('open',() =>{
        done();
    })
    .on('error',(error)=>{
        console.warn('Error',error);
    })
})


