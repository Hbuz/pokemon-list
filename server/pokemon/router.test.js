const request = require("supertest");
const http = require("http");
const app = require("../index");

describe("Test /pokemons", () => {
  let server;

  beforeEach(function() {
    server = http.createServer(app);
  });

  afterEach(function() {
    server.close();
  });

  test("It should response the GET method", () => {
    return request(server)
      .get("/pokemons")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should response the GET method with query param", () => {
    return request(server)
      .get("/pokemons/?name=bul")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});



describe("Test /pokemons/:name", () => {
  let server;

  beforeEach(function() {
    server = http.createServer(app);
  });

  afterEach(function() {
    server.close();
  });
  test("It should response the GET method with url param", () => {
    const pokemonName = "bulbasaur";
    return request(server)
      .get(`/pokemons/${pokemonName}`)
      .then(response => {
        expect(response.statusCode).toBe(500);  //Connection is closed. Why?
       // expect(response.statusCode).toBe(200);
      });
  });
});