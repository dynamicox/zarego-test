import { render, screen } from "@testing-library/react";
import Skeleton from "./Skeleton";

describe("Skeleton Component", () => {
  it("renders a div with the default className", () => {
    render(<Skeleton />);
    const skeletonElement = screen.getByTestId("skeleton-element");

    expect(skeletonElement).toBeInTheDocument();

    expect(skeletonElement).toHaveClass("w-full");
    expect(skeletonElement).toHaveClass("h-20");
    expect(skeletonElement).toHaveClass("bg-gray-700");
    expect(skeletonElement).toHaveClass("rounded-md");
    expect(skeletonElement).toHaveClass("animate-pulse");
  });

  it("applies a custom className prop and overrides default height and width", () => {
    const customClassName = "w-32 h-12 rounded-lg";
    render(<Skeleton className={customClassName} />);
    const skeletonElement = screen.getByTestId("skeleton-element");

    expect(skeletonElement).toBeInTheDocument();

    expect(skeletonElement).toHaveClass("bg-gray-700");
    expect(skeletonElement).toHaveClass("rounded-md");
    expect(skeletonElement).toHaveClass("animate-pulse");
    expect(skeletonElement).toHaveClass("w-32");
    expect(skeletonElement).toHaveClass("h-12");
    expect(skeletonElement).toHaveClass("rounded-lg");

    expect(skeletonElement).not.toHaveClass("h-20");
    expect(skeletonElement).not.toHaveClass("w-full");
  });
});
