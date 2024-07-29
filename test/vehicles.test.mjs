import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../server.js';

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, 'OEKFNEZKkF78EZFH93023NOEAF', { expiresIn: 86400 });
};

const adminUser = { id: 1, role: 'admin' };
const adminToken = generateToken(adminUser);

const clientUser = { id: 2, role: 'client' };
const clientToken = generateToken(clientUser);

describe('Vehicle Management API', () => {
  let vehicleId;

  describe('GET /vehicles', () => {
    it('should return all vehicles for admin', (done) => {
      request(app)
        .get('/vehicles')
        .set('Cookie', [`token=${adminToken}`])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should deny access for client', (done) => {
      request(app)
        .get('/vehicles')
        .set('Cookie', [`token=${clientToken}`])
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Access Denied: You do not have the required role!');
          done();
        });
    });
  });

  describe('POST /vehicles', () => {
    it('should add a new vehicle for admin', (done) => {
      const newVehicle = {
        marque: 'Toyota',
        modele: 'Corolla',
        annee: 2020,
        plaque: 'ABC-123',
        client_id: 2
      };

      request(app)
        .post('/vehicles')
        .set('Cookie', [`token=${adminToken}`])
        .send(newVehicle)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Vehicle added');
          done();
        });
    });

    it('should deny access for client', (done) => {
      const newVehicle = {
        marque: 'Honda',
        modele: 'Civic',
        annee: 2019,
        plaque: 'XYZ-789',
        client_id: 2
      };

      request(app)
        .post('/vehicles')
        .set('Cookie', [`token=${clientToken}`])
        .send(newVehicle)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Access Denied: You do not have the required role!');
          done();
        });
    });
  });

  describe('PUT /vehicles/:id', () => {
    it('should update an existing vehicle for admin', (done) => {
      const updatedVehicle = {
        marque: 'Toyota',
        modele: 'Corolla',
        annee: 2021,
        plaque: 'ABC-123',
        client_id: 2
      };

      request(app)
        .put(`/vehicles/${vehicleId}`)
        .set('Cookie', [`token=${adminToken}`])
        .send(updatedVehicle)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Vehicle updated');
          done();
        });
    });

    it('should deny access for client', (done) => {
      const updatedVehicle = {
        marque: 'Honda',
        modele: 'Civic',
        annee: 2020,
        plaque: 'XYZ-789',
        client_id: 2
      };

      request(app)
        .put(`/vehicles/${vehicleId}`)
        .set('Cookie', [`token=${clientToken}`])
        .send(updatedVehicle)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Access Denied: You do not have the required role!');
          done();
        });
    });
  });

  describe('DELETE /vehicles/:id', () => {
    it('should delete an existing vehicle for admin', (done) => {
      request(app)
        .delete(`/vehicles/${vehicleId}`)
        .set('Cookie', [`token=${adminToken}`])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Vehicle deleted');
          done();
        });
    });

    it('should deny access for client', (done) => {
      request(app)
        .delete(`/vehicles/${vehicleId}`)
        .set('Cookie', [`token=${clientToken}`])
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Access Denied: You do not have the required role!');
          done();
        });
    });
  });
});
