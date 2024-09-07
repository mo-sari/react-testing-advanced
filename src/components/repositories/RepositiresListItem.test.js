import { screen, render, within, act } from "@testing-library/react";
import RepositiriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";
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
  await act(async () => {
    renderComponent();
    await pause();
  });
});

const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
// we used act directly which is not recommended
