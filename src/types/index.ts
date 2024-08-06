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
    // TODO: We'll change this to an array soon, to store multiple artists
    thumbnail_url: string,  // We'll also leave this here for now... just getting the url for the first stained glass piece to show
    artist: string;  // Leave this here, even though its contained in stained_glass_pices, for simplicity
}