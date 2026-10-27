import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { usePickerKeyboard } from "../hooks/usePickerKeyboard";

interface AutocompleteSelectProps<T> {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  placeholder?: string;
  disableClearable?: boolean;
  sx?: object;
}

// Type-to-filter replacement for the `<TextField select><MenuItem>` dropdown pattern — the
// non-freeSolo sibling of FreeSoloLookupField (picks an existing option only, no typing in
// a new value).
function AutocompleteSelect<T>({
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
  disabled,
  required,
  fullWidth,
  helperText,
  placeholder,
  disableClearable,
  sx,
}: AutocompleteSelectProps<T>) {
  const { inputMode, onArrowPointerDown, onTextPointerDown } = usePickerKeyboard();
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_event, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      disabled={disabled}
      fullWidth={fullWidth}
      disableClearable={disableClearable}
      sx={sx}
      slotProps={{ popupIndicator: { onPointerDown: onArrowPointerDown } }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          helperText={helperText}
          placeholder={placeholder}
          slotProps={{ ...params.slotProps, htmlInput: { ...params.slotProps.htmlInput, inputMode, onPointerDown: onTextPointerDown } }}
        />
      )}
    />
  );
}

export default AutocompleteSelect;
