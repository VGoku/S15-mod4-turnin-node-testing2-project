const db = require('../data/db-config');

async function findAll() {
  return db('dragons');
}

async function insert(dragon) {
  const [id] = await db('dragons').insert(dragon);
  return db('dragons').where({ id }).first();
}

module.exports = {
  findAll,
  insert,
};
