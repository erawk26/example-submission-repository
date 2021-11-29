const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("there are 6 blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(6);
});

test("the first blog is about lorem ipsum", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("Vivamus magna justo");
});

afterAll(() => {
  mongoose.connection.close();
});
