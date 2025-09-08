import React, { useState } from 'react'
import AppShell from './components/AppShell'
import Dashboard from './components/Dashboard'
import ClearanceWorkflow from './components/ClearanceWorkflow'
import PerformanceTracker from './components/PerformanceTracker'
import TrendForecaster from './components/TrendForecaster'
import AIAssistant from './components/AIAssistant'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [user, setUser] = useState({
    userId: 1,
    email: 'producer@example.com',
    subscriptionTier: 'Pro',
    createdAt: new Date().toISOString()
  })

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={user} />
      case 'clearance':
        return <ClearanceWorkflow user={user} />
      case 'performance':
        return <PerformanceTracker user={user} />
      case 'trends':
        return <TrendForecaster user={user} />
      case 'ai-assistant':
        return <AIAssistant user={user} />
      default:
        return <Dashboard user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
      <AppShell 
        activeView={activeView} 
        onViewChange={setActiveView}
        user={user}
      >
        {renderContent()}
      </AppShell>
    </div>
  )
}

export default App