const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
var db = mongoose.connect("mongodb://localhost/TestDB")
// Connection à la BD
mongoose.Promise = global.Promise;
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
//Tout les collections sont supprimés avant chaque test.
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
   }); 
});