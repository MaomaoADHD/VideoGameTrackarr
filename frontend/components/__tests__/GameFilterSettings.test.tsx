import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GameFilterSettings from "../GameFilterSettings";

const setHiddenFields = vi.fn();
const deleteFilter = vi.fn();
let hiddenFields = new Set<string>();

vi.mock("../../hooks/useGameFilterPreferences", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../hooks/useGameFilterPreferences")>()),
  useGameFilterPreferences: () => ({
    hiddenFields,
    setHiddenFields,
    savedFilters: [{ name: "Couch Switch", filters: {} }],
    deleteFilter,
    saving: false,
  }),
}));

describe("GameFilterSettings", () => {
  beforeEach(() => {
    hiddenFields = new Set(["format"]);
    setHiddenFields.mockClear();
    deleteFilter.mockClear();
  });

  it("counts the fields shown and switches more off on Save", async () => {
    const user = userEvent.setup();
    render(<GameFilterSettings />);
    expect(screen.getByText(/16 of 17 fields shown/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Customize" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("checkbox", { name: "Formats" })).not.toBeChecked();
    await user.click(within(dialog).getByRole("checkbox", { name: "Steelbooks only" }));
    await user.click(within(dialog).getByRole("button", { name: "Save" }));

    expect(setHiddenFields).toHaveBeenCalledWith(new Set(["format", "steelbook"]));
  });

  it("forgets a saved filter from its chip", async () => {
    const user = userEvent.setup();
    render(<GameFilterSettings />);

    await user.click(screen.getByLabelText("Forget Couch Switch"));

    expect(deleteFilter).toHaveBeenCalledWith("Couch Switch");
  });
});
