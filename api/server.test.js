const request = require('supertest');
const server = require('./server');
const db = require('../data/db-config');

beforeEach(async () => {
  // Clean up the dragons table before each test
  await db('dragons').truncate();
});

describe('GET /api/dragons/:id', () => {
  it('returns 200 and the correct dragon when it exists', async () => {
    // Insert a dragon into the database
    const [dragon] = await db('dragons').insert({ name: 'Smaug', type: 'Fire' }, ['id']);
    const res = await request(server).get(`/api/dragons/${dragon.id}`);
    
    // Assert that the status is 200 and the dragon data matches
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Smaug');
    expect(res.body.type).toBe('Fire');
  });

  it('returns 404 if the dragon does not exist', async () => {
    // Make a GET request for a non-existing dragon
    const res = await request(server).get('/api/dragons/999');
    
    // Assert that the status is 404 as expected when the dragon is not found
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Dragon not found');
  });
});

describe('POST /api/dragons', () => {
  it('returns 201 and the created dragon when valid data is provided', async () => {
    const newDragon = { name: 'Toothless', type: 'Night Fury' };
    
    const res = await request(server).post('/api/dragons').send(newDragon);
    
    // Assert the status is 201 and the response body contains the new dragon
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Toothless');
    expect(res.body.type).toBe('Night Fury');
  });

  it('returns 400 if name or type is missing', async () => {
    const invalidDragon = { name: 'Toothless' }; // Missing type
    
    const res = await request(server).post('/api/dragons').send(invalidDragon);
    
    // Assert the status is 400 and a proper error message is returned
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Name and type are required');
  });
});

describe('GET /api/dragons', () => {
  it('returns 200 and a list of dragons', async () => {
    // Insert two dragons into the database
    await db('dragons').insert([
      { name: 'Smaug', type: 'Fire' },
      { name: 'Toothless', type: 'Night Fury' }
    ]);

    const res = await request(server).get('/api/dragons');
    
    // Assert that the status is 200 and the list contains the two dragons
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].name).toBe('Smaug');
    expect(res.body[1].name).toBe('Toothless');
  });
});
