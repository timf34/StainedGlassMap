import { useState } from 'react';

export default function FilterBox() {
    const [artist, setArtist] = useState('');
    const [county, setCounty] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle filter submission
        console.log('Filter:', { artist, county });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
                <label htmlFor="artist" className="block mb-2">Artist</label>
                <input
                    type="text"
                    id="artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="county" className="block mb-2">County</label>
                <input
                    type="text"
                    id="county"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Apply Filters
            </button>
        </form>
    );
}