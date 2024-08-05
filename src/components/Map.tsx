'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '../lib/supabase';
import {BaseLocation, LocationWithDetails} from "@/types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;


interface MapProps {
    selectedArtists: string[];
    selectedCounties: string[];
    onLocationClick: (location: LocationWithDetails) => void;
}

export default function Map({ selectedArtists, selectedCounties, onLocationClick }: MapProps) {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-7.6921);
    const [lat, setLat] = useState(53.1424);
    const [zoom, setZoom] = useState(6);
    const [locations, setLocations] = useState<LocationWithDetails[]>([]);
    const markers = useRef<mapboxgl.Marker[]>([]);

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
                    stained_glass_pieces: location.stained_glass_pieces,
                    artist: location.stained_glass_pieces[0]?.artists.name || 'Unknown Artist',
                }));
                setLocations(transformedData || []);
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

        // Clear existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        const filteredLocations = locations.filter((location) => {
            const matchesArtist = selectedArtists.length === 0 || selectedArtists.includes(location.artist);
            const matchesCounty = selectedCounties.length === 0 || selectedCounties.includes(location.county.name);
            return matchesArtist && matchesCounty;
        });

        filteredLocations.forEach((location) => {
            if (location.longitude != null && location.latitude != null) {
                const artistNames = location.stained_glass_pieces.flatMap(piece =>
                    Array.isArray(piece.artist) ? piece.artist.map(artist => artist.name) : []
                );
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<h3>${location.name}</h3>
                    <p>Artists: ${artistNames.join(', ')}</p>
                    <a href="${location.google_maps_link}" target="_blank">View on Google Maps</a>
                    <div>
                        ${location.stained_glass_pieces.map(piece => `
                            <div>
                                <img src="${piece.small_thumbnail_url}" alt="${piece.title}" width="100" />
                                <p>${piece.title}</p>
                            </div>
                        `).join('')}
                    </div>`
                );

                const marker = new mapboxgl.Marker({
                    color: '#74b6c4',
                })
                    .setLngLat([location.longitude, location.latitude])
                    .setPopup(popup)
                    .addTo(map.current!);

                marker.getElement().addEventListener('click', () => {
                    onLocationClick(location);
                });

                markers.current.push(marker);
            }
        });
    }, [locations, selectedArtists, selectedCounties, onLocationClick]);

    return (
        <div className="h-full w-full">
            <div ref={mapContainer} className="map-container w-full h-full rounded-xl shadow-xl" />
        </div>
    );
}
