// To store the pact file in a different directory, we can use the dir option.
// The path module is used to resolve the path to the directory where the pact file will be stored. The dir option defaults to the current working directory.
const path = require("path");
// Import the client from where our app methods are defined. e.g. getAllUsers()
const UserService = require("../client");
// Import Pact library
const { PactV3, Matchers } = require("@pact-foundation/pact");


// We use the describe function to group our tests together
describe("Test", () => {
  // Pact mock server url
  const mock_port = 1234;
  const mock_server_url = "http://127.0.0.1:" + mock_port;
  // Pact instance to create a 'pact' between the consumer and provider
  const provider = new PactV3({
    consumer: "users_frontend",
    provider: "users_api",
    port: mock_port,
    dir: path.resolve(process.cwd(), "tests", "pacts"),
    logLevel: "DEBUG",
  });

  // Define the expected response body
  const EXPECTED_BODY_GET_ALL = {
    status: "success",
    message: "Entities successfully retrieved",
    entities: [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        age: 35,
        gender: "Male",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "USA",
        },
        phone: "555-555-5555",
        company: "Acme Inc.",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        age: 28,
        gender: "Female",
        address: {
          street: "456 Oak St",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          country: "USA",
        },
        phone: "555-555-1234",
        company: "XYZ Corp.",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@gmail.com",
        age: 28,
        gender: "Female",
        address: {
          street: "456 Oak St",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          country: "USA",
        },
        phone: "555-555-1234",
        company: "XYZ Corp.",
      },
    ],
  };

  // Fetch all users
  it("test: fetch all users", () => {
    // Arrange: Setup our expected interactions between the consumer and provider
    provider
      // Set up expected request
      .given("Users exist") // This is used to define the state of the provider. e.g When users exist.
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
        body: EXPECTED_BODY_GET_ALL,
      });

    // Verify request
    return provider.executeTest(() => {
      // Make request to the mock server
      const users = new UserService(mock_server_url);
      return users.getAllUsers().then((response) => {
        // Assert: Verify response
        expect(response).toEqual(EXPECTED_BODY_GET_ALL);
      });
    });
  });
});
