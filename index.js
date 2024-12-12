const server = require('./api/server');
const bob = require('./data/seeds/users');
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
