const server = require("./api/server");

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = server;
