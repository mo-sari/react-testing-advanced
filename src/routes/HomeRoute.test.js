import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import { HomeRoute } from "./HomeRoute";

// STEP 2 of MSW Setup:
// we first take a look at our request in chrome to see to what
// URL we are sending our request.
// then in HomeRoute we would look to the child components the see
// when data was fetched in HomeRoute, what properties do we pass down from it

// STEP 3
// creating a MSW handler to intercept the request and return some
// fake data for our component to use
const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    // we do not specify queryStrings in the url,
    // queryStrings are in req argument

    // below we are taking the query string from our url
    const query = req.url.searchParams.get("q");
    console.log(query);

    return res(
      ctx.json({
        items: [
          { id: 1, full_name: "full name!!" },
          { id: 2, full_name: "other name!!" },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  // runs before all tests in this file
  server.listen();
});
afterEach(() => {
  // runs after each test in this file
  server.resetHandlers();
});
afterAll(() => {
  // runs after all tests in this file
  server.close();
});
