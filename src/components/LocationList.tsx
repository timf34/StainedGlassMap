// components/LocationList.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { StainedGlassLocation } from '../types';

export default function LocationList() {
    const [locations, setLocations] = useState<StainedGlassLocation[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const { data, error } = await supabase
                .from('stained-glass-locations')
                .select('*');
            if (error) console.error('Error fetching locations:', error);
            else setLocations(data || []);
        };

        fetchLocations();
    }, []);

    return (
        <div className="overflow-y-auto h-full">
            {locations.map((location) => (
                <div key={location.id} className="mb-4 p-4 border rounded">
                    <img
                        src={location.thumbnail_url}
                        alt={location.name}
                        className="w-full h-40 object-cover mb-2"
                    />
                    <h3 className="font-bold">{location.name}</h3>
                    <p>{location.artist}</p>
                    <p>{location.county}</p>
                </div>
            ))}
        </div>
    );
}