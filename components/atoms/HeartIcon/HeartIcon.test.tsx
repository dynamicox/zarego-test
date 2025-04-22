import { render, screen } from "@testing-library/react";
import { HeartIconSolid } from "./HeartIcon";

describe("HeartIconSolid Component", () => {
  it("renders an SVG element with the correct viewBox", () => {
    render(<HeartIconSolid data-testid="heart-icon" />);
    const svgElement = screen.getByTestId("heart-icon");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("applies the provided className to the SVG element", () => {
    const className = "test-icon";
    render(<HeartIconSolid className={className} data-testid="heart-icon" />);
    const svgElement = screen.getByTestId("heart-icon");
    expect(svgElement).toHaveClass(className);
  });
});
