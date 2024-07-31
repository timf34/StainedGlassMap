'use client';

import { useState } from 'react';
import styles from '../app/globals.css';
import Image from 'next/image';

interface FilterBoxProps {
    type: 'artist' | 'county';
    placeholder: string;
}

export default function FilterBox({ type, placeholder }: FilterBoxProps) {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Filter ${type}:`, value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-60 filterBox">
            <div className="w-full cursor-pointer">
                <input
                    type="text"
                    id={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="filterInput w-full"
                />
                <Image
                    src="./icons/downChevron.svg"
                    alt="Open filter"
                    width={24}
                    height={24}
                    className="chevronIcon"
                />
            </div>
        </form>

    );
}