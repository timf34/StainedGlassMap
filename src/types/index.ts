export interface Artist {
    name: string;
}

interface County {
    name: string;
}

// Add years to this!
export interface StainedGlassPiece {
    title: string;
    year_created: number;
    small_thumbnail_url: string;
    artist: Artist;
}

export interface BaseLocation {
    id: number;
    name: string;
    address: string;
    google_maps_link: string;
    latitude: number;
    longitude: number;
    county: County;
    stained_glass_pieces: StainedGlassPiece[];
}

export interface LocationWithDetails extends BaseLocation {
    thumbnail_url: string,  // We'll also leave this here for now... just getting the url for the first stained glass piece to show
    artists: string[]; // Store an array of artists names
}