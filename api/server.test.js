const request = require('supertest');
const server = require('./server');
const db = require('../data/db-config');

beforeEach(async () => {
  await db('dragons').truncate();
});

describe('GET /api/dragons', () => {
  it('returns 200 and an empty list initially', async () => {
    const res = await request(server).get('/api/dragons');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});

describe('POST /api/dragons', () => {
  it('adds a dragon and returns the new dragon', async () => {
    const res = await request(server)
      .post('/api/dragons')
      .send({ name: 'Drogon', type: 'Fire' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Drogon');
  });

  it('returns 400 if name or type is missing', async () => {
    const res = await request(server).post('/api/dragons').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Name and type are required');
  });
});
