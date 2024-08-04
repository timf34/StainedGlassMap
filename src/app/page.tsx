'use client';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Map from '../components/Map';
import FilterBox from '../components/FilterBox';
import LocationList from "../components/LocationList";

export default function Home() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <main className="h-screen flex flex-col">
            <header className="w-full p-4 bg-white">
                <h1 className="text-2xl md:text-4xl font-light font-montserrat italic">Stained Glass Map of Ireland</h1>
            </header>
            <div className={`flex flex-grow ${isMobile ? 'flex-col' : 'flex-row'} overflow-hidden`}>
                <aside className={`${isMobile ? 'w-full' : 'w-1/5'} p-4 bg-gray-50 flex flex-col`}>
                    <div className="mb-4">
                        <FilterBox tableName="artists" placeholder="Filter by Artist"/>
                        <FilterBox tableName="counties" placeholder="Filter by County"/>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <LocationList/>
                    </div>
                </aside>
                <section className={`${isMobile ? 'w-full h-[50vh]' : 'w-4/5'} p-4`}>
                    <Map/>
                </section>
            </div>
        </main>
    );
}