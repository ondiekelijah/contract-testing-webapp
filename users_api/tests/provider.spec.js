const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const { appController } = require("../controllers/controllers");
const { loadData, app } = require("../provider");

// Set up a server to run the consumer tests against
const server = app.listen(5000, () => {
  // loadData(); // This is not needed for the provider verification as the stateHandlers will be used instead
  console.log("Users API listening on port 6000");
});

const usersExistState = () => {
  loadData();
  return Promise.resolve("Users exist");
};

describe("Pact Verification", () => {
  it("verifies the provider", () => {

    // Verification Options
    const options = {
      provider: "users_api",
      providerBaseUrl: "http://localhost:5000",
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
        console.log('I run before everything else')
      },
    
      afterEach: () => {
        console.log('I run after everything else has finished')
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
    return new Verifier(options)
      .verifyProvider()
      .then(() => {
        console.log("Pact Verification Complete!");
      })
      .finally(() => {
        server.close();
      });
  });
});
