'use client';

import useFetchLocations from '../hooks/useFetchLocations';
import { LocationWithDetails } from '../types';

interface LocationListProps {
    selectedArtists: string[];
    selectedCounties: string[];
    onLocationClick: (location: LocationWithDetails) => void;
}

export default function LocationList({ selectedArtists, selectedCounties, onLocationClick }: LocationListProps) {
    const { locations, error } = useFetchLocations();

    const filteredLocations = locations.filter((location) => {
        const matchesArtist = selectedArtists.length === 0 || selectedArtists.includes(location.artist);
        const matchesCounty = selectedCounties.length === 0 || selectedCounties.includes(location.county.name);
        return matchesArtist && matchesCounty;
    });

    if (error) {
        return <div>Error fetching locations: {error}</div>;
    }

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
