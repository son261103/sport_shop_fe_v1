// 🌍 Environment Variables Configuration
// Centralized environment variables management

export const ENV = {
  // 🌐 API Configuration
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    PROVINCES_URL: import.meta.env.VITE_PROVINCES_API_URL || 'https://provinces.open-api.vn/api',
  },

  // 🏠 Application URLs
  APP: {
    URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  },

  // 🔑 Authentication
  AUTH: {
    TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token',
  },

  // 🎯 Development Settings
  DEV: {
    MODE: import.meta.env.VITE_DEV_MODE === 'true',
    DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true',
    IS_DEVELOPMENT: import.meta.env.DEV,
    IS_PRODUCTION: import.meta.env.PROD,
  },

  // 📦 Build Information
  BUILD: {
    MODE: import.meta.env.MODE,
    BASE_URL: import.meta.env.BASE_URL,
  },
} as const

// 🔍 Environment validation
export const validateEnv = () => {
  const requiredVars = [
    'VITE_API_BASE_URL',
  ]

  const missing = requiredVars.filter(varName => !import.meta.env[varName])
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing)
    console.warn('📝 Please check your .env file and ensure all required variables are set')
  }

  return missing.length === 0
}

// 🐛 Debug environment info
export const debugEnv = () => {
  if (ENV.DEV.DEBUG) {
    console.group('🌍 Environment Configuration')
    console.log('Mode:', ENV.BUILD.MODE)
    console.log('API Base URL:', ENV.API.BASE_URL)
    console.log('App URL:', ENV.APP.URL)
    console.log('Development Mode:', ENV.DEV.IS_DEVELOPMENT)
    console.groupEnd()
  }
}