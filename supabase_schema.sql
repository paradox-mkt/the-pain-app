-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for User Roles
CREATE TYPE user_role AS ENUM ('admin', 'doctor', 'patient');

-- Enum for User Status
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');

-- 1. Profiles Table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'patient',
    status user_status NOT NULL DEFAULT 'pending',
    username TEXT UNIQUE, -- Used for dynamic routes (e.g., /[username])
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    
    -- Specific to Doctors
    specialty TEXT,
    clinics_hospitals TEXT,
    booking_link TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Specific to Patients (Emergency Card)
    dni TEXT,
    emergency_contacts JSONB, -- Array of objects: {name, phone, relation}
    allergies TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Medications Table (For Patients)
CREATE TABLE public.medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dose TEXT NOT NULL, -- e.g., '50mg', '2 drops'
    type TEXT NOT NULL, -- 'pill', 'drops', 'injection', etc.
    frequency TEXT NOT NULL, -- 'daily', 'every 8 hours', etc.
    schedule_times TEXT[], -- Array of specific times e.g., ['08:00', '20:00']
    is_biologic BOOLEAN DEFAULT FALSE, -- To distinguish biological reminders
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Appointments Table (For Patients)
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    doctor_name TEXT NOT NULL,
    clinic_hospital TEXT NOT NULL,
    floor_room TEXT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    notes_for_doctor TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Crises (Brotes) Table (For Patients)
CREATE TABLE public.crises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    crisis_date DATE NOT NULL,
    symptoms TEXT,
    additional_meds_used TEXT,
    er_visit BOOLEAN DEFAULT FALSE,
    er_meds_given TEXT,
    pain_intensity INTEGER CHECK (pain_intensity >= 1 AND pain_intensity <= 10),
    pain_locations JSONB, -- Array of body parts or map coordinates
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Feed Posts Table (For Doctors)
CREATE TABLE public.feed_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT, -- Text tips
    drive_link TEXT, -- Optional Google Drive link
    instagram_link TEXT, -- Optional Instagram embed link
    is_approved BOOLEAN DEFAULT FALSE, -- Admin approval flag if needed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Feed Comments Table (For Patients & Doctors)
CREATE TABLE public.feed_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES public.feed_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.feed_comments(id) ON DELETE CASCADE, -- For threading/replies
    content TEXT NOT NULL,
    is_authoritative BOOLEAN DEFAULT FALSE, -- Set to true if a doctor replies to a patient
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS (Row Level Security) - Basic Setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_comments ENABLE ROW LEVEL SECURITY;

-- Note: Proper RLS Policies will be needed in the future for strict security.
