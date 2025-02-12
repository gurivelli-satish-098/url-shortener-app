const DatabaseContext = require("./databases/sql");
const UrlService = require("./services/url");
const UserService = require("./services/user");

class Controller {
  constructor() {
    this.sql = DatabaseContext.connect();
    this.userService = new UserService(this.sql);
    this.urlService = new UrlService(this.sql);
  }

  test = async (req, res) => {
    console.log("body", req.body);
    console.log("params", req.params);
    console.log("query", req.query);

    await this.userService.upsertUser({ email: "test1@gmail.com" });

    res.status(200).json({
      data: [],
    });
  };
}

module.exports = Controller;
