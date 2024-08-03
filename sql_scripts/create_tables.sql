CREATE TABLE Counties (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Artists (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    biography TEXT,
    birth_year INTEGER,
    death_year INTEGER
);

CREATE TABLE Locations (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    county_id UUID,
    google_maps_link VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    FOREIGN KEY (county_id) REFERENCES Counties(id)
);

CREATE TABLE Stained_Glass_Pieces (
    id UUID PRIMARY KEY,
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