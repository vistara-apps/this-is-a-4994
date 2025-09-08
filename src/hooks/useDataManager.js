/**
 * Data Management Hook for SampleSecure Pro
 * Provides centralized state management and API integration
 */

import { useState, useEffect, useCallback, useContext, createContext } from 'react'
import apiService from '../services/api'

// Create Data Context
const DataContext = createContext()

// Data Provider Component
export function DataProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    clearanceRequests: [],
    samples: [],
    tracks: [],
    analytics: {},
    trends: {},
    loading: {
      user: false,
      clearance: false,
      samples: false,
      tracks: false,
      analytics: false,
      trends: false,
    },
    errors: {},
  })

  // Generic loading state manager
  const setLoading = useCallback((key, isLoading) => {
    setState(prev => ({
      ...prev,
      loading: {
        ...prev.loading,
        [key]: isLoading,
      },
    }))
  }, [])

  // Generic error state manager
  const setError = useCallback((key, error) => {
    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [key]: error,
      },
    }))
  }, [])

  // User Management
  const loadUser = useCallback(async () => {
    setLoading('user', true)
    setError('user', null)
    
    try {
      // For development, use mock user data
      const mockUser = {
        userId: 1,
        email: 'producer@example.com',
        subscriptionTier: 'Pro',
        createdAt: new Date().toISOString(),
        profile: {
          name: 'Music Producer',
          avatar: null,
          genres: ['Hip Hop', 'R&B', 'Electronic'],
          location: 'Los Angeles, CA',
        },
        preferences: {
          notifications: true,
          autoSave: true,
          theme: 'dark',
        },
      }
      
      setState(prev => ({ ...prev, user: mockUser }))
    } catch (error) {
      setError('user', error.message)
      console.error('Failed to load user:', error)
    } finally {
      setLoading('user', false)
    }
  }, [setLoading, setError])

  // Clearance Request Management
  const loadClearanceRequests = useCallback(async (userId) => {
    if (!userId) return
    
    setLoading('clearance', true)
    setError('clearance', null)
    
    try {
      // Mock clearance requests for development
      const mockRequests = [
        {
          requestId: 'req_001',
          userId,
          sampleInfo: {
            originalArtist: 'James Brown',
            originalTrack: 'Funky Drummer',
            sampleStart: '2:15',
            sampleEnd: '2:30',
            genre: 'Funk',
            releaseYear: 1970,
          },
          rightsHolderInfo: {
            publisher: 'Universal Music Group',
            contact: 'licensing@umg.com',
            territory: 'Worldwide',
          },
          trackInfo: {
            trackName: 'Night Drive',
            artistName: 'Producer Mike',
            genre: 'Hip Hop',
            releaseDate: '2024-12-01',
          },
          status: 'pending',
          submissionDate: '2024-09-01T10:00:00Z',
          lastUpdate: '2024-09-05T14:30:00Z',
          estimatedCost: '$5,000 - $15,000',
          notes: 'Initial submission sent to publisher',
        },
        {
          requestId: 'req_002',
          userId,
          sampleInfo: {
            originalArtist: 'The Winstons',
            originalTrack: 'Amen Break',
            sampleStart: '1:26',
            sampleEnd: '1:32',
            genre: 'Funk',
            releaseYear: 1969,
          },
          rightsHolderInfo: {
            publisher: 'Color-Red Music',
            contact: 'rights@colorred.com',
            territory: 'North America',
          },
          trackInfo: {
            trackName: 'Urban Jungle',
            artistName: 'Beat Maker',
            genre: 'Drum & Bass',
            releaseDate: '2024-10-15',
          },
          status: 'approved',
          submissionDate: '2024-08-15T09:00:00Z',
          lastUpdate: '2024-08-28T16:45:00Z',
          estimatedCost: '$2,500',
          finalCost: '$2,200',
          notes: 'Clearance approved with 5% royalty rate',
        },
        {
          requestId: 'req_003',
          userId,
          sampleInfo: {
            originalArtist: 'Incredible Bongo Band',
            originalTrack: 'Apache',
            sampleStart: '0:45',
            sampleEnd: '1:15',
            genre: 'Latin',
            releaseYear: 1973,
          },
          rightsHolderInfo: {
            publisher: 'Pride Music Group',
            contact: 'clearance@pride.com',
            territory: 'Worldwide',
          },
          trackInfo: {
            trackName: 'Desert Storm',
            artistName: 'Hip Hop Collective',
            genre: 'Hip Hop',
            releaseDate: '2024-11-20',
          },
          status: 'negotiating',
          submissionDate: '2024-08-20T11:30:00Z',
          lastUpdate: '2024-09-07T10:15:00Z',
          estimatedCost: '$8,000 - $12,000',
          notes: 'Counter-offer submitted, awaiting response',
        },
      ]
      
      setState(prev => ({ ...prev, clearanceRequests: mockRequests }))
    } catch (error) {
      setError('clearance', error.message)
      console.error('Failed to load clearance requests:', error)
    } finally {
      setLoading('clearance', false)
    }
  }, [setLoading, setError])

  // Create new clearance request
  const createClearanceRequest = useCallback(async (requestData) => {
    setLoading('clearance', true)
    setError('clearance', null)
    
    try {
      const newRequest = {
        requestId: `req_${Date.now()}`,
        userId: requestData.userId,
        ...requestData,
        status: 'pending',
        submissionDate: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        estimatedCost: 'Calculating...',
        notes: 'Request submitted successfully',
      }
      
      setState(prev => ({
        ...prev,
        clearanceRequests: [newRequest, ...prev.clearanceRequests],
      }))
      
      return newRequest
    } catch (error) {
      setError('clearance', error.message)
      throw error
    } finally {
      setLoading('clearance', false)
    }
  }, [setLoading, setError])

  // Sample Management
  const searchSamples = useCallback(async (query) => {
    setLoading('samples', true)
    setError('samples', null)
    
    try {
      // Mock sample search results
      const mockSamples = [
        {
          sampleId: 'smp_001',
          originalArtist: 'James Brown',
          originalTrack: 'Funky Drummer',
          genre: 'Funk',
          releaseYear: 1970,
          duration: '0:15',
          bpm: 126,
          key: 'Bb',
          usageRights: 'Clearance Required',
          popularityScore: 95,
          estimatedClearanceCost: '$5,000 - $15,000',
          recentUsage: [
            { artist: 'Public Enemy', track: 'Fight the Power' },
            { artist: 'LL Cool J', track: 'Mama Said Knock You Out' },
          ],
        },
        {
          sampleId: 'smp_002',
          originalArtist: 'The Winstons',
          originalTrack: 'Amen Break',
          genre: 'Funk',
          releaseYear: 1969,
          duration: '0:06',
          bpm: 136,
          key: 'G',
          usageRights: 'Clearance Required',
          popularityScore: 98,
          estimatedClearanceCost: '$2,500 - $8,000',
          recentUsage: [
            { artist: 'Squarepusher', track: 'Come On My Selector' },
            { artist: 'Goldie', track: 'Inner City Life' },
          ],
        },
      ].filter(sample => 
        sample.originalArtist.toLowerCase().includes(query.toLowerCase()) ||
        sample.originalTrack.toLowerCase().includes(query.toLowerCase()) ||
        sample.genre.toLowerCase().includes(query.toLowerCase())
      )
      
      setState(prev => ({ ...prev, samples: mockSamples }))
      return mockSamples
    } catch (error) {
      setError('samples', error.message)
      throw error
    } finally {
      setLoading('samples', false)
    }
  }, [setLoading, setError])

  // Track Performance Analytics
  const loadTrackAnalytics = useCallback(async (trackId) => {
    setLoading('analytics', true)
    setError('analytics', null)
    
    try {
      const analyticsData = await apiService.analyticsAPI.getMockPerformanceData(trackId)
      
      setState(prev => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          [trackId]: analyticsData,
        },
      }))
      
      return analyticsData
    } catch (error) {
      setError('analytics', error.message)
      throw error
    } finally {
      setLoading('analytics', false)
    }
  }, [setLoading, setError])

  // Trend Data Management
  const loadTrendData = useCallback(async () => {
    setLoading('trends', true)
    setError('trends', null)
    
    try {
      const trendData = await apiService.trendAPI.getMockTrendData()
      
      setState(prev => ({
        ...prev,
        trends: trendData,
      }))
      
      return trendData
    } catch (error) {
      setError('trends', error.message)
      throw error
    } finally {
      setLoading('trends', false)
    }
  }, [setLoading, setError])

  // Initialize data on mount
  useEffect(() => {
    loadUser()
  }, [loadUser])

  // Load clearance requests when user is available
  useEffect(() => {
    if (state.user?.userId) {
      loadClearanceRequests(state.user.userId)
    }
  }, [state.user?.userId, loadClearanceRequests])

  const contextValue = {
    ...state,
    actions: {
      loadUser,
      loadClearanceRequests,
      createClearanceRequest,
      searchSamples,
      loadTrackAnalytics,
      loadTrendData,
      setLoading,
      setError,
    },
  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}

// Custom hook to use data context
export function useDataManager() {
  const context = useContext(DataContext)
  
  if (!context) {
    throw new Error('useDataManager must be used within a DataProvider')
  }
  
  return context
}

// Individual hooks for specific data types
export function useUser() {
  const { user, loading, errors, actions } = useDataManager()
  
  return {
    user,
    loading: loading.user,
    error: errors.user,
    loadUser: actions.loadUser,
  }
}

export function useClearanceRequests() {
  const { clearanceRequests, loading, errors, actions } = useDataManager()
  
  return {
    requests: clearanceRequests,
    loading: loading.clearance,
    error: errors.clearance,
    loadRequests: actions.loadClearanceRequests,
    createRequest: actions.createClearanceRequest,
  }
}

export function useSamples() {
  const { samples, loading, errors, actions } = useDataManager()
  
  return {
    samples,
    loading: loading.samples,
    error: errors.samples,
    searchSamples: actions.searchSamples,
  }
}

export function useAnalytics() {
  const { analytics, loading, errors, actions } = useDataManager()
  
  return {
    analytics,
    loading: loading.analytics,
    error: errors.analytics,
    loadTrackAnalytics: actions.loadTrackAnalytics,
  }
}

export function useTrends() {
  const { trends, loading, errors, actions } = useDataManager()
  
  return {
    trends,
    loading: loading.trends,
    error: errors.trends,
    loadTrendData: actions.loadTrendData,
  }
}

export default useDataManager
