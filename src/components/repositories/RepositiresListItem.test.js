import { screen, render, within } from "@testing-library/react";
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
  renderComponent();

  const img = await screen.findByRole("img", { name: /javascript/i });

  expect(img).toBeInTheDocument();
});

// for the image we needed an accessible name which we did assign
// using aria-label
// and now this way we are testing the repo...ListItem component
// and in that component there is a part(FileIcon) that has a state
// that changes dynamicaly based on our input
