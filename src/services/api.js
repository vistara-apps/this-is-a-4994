/**
 * API Service Layer for SampleSecure Pro
 * Handles all external API integrations and data management
 */

// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  SPOTIFY_CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
}

// Generic API request handler
async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// User Management API
export const userAPI = {
  async getCurrentUser() {
    return apiRequest('/user/profile')
  },
  
  async updateUser(userData) {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },
  
  async login(credentials) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },
  
  async register(userData) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },
}

// Clearance Request API
export const clearanceAPI = {
  async getClearanceRequests(userId) {
    return apiRequest(`/clearance/requests?userId=${userId}`)
  },
  
  async createClearanceRequest(requestData) {
    return apiRequest('/clearance/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
  },
  
  async updateClearanceRequest(requestId, updates) {
    return apiRequest(`/clearance/requests/${requestId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  },
  
  async getClearanceStatus(requestId) {
    return apiRequest(`/clearance/requests/${requestId}/status`)
  },
}

// Sample Management API
export const sampleAPI = {
  async searchSamples(query) {
    return apiRequest(`/samples/search?q=${encodeURIComponent(query)}`)
  },
  
  async getSampleDetails(sampleId) {
    return apiRequest(`/samples/${sampleId}`)
  },
  
  async uploadSample(file, metadata) {
    const formData = new FormData()
    formData.append('sample', file)
    formData.append('metadata', JSON.stringify(metadata))
    
    return apiRequest('/samples/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },
}

// AI Assistant API
export const aiAPI = {
  async getChatResponse(messages, context = {}) {
    // If OpenAI API key is available, use real API
    if (API_CONFIG.OPENAI_API_KEY) {
      return this.getOpenAIResponse(messages, context)
    }
    
    // Fallback to mock response for development
    return this.getMockResponse(messages[messages.length - 1].content)
  },
  
  async getOpenAIResponse(messages, context) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert music licensing assistant for SampleSecure Pro. 
              You help musicians and producers with sample clearance, licensing negotiations, 
              and market insights. Provide accurate, helpful advice based on current industry standards.
              Context: ${JSON.stringify(context)}`
            },
            ...messages
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })
      
      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.status}`)
      }
      
      const data = await response.json()
      return {
        message: data.choices[0].message.content,
        usage: data.usage,
      }
    } catch (error) {
      console.error('OpenAI API Error:', error)
      // Fallback to mock response
      return this.getMockResponse(messages[messages.length - 1].content)
    }
  },
  
  async getMockResponse(userMessage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('licensing fee') || lowerMessage.includes('fair price')) {
      return {
        message: `Based on current market analysis, here's what I found:

**Sample Licensing Fee Analysis:**

For a **funk/soul break** like "Funky Drummer":
• **Indie Release**: $500 - $2,000 upfront + 2-5% royalties
• **Major Label**: $5,000 - $25,000 upfront + 5-15% royalties
• **Commercial/Sync**: $10,000 - $100,000+ depending on usage

**Negotiation Tips:**
1. Research similar clearances in your genre
2. Consider offering a higher royalty rate for lower upfront costs
3. Be transparent about your project's scope and budget
4. Build relationships with publishers for future deals

Would you like me to analyze a specific sample or help with negotiation strategy?`,
        usage: { total_tokens: 150 }
      }
    }
    
    if (lowerMessage.includes('contract') || lowerMessage.includes('terms')) {
      return {
        message: `Here are key contract terms to review:

**Essential Clearance Terms:**
• **Territory**: Worldwide vs. specific regions
• **Duration**: Term length (perpetual vs. limited)
• **Usage Rights**: Master + Publishing clearance
• **Revenue Share**: Mechanical vs. performance royalties
• **Credit Requirements**: How to credit original artist

**Red Flags to Watch:**
⚠️ Vague usage restrictions
⚠️ Excessive approval requirements
⚠️ Unclear royalty calculations
⚠️ Limited territory without price adjustment

Need help reviewing a specific contract clause?`,
        usage: { total_tokens: 120 }
      }
    }
    
    return {
      message: `I'm here to help with sample clearance and licensing! I can assist with:

🎵 **Licensing Fee Analysis** - Get market rates for your samples
📋 **Contract Review** - Understand terms and negotiate better deals  
📊 **Market Insights** - Track performance and trends
🤝 **Negotiation Strategy** - Tips for successful clearance

What specific aspect of sample clearance would you like help with?`,
      usage: { total_tokens: 80 }
    }
  },
}

// Music Platform Integration API
export const musicPlatformAPI = {
  async getSpotifyAccessToken() {
    if (!API_CONFIG.SPOTIFY_CLIENT_ID || !API_CONFIG.SPOTIFY_CLIENT_SECRET) {
      throw new Error('Spotify credentials not configured')
    }
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${API_CONFIG.SPOTIFY_CLIENT_ID}:${API_CONFIG.SPOTIFY_CLIENT_SECRET}`)}`
      },
      body: 'grant_type=client_credentials'
    })
    
    if (!response.ok) {
      throw new Error('Failed to get Spotify access token')
    }
    
    const data = await response.json()
    return data.access_token
  },
  
  async searchTrack(query, accessToken) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Spotify search failed')
    }
    
    return await response.json()
  },
  
  async getTrackAnalytics(trackId, accessToken) {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to get track analytics')
    }
    
    return await response.json()
  },
  
  // Mock data for development when API keys aren't available
  async getMockTrackData(trackName) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      id: `mock_${Date.now()}`,
      name: trackName,
      artists: [{ name: 'Sample Artist' }],
      popularity: Math.floor(Math.random() * 100),
      external_urls: { spotify: '#' },
      preview_url: null,
      analytics: {
        streams: Math.floor(Math.random() * 1000000),
        monthly_listeners: Math.floor(Math.random() * 100000),
        playlist_adds: Math.floor(Math.random() * 10000),
      }
    }
  },
}

// Performance Analytics API
export const analyticsAPI = {
  async getTrackPerformance(trackId, timeRange = '30d') {
    return apiRequest(`/analytics/tracks/${trackId}?range=${timeRange}`)
  },
  
  async getSampleUsageStats(sampleId) {
    return apiRequest(`/analytics/samples/${sampleId}/usage`)
  },
  
  async getTrendingData(genre = 'all', timeRange = '7d') {
    return apiRequest(`/analytics/trends?genre=${genre}&range=${timeRange}`)
  },
  
  // Mock analytics data for development
  async getMockPerformanceData(trackId) {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const days = 30
    const data = []
    
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      data.push({
        date: date.toISOString().split('T')[0],
        streams: Math.floor(Math.random() * 10000) + 1000,
        likes: Math.floor(Math.random() * 500) + 50,
        shares: Math.floor(Math.random() * 100) + 10,
        playlist_adds: Math.floor(Math.random() * 50) + 5,
      })
    }
    
    return {
      trackId,
      timeRange: '30d',
      data,
      summary: {
        total_streams: data.reduce((sum, day) => sum + day.streams, 0),
        total_likes: data.reduce((sum, day) => sum + day.likes, 0),
        total_shares: data.reduce((sum, day) => sum + day.shares, 0),
        avg_daily_streams: Math.floor(data.reduce((sum, day) => sum + day.streams, 0) / data.length),
      }
    }
  },
}

// Trend Forecasting API
export const trendAPI = {
  async getTrendForecast(genre = 'all', timeframe = '3m') {
    return apiRequest(`/trends/forecast?genre=${genre}&timeframe=${timeframe}`)
  },
  
  async getPopularSamples(genre = 'all', limit = 20) {
    return apiRequest(`/trends/samples/popular?genre=${genre}&limit=${limit}`)
  },
  
  async getEmergingArtists(genre = 'all', limit = 10) {
    return apiRequest(`/trends/artists/emerging?genre=${genre}&limit=${limit}`)
  },
  
  // Mock trend data for development
  async getMockTrendData() {
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    return {
      forecast: {
        trending_genres: [
          { name: 'Lo-Fi Hip Hop', growth: 45, confidence: 0.87 },
          { name: 'UK Drill', growth: 38, confidence: 0.82 },
          { name: 'Afrobeats', growth: 52, confidence: 0.91 },
          { name: 'Hyperpop', growth: 29, confidence: 0.74 },
        ],
        popular_samples: [
          { 
            name: 'Amen Break', 
            artist: 'The Winstons', 
            usage_growth: 23,
            estimated_clearance_cost: '$2,500 - $8,000'
          },
          { 
            name: 'Funky Drummer', 
            artist: 'James Brown', 
            usage_growth: 18,
            estimated_clearance_cost: '$5,000 - $15,000'
          },
          { 
            name: 'Apache', 
            artist: 'Incredible Bongo Band', 
            usage_growth: 31,
            estimated_clearance_cost: '$3,000 - $10,000'
          },
        ],
        emerging_artists: [
          { name: 'Lofi Girl', genre: 'Lo-Fi Hip Hop', monthly_growth: 15 },
          { name: 'Central Cee', genre: 'UK Drill', monthly_growth: 22 },
          { name: 'Burna Boy', genre: 'Afrobeats', monthly_growth: 18 },
        ]
      },
      updated_at: new Date().toISOString(),
    }
  },
}

export default {
  userAPI,
  clearanceAPI,
  sampleAPI,
  aiAPI,
  musicPlatformAPI,
  analyticsAPI,
  trendAPI,
}
