import { render, screen } from "@testing-library/react";
import { Button, ButtonTheme } from "./Button";

describe("BUTTON", () => {
  test("button is rendered with children TEST", () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });
  test("button is rendered with class 'clear'", () => {
    render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
    expect(screen.getByText("TEST")).toHaveClass("clear");
  });
});
