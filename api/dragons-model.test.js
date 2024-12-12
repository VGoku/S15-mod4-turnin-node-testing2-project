const Dragons = require('./dragons-model');
const db = require('../data/db-config');

beforeEach(async () => {
  // Truncate the table before each test to ensure a clean slate
  await db('dragons').truncate();
});

describe('dragons model', () => {
  it('findById retrieves the correct dragon by ID', async () => {
    // Insert a new dragon and retrieve it by its ID
    const [dragon] = await db('dragons').insert({ name: 'Toothless', type: 'Night Fury' }, ['id']);
    const found = await Dragons.findById(dragon.id); // Fetch by ID using the model method
    expect(found.name).toBe('Toothless'); // Verify that the correct dragon is returned
  });

  it('update modifies the dragon and returns the updated record', async () => {
    // Insert a dragon and update its type
    const [dragon] = await db('dragons').insert({ name: 'Draco', type: 'Celestial' }, ['id']);
    const updated = await Dragons.update(dragon.id, { type: 'Astral' }); // Update using the model method
    expect(updated.type).toBe('Astral'); // Verify that the type was updated correctly
  });

  it('remove deletes the dragon from the database', async () => {
    // Insert a dragon and remove it from the database
    const [dragon] = await db('dragons').insert({ name: 'Falkor', type: 'Luck Dragon' }, ['id']);
    await Dragons.remove(dragon.id); // Remove using the model method
    const all = await Dragons.findAll(); // Fetch all dragons to verify it's removed
    expect(all).toHaveLength(0); // Ensure the table is empty after deletion
  });
});
