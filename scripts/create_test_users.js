const { createClient } = require('@supabase/supabase-js');


// You must set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

// We use the service role key to bypass RLS and create users directly
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUsers() {
  const users = [
    {
      email: 'admin@thepain.app',
      password: 'password123',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'Root',
      status: 'approved'
    },
    {
      email: 'doctor@thepain.app',
      password: 'password123',
      role: 'doctor',
      firstName: 'Dr. John',
      lastName: 'Doe',
      status: 'approved',
      specialty: 'Reumatología',
      is_verified: true
    },
    {
      email: 'patient@thepain.app',
      password: 'password123',
      role: 'patient',
      firstName: 'Jane',
      lastName: 'Smith',
      status: 'approved'
    }
  ];

  for (const user of users) {
    console.log(`Creating user: ${user.email}...`);
    
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true // Automatically confirm email
    });

    if (authError) {
      console.error(`Error creating auth user ${user.email}:`, authError.message);
      continue;
    }

    const userId = authData.user.id;
    console.log(`Auth user created. ID: ${userId}`);

    // 2. Insert into profiles table
    const profileData = {
      id: userId,
      role: user.role,
      status: user.status,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    };

    if (user.role === 'doctor') {
      profileData.specialty = user.specialty;
      profileData.is_verified = user.is_verified;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(profileData);

    if (profileError) {
      console.error(`Error creating profile for ${user.email}:`, profileError.message);
    } else {
      console.log(`Profile created successfully for ${user.email}\n`);
    }
  }
}

createTestUsers().then(() => console.log('Finished!')).catch(console.error);
