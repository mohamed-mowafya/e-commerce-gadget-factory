let mongoose = require("mongoose");
let user = require("../models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
describe("user", () => {
  beforeEach((done) => {
    user.remove({}, (err) => {
      done();
    });
  });
});


/**
 * test user routes
 */
describe("tests des routes", () => {
  it("Afficher tout les users", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("Afficher user by id", (done) => {
    chai
      .request(server)
      .get("/api/user/6196e5d63434a022e27558c5")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  })

  it("Afficher order by user id", (done) => {
    chai
      .request(server)
      .get("/api/orders/by/user/6196e5d63434a022e27558c5")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  })
});

/**
 * test category route
 */
describe("./get category", () => {
  it("Afficher toutes les categories", (done) => {
    chai
      .request(server)
      .get("/api/categories")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("Afficher category by id", (done) => {
    chai
      .request(server)
      .get("/api/category/6196e5d73434a022e27558c8")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  })
});

describe("./post category", () => {
  it("Doit retourner une category", (done) => {
    chai
      .request(server)
      .post("/category/create/6196e5d73434a022e27558c8")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        //res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  })  
})


/**
 * test products route
 */
describe("./get product", () => {
  it("Afficher tout les produits", (done) => {
    chai
      .request(server)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("Afficher produit specifique", (done) => {
    chai
      .request(server)
      .get("/api/products/related/6196e5d73434a022e27558cb")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("Afficher produit en fonction de la categorie", (done) => {
    chai
      .request(server)
      .get("/api/products/categories")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("Afficher produit", (done) => {
    chai
      .request(server)
      .get("/api/product/6196e5d73434a022e27558cb")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

/**
 * test orders route
 */
describe("./get order", () => {
  it("Afficher une commande en fonction du userId", (done) => {
    chai
      .request(server)
      .get("/api/order/list/6196e5d63434a022e27558c5")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("Afficher l'etat de la commande en fonction du userId", (done) => {
    chai
      .request(server)
      .get("/api/order/valeurs-etat/6196e5d63434a022e27558c5")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

/**
 * test braintree route
 */
describe("./get braintree", () => {
  it("Afficher un token pour user", (done) => {
    chai
      .request(server)
      .get("/api/braintree/getToken/6196e5d63434a022e27558c5")//A changer par le nouveau id quand on lance le test des models
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});


