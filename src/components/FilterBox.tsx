'use client';

import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { supabase } from '../lib/supabase';

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
    tableName: 'artists' | 'counties';
    placeholder: string;
}

interface Option {
    id: number;
    name: string;
}

export default function FilterBox({ tableName, placeholder }: FilterBoxProps) {
    const [selected, setSelected] = useState<string[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchOptions = async () => {
            const { data, error } = await supabase
                .from(tableName)
                .select('id, name')
                .order('name');

            if (error) {
                console.error('Error fetching FilterBox options:', error);
            } else {
                setOptions(data || []);
            }
        };

        fetchOptions();
    }, [tableName]);

    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
        const {
            target: { value },
        } = event;
        setSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id={`${tableName}-multiple-checkbox-label`}>{placeholder}</InputLabel>
            <Select
                labelId={`${tableName}-multiple-checkbox-label`}
                id={`${tableName}-multiple-checkbox`}
                multiple
                value={selected}
                onChange={handleChange}
                input={<OutlinedInput label={placeholder} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                sx={{ borderRadius: '16px' }}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                        <Checkbox checked={selected.indexOf(option.name) > -1} />
                        <ListItemText primary={option.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}