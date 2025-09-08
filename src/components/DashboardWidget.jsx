import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

function DashboardWidget({ 
  variant = 'default',
  title,
  value,
  icon: Icon,
  trend,
  trendDirection,
  children 
}) {
  if (variant === 'stats') {
    return (
      <div className="bg-surface rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${
              trendDirection === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trendDirection === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-textPrimary mb-1">{value}</p>
          <p className="text-sm text-textSecondary">{title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card">
      {children}
    </div>
  )
}

export default DashboardWidget