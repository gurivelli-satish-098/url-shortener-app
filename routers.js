const Controller = require("./controllers");
const controller = new Controller();

const registerRoutes = (app) => {
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK.",
    });
  });

  app.post("/api/auth", controller.test);
  app.post("/api/shorten", controller.test);
  app.get("/api/shorten/:alias", controller.test);
  app.get("/api/analytics/:alias", controller.test);
  app.get("/api/analytics/topic/:topic", controller.test);
  app.get("/api/analytics/overall", controller.test);
};

module.exports = registerRoutes;
