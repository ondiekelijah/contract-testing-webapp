const path = require("path");
const UserService = require("../client");
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

// Set up a server to run the consumer tests against
const server = require("../../users_api/index");

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

  function createUser({
    id,
    name,
    email,
    age,
    gender,
    address,
    phone,
    company,
  }) {
    return {
      id,
      name,
      email,
      age,
      gender,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
      },
      phone,
      company,
    };
  }

  const commonAddress = {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  };

  const NEW_USER = createUser({
    name: "Mikey Mouse",
    email: "mikey@example.com",
    age: 22,
    gender: "Male",
    address: commonAddress,
    phone: "555-555-5555",
    company: "Meta Inc.",
  });

  const EXPECTED_BODY = createUser({
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    age: 35,
    gender: "Male",
    address: commonAddress,
    phone: "555-555-5555",
    company: "Acme Inc.",
  });

  const EXPECTED_BODY_CREATE = { ...NEW_USER, id: 3 };

  const EXPECTED_BODY_GET = createUser({
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
  });

  const BODY_UPDATE = { ...EXPECTED_BODY_CREATE, name: "The Mikey Mouse" };
  const EXPECTED_BODY_UPDATE = BODY_UPDATE;

  // Create a user
  it("test: create a user", () => {
    // interaction
    provider
      .uponReceiving("a POST request to create a user")
      .withRequest({
        method: "POST",
        path: "/users",
        body: NEW_USER,
      })
      .willRespondWith({
        status: 201,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_BODY_CREATE,
      });

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.createUser(NEW_USER).then((response) => {
        console.log("response", response);
        expect(response).toEqual(EXPECTED_BODY_CREATE);
      });
    });
  });

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
    });
    // .finally(() => {
    //   server.close();
    // });
  });

  // Fetch single user
  it("test: fetch a single user", () => {
    // interaction
    provider
      .uponReceiving("a GET request to get a single user")
      .withRequest({
        method: "GET",
        path: "/users/2",
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_BODY_GET,
      });

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.getUser(2).then((response) => {
        expect(response).toEqual(EXPECTED_BODY_GET);
      });
    });
  });

  // Update a user
  it("test: update a user", () => {
    // interaction
    provider
      .uponReceiving("a PUT request to update a user")
      .withRequest({
        method: "PUT",
        path: "/users/3",
        body: BODY_UPDATE,
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_BODY_UPDATE,
      });

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.updateUser(BODY_UPDATE).then((response) => {
        expect(response).toEqual(EXPECTED_BODY_UPDATE);
      });
    });
  });

  // Delete a user
  it("test: delete a user", () => {
    // interaction
    provider
      .uponReceiving("a DELETE request to delete a user")
      .withRequest({
        method: "DELETE",
        path: "/users/3",
      })
      .willRespondWith({
        status: 204,
        headers: { "Content-Type": "application/json" },
      });

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.deleteUser(3).then((response) => {
        console.log("response", response);
        expect(response).toEqual("");
      });
    });
  });
});

// Clean up after all tests
afterAll(() => server.close());

// test('adds 1 + 2 to equal 3', () => {
//   expect(1 + 2).toBe(3);
// });
