// components/Map.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '../lib/supabase';
import { StainedGlassLocation } from '../types';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-7.6921);
    const [lat, setLat] = useState(53.1424);
    const [zoom, setZoom] = useState(6);
    const [locations, setLocations] = useState<StainedGlassLocation[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const { data, error } = await supabase
                .from('stained_glass_locations')
                .select('*');
            if (error) console.error('Error fetching locations:', error);
            else setLocations(data || []);
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // Add navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }, [lng, lat, zoom]);

    useEffect(() => {
        if (!map.current || locations.length === 0) return;

        locations.forEach((location) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${location.name}</h3><p>${location.artist}</p>`
            );

            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup)
                .addTo(map.current!);
        });
    }, [locations]);

    return <div ref={mapContainer} className="map-container w-full h-full" />;
}