import { renderHook } from "@testing-library/react";
import { useValidatedId } from "../../src/hooks/use-validate-id";

describe("useValidatedId", () => {
  it("returns a valid integer and isValid true for a valid numeric string", () => {
    const { result } = renderHook(() => useValidatedId("123"));
    expect(result.current.id).toBe(123);
    expect(result.current.isValid).toBe(true);
  });

  it("returns null and isValid false for a non-numeric string", () => {
    const { result } = renderHook(() => useValidatedId("abc123"));
    expect(result.current.id).toBeNull();
    expect(result.current.isValid).toBe(false);
  });

  it("returns null and isValid false for an empty string", () => {
    const { result } = renderHook(() => useValidatedId(""));
    expect(result.current.id).toBeNull();
    expect(result.current.isValid).toBe(false);
  });

  it("returns null and isValid false when id is undefined", () => {
    const { result } = renderHook(() => useValidatedId());
    expect(result.current.id).toBeNull();
    expect(result.current.isValid).toBe(false);
  });
});
