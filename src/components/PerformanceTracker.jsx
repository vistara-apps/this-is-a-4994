import React, { useState, useEffect } from 'react'
import { 
  Play, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2, 
  Music,
  Calendar,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

function PerformanceTracker({ user }) {
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [tracks, setTracks] = useState([])
  const [performanceData, setPerformanceData] = useState([])

  useEffect(() => {
    // Simulate loading track data
    setTimeout(() => {
      const mockTracks = [
        {
          trackId: 1,
          trackName: 'Night Drive',
          sampleUsedId: 'james_brown_funky_drummer',
          sampleInfo: {
            artist: 'James Brown',
            track: 'Funky Drummer'
          },
          totalStreams: 156789,
          totalLikes: 12543,
          totalShares: 2156,
          platforms: {
            spotify: 89234,
            appleMusic: 34567,
            youtube: 23456,
            soundcloud: 9532
          },
          recentGrowth: '+23%'
        },
        {
          trackId: 2,
          trackName: 'Breakbeat Symphony',
          sampleUsedId: 'amen_break',
          sampleInfo: {
            artist: 'The Winstons',
            track: 'Amen, My Brother'
          },
          totalStreams: 234156,
          totalLikes: 18765,
          totalShares: 3421,
          platforms: {
            spotify: 145234,
            appleMusic: 45678,
            youtube: 32145,
            soundcloud: 11099
          },
          recentGrowth: '+18%'
        },
        {
          trackId: 3,
          trackName: 'Disco Revival',
          sampleUsedId: 'chic_good_times',
          sampleInfo: {
            artist: 'Chic',
            track: 'Good Times'
          },
          totalStreams: 98234,
          totalLikes: 7654,
          totalShares: 1234,
          platforms: {
            spotify: 56789,
            appleMusic: 23456,
            youtube: 12345,
            soundcloud: 5644
          },
          recentGrowth: '+12%'
        }
      ]
      setTracks(mockTracks)
      setSelectedTrack(mockTracks[0])
    }, 1000)
  }, [])

  useEffect(() => {
    if (selectedTrack) {
      // Generate mock performance data for the selected track
      const data = []
      const now = new Date()
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
      
      for (let i = days; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
        data.push({
          date: date.toISOString().split('T')[0],
          streams: Math.floor(Math.random() * 5000) + 2000,
          likes: Math.floor(Math.random() * 500) + 100,
          shares: Math.floor(Math.random() * 100) + 20
        })
      }
      setPerformanceData(data)
    }
  }, [selectedTrack, timeRange])

  const platformColors = {
    spotify: '#1DB954',
    appleMusic: '#FA243C',
    youtube: '#FF0000',
    soundcloud: '#FF8C00'
  }

  const getPlatformData = () => {
    if (!selectedTrack) return []
    
    return Object.entries(selectedTrack.platforms).map(([platform, streams]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      streams,
      color: platformColors[platform]
    }))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-textPrimary mb-2">Performance Tracker</h1>
        <p className="text-textSecondary">
          Real-time analytics on how your tracks with samples are performing across platforms
        </p>
      </div>

      {/* Track Selection */}
      <div className="bg-surface rounded-xl p-6 shadow-card mb-8">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Your Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <button
              key={track.trackId}
              onClick={() => setSelectedTrack(track)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedTrack?.trackId === track.trackId
                  ? 'border-accent bg-accent/10'
                  : 'border-primary/30 hover:border-primary/50 bg-primary/10'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-textPrimary">{track.trackName}</h3>
                  <p className="text-sm text-textSecondary">
                    Samples: {track.sampleInfo.artist}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-textSecondary">{track.totalStreams.toLocaleString()} streams</span>
                <span className="text-green-400">{track.recentGrowth}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedTrack && (
        <>
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-green-400 text-sm">{selectedTrack.recentGrowth}</span>
              </div>
              <p className="text-2xl font-bold text-textPrimary mb-1">
                {selectedTrack.totalStreams.toLocaleString()}
              </p>
              <p className="text-sm text-textSecondary">Total Streams</p>
            </div>

            <div className="bg-surface rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-textPrimary mb-1">
                {selectedTrack.totalLikes.toLocaleString()}
              </p>
              <p className="text-sm text-textSecondary">Total Likes</p>
            </div>

            <div className="bg-surface rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-textPrimary mb-1">
                {selectedTrack.totalShares.toLocaleString()}
              </p>
              <p className="text-sm text-textSecondary">Total Shares</p>
            </div>

            <div className="bg-surface rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-textPrimary mb-1">
                {Math.round((selectedTrack.totalLikes / selectedTrack.totalStreams) * 100)}%
              </p>
              <p className="text-sm text-textSecondary">Engagement Rate</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Streams Over Time */}
            <div className="bg-surface rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-textPrimary">Streams Over Time</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 bg-primary/20 border border-primary/30 rounded text-textPrimary text-sm focus:border-accent focus:outline-none"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 20%)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(215 20% 70%)"
                    tick={{ fill: 'hsl(215 20% 70%)', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(215 20% 70%)"
                    tick={{ fill: 'hsl(215 20% 70%)', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(214 20% 12%)',
                      border: '1px solid hsl(220 10% 28%)',
                      borderRadius: '8px',
                      color: 'hsl(0 0% 98%)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="streams" 
                    stroke="hsl(217 100% 50%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(217 100% 50%)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Platform Distribution */}
            <div className="bg-surface rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-semibold text-textPrimary mb-6">Platform Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getPlatformData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 20%)" />
                  <XAxis 
                    dataKey="platform"
                    stroke="hsl(215 20% 70%)"
                    tick={{ fill: 'hsl(215 20% 70%)', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(215 20% 70%)"
                    tick={{ fill: 'hsl(215 20% 70%)', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(214 20% 12%)',
                      border: '1px solid hsl(220 10% 28%)',
                      borderRadius: '8px',
                      color: 'hsl(0 0% 98%)'
                    }}
                  />
                  <Bar 
                    dataKey="streams" 
                    fill="hsl(217 100% 50%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sample Impact Analysis */}
          <div className="bg-surface rounded-xl p-6 shadow-card">
            <h3 className="text-lg font-semibold text-textPrimary mb-6">Sample Impact Analysis</h3>
            <div className="bg-primary/10 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <Music className="w-5 h-5 text-accent" />
                <span className="font-medium text-textPrimary">
                  Sample: "{selectedTrack.sampleInfo.track}" by {selectedTrack.sampleInfo.artist}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-textSecondary">Performance Impact</p>
                  <p className="text-green-400 font-medium">+34% above average</p>
                </div>
                <div>
                  <p className="text-textSecondary">Listener Retention</p>
                  <p className="text-green-400 font-medium">87% completion rate</p>
                </div>
                <div>
                  <p className="text-textSecondary">Viral Potential</p>
                  <p className="text-blue-400 font-medium">High (based on sample history)</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-textSecondary">
              <p>
                This sample has a strong performance history and is contributing significantly to your track's success. 
                The recognizable nature of the "{selectedTrack.sampleInfo.track}" break has led to higher engagement 
                rates and social media sharing.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PerformanceTracker