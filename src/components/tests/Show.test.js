import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Show from "./../Show";

test("renders without errors", () => {
  render(<Show />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);
  const loading = screen.getByText(/Fetching data.../i);
  expect(loading).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={mockData} selectedSeason={"none"} />);
  const seasonOptions = screen.queryAllByTestId("season-option");
  expect(seasonOptions).toHaveLength(2);
});

test("handleSelect is called when an season is selected", () => {});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  // Render the component without the selectedSeason prop
  render(<Show show={mockData} />);

  // Expect that the component renders without any error
  expect(screen.getByTestId("show-container")).toBeInTheDocument();

  // Simulate a change event to select a season
  const select = screen.getByLabelText("Select A Season");
  fireEvent.change(select, { target: { value: "1235" } });

  // Expect that the component rerenders with the selected season
  expect(screen.getByText("noodle season 2")).toBeInTheDocument();
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
