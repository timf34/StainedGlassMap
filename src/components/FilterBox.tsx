'use client';

import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface FilterBoxProps {
    type: 'artist' | 'county';
    placeholder: string;
    options: string[];
}

export default function FilterBox({ type, placeholder, options }: FilterBoxProps) {
    const [selected, setSelected] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
        const {
            target: { value },
        } = event;
        setSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id={`${type}-multiple-checkbox-label`}>{placeholder}</InputLabel>
            <Select
                labelId={`${type}-multiple-checkbox-label`}
                id={`${type}-multiple-checkbox`}
                multiple
                value={selected}
                onChange={handleChange}
                input={<OutlinedInput label={placeholder} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}