// API Performance Testing Script
// Tests response times for critical endpoints

async function testEndpoint(url, name) {
  const times = []

  console.log(`\n🔍 Testing ${name}...`)

  for (let i = 0; i < 10; i++) {
    const start = Date.now()
    try {
      const response = await fetch(url)
      const duration = Date.now() - start
      times.push(duration)

      if (i === 0) {
        console.log(`   Status: ${response.status}`)
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`)
      return
    }
  }

  const avg = times.reduce((a, b) => a + b, 0) / times.length
  const min = Math.min(...times)
  const max = Math.max(...times)
  const median = times.sort((a, b) => a - b)[Math.floor(times.length / 2)]

  console.log(`   Average: ${avg.toFixed(2)}ms`)
  console.log(`   Median:  ${median}ms`)
  console.log(`   Min:     ${min}ms`)
  console.log(`   Max:     ${max}ms`)

  // Performance evaluation
  if (avg > 500) {
    console.log(`   ⚠️  SLOW: Average response time > 500ms`)
    return 'slow'
  } else if (avg > 200) {
    console.log(`   ⚡ OK: Could be faster (>200ms)`)
    return 'ok'
  } else {
    console.log(`   ✅ FAST: <200ms`)
    return 'fast'
  }
}

async function runTests() {
  console.log('🚀 API Performance Test\n')
  console.log('=' .repeat(50))
  console.log('Testing each endpoint 10 times...')
  console.log('=' .repeat(50))

  const results = {}

  // Test Search API
  results.search = await testEndpoint(
    'http://localhost:3000/api/search?q=test',
    'Search API'
  )

  // Test Home Page
  results.home = await testEndpoint(
    'http://localhost:3000/',
    'Home Page'
  )

  // Test OG Image API
  results.og = await testEndpoint(
    'http://localhost:3000/api/og',
    'OG Image API'
  )

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary')
  console.log('='.repeat(50))

  const fast = Object.values(results).filter(r => r === 'fast').length
  const ok = Object.values(results).filter(r => r === 'ok').length
  const slow = Object.values(results).filter(r => r === 'slow').length

  console.log(`✅ Fast endpoints: ${fast}`)
  console.log(`⚡ OK endpoints: ${ok}`)
  console.log(`⚠️  Slow endpoints: ${slow}`)

  if (slow > 0) {
    console.log('\n⚠️  Performance improvements recommended:')
    console.log('   - Add database indexes')
    console.log('   - Implement caching with unstable_cache')
    console.log('   - Optimize database queries')
  } else {
    console.log('\n✅ All endpoints performing well!')
  }

  console.log('\n✨ Tests complete!')
}

// Run tests
runTests().catch(error => {
  console.error('\n❌ Test suite failed:', error)
  process.exit(1)
})
