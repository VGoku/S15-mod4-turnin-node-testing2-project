const db = require("../data/db-config");

// Find all dragons
function findAll() {
  // Retrieves all dragons from the 'dragons' table
  return db("dragons");
}

// Find a dragon by ID
function findById(id) {
  // Retrieves a specific dragon by its ID, ensuring only one result is returned
  return db("dragons").where({ id }).first();
}

// Insert a new dragon
function insert(dragon) {
  // Inserts a new dragon into the 'dragons' table and returns the newly inserted dragon
  return db("dragons").insert(dragon).returning("*");
}

// Update a dragon's info
function update(id, changes) {
  // Updates a dragon's details based on the provided ID, and returns the updated dragon
  return db("dragons")
    .where({ id })
    .update(changes) // Applies the changes to the dragon
    .returning("*") // Returns all updated rows
    .then(updated => updated[0]); // Extract the first (and only) updated dragon from the array
}

// Remove a dragon from the database
function remove(id) {
  // Deletes a dragon from the 'dragons' table based on the given ID
  return db("dragons").where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove
};
