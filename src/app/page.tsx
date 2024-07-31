import Map from '../components/Map';
import FilterBox from '../components/FilterBox';
import FilterResults from '../components/DropdownList';
import LocationList from "../components/LocationList";

export default function Home() {

    const artistOptions = ['Artist 1', 'Artist 2', 'Artist 3']; // Replace with your actual options
    const countyOptions = ['County 1', 'County 2', 'County 3']; // Replace with your actual options

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold">Stained Glass Map of Ireland</h1>
            </div>
            <div className="flex w-full h-[calc(100vh-200px)]">
                <div className="w-1/4 p-4">
                    <FilterBox type="artist" placeholder="Filter by Artist" options={artistOptions}/>
                    <FilterBox type="county" placeholder="Filter by County" options={countyOptions}/>
                    <LocationList/>
                </div>
                <div className="w-3/4">
                    <Map/>
                </div>
            </div>
        </main>
    );
}
