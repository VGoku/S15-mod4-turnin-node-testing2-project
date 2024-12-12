/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('users').truncate().then(() => {
    return knex('users').insert([
      { username: 'admin', password: 'password' },
      { username: 'user1', password: '123456' },
    ]);
  });
};

