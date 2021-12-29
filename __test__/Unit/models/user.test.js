const mongoose = require("mongoose");
const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("user.generateToken()", () => {
  test("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateToken();
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decode).toMatchObject(payload);
  });
});
