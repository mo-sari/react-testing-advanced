import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const language = req.url.searchParams.get("q").split("language:")[1];

    return res(
      ctx.json({
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
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

  const languages = ["c#", "python", "javascript", "typescript", "go", "rust"];
  for (let lg in languages) {
    // point: remeber we are using findAll... to handle act warnings
    const links = await screen.findAllByRole("link", {
      name: new RegExp(languages[lg]),
    });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${languages[lg]}_one`);
    expect(links[1]).toHaveTextContent(`${languages[lg]}_two`);
  }
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
