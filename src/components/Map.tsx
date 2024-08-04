// components/Map.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '../lib/supabase';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface Artist {
    id: number;
    name: string;
}

interface StainedGlassPiece {
    id: number;
    title: string;
    small_thumbnail_url: string;
    artists: Artist[];
}

interface Location {
    id: number;
    name: string;
    address: string;
    google_maps_link: string;
    latitude: number;
    longitude: number;
    county: { name: string };
    stained_glass_pieces: StainedGlassPiece[];
}

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-7.6921);
    const [lat, setLat] = useState(53.1424);
    const [zoom, setZoom] = useState(6);
    const [locations, setLocations] = useState<Location[]>([]);

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
                        id,
                        title,
                        small_thumbnail_url,
                        artists (id, name)
                    )
                `);
            if (error) {
                console.error('Error fetching locations:', error);
            } else {
                // Ensure the data structure is consistent
                const formattedData = data?.map((location: any) => ({
                    ...location,
                    stained_glass_pieces: location.stained_glass_pieces.map((piece: any) => ({
                        ...piece,
                        artists: Array.isArray(piece.artists) ? piece.artists : []
                    }))
                })) || [];
                setLocations(formattedData);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/timf34/clzefs8u900ce01qt78dxdwpv',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }, [lng, lat, zoom]);

    useEffect(() => {
        if (!map.current || locations.length === 0) return;

        locations.forEach((location) => {
            const artists = [...new Set(location.stained_glass_pieces.flatMap(piece =>
                Array.isArray(piece.artists) ? piece.artists.map(artist => artist.name) : []
            ))];
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${location.name}</h3>
                <p>Artists: ${artists.join(', ')}</p>
                <a href="${location.google_maps_link}" target="_blank">View on Google Maps</a>
                <div>
                    ${location.stained_glass_pieces.map(piece => `
                        <div key="${piece.id}">
                            <img src="${piece.small_thumbnail_url}" alt="${piece.title}" width="100" />
                            <p>${piece.title}</p>
                        </div>
                    `).join('')}
                </div>`
            );

            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup)
                .addTo(map.current!);
        });
    }, [locations]);

    return (
        <div className="h-full w-full">
            <div ref={mapContainer} className="map-container w-full h-full rounded-xl shadow-xl" />
        </div>
    );
}
