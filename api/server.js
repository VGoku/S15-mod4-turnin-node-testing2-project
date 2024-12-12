// const express = require('express');
// const db = require('../data/db-config');

// const server = express();
// server.use(express.json());

// // Endpoints

// // Get all dragons
// server.get('/api/dragons', async (req, res) => {
//   try {
//     const dragons = await db('dragons');
//     res.status(200).json(dragons);
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving dragons' });
//   }
// });

// // Create a new dragon
// server.post('/api/dragons', async (req, res) => {
//   const { name, type } = req.body;
//   if (!name || !type) {
//     return res.status(400).json({ message: 'Name and type are required' });
//   }

//   try {
//     const [id] = await db('dragons').insert({ name, type });
//     const newDragon = await db('dragons').where({ id }).first();
//     res.status(201).json(newDragon);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating dragon' });
//   }
// });

// // Get a single dragon by ID
// server.get('/api/dragons/:id', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const dragon = await db('dragons').where({ id }).first();
//     if (dragon) {
//       res.status(200).json(dragon);
//     } else {
//       res.status(404).json({ message: 'Dragon not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving dragon' });
//   }
// });

// // Delete a dragon by ID
// server.delete('/api/dragons/:id', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const deletedDragon = await db('dragons').where({ id }).del();
    
//     if (deletedDragon === 0) {
//       return res.status(404).json({ message: 'Dragon not found' });
//     }
    
//     res.status(200).json({ message: 'Dragon deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting dragon' });
//   }
// });

// module.exports = server;

const express = require("express");
const db = require("../data/db-config");

const server = express();
server.use(express.json());

// Endpoints

// Get all dragons
server.get("/api/dragons", async (req, res) => {
  try {
    // Fetch all dragons from the 'dragons' table
    const dragons = await db("dragons");
    // Respond with a 200 status and the list of dragons
    res.status(200).json(dragons);
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message
    res.status(500).json({ message: "Error retrieving dragons" });
  }
});

// Create a new dragon
server.post("/api/dragons", async (req, res) => {
  const { name, type } = req.body;
  
  // Check if both 'name' and 'type' are provided in the request body
  if (!name || !type) {
    return res.status(400).json({ message: "Name and type are required" });
  }

  try {
    // Insert the new dragon into the 'dragons' table
    const [id] = await db("dragons").insert({ name, type });
    // Fetch the newly inserted dragon from the database using its 'id'
    const newDragon = await db("dragons").where({ id }).first();
    // Respond with a 201 status and the newly created dragon
    res.status(201).json(newDragon);
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message
    res.status(500).json({ message: "Error creating dragon" });
  }
});

// Get a single dragon by ID
server.get("/api/dragons/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    // Fetch the dragon by its ID from the 'dragons' table
    const dragon = await db("dragons").where({ id }).first();
    
    // If the dragon is found, return it with a 200 status
    if (dragon) {
      res.status(200).json(dragon);
    } else {
      // If no dragon is found with the given ID, return a 404 status and a message
      res.status(404).json({ message: "Dragon not found" });
    }
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message
    res.status(500).json({ message: "Error retrieving dragon" });
  }
});

// Delete a dragon by ID
server.delete("/api/dragons/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    // Delete the dragon with the specified ID from the 'dragons' table
    const deletedDragon = await db("dragons").where({ id }).del();
    
    // If no dragon is deleted (i.e., the ID doesn't exist), return a 404 status
    if (deletedDragon === 0) {
      return res.status(404).json({ message: "Dragon not found" });
    }
    
    // Respond with a 200 status indicating the dragon was deleted successfully
    res.status(200).json({ message: "Dragon deleted successfully" });
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message
    res.status(500).json({ message: "Error deleting dragon" });
  }
});

module.exports = server;
