import kill from 'kill-port';
import chai from 'chai';
import { should, expect } from 'chai';
import chaiHttp from 'chai-http';

//! Unfortunately tests are not working without starting the backend by "npm start"
//! I tried my best

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Test', () => {
  /* 
      Get weather data by sity name
    */
  describe('GET /api/weatherbycity', () => {
    it('It should GET weather by city', (done) => {
      const city = 'London';
      chai
        .request('http://localhost:9000')
        .get('/api/weatherbycity')
        .query({ city: city })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.have.property('name').eq(city);
          done();
        });
    });
  });

  /* 
      Get forecast by sity name
    */
  describe('GET /api/forecast', () => {
    it('It should GET forecast by city', (done) => {
      const city = 'London';
      chai
        .request('http://localhost:9000')
        .get('/api/forecast')
        .query({ city: city })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.have.property('weather');
          res.body.should.have.property('time');
          res.body.weather.should.have.property('id');
          res.body.weather.should.have.property('main');
          res.body.weather.should.have.property('description');
          done();
        });
    });
  });
});
