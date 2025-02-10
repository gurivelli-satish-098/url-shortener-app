const cors = require("cors");

const getAllowedDomains = () => {
  const staticDomains = [`http://localhost:${process.env.PORT}`, `127.0.0.1:${process.env.PORT}`];
  const allowDomains = (process.env.ALLOWED_DOMAINS || "").split(",");
  return staticDomains.concat(allowDomains);
};

module.exports = cors({
  origin: async (origin, callback) => {
    const allowdomains = getAllowedDomains();
    const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
    // const authError = new AuthorizationError(msg);
    if (!origin) {
      return callback(null, true);
    }
    if (!allowdomains.includes(origin)) {
      return callback(msg, false);
    }
    callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true, // allow session cookie from browser to pass through
});
