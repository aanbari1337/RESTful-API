const config = require("config");

module.exports = function () {
  const jwtPrivateKey = config.get("jwtPrivateKey");
  const dbURL = config.get("dbURL");
  [jwtPrivateKey, dbURL].forEach((envVar) => {
    if (!envVar) throw new Error("FATAL ERROR: Undefined Env Variable");
  });
};
