-- Initialize UDT Store Database
-- This script runs when PostgreSQL container starts for the first time

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS "udt-store-db";

-- Connect to the database
\c "udt-store-db";

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create admin user if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'udt_admin') THEN
        CREATE USER udt_admin WITH PASSWORD 'udt_admin_password';
        GRANT ALL PRIVILEGES ON DATABASE "udt-store-db" TO udt_admin;
    END IF;
END
$$;

-- Set timezone
SET timezone = 'UTC';

-- Create initial tables structure (will be managed by Prisma later)
-- These are just basic structure, Prisma will handle the actual schema

-- Enable row level security
ALTER DATABASE "udt-store-db" SET row_security = on;

-- Create basic indexes for performance
-- These will be managed by Prisma, but we can set some basic ones

-- Log the initialization
DO $$
BEGIN
    RAISE NOTICE 'UDT Store database initialized successfully';
END
$$;