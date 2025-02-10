const path = require("path");
require("dotenv").config();

async function main() {
  const app = require("./app");
  return app;
}

main().then((app) => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
