const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage with text', (done) => {
    chai.request(server)
    .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.should.include('Amazon Bay');
        done();
      });
    });

  it('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
    .get('/foo')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
});

describe('API Routes', () => {
  before(done => {
    db.migrate.latest()
    .then(() => done())
    .catch(error => console.log(error))
  })

  beforeEach((done) => {
    db.seed.run()
      .then(() => done())
      .catch(error => console.log(error));
  });

  describe('GET /api/v1/inventory', () => {
    it('should get all of the inventory', done => {
      const mockData = {
        id: 2,
        title: 'Focal SM9 Studio Monitors',
        item_description: 'Amazing sounding studio monitors with a very flat response.',
        img_url: 'https://cdn3.volusion.com/b3o4z.gn3gt/v/vspfiles/photos/9999-16793-2.jpg?1502113947',
        price: 1000
      }

      chai.request(server)
        .get('/api/v1/inventory')
        .end((error, response) => {
          const index = response.body.findIndex(obj => obj.id === mockData.id);
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[index].should.include(mockData);
          done();
      })
    })

    it('should return a 404 status if the url is invalid', done => {
      chai.request(server)
        .get('/api/v1/foo')
        .end((error, response) => {
          response.should.have.status(404);
          done()
        })
    })
  })

  describe('Get /api/v1/order_history', () => {
    it('should get all of the order history', done => {
      chai.request(server)
        .get('/api/v1/order_history')
        .end((error, response) => {
          const mockData = {
            id: 3,
            total_price: 481
          }

      chai.request(server)
        .get('/api/v1/order_history')
        .end((error, response) => {
          const index = response.body.findIndex(obj => obj.id === mockData.id);
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[index].should.include(mockData);
          done();
        })
      })
    })

    it('should return a 404 error if the url is invalid', done => {
      chai.request(server)
        .get('/api/v1/foo')
        .end((error, response) => {
          response.should.have.status(404);
          done()
        })
    })
  })
})
