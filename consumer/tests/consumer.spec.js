const path = require("path");
const UserService = require("../app/client");
const { PactV3 } = require("@pact-foundation/pact");

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

  const NEW_USER = {
    id: 4,
    name: "Mikey Mouse",
    email: "mikey@example.com",
    age: 22,
    gender: "Male",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    phone: "555-555-5555",
    company: "Meta Inc.",
  };

  const EXPECTED_BODY_CREATE = {
    message: "Entity with id 3 was successfully inserted",
    status: "success",
    user: {
      address: {
        city: "New York",
        country: "USA",
        state: "NY",
        street: "123 Main St",
        zip: "10001",
      },
      age: 22,
      company: "Meta Inc.",
      email: "mikey@example.com",
      gender: "Male",
      id: 3,
      name: "Mikey Mouse",
      phone: "555-555-5555",
    },
  };

  const EXPECTED_BODY_GET = {
    status: "success",
    message: "Entity with id 2 successfully retrieved",
    entity: {
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
  };

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
    ],
  };

  const BODY_UPDATE = {
    id: 3,
    name: "Mr Bob Johnson",
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
  };
  const EXPECTED_BODY_UPDATE = {
    status: "success",
    message: "Entity with id 3 was successfully updated",
    entitiy: {
      id: "3",
      name: "Mr Bob Johnson",
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
  };

  // Create a user
  it("test: create a user", () => {
    // interaction
    provider
      .uponReceiving("a POST request to create a user")
      .withRequest({
        method: "POST",
        path: "/",
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
        path: "/",
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
        // Verify response
        expect(response).toEqual(EXPECTED_BODY_GET_ALL);
      });
    });

  });

  // Fetch single user
  it("test: fetch a single user", () => {
    // interaction
    provider
      .uponReceiving("a GET request to get a single user")
      .withRequest({
        method: "GET",
        path: "/2",
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
        path: "/3",
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
        path: "/3",
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.deleteUser(3).then((response) => {
        expect(response).toEqual({"message": "Operation completed successfully", "status": "success"});
      });
    });
  });
  
});