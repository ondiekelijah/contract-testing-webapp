const { Verifier } = require("@pact-foundation/pact");
const path = require("path");

// Set up a server to run the consumer tests against
const server = require("../index")

describe("Pact Verification", () => {
    it("verifies the provider", () => {
        const options = {
            provider: "users_api",
            providerBaseUrl: "http://localhost:5000",
            disableSSLVerification: true,
            logLevel: 'DEBUG',
            pactUrls: [
                path.resolve(
                    process.cwd(),
                    "../users_frontend/tests/pacts/users_frontend-users_api.json"
                ),
            ],
        };
        // Verify the provider with the pact file then stop the server
        return new Verifier(options)
            .verifyProvider()
            .then(() => {
                console.log('Pact Verification Complete!');
            }).finally(() => {
                server.close();
            });
    });
});