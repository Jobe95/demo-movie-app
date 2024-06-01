import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "../../src/hooks/use-debounce";

describe("useDebounce", () => {
  jest.useFakeTimers();

  it("should call the passed function after the specified delay", () => {
    const callback = jest.fn();
    const delay = 500;

    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current();
      expect(callback).not.toHaveBeenCalled();
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should only execute the callback once after the specified delay", () => {
    const callback = jest.fn();
    const delay = 500;

    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(delay - 1);
      expect(callback).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear previous timers when unmounting", () => {
    const callback = jest.fn();
    const delay = 500;

    const { result, unmount } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current();
      unmount();
      jest.advanceTimersByTime(delay);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
