/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('dragons').truncate().then(() => {
    return knex('dragons').insert([
      { name: 'Smaug', type: 'Fire' },
      { name: 'Toothless', type: 'Night Fury' },
    ]);
  });
};

