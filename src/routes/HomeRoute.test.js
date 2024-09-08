import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
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
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // we are going to loop over languages, for each of them make sure
  // we see two links and Assert that the links have the appropriate full_name

  await pause();
  screen.debug();
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
