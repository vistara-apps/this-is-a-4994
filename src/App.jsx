import React, { useState } from 'react'
import { AuthProvider, useAuth, AuthScreen, AuthLoadingScreen } from './components/AuthSystem'
import { DataProvider } from './hooks/useDataManager'
import AppShell from './components/AppShell'
import Dashboard from './components/Dashboard'
import ClearanceWorkflow from './components/ClearanceWorkflow'
import PerformanceTracker from './components/PerformanceTracker'
import TrendForecaster from './components/TrendForecaster'
import EnhancedAIAssistant from './components/EnhancedAIAssistant'

// Main App Content Component
function AppContent() {
  const [activeView, setActiveView] = useState('dashboard')
  const { user, isAuthenticated, isLoading } = useAuth()

  // Show loading screen while checking authentication
  if (isLoading) {
    return <AuthLoadingScreen />
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen />
  }

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
        return <EnhancedAIAssistant user={user} />
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

// Root App Component with Providers
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  )
}

export default App
