import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('POST /api/signup', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/api/signup')
      .send({
        lastname: 'Doe',
        firstname: 'John',
        email: 'john.doe@example.com',
        password: 'password123'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('User registered');
        done();
      });
  });
});

describe('POST /api/signin', () => {
    it('should sign in an existing user', (done) => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'john.doe@example.com',
          password: 'password123'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('auth', true);
          expect(res.body).to.have.property('role');
          done();
        });
    });
  
    it('should return 404 for a non-existing user', (done) => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('User not found');
          done();
        });
    });
  
    it('should return 401 for an invalid password', (done) => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'john.doe@example.com',
          password: 'wrongpassword'
        })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Invalid password');
          done();
        });
    });
  });
  