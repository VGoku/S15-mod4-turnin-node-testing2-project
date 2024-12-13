const request = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

beforeEach(async () => {
  // Clean up the dragons table before each test to ensure a fresh state
  await db("dragons").truncate();
});

afterAll(async () => {
  await db.destroy();  // Ensure to close DB connection after all tests
})

describe("GET /api/dragons/:id", () => {
  test("returns 200 and the correct dragon when it exists", async () => {
    // Insert a dragon into the database for testing
    const [dragon] = await db("dragons").insert({ name: "Smaug", type: "Fire" }, ["id"]);
    // Send a GET request to fetch the dragon by its ID
    const res = await request(server).get(`/api/dragons/${dragon.id}`);
    // Assert the correct status and body
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Smaug");
  });

  test("returns 404 if the dragon does not exist", async () => {
    // Try to fetch a dragon that does not exist
    const res = await request(server).get("/api/dragons/999");
    // Assert that a 404 status is returned
    expect(res.status).toBe(404);
  });
});

describe("GET /api/dragons", () => {
  test("returns 200 and a list of dragons", async () => {
    // Insert two dragons into the database for testing
    await db("dragons").insert([{ name: "Toothless", type: "Night Fury" }, { name: "Smaug", type: "Fire" }]);
    // Send a GET request to fetch all dragons
    const res = await request(server).get("/api/dragons");
    // Assert the correct status and check that the response is an array with two dragons
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });
});

describe("POST /api/dragons", () => {
  test("returns 201 and the created dragon when valid data is provided", async () => {
    const newDragon = { name: "Shenron", type: "Eternal Dragon" };
    // Send a POST request to create a new dragon
    const res = await request(server).post("/api/dragons").send(newDragon);
    // Assert the correct status and response body
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Shenron");
    expect(res.body.type).toBe("Eternal Dragon");
  });

  test("returns 400 if name or type is missing", async () => {
    const invalidDragon = { name: "Shenron" }; // Missing type
    // Send a POST request with invalid data
    const res = await request(server).post("/api/dragons").send(invalidDragon);
    // Assert the 400 status and error message
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Name and type are required");
  });

  test("should create and return the newly created dragon", async () => {
    const newDragon = { name: "Mushu", type: "Fire" };
    // Send a POST request to create a new dragon
    const res = await request(server).post("/api/dragons").send(newDragon);
    // Assert the correct status and response body
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newDragon.name);
    expect(res.body.type).toBe(newDragon.type);
  });
});

describe("DELETE /api/dragons/:id", () => {
  test("should remove the dragon from the database", async () => {
    // Step 1: Insert a dragon into the database
    const newDragon = { name: "Shenron", type: "Eternal Dragon" };
    const resCreate = await request(server).post("/api/dragons").send(newDragon);
    const dragon = resCreate.body;

    // Ensure the dragon was created
    expect(dragon).not.toBeUndefined();
    expect(dragon.id).not.toBeUndefined();

    // Step 2: Perform the DELETE request
    const resDelete = await request(server).delete(`/api/dragons/${dragon.id}`);
    
    // Step 3: Assert that the response status is 200 (OK)
    expect(resDelete.status).toBe(200);

    // Step 4: Ensure the dragon no longer exists in the database
    const deletedDragon = await db("dragons").where({ id: dragon.id }).first();
    expect(deletedDragon).toBeUndefined(); // Ensure dragon is deleted
  });
});

describe("DELETE /api/dragons/:id", () => {
  test("should return 404 if trying to delete a non-existent dragon", async () => {
    // Try to delete a dragon that does not exist
    const res = await request(server).delete("/api/dragons/999");
    // Assert that a 404 status is returned since the dragon does not exist
    expect(res.status).toBe(404);
  });
});

describe("GET /api/dragons/:id", () => {
  test("returns 200 and the dragon when it exists", async () => {
    // Insert a dragon for testing
    const [dragon] = await db("dragons").insert({ name: "Draco", type: "Celestial" }, ["id"]);
    // Send a GET request to fetch the dragon by its ID
    const res = await request(server).get(`/api/dragons/${dragon.id}`);
    // Assert the correct status and response body
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Draco");
  });

  test("returns 404 if the dragon does not exist", async () => {
    // Try to fetch a non-existent dragon
    const res = await request(server).get("/api/dragons/12345");
    // Assert that a 404 status is returned
    expect(res.status).toBe(404);
  });
});


