import React from 'react'
import { 
  Home, 
  FileText, 
  TrendingUp, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Music,
  Crown
} from 'lucide-react'

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'clearance', name: 'Sample Clearance', icon: FileText },
  { id: 'performance', name: 'Performance Tracker', icon: BarChart3 },
  { id: 'trends', name: 'Trend Forecaster', icon: TrendingUp },
  { id: 'ai-assistant', name: 'AI Assistant', icon: MessageSquare },
]

function AppShell({ children, activeView, onViewChange, user }) {
  return (
    <div className="flex h-screen bg-bg">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-primary/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-primary/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-purple-500 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-textPrimary">SampleSecure Pro</h1>
              <p className="text-xs text-textSecondary">Clear samples, optimize licensing</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      activeView === item.id
                        ? 'bg-accent text-white'
                        : 'text-textSecondary hover:text-textPrimary hover:bg-primary/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-textPrimary">{user.email}</p>
              <div className="flex items-center space-x-1">
                <Crown className="w-3 h-3 text-accent" />
                <span className="text-xs text-textSecondary">{user.subscriptionTier}</span>
              </div>
            </div>
            <Settings className="w-4 h-4 text-textSecondary hover:text-textPrimary cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell