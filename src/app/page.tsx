'use client';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Map from '../components/Map';
import FilterBox from '../components/FilterBox';
import LocationList from "../components/LocationList";

export default function Home() {
    const artistOptions = ['Artist 1', 'Artist 2', 'Artist 3']; // Replace with your actual options
    const countyOptions = ['County 1', 'County 2', 'County 3']; // Replace with your actual options

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
            <div className="z-10 w-full items-center justify-between text-sm">
                <h1 className="text-2xl md:text-4xl font-light text-center mb-4 font-montserrat italic">Stained Glass Map of Ireland</h1>
            </div>
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} w-full h-[calc(100vh-200px)]`}>
                <div className={isMobile ? 'w-full mb-4' : 'w-1/4 p-4'}>
                    <FilterBox type="artist" placeholder="Filter by Artist" options={artistOptions}/>
                    <FilterBox type="county" placeholder="Filter by County" options={countyOptions}/>
                    <LocationList/>
                </div>
                <div className={isMobile ? 'w-full h-[50vh]' : 'w-3/4'}>
                    <Map/>
                </div>
            </div>
        </main>
    );
}
