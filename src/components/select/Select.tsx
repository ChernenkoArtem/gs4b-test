import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import { useId } from 'react';

export type SelectItem = {
  value: string;
  label: string;
};

export type SelectProps = {
  name: string;
  selected: SelectItem[];
  label: string;
  options: SelectItem[];
  hideSpinner?: boolean;
  isPending?: boolean;
  multiple?: boolean;
  onSelect?: (items: SelectItem[]) => void;
};

export default function Select({
  options,
  label,
  selected,
  multiple = false,
  onSelect,
}: SelectProps) {
  const labelId = useId();
  const selectedValues = selected.map((item) => {
    return item.value;
  });

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    let value = event.target.value;
    if (typeof value === 'string') {
      value = [value];
    }

    const newSelected = value.map((value) => {
      const option = options.find((opt) => {
        return opt.value === value;
      });
      return option || { label: value, value };
    });
    onSelect?.(newSelected);
  };

  return (
    <>
      <InputLabel id={`select-label-${labelId}`}>{label}</InputLabel>
      <MuiSelect
        labelId={`select-label-${labelId}`}
        id="select-filled"
        value={selectedValues}
        onChange={handleChange}
        multiple={multiple}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </>
  );
}
