export interface LocationWithDetails {
    id: number;
    name: string;
    address: string;
    google_maps_link: string;
    latitude: number | null;
    longitude: number | null;
    county: string;
    artist: string;
    thumbnail_url: string;
    stained_glass_pieces: {
        title: string;
        small_thumbnail_url: string;
        artists: { name: string }[];
    }[];
}
