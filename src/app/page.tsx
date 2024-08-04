'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Map from '../components/Map';
import FilterBox from '../components/FilterBox';
import LocationList from '../components/LocationList';
import LocationModal from '../components/LocationModal';
import {LocationWithDetails} from '@/types';

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationWithDetails | null>(null);

    const handleFilterChange = (type: 'artists' | 'counties', values: string[]) => {
        if (type === 'artists') {
            setSelectedArtists(values);
        } else {
            setSelectedCounties(values);
        }
    };

    const handleLocationClick = (location: LocationWithDetails) => {
        setSelectedLocation(location);
    };

    const handleCloseModal = () => {
        setSelectedLocation(null);
    };

    return (
        <main className="h-screen flex flex-col">
            <header className="w-full p-4 bg-white">
                <h1 className="text-2xl md:text-4xl font-light font-montserrat italic">Stained Glass Map of Ireland</h1>
            </header>
            <div className={`flex flex-grow ${isMobile ? 'flex-col' : 'flex-row'} overflow-hidden`}>
                <aside className={`${isMobile ? 'w-full' : 'w-1/5'} p-4 bg-gray-50 flex flex-col`}>
                    <div className="mb-4">
                        <FilterBox
                            tableName="artists"
                            placeholder="Filter by Artist"
                            onFilterChange={(values) => handleFilterChange('artists', values)}
                        />
                        <FilterBox
                            tableName="counties"
                            placeholder="Filter by County"
                            onFilterChange={(values) => handleFilterChange('counties', values)}
                        />
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <LocationList
                            selectedArtists={selectedArtists}
                            selectedCounties={selectedCounties}
                            onLocationClick={handleLocationClick}
                        />
                    </div>
                </aside>
                <section className={`${isMobile ? 'w-full h-[50vh]' : 'w-4/5'} p-4`}>
                    <Map
                        selectedArtists={selectedArtists}
                        selectedCounties={selectedCounties}
                        onLocationClick={handleLocationClick}
                    />
                </section>
            </div>
            {selectedLocation && (
                <LocationModal
                    location={selectedLocation}
                    open={Boolean(selectedLocation)}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}
