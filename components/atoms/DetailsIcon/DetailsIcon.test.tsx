import { render, screen } from "@testing-library/react";
import DetailsIcons from "./DetailsIcons";

describe("DetailsIcons Component", () => {
  it("renders an SVG element with the correct viewBox", () => {
    render(<DetailsIcons data-testid="details-icon" />);
    const svgElement = screen.getByTestId("details-icon");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("applies the provided className to the SVG element", () => {
    const className = "test-icon";
    render(<DetailsIcons className={className} data-testid="details-icon" />);
    const svgElement = screen.getByTestId("details-icon");
    expect(svgElement).toHaveClass(className);
  });
});
