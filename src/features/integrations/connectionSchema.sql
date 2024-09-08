CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    host VARCHAR(255),
    port INTEGER,
    username VARCHAR(255),
    password VARCHAR(255),
    database_name VARCHAR(255),
    access_token TEXT,
    api_key TEXT,
    endpoint_url TEXT,
    region VARCHAR(50),
    provider VARCHAR(50),
    extra JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on the 'type' column for faster queries
CREATE INDEX idx_connections_type ON connections(type);

-- Create a function to update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the 'updated_at' column
CREATE TRIGGER update_connections_modtime
BEFORE UPDATE ON connections
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();