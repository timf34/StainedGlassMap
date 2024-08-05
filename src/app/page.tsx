'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Map from '../components/Map';
import FilterBox from '../components/FilterBox';
import LocationList from '../components/LocationList';
import LocationModal from '../components/LocationModal';
import { LocationWithDetails } from '@/types';
import { SwipeableDrawer, Box, Divider } from '@mui/material';

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationWithDetails | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false); // Initial state to partially open

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

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <main className="h-screen flex flex-col">
            <header className="w-full p-4 bg-white">
                <h1 className="text-2xl md:text-4xl font-light font-montserrat italic">Stained Glass Map of Ireland</h1>
            </header>
            <div className={`flex flex-grow ${isMobile ? 'flex-col' : 'flex-row'} overflow-hidden pb-16`}> {/* Add padding-bottom */}
                {!isMobile && (
                    <aside className="w-1/5 p-4 bg-gray-50 flex flex-col">
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
                )}
                <section className={`flex-grow ${isMobile ? 'h-[50vh]' : 'w-4/5'} p-4`}>
                    <Map
                        selectedArtists={selectedArtists}
                        selectedCounties={selectedCounties}
                        onLocationClick={handleLocationClick}
                    />
                </section>
            </div>
            {isMobile && (
                <SwipeableDrawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    disableSwipeToOpen={false}
                    swipeAreaWidth={56} // This is the area in px that is always visible
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Box
                        sx={{
                            width: 'auto',
                            height: drawerOpen ? '75vh' : '20vh', // Adjusted height
                            padding: '16px',
                        }}
                    >
                        <div
                            className="h-12 flex justify-center items-center cursor-pointer"
                            onClick={toggleDrawer(!drawerOpen)}
                        >
                            <Divider sx={{ width: '40px', marginBottom: '8px' }} />
                        </div>
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
                    </Box>
                </SwipeableDrawer>
            )}
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
