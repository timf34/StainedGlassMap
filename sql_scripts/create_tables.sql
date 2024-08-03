-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Counties table
CREATE TABLE Counties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL
);

-- Create Artists table
CREATE TABLE Artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    biography TEXT,
    birth_year INTEGER,
    death_year INTEGER
);

-- Create Locations table
CREATE TABLE Locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    county_id UUID,
    google_maps_link VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    FOREIGN KEY (county_id) REFERENCES Counties(id)
);

-- Create Stained Glass Pieces table
CREATE TABLE Stained_Glass_Pieces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    location_id UUID,
    artist_id UUID,
    year_created INTEGER,
    small_thumbnail_url VARCHAR(255),
    high_quality_url VARCHAR(255),
    description TEXT,
    latitude FLOAT,
    longitude FLOAT,
    FOREIGN KEY (location_id) REFERENCES Locations(id),
    FOREIGN KEY (artist_id) REFERENCES Artists(id)
);
