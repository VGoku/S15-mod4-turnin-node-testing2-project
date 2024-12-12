const express = require('express');
const db = require('../data/db-config');

const server = express();
server.use(express.json());

// Endpoints

// Get all dragons
server.get('/api/dragons', async (req, res) => {
  try {
    const dragons = await db('dragons');
    res.status(200).json(dragons);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving dragons' });
  }
});

// Create a new dragon
server.post('/api/dragons', async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ message: 'Name and type are required' });
  }

  try {
    const [id] = await db('dragons').insert({ name, type });
    const newDragon = await db('dragons').where({ id }).first();
    res.status(201).json(newDragon);
  } catch (err) {
    res.status(500).json({ message: 'Error creating dragon' });
  }
});

// Get a single dragon by ID
server.get('/api/dragons/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const dragon = await db('dragons').where({ id }).first();
    if (dragon) {
      res.status(200).json(dragon);
    } else {
      res.status(404).json({ message: 'Dragon not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving dragon' });
  }
});

module.exports = server;
