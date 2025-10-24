export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || '',
  
  features: {
    enableB2B: process.env.NEXT_PUBLIC_ENABLE_B2B === 'true',
    enableB2C: process.env.NEXT_PUBLIC_ENABLE_B2C === 'true',
    mockMode: process.env.NEXT_PUBLIC_MOCK_MODE === 'true',
  },
  
  pricing: {
    defaultMarkupPercent: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_MARKUP_PERCENT || '5'),
    pgFeePercent: parseFloat(process.env.NEXT_PUBLIC_PG_FEE_PERCENT || '2'),
    currency: process.env.NEXT_PUBLIC_CURRENCY || 'INR',
  },
  
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
  },
  
  cms: {
    endpoint: process.env.NEXT_PUBLIC_CMS_ENDPOINT || '',
  },
  
  brand: {
    name: 'Idea Holiday',
    tagline: 'Your Travel Partner',
    phone: '+91-XXX-XXX-XXXX',
    whatsapp: '+91-XXX-XXX-XXXX',
    email: 'support@ideaholiday.com',
    website: 'https://ideaholiday.com',
  },
} as const

export type AppConfig = typeof config
