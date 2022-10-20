/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  nombre: 'Doge',
  pesoMin: 28,
  pesoMax: 30,
  altMin: 20,
  altMax: 24
}

describe('Dog routes', () => {

  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });

  describe('GET /dogs?name=', () => {
    it('should get 200', () =>
      agent.get('/dogs?=schnauzer').expect(200)
    );

    it('should get 404', () =>
      agent.get('/dogs?name=thisisanexample').expect(404)
    );
  });

  describe('GET /dogs/:idRaza', () => {
    it('should get 200', () =>
      agent.get('/dogs/42').expect(200)
    );

    it('should get 404', () =>
      agent.get('/dogs/300').expect(404)
    );
  });

  describe('POST /dogs', () => {
    it('should get 400', async () => {
      const res = await agent.post('/dogs');
      expect(res.statusCode).to.equal(400);
      expect(res.text).to.equal('Faltan datos.');
    });

    it('should get 201', async () => {
      const res = await agent.post('/dogs').send(dog);
      expect(res.statusCode).to.equal(201);
      expect(res.text).to.equal('Él perro se creó con éxito.');
    });
  });
});
