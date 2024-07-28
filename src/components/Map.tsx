'use client';

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '../lib/supabaseClient';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-7.6921, 53.1424],
            zoom: 6
        });

        setMap(map);

        return () => map.remove();
    }, []);

    useEffect(() => {
        async function fetchLocations() {
            const { data, error } = await supabase
                .from('stained_glass_locations')
                .select('*');

            if (error) console.error('Error fetching locations:', error);
            else setLocations(data);
        }

        fetchLocations();
    }, []);

    useEffect(() => {
        if (!map || locations.length === 0) return;

        locations.forEach((location) => {
            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3><p>Artist: ${location.artist}</p>`))
                .addTo(map);
        });
    }, [map, locations]);

    return <div id="map" style={{ width: '100%', height: '100%' }} />;