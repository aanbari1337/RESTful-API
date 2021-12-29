const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");

describe("auth midlleware", () => {
  test("should return req.user if a valid token is provided", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toString(),
      isAdmin: true,
    };
    const user = new User(payload);
    let token = user.generateToken();

    let req = {
      header: jest.fn().mockReturnValue(token),
    };
    let res = {};
    let next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(payload);
  });
});
