import { screen, render } from "@testing-library/react";
import RepositiriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

const renderComponent = () => {
  const repository = {
    full_name: "facebook/",
    language: "javascript",
    description:
      "a powerfull library used for building interactive front end projects",
    owner: "Meta",
    name: "react",
    html_url: "html",
  };

  render(
    <MemoryRouter>
      <RepositiriesListItem repository={repository} />
    </MemoryRouter>
  );
  return { repository };
};
test("check if repos link is displayed", async () => {
  const repository = renderComponent();
  await screen.findByRole("img", { name: /javascript/i });
  const link = screen.getByRole("link", { name: "github repo" });
  expect(link).toHaveAttribute("href", repository.html_url);
  // expect(link).toBeInTheDocument();
});
