const request = require("supertest");
const http = require("http");
const app = require("./index");

describe("Test /pokemons", () => {
  let server;

  beforeEach(function() {
    server = http.createServer(app);
  });

  afterEach(function() {
    server.close();
  });


  test("It should response the GET method with query param", async done => {
    const response = await request(server).get("/pokemons/?name=bul")
    expect(response.status).toBe(200);
    expect(response.body.pokemons.length).toBeGreaterThan(0)
    done()
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


  test("It should response the GET method with url param", async done => {
    const pokemonName = "bulbasaur";
    const response = await request(server).get(`/pokemons/${pokemonName}`)
   expect(response.status).toBe(200);
   expect(response.body.pokemon.name).toBe("bulbasaur");
   done()
  });
});