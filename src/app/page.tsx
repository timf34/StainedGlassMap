'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { SwipeableDrawer, Box, CssBaseline } from '@mui/material';
import { grey } from '@mui/material/colors';
import Map from '../components/Map';
import FilterBox from '../components/FilterBox';
import LocationList from '../components/LocationList';
import LocationModal from '../components/LocationModal';
import LoadingScreen from '../components/LoadingScreen';
import { LocationWithDetails } from '@/types';

const drawerBleeding = 40;
const mapBottomPadding = drawerBleeding;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationWithDetails | null>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

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

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(75% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <main className="h-screen flex flex-col">
                <header className="w-full p-2 bg-white">
                    <h1 className="text-xl md:text-4xl font-light font-montserrat italic">
                        Stained Glass Map of Ireland
                    </h1>
                </header>
                <div className={`flex flex-grow ${isMobile ? 'flex-col' : 'flex-row'} overflow-hidden`}>
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
                    <section
                        className={`flex-grow ${isMobile? ``: 'w-4/5'} p-2`}
                        style={{
                            marginBottom: isMobile ? `${mapBottomPadding}px` : '5',
                        }}
                    >
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
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        swipeAreaWidth={drawerBleeding}
                        disableSwipeToOpen={false}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <StyledBox
                            sx={{
                                position: 'absolute',
                                top: -drawerBleeding,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                visibility: 'visible',
                                right: 0,
                                left: 0,
                                backgroundColor: 'background.paper',
                                height: drawerBleeding,
                            }}
                        >
                            <Puller />
                        </StyledBox>
                        <StyledBox
                            sx={{
                                px: 2,
                                pb: 2,
                                height: '100%',
                                overflow: 'auto',
                            }}
                        >
                            <div className="mb-4 pt-2">
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
                        </StyledBox>
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
        </Root>
    );
}