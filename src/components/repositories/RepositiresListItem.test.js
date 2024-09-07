import { screen, render, within } from "@testing-library/react";
import RepositiriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

// in the component we're working on(repo..Item) the FileIcon
// is causing the problem, if we didn't want to use the first
// solution, or if we didn't know how to solve it and we just
// wanted to ignore the FileIcon component, we could do it this way,
// this is actualy the second way of testing while we have some state
// that changes in testing components :

jest.mock("../tree/FileIcon", () => {
  // this is now the content of FileIcon
  return () => {
    return "File Icon component";
  };
});
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
  // we're not getting the act warning

  // and we also can verify that we have replaced the FileIcon
  screen.debug();
});
