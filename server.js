require("dotenv").config();
const path = require("path");

async function main() {
  const app = require("./app");
  const sql = require("./databases/sql");
  await sql.connect();
  return app;
}

main().then((app) => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
