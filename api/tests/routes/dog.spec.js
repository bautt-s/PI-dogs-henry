/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = request(app);
const dogExample = {
  nombre: "Test",
  altMin: 34,
  altMax: 40,
  pesoMin: 80,
  pesoMax: 100,
  imagen: "https://airnfts.s3.amazonaws.com/nft-images/Swole_Doge_1619160627772.gif",
  lifetimeMin: 12,
  lifetimeMax: 18,
  grupo: "Sporting",
  funcion: "Guarding",
  temperaments: ["Hardworking", "Alert", "Dignified", "Adventurous"]
}

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe('GET /dogs', () => {
    it('should get 200', (done) => {
        agent.get('/dogs').expect(200, done)
      }
    );
  });

  describe('GET /dogs?name=', () => {
    it('should get 200', (done) => {
        agent.get('/dogs?=schnauzer').expect(200, done)
      }
    );

    it('should get 404', (done) => {
        agent.get('/dogs?name=thisisanexample').expect(404, done)
      }
    );
  });

  describe('GET /dogs/:idRaza', () => {
    it('should get 200', (done) => {
        agent.get('/dogs/42').expect(200, done)
      }
    );

    it('should get 404', (done) => {
        agent.get('/dogs/300').expect(404, done)
      }
    );
  });

  describe('POST /dogs', () => {
    it('should get 400', (done) => {
        agent.post('/dogs').send({nombre: "example"}).expect(400, done)
      }
    );

    it ('should get 201', (done) => {
      agent.post('/dogs').send(dogExample).expect(201, done)
    })
  });
});
