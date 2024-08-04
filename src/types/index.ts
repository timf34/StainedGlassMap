export interface Artist {
    name: string;
}

interface County {
    name: string;
}

export interface StainedGlassPiece {
    title: string;
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

// TODO: the only difference between the above and below is that WithDetails has the thumbnail directly... but we don't
//  necessarily need that, we can just access it via the first stained_glass_piece.
// export interface LocationWithDetails {
//     id: number;
//     name: string;
//     address: string;
//     google_maps_link: string;
//     latitude: number | null;
//     longitude: number | null;
//     county: { name: string };
//     artist: string;
//     stained_glass_pieces: StainedGlassPiece;
// }
