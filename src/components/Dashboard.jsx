import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Users,
  Play
} from 'lucide-react'
import DashboardWidget from './DashboardWidget'

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalSavings: 0,
    activeStreams: 0,
    trendsFollowed: 0
  })

  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setStats({
        totalRequests: 24,
        pendingRequests: 8,
        completedRequests: 16,
        totalSavings: 12500,
        activeStreams: 156789,
        trendsFollowed: 12
      })

      setRecentActivity([
        {
          id: 1,
          type: 'clearance',
          title: 'Sample clearance approved for "Night Drive"',
          time: '2 hours ago',
          status: 'success'
        },
        {
          id: 2,
          type: 'negotiation',
          title: 'AI suggested counter-offer for Jazz sample',
          time: '4 hours ago',
          status: 'info'
        },
        {
          id: 3,
          type: 'performance',
          title: 'Track "Midnight Groove" reached 50K streams',
          time: '1 day ago',
          status: 'success'
        },
        {
          id: 4,
          type: 'trend',
          title: 'New trend detected: Lo-fi Hip Hop samples',
          time: '2 days ago',
          status: 'info'
        }
      ])
    }, 1000)
  }, [])

  const quickActions = [
    {
      title: 'New Clearance Request',
      description: 'Submit a new sample clearance request',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      action: () => console.log('New clearance request')
    },
    {
      title: 'Check Performance',
      description: 'View your tracks performance analytics',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      action: () => console.log('Check performance')
    },
    {
      title: 'AI Negotiation Help',
      description: 'Get AI assistance with licensing fees',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      action: () => console.log('AI help')
    }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-textPrimary mb-2">
          Welcome back, {user.email.split('@')[0]}
        </h1>
        <p className="text-textSecondary">
          Here's your sample clearance and music analytics overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardWidget
          variant="stats"
          title="Total Requests"
          value={stats.totalRequests}
          icon={FileText}
          trend="+12%"
          trendDirection="up"
        />
        <DashboardWidget
          variant="stats"
          title="Pending Clearances"
          value={stats.pendingRequests}
          icon={Clock}
          trend="-8%"
          trendDirection="down"
        />
        <DashboardWidget
          variant="stats"
          title="Completed"
          value={stats.completedRequests}
          icon={CheckCircle}
          trend="+25%"
          trendDirection="up"
        />
        <DashboardWidget
          variant="stats"
          title="Total Savings"
          value={`$${stats.totalSavings.toLocaleString()}`}
          icon={DollarSign}
          trend="+18%"
          trendDirection="up"
        />
        <DashboardWidget
          variant="stats"
          title="Active Streams"
          value={stats.activeStreams.toLocaleString()}
          icon={Play}
          trend="+32%"
          trendDirection="up"
        />
        <DashboardWidget
          variant="stats"
          title="Trends Followed"
          value={stats.trendsFollowed}
          icon={TrendingUp}
          trend="+5%"
          trendDirection="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-textPrimary">{action.title}</h3>
                    <p className="text-sm text-textSecondary">{action.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-primary/10">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-textPrimary">{activity.title}</p>
                  <p className="text-xs text-textSecondary">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard