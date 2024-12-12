/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Truncate the 'dragons' table to ensure a clean slate before seeding new data
  return knex("dragons").truncate().then(() => {
    // Insert sample dragons into the 'dragons' table
    return knex("dragons").insert([
      { name: "Smaug", type: "Fire" }, // Insert first dragon with name 'Smaug' and type 'Fire'
      { name: "Toothless", type: "Night Fury" }, // Insert second dragon with name 'Toothless' and type 'Night Fury'
    ]);
  });
};


