const server = require("./api/server"); // Import the server module
const bob = require("./data/seeds/users"); // Import the user seed data
const PORT = process.env.PORT || 4000; // Set the port, defaulting to 4000 if not defined in the environment

// Start the server and log a message when it's running
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server's running status with the port number
});
