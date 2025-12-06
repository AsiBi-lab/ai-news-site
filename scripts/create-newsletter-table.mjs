import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const sql = `
-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
`

async function main() {
  console.log('Checking newsletter_subscribers table...')

  // Check if table already exists by trying to query it
  const { count, error } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true })

  if (error && error.code === '42P01') {
    // Table doesn't exist
    console.log('Table does not exist.')
    console.log('\n⚠ Please run this SQL in Supabase Dashboard → SQL Editor:\n')
    console.log(sql)
    process.exit(1)
  } else if (error) {
    console.error('Error checking table:', error.message)
    process.exit(1)
  } else {
    console.log('✓ Table newsletter_subscribers already exists!')
    console.log(`  Found ${count || 0} subscriber(s)`)
  }
}

main()
