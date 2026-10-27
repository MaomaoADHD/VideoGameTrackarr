import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePickerKeyboard } from "../usePickerKeyboard";

describe("usePickerKeyboard", () => {
  it("leaves the keyboard alone until the arrow is tapped", () => {
    const { result } = renderHook(() => usePickerKeyboard());

    expect(result.current.inputMode).toBeUndefined();
  });

  it("keeps the keyboard down after the arrow, and brings it back on the text", () => {
    const { result } = renderHook(() => usePickerKeyboard());

    act(() => result.current.onArrowPointerDown());
    expect(result.current.inputMode).toBe("none");

    act(() => result.current.onTextPointerDown());
    expect(result.current.inputMode).toBeUndefined();
  });
});
