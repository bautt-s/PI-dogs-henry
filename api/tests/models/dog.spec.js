const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog Model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se pudo conectar a la DB:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});
