const Dragons = require("./dragons-model");
const db = require("../data/db-config");

beforeEach(async () => {
  // Truncate the 'dragons' table before each test to ensure the table is empty and tests are isolated
  await db("dragons").truncate();
});

describe("dragons model", () => {
  test("findById retrieves the correct dragon by ID", async () => {
    // Insert a new dragon into the database and get the dragon's ID
    const [dragon] = await db("dragons").insert({ name: "Toothless", type: "Night Fury" }, ["id"]);
    
    // Use the 'findById' method from the Dragons model to retrieve the dragon by its ID
    const found = await Dragons.findById(dragon.id);
    
    // Verify that the dragon's name matches the expected value
    expect(found.name).toBe("Toothless");
  });

  test("update modifies the dragon and returns the updated record", async () => {
    // Insert a dragon and retrieve its ID
    const [dragon] = await db("dragons").insert({ name: "Draco", type: "Celestial" }, ["id"]);
    
    // Use the 'update' method from the Dragons model to change the dragon's type
    const updated = await Dragons.update(dragon.id, { type: "Astral" });
    
    // Verify that the type of the dragon was updated successfully
    expect(updated.type).toBe("Astral");
  });

  test("remove deletes the dragon from the database", async () => {
    // Insert a dragon and retrieve its ID
    const [dragon] = await db("dragons").insert({ name: "Falkor", type: "Luck Dragon" }, ["id"]);
    
    // Use the 'remove' method from the Dragons model to delete the dragon
    await Dragons.remove(dragon.id);
    
    // Retrieve all dragons to verify that the dragon has been deleted
    const all = await Dragons.findAll();
    
    // Verify that no dragons are left in the table after deletion
    expect(all).toHaveLength(0);
  });
});
