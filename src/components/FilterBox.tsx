'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../app/globals.css';
import Image from 'next/image';
import DropdownList from './DropdownList';

interface FilterBoxProps {
    type: 'artist' | 'county';
    placeholder: string;
    options: string[]; // Add this prop for the list of options
}

export default function FilterBox({ type, placeholder, options }: FilterBoxProps) {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Filter ${type}:`, value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setIsOpen(true);
    };

    const handleOptionSelect = (option: string) => {
        setValue(option);
        setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
    );

    return (
        <form onSubmit={handleSubmit} className="flex w-60 filterBox relative">
            <div className="w-full cursor-pointer">
                <input
                    type="text"
                    id={type}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="filterInput w-full"
                    ref={inputRef}
                />
                <Image
                    src="./icons/downChevron.svg"
                    alt="Open filter"
                    width={24}
                    height={24}
                    className="chevronIcon"
                    onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && filteredOptions.length > 0 && (
                    <DropdownList options={filteredOptions} onSelect={handleOptionSelect} />
                )}
            </div>
        </form>
    );
}