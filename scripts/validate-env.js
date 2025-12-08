// Environment Variables Validation Script
// Validates that all required environment variables are set before deployment

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SITE_URL',
]

const optionalVars = [
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
]

console.log('🔍 Validating environment variables...\n')

let hasError = false

// Check required variables
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required: ${varName}`)
    hasError = true
  } else {
    console.log(`✅ ${varName}`)
  }
})

// Check optional variables
console.log('\nOptional variables:')
optionalVars.forEach(varName => {
  if (!process.env[varName]) {
    console.warn(`⚠️  Missing optional: ${varName} (using fallback)`)
  } else {
    console.log(`✅ ${varName}`)
  }
})

if (hasError) {
  console.error('\n❌ Validation failed! Missing required environment variables.')
  console.error('\nℹ️  Please check .env.example for required variables.')
  process.exit(1)
}

console.log('\n✅ All required environment variables are set!')
console.log('✨ Environment validation passed.')
