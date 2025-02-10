require("dotenv").config();
const fs = require("fs");

async function disconnectSqlSetup() {
  const config = {};
  fs.writeFileSync(__dirname + "/.././sequelize-config.json", JSON.stringify(config), {
    flag: "w",
  });
}
disconnectSqlSetup().then(() => {
  process.exit();
});
