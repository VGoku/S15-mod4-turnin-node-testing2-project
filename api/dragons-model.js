const db = require('../data/db-config');

// Find all dragons
function findAll() {
  return db('dragons');
}

// Find a dragon by ID
function findById(id) {
  return db('dragons').where({ id }).first();
}

// Insert a new dragon
function insert(dragon) {
  return db('dragons').insert(dragon).returning('*');
}

// Update a dragon's info
function update(id, changes) {
  return db('dragons')
    .where({ id })
    .update(changes)
    .returning('*') // Return all updated rows
    .then(updated => updated[0]); // Extract the first (and only) updated dragon
}

// Remove a dragon from the database
function remove(id) {
  return db('dragons').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove
};
