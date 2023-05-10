import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./../Display";

test("renders without errors with no props", async () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  render(<Display />);
  const button = screen.getByRole("button");
  fireEvent.click(button);

  await waitFor(() => {
    expect(button).not.toBeInTheDocument();
    const showContainer = screen.getByTestId("show-container");
    expect(showContainer).toBeInTheDocument();
  });
});
test("renders show season options matching your data when the button is clicked", () => {
  render(<Show show={mockData} />);
  const button = screen.getByText(/select a season/i);
  fireEvent.click(button);
  const select = screen.getByLabelText(/select a season/i);
  expect(select).toBeInTheDocument();
  expect(select.querySelectorAll("option")).toHaveLength(
    mockData.seasons.length + 1
  );
  mockData.seasons.forEach((season) => {
    expect(
      screen.getByRole("option", { name: season.name })
    ).toBeInTheDocument();
  });
});
const mockData = {
  name: "noodle",
  summary: "noodle summary",
  seasons: [
    { name: "noodle season 1", id: "1234", episodes: null },
    { name: "noodle season 2", id: "1235", episodes: null },
    { name: "noodle season 3", id: "1235", episodes: null },
  ],
};
