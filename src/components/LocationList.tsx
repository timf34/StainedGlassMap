'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LocationWithDetails } from '../types';

interface LocationListProps {
    selectedArtists: string[];
    selectedCounties: string[];
    onLocationClick: (location: LocationWithDetails) => void;
}

export default function LocationList({ selectedArtists, selectedCounties, onLocationClick }: LocationListProps) {
    const [locations, setLocations] = useState<LocationWithDetails[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const { data, error } = await supabase
                .from('locations')
                .select(`
                    id,
                    name,
                    address,
                    google_maps_link,
                    latitude,
                    longitude,
                    counties (name),
                    stained_glass_pieces (
                        title,
                        small_thumbnail_url,
                        artists (name)
                    )
                `);
            if (error) {
                console.error('Error fetching locations:', error);
            } else {
                const transformedData = data.map((location: any) => ({
                    id: location.id,
                    name: location.name,
                    address: location.address,
                    google_maps_link: location.google_maps_link,
                    thumbnail_url: location.stained_glass_pieces[0]?.small_thumbnail_url || '',
                    latitude: location.latitude,
                    longitude: location.longitude,
                    county: location.counties.name, // Assuming counties is a single object
                    stained_glass_pieces: location.stained_glass_pieces.map((piece: any) => ({
                        ...piece,
                        artist: piece.artists,
                    })),
                    artist: location.stained_glass_pieces[0]?.artists.name || 'Unknown Artist',
                }));
                setLocations(transformedData || []);
            }
        };

        fetchLocations();
    }, []);

    const filteredLocations = locations.filter((location) => {
        const matchesArtist = selectedArtists.length === 0 || selectedArtists.includes(location.artist);
        const matchesCounty = selectedCounties.length === 0 || selectedCounties.includes(location.county.name);
        return matchesArtist && matchesCounty;
    });

    return (
        <div>
            {filteredLocations.map((location) => (
                <div key={location.id} className="mb-4 p-4 border rounded cursor-pointer" onClick={() => onLocationClick(location)}>
                    <img
                        src={location.thumbnail_url}
                        alt={location.name}
                        className="w-full h-40 object-cover mb-2"
                    />
                    <h3 className="font-bold">{location.name}</h3>
                    <p>{location.artist}</p>
                    <p>{location.county.name}</p>
                </div>
            ))}
        </div>
    );
}