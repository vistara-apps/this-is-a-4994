import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Music, 
  Calendar, 
  Star,
  Zap,
  Target,
  BarChart3,
  Eye,
  Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

function TrendForecaster({ user }) {
  const [trends, setTrends] = useState([])
  const [forecastData, setForecastData] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [timeHorizon, setTimeHorizon] = useState('3m')

  useEffect(() => {
    // Simulate loading trend data
    setTimeout(() => {
      setTrends([
        {
          id: 1,
          type: 'emerging',
          title: 'Lo-Fi Hip Hop Vinyl Crackles',
          description: 'Vintage vinyl crackle and pop samples are gaining massive popularity in lo-fi hip hop production',
          confidence: 87,
          growth: '+156%',
          timeframe: 'Next 2-3 months',
          impact: 'High',
          sources: ['Dusty vinyl records', 'Old jazz albums', 'Classic soul tracks'],
          platforms: ['TikTok', 'YouTube', 'Spotify'],
          relatedGenres: ['Lo-Fi Hip Hop', 'Chillhop', 'Study Beats']
        },
        {
          id: 2,
          type: 'rising',
          title: 'Afrobeats Percussion Loops',
          description: 'Traditional African percussion patterns are being heavily sampled in mainstream pop and hip hop',
          confidence: 92,
          growth: '+203%',
          timeframe: 'Next 1-2 months',
          impact: 'Very High',
          sources: ['Traditional African music', 'Fela Kuti records', 'Contemporary Afrobeats'],
          platforms: ['TikTok', 'Instagram Reels', 'Spotify'],
          relatedGenres: ['Afrobeats', 'Pop', 'Hip Hop']
        },
        {
          id: 3,
          type: 'declining',
          title: 'Trap 808 Slides',
          description: 'Classic trap 808 slide patterns are becoming oversaturated and losing mainstream appeal',
          confidence: 78,
          growth: '-23%',
          timeframe: 'Current trend',
          impact: 'Medium',
          sources: ['Classic trap beats', 'Southern hip hop'],
          platforms: ['SoundCloud', 'YouTube'],
          relatedGenres: ['Trap', 'Hip Hop']
        },
        {
          id: 4,
          type: 'stable',
          title: 'Break Beat Classics',
          description: 'Classic break beats maintain steady popularity, especially the Amen Break and Funky Drummer',
          confidence: 95,
          growth: '+12%',
          timeframe: 'Ongoing',
          impact: 'High',
          sources: ['Amen Break', 'Funky Drummer', 'Think Break'],
          platforms: ['All platforms'],
          relatedGenres: ['Drum & Bass', 'Hip Hop', 'Jungle']
        }
      ])

      // Generate forecast data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      const forecastData = months.map(month => ({
        month,
        lofi: Math.floor(Math.random() * 100) + 50,
        afrobeats: Math.floor(Math.random() * 100) + 70,
        breakbeats: Math.floor(Math.random() * 50) + 60,
        trap: Math.floor(Math.random() * 30) + 30
      }))
      setForecastData(forecastData)
    }, 1000)
  }, [])

  const getTrendIcon = (type) => {
    switch (type) {
      case 'emerging':
        return <Zap className="w-5 h-5 text-yellow-500" />
      case 'rising':
        return <TrendingUp className="w-5 h-5 text-green-500" />
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-red-500" />
      case 'stable':
        return <Target className="w-5 h-5 text-blue-500" />
      default:
        return <BarChart3 className="w-5 h-5 text-gray-500" />
    }
  }

  const getTrendColor = (type) => {
    switch (type) {
      case 'emerging':
        return 'border-yellow-500/30 bg-yellow-500/10'
      case 'rising':
        return 'border-green-500/30 bg-green-500/10'
      case 'declining':
        return 'border-red-500/30 bg-red-500/10'
      case 'stable':
        return 'border-blue-500/30 bg-blue-500/10'
      default:
        return 'border-gray-500/30 bg-gray-500/10'
    }
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-400'
    if (confidence >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const genreData = [
    { name: 'Hip Hop', value: 35, color: '#8B5CF6' },
    { name: 'Electronic', value: 25, color: '#06B6D4' },
    { name: 'Pop', value: 20, color: '#F59E0B' },
    { name: 'R&B', value: 12, color: '#EF4444' },
    { name: 'Other', value: 8, color: '#6B7280' }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-textPrimary mb-2">Trend Forecaster</h1>
        <p className="text-textSecondary">
          AI-powered insights into upcoming sample trends and market predictions
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-2">Genre Filter</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 bg-surface border border-primary/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none"
          >
            <option value="all">All Genres</option>
            <option value="hip-hop">Hip Hop</option>
            <option value="electronic">Electronic</option>
            <option value="pop">Pop</option>
            <option value="rb">R&B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-2">Time Horizon</label>
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value)}
            className="px-4 py-2 bg-surface border border-primary/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none"
          >
            <option value="1m">1 Month</option>
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
      </div>

      {/* Trend Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {trends.map((trend) => (
          <div key={trend.id} className={`border-2 rounded-xl p-6 shadow-card ${getTrendColor(trend.type)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getTrendIcon(trend.type)}
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary">{trend.title}</h3>
                  <span className="text-xs uppercase font-medium text-textSecondary">
                    {trend.type} trend
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getConfidenceColor(trend.confidence)}`}>
                  {trend.confidence}%
                </div>
                <div className="text-xs text-textSecondary">Confidence</div>
              </div>
            </div>

            <p className="text-textSecondary mb-4">{trend.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-textPrimary">Growth</span>
                </div>
                <p className="text-lg font-bold text-green-400">{trend.growth}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-textPrimary">Timeline</span>
                </div>
                <p className="text-sm text-textSecondary">{trend.timeframe}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-textPrimary">Key Sources:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {trend.sources.map((source, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/20 rounded text-xs text-textSecondary">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-textPrimary">Platforms:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {trend.platforms.map((platform, index) => (
                    <span key={index} className="px-2 py-1 bg-accent/20 rounded text-xs text-accent">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Trend Forecast Chart */}
        <div className="lg:col-span-2 bg-surface rounded-xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-6">Trend Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 20%)" />
              <XAxis 
                dataKey="month" 
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
              <Line type="monotone" dataKey="lofi" stroke="#FBBF24" strokeWidth={2} name="Lo-Fi" />
              <Line type="monotone" dataKey="afrobeats" stroke="#10B981" strokeWidth={2} name="Afrobeats" />
              <Line type="monotone" dataKey="breakbeats" stroke="#3B82F6" strokeWidth={2} name="Breakbeats" />
              <Line type="monotone" dataKey="trap" stroke="#EF4444" strokeWidth={2} name="Trap" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Genre Distribution */}
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-6">Genre Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(214 20% 12%)',
                  border: '1px solid hsl(220 10% 28%)',
                  borderRadius: '8px',
                  color: 'hsl(0 0% 98%)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {genreData.map((genre, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: genre.color }} />
                  <span className="text-sm text-textSecondary">{genre.name}</span>
                </div>
                <span className="text-sm font-medium text-textPrimary">{genre.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-surface rounded-xl p-6 shadow-card">
        <div className="flex items-center space-x-2 mb-4">
          <Eye className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-textPrimary">AI Insights & Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary/10 rounded-lg p-4">
            <h4 className="font-medium text-textPrimary mb-2">Hot Opportunity</h4>
            <p className="text-sm text-textSecondary mb-3">
              Afrobeats percussion samples are showing explosive growth. Consider acquiring rights to 
              classic Fela Kuti tracks or contemporary Nigerian artists for maximum impact.
            </p>
            <div className="flex items-center space-x-2 text-xs text-green-400">
              <Star className="w-3 h-3" />
              <span>High Confidence Recommendation</span>
            </div>
          </div>
          <div className="bg-primary/10 rounded-lg p-4">
            <h4 className="font-medium text-textPrimary mb-2">Market Warning</h4>
            <p className="text-sm text-textSecondary mb-3">
              Trap 808 patterns are becoming oversaturated. Consider diversifying into alternative 
              percussion styles or hybrid approaches to maintain competitive edge.
            </p>
            <div className="flex items-center space-x-2 text-xs text-yellow-400">
              <Clock className="w-3 h-3" />
              <span>Time-Sensitive Alert</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendForecaster