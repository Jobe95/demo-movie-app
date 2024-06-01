import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  SearchInput,
  SearchInputProps,
} from "../../src/components/search-input";

describe("SearchInput", () => {
  const onChangeMock = jest.fn();
  const onClearMock = jest.fn();

  const defaultProps: SearchInputProps = {
    value: "",
    autoFocus: false,
    onChange: onChangeMock,
    onClear: onClearMock,
  };

  it("renders correctly with the provided props", () => {
    render(<SearchInput {...defaultProps} />);
    expect(
      screen.getByPlaceholderText(/search for a show.../i),
    ).toBeInTheDocument();
  });

  it("has the correct initial value", () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  it("calls onChange when input value changes", async () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "new value");
    expect(onChangeMock).toHaveBeenCalledTimes("new value".length);
  });

  it("does not render clear icon when value is empty", () => {
    render(<SearchInput {...defaultProps} value="" />);
    const clearIcon = screen.queryByRole("button", { name: /clear search/i });
    expect(clearIcon).not.toBeInTheDocument();
  });

  it("renders clear icon when value is not empty", () => {
    render(<SearchInput {...defaultProps} value="not empty" />);
    const clearIcon = screen.getByRole("button", { name: /clear search/i });
    expect(clearIcon).toBeInTheDocument();
  });

  it("calls onClear when clear icon is clicked", () => {
    render(<SearchInput {...defaultProps} value="not empty" />);
    const clearIcon = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearIcon);
    expect(onClearMock).toHaveBeenCalled();
  });

  it('has focus when "autoFocus" prop is true', () => {
    render(<SearchInput {...defaultProps} autoFocus={true} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();
  });

  it('does not have focus when "autoFocus" prop is false', () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveFocus();
  });
});
