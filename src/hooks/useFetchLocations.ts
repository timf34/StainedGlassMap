import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LocationWithDetails } from '../types';

export default function useFetchLocations() {
    const [locations, setLocations] = useState<LocationWithDetails[]>([]);
    const [error, setError] = useState<string | null>(null);

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
                setError(error.message);
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
                        artist: piece.artists, // Map artists to artist
                    })),
                    artist: location.stained_glass_pieces[0]?.artists.name || 'Unknown Artist',
                }));
                setLocations(transformedData || []);
            }
        };

        fetchLocations();
    }, []);

    return { locations, error };
}