import { useState } from "react";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import type { SavedGameFilter } from "../api/types";

export interface SavedGameFiltersProps {
  savedFilters: SavedGameFilter[];
  onApply: (filters: Record<string, unknown>) => void;
  onSave: (name: string) => void;
  onDelete: (name: string) => void;
  // Nothing to save while no filter is set.
  canSave: boolean;
}

const MAX_NAME_LENGTH = 60;

// The Filter dialog's saved filters: one chip per name — tapping it puts those filters back,
// its cross forgets it — and Save to keep the current filters under a name. Saving under a
// name that's taken replaces it, so a saved filter is updated the same way it's made.
const SavedGameFilters = ({ savedFilters, onApply, onSave, onDelete, canSave }: SavedGameFiltersProps) => {
  const { t } = useTranslation();
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState("");
  const trimmed = name.trim();

  const handleSave = () => {
    onSave(trimmed);
    setNaming(false);
    setName("");
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {t("games.savedFilters.heading")}
        </Typography>
        {savedFilters.map((saved) => (
          <Chip
            key={saved.name}
            label={saved.name}
            onClick={() => onApply(saved.filters)}
            onDelete={() => onDelete(saved.name)}
            deleteIcon={<CancelIcon aria-label={t("games.savedFilters.delete", { name: saved.name })} />}
          />
        ))}
        {!savedFilters.length ? (
          <Typography variant="body2" sx={{ color: "vgt.text3" }}>
            {t("games.savedFilters.empty")}
          </Typography>
        ) : null}
        <Button
          size="small"
          startIcon={<BookmarkAddOutlinedIcon />}
          onClick={() => setNaming(true)}
          disabled={!canSave}
          sx={{ ml: "auto" }}
        >
          {t("games.savedFilters.saveButton")}
        </Button>
      </Box>
      <Dialog open={naming} onClose={() => setNaming(false)} fullWidth maxWidth="xs">
        <DialogTitle>{t("games.savedFilters.saveTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label={t("games.savedFilters.nameLabel")}
            helperText={
              savedFilters.some((saved) => saved.name === trimmed) ? t("games.savedFilters.replaceHelp") : undefined
            }
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && trimmed) handleSave();
            }}
            slotProps={{ htmlInput: { maxLength: MAX_NAME_LENGTH } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNaming(false)}>{t("common.cancel")}</Button>
          <Button variant="contained" onClick={handleSave} disabled={!trimmed}>
            {t("common.save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavedGameFilters;
