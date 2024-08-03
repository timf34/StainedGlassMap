-- Create Counties table
CREATE TABLE counties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Artists table
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    biography TEXT,
    birth_year INTEGER,
    death_year INTEGER
);

-- Create Locations table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    county_id INTEGER,
    google_maps_link VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    FOREIGN KEY (county_id) REFERENCES Counties(id)
);

-- Create Stained Glass Pieces table
CREATE TABLE stained_glass_pieces (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location_id INTEGER,
    artist_id INTEGER,
    year_created INTEGER,
    small_thumbnail_url VARCHAR(255),
    high_quality_url VARCHAR(255),
    description TEXT,
    FOREIGN KEY (location_id) REFERENCES Locations(id),
    FOREIGN KEY (artist_id) REFERENCES Artists(id)
);
