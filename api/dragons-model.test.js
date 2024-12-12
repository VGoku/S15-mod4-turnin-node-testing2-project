const db = require('../data/db-config');
const Dragons = require('./dragons-model');

beforeEach(async () => {
  await db('dragons').truncate();
});

describe('dragons model', () => {
  it('findAll returns an empty array initially', async () => {
    const dragons = await Dragons.findAll();
    expect(dragons).toHaveLength(0);
  });

  it('insert adds a dragon and returns it', async () => {
    const newDragon = await Dragons.insert({ name: 'Viserion', type: 'Ice' });
    expect(newDragon.name).toBe('Viserion');
    expect(newDragon.type).toBe('Ice');
  });
});
