const server = require("./src/server");
require("dotenv").config();
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
