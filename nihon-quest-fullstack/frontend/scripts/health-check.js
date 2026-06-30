#!/usr/bin/env node

/**
 * Health Check Script
 * Monitors application health and performance
 */

import https from 'https'
import http from 'http'

const PRODUCTION_URL = 'https://nihonselfpacepractic.web.app'
const LOCAL_URL = 'http://localhost:5173'

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http
    const startTime = Date.now()

    const req = protocol.get(url, (res) => {
      const responseTime = Date.now() - startTime
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        resolve({
          success: true,
          statusCode: res.statusCode,
          responseTime,
          contentLength: data.length,
          headers: res.headers,
        })
      })
    })

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
      })
    })

    req.setTimeout(10000, () => {
      req.destroy()
      resolve({
        success: false,
        error: 'Request timeout',
      })
    })
  })
}

async function runHealthCheck() {
  log('\n🏥 Application Health Check', 'cyan')
  log('=' .repeat(50), 'cyan')

  // Check production
  log('\n📡 Checking Production...', 'blue')
  const prodResult = await checkUrl(PRODUCTION_URL)

  if (prodResult.success) {
    log(`✅ Status: ${prodResult.statusCode}`, 'green')
    log(`⚡ Response Time: ${prodResult.responseTime}ms`, 'green')
    log(`📦 Content Length: ${prodResult.contentLength} bytes`, 'green')

    if (prodResult.responseTime > 3000) {
      log('⚠️  Warning: Slow response time', 'yellow')
    }
  } else {
    log(`❌ Error: ${prodResult.error}`, 'red')
  }

  // Check local (if running)
  log('\n🖥️  Checking Local Development...', 'blue')
  const localResult = await checkUrl(LOCAL_URL)

  if (localResult.success) {
    log(`✅ Status: ${localResult.statusCode}`, 'green')
    log(`⚡ Response Time: ${localResult.responseTime}ms`, 'green')
  } else {
    log(`ℹ️  Local server not running`, 'yellow')
  }

  // Performance metrics
  log('\n📊 Performance Metrics', 'blue')
  if (prodResult.success) {
    const rating =
      prodResult.responseTime < 1000
        ? '🟢 Excellent'
        : prodResult.responseTime < 2000
        ? '🟡 Good'
        : prodResult.responseTime < 3000
        ? '🟠 Fair'
        : '🔴 Poor'

    log(`Performance Rating: ${rating}`)
  }

  // Summary
  log('\n' + '=' .repeat(50), 'cyan')
  log('✅ Health Check Complete\n', 'cyan')

  // Exit with appropriate code
  if (!prodResult.success) {
    process.exit(1)
  }
}

// Run the health check
runHealthCheck().catch((error) => {
  log(`\n❌ Health check failed: ${error.message}`, 'red')
  process.exit(1)
})
