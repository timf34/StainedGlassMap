export interface StainedGlassLocation {
    id: string;
    name: string;
    artist: string;
    county: string;
    latitude: number;
    longitude: number;
    year?: number;
    description?: string;
    thumbnail_url: string;
    additional_images?: string[];
    google_maps_url: string;
}