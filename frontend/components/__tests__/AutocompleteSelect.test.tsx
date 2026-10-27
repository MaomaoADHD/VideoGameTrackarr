import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AutocompleteMultiSelect from "../AutocompleteMultiSelect";
import AutocompleteSelect from "../AutocompleteSelect";

const OPTIONS = ["Adventure", "Indie", "Puzzle"];

describe("AutocompleteSelect", () => {
  it("opens the list from the arrow without the phone keyboard", async () => {
    const user = userEvent.setup();
    render(<AutocompleteSelect label="Genre" options={OPTIONS} value={null} onChange={vi.fn()} getOptionLabel={(o) => o} />);

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Genre" })).toHaveAttribute("inputmode", "none");
  });

  it("brings the keyboard back when the text is tapped to type", async () => {
    const user = userEvent.setup();
    render(<AutocompleteSelect label="Genre" options={OPTIONS} value={null} onChange={vi.fn()} getOptionLabel={(o) => o} />);

    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(screen.getByRole("combobox", { name: "Genre" }));

    expect(screen.getByRole("combobox", { name: "Genre" })).not.toHaveAttribute("inputmode");
  });
});

describe("AutocompleteMultiSelect", () => {
  it("opens the list from the arrow without the phone keyboard", async () => {
    const user = userEvent.setup();
    render(<AutocompleteMultiSelect label="Genres" options={OPTIONS} value={[]} onChange={vi.fn()} getOptionLabel={(o) => o} />);

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Genres" })).toHaveAttribute("inputmode", "none");
  });
});
