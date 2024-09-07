import { screen, render, within } from "@testing-library/react";
import RepositiriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";
const waiting = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
const renderComponent = () => {
  const repository = {
    full_name: "react.js",
    language: "javascript",
    description:
      "a powerfull library used for building interactive front end projects",
    owner: "Meta",
    name: "react",
  };

  render(
    <MemoryRouter>
      <RepositiriesListItem repository={repository} />
    </MemoryRouter>
  );
};
test("check if repos link is displayed", async () => {
  renderComponent();

  screen.debug();
  await waiting();
  screen.debug();
});

// in repo....ListItem we are chaning a state so we would get
// act warning, we could use act function in a non jest tesing
// environment but now we can use stuff that use the act concept
// under the hood, like screen.findBy...
