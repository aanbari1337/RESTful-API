const request = require("supertest");
const { Genre } = require("../../../models/genre");
const { User } = require("../../../models/user");
const api = require("../../../config/const");
let server = require("../../..");

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../../");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });
  describe("GET /", () => {
    test("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const response = await request(server).get(`${api.genres}`);
      expect(response.status).toBe(200);
      expect(response.body.some((e) => e.name === "genre1"));
    });
  });
  describe("GET /:ip", () => {
    test("it should return the genre with the given id", async () => {
      let genre = new Genre({ name: "genre1" });
      await genre.save();
      const response = await request(server).get(`${api.genres}/${genre._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", genre.name);
    });
    test("it should return 404 when given invalid id", async () => {
      const response = await request(server).get(`${api.genres}/1`);
      expect(response.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;
    beforeEach(() => {
      token = new User().generateToken();
      name = "genre1";
    });

    const exec = () => {
      return request(server)
        .post(`${api.genres}/`)
        .send({ name })
        .set("x-auth-token", token);
    };

    test("it should return 401 when access denied", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
    });
    test("it should return 400 if name is less than 5 caracteres", async () => {
      name = "1234";
      const response = await exec();
      expect(response.status).toBe(400);
    });
    test("it should return 400 if name is greater than 50 caracteres", async () => {
      name = new Array(52).join("a");
      const response = await exec();
      expect(response.status).toBe(400);
    });
    test("it should return the genre if it's valid", async () => {
      const response = await exec();
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("name", "genre1");
    });
  });
});
