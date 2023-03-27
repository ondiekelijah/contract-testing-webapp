const path = require("path");
const UserService = require("../client");
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

// Set up a server to run the consumer tests against
const server = require("../../users_api/index")

describe("Test", () => {
  // pact mock server url
  const mock_port = 1234;
  const mock_server_url = "http://127.0.0.1:" + mock_port;
  // pact instance
  const provider = new PactV3({
    consumer: "users_frontend",
    provider: "users_api",
    port: mock_port,
    dir: path.resolve(process.cwd(), "tests", "pacts"),
    logLevel: "DEBUG",
  });

  // Expected response from the provider
  const EXPECTED_BODY =   {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 35,
    "gender": "Male",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    },
    "phone": "555-555-5555",
    "company": "Acme Inc."
  };

  // Fetch all users
  it("test: fetch all users", () => {
    // interaction
    provider
      // Set up expected request
      .uponReceiving("a GET request to get all users")
      .withRequest({
        method: "GET",
        path: "/users",
      })
      // Set up expected response
      .willRespondWith({
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: MatchersV3.eachLike(EXPECTED_BODY),
      });
    // Verify request
    return provider.executeTest(() => { 
      // Make request to the mock server
      const users = new UserService(mock_server_url);
      return users.getAllUsers().then((response) => {
        // Verify response
        expect(response).toEqual([EXPECTED_BODY]);
      });
    }).finally(() => {
      server.close();
  });
  });
});