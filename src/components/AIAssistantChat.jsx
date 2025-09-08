import React from 'react'

function AIAssistantChat({ variant = 'negotiation' }) {
  // This component can be used for different chat variants
  // For now, it's integrated into the main AIAssistant component
  return (
    <div className="bg-surface rounded-lg p-4">
      <p className="text-textSecondary">AI Chat Component - {variant}</p>
    </div>
  )
}

export default AIAssistantChat