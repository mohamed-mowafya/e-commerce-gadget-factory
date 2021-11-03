const assert = require('assert')
const Usager = require('../models/user')
const UserController = require('../models/user');
describe('Création dun compte (test du modèle usager)',()=>{
    it('Crée un compte usager', (done) =>{
        let userController = new UserController();
        let mdpHashed = userController.encrypterLeMotDePasse("Test1234!");
        const usager = new Usager({nom:"test",prenom:"test",email:"test@gmail.com",hashed_password:mdpHashed})
        usager.save() 
        .then(() => {
            assert(!usager.isNew);
            done();
        });
    })
})
