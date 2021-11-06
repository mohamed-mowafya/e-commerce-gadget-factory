// Source : https://www.geeksforgeeks.org/how-to-use-mocha-with-mongoose/

const assert = require('assert')
const Usager = require('../models/user')
const UserModel = require('../models/user');
describe('Création dun compte (test du modèle usager)',()=>{
    it('Crée un compte usager', (done) =>{
        let userModel = new UserModel();
        let mdpHashed = userModel.encrypterLeMotDePasse("Test1234!");
        const usager = new Usager({nom:"test",prenom:"test",email:"test@gmail.com",hashed_password:mdpHashed})
        usager.save() 
        .then(() => {
            assert(!usager.isNew); // Si l'usager est déjà sauvegardé dans la bd, il est pas new.
            done();
        });
    })
})
