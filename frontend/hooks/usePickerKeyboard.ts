import { useState } from "react";

// An Autocomplete focuses its input whichever part of the field was tapped, so on a phone the
// dropdown arrow raised the on-screen keyboard over the very list it had just opened. Tapping
// the arrow now means "browse": the input gets `inputMode="none"`, which keeps the keyboard
// down. Tapping the text itself means "type", and brings the keyboard back. Pointer events
// fire before the Autocomplete's own mousedown/focus handling, and React applies the state
// change before that focus lands. A mouse and hardware keyboard are unaffected either way.
export function usePickerKeyboard() {
  const [browsing, setBrowsing] = useState(false);
  return {
    inputMode: browsing ? ("none" as const) : undefined,
    onArrowPointerDown: () => setBrowsing(true),
    onTextPointerDown: () => setBrowsing(false),
  };
}
