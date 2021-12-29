const request = require("supertest");
let server = require("../../..");
const api = require("../../../config/const");
const { Genre } = require("../../../models/genre");
const { User } = require("../../../models/user");

describe("auth middleware", () => {
  let token;
  beforeEach(() => {
    server = require("../../..");
    token = new User().generateToken();
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });
  const exec = () => {
    return request(server)
      .post(`${api.genres}/`)
      .send({ name: "genre1" })
      .set("x-auth-token", token);
  };
  test("should return 401 if no token provided", async () => {
    token = "";
    const response = await exec();
    expect(response.status).toBe(401);
  });
  test("should return 400 if token is invalid", async () => {
    token = "a";
    const response = await exec();
    expect(response.status).toBe(400);
  });
  test("should return 200 if token is valid", async () => {
    const response = await exec();
    expect(response.status).toBe(200);
  });
});
