import kill from 'kill-port';
import chai from 'chai';
import chaiHttp from 'chai-http';
const port = process.env.PORT || 9000;

//! start server
import app from '../src/index.js';

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
        .request(`http://localhost:${port}`)
        .get('/api/weatherbycity')
        .query({ city: city })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.have.property('name').eq(city);
          res.body.should.have.property('weather');
          res.body.weather[0].should.have.property('id');
          res.body.weather[0].should.have.property('main');
          res.body.weather[0].should.have.property('description');
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
        .request(`http://localhost:${port}`)
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

  /* 
      Get weather data by coordinates
    */
  describe('GET /api/weatherbycoordinates', () => {
    it('It should GET weather by coordinates', (done) => {
      const lon = 24.9414;
      const lat = 60.1718;
      const city = 'Helsinki';
      chai
        .request(`http://localhost:${port}`)
        .get('/api/weatherbycoordinates')
        .query({ lon: lon, lat: lat })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.have.property('name').eq(city);
          res.body.should.have.property('weather');
          res.body.should.have.property('coord');
          res.body.weather[0].should.have.property('id');
          res.body.weather[0].should.have.property('main');
          res.body.weather[0].should.have.property('description');
          done();
        });
    });
  });
  /* 
      Get forecast by coordinates
    */
  describe('GET /api/forecastbycoordinates', () => {
    it('It should GET forecast by coordinates', (done) => {
      const lon = 24.9414;
      const lat = 60.1718;
      chai
        .request(`http://localhost:${port}`)
        .get('/api/forecastbycoordinates')
        .query({ lon: lon, lat: lat })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('body');
          res.body.should.have.property('weather');
          res.body.should.have.property('time');
          res.body.weather.should.have.property('id');
          res.body.weather.should.have.property('main');
          res.body.weather.should.have.property('description');
          done();
          //! close server
          kill(port);
        });
    });
  });
});
