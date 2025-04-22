import { render, screen } from "@testing-library/react";
import SearchSVG from "./SearchSVG";

describe("SearchSVG Component", () => {
  it("renders an SVG element", () => {
    render(<SearchSVG data-testid="search-svg" />);
    const svgElement = screen.getByTestId("search-svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("applies the provided className to the SVG element", () => {
    const className = "test-icon";
    render(<SearchSVG className={className} data-testid="search-svg" />);
    const svgElement = screen.getByTestId("search-svg");
    expect(svgElement).toHaveClass(className);
  });
});
