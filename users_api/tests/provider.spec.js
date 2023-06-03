const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const dotenv = require("dotenv");
const { loadData, app } = require("../provider");

dotenv.config();

// Set up a server to run the consumer tests against
const server = app.listen(5000, () => {
  loadData();
  console.log("Users API listening on port 5000");
});

const usersExistState = () => {
  // loadData(); This is not needed for the provider verification as the data is already loaded when the server starts
  return Promise.resolve("Users exist");
};

jest.setTimeout(10000); // Increase timeout to 10 seconds for all tests in this file

describe("Pact Verification", () => {
  it("verifies the provider", async () => {

    // Verification Options
    const options = {
      provider: "usersInteractionsProvider",
      providerBaseUrl: "http://localhost:5000",
    
      // Fetch pacts from broker
      pactBrokerUrl: process.env.PACT_BROKER_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKENNNN,
    
      publishVerificationResult: true,
      providerVersion: "1.0.0", // Should be the same version used to publish the pacts

      disableSSLVerification: true,
      logLevel: "DEBUG",
      pactUrls: [
        path.resolve(
          process.cwd(),
          "../users_frontend/tests/pacts/users_frontend-users_api.json"
        ),
      ],

      // State Handlers
      stateHandlers: {
        "": () => {}, // This is the default state handler, it is used if one is not specified for the given state
        "Users exist": usersExistState, // This is the state handler for the 'users exist' state
      },

      // Before and After Hooks
      // These functions are called before and after verification begins
      beforeEach: () => {
        console.log('Starting Pact Verification')
      },
    
      afterEach: () => {
        console.log('Pact Verification Complete!')
      },

      // Request Filters
      requestFilter: (req, res, next) => {
        // This function can be used to modify the request before it is sent to the provider
        // e.g. add authentication headers, strip out sensitive data
        console.log('I run before each request')
        next()
      }

    };
    // Verify the provider with the pact file then stop the server
    const verifier = new Verifier(options);

    try {
      await verifier.verifyProvider(); // Throws an error if verification fails
    } finally {
      server.close();
    }
  });
});
