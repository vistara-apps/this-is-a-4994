/**
 * Enhanced AI Assistant Component for SampleSecure Pro
 * Integrates with real API services and provides advanced functionality
 */

import React, { useState, useEffect, useRef } from 'react'
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  Sparkles, 
  DollarSign, 
  FileText, 
  TrendingUp,
  Search,
  Lightbulb,
  AlertCircle
} from 'lucide-react'
import { aiAPI } from '../services/api'

function EnhancedAIAssistant({ user }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: `👋 **Welcome to your AI Licensing Assistant!**

I'm here to help you navigate the complex world of sample clearance and music licensing. As a **${user?.subscriptionTier || 'Free'}** member, I can assist you with:

🎯 **Smart Fee Analysis** - Get data-driven pricing insights
🤝 **Negotiation Strategy** - Tactical advice for better deals  
📋 **Contract Intelligence** - Decode complex licensing terms
📊 **Market Research** - Industry trends and comparable deals
💡 **Creative Solutions** - Alternative approaches to clearances

**Quick Start Options:**
• Ask about licensing fees for specific samples
• Get negotiation tips for your current deals
• Review contract terms and red flags
• Explore trending samples in your genre

What would you like to explore first?`,
      timestamp: new Date(),
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const generateAIResponse = async (userMessage) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Prepare context for the AI
      const context = {
        userSubscription: user?.subscriptionTier || 'Free',
        currentView: 'ai-assistant',
        timestamp: new Date().toISOString(),
        userProfile: {
          genres: user?.profile?.genres || [],
          location: user?.profile?.location || '',
        }
      }
      
      // Prepare messages array for the AI
      const messagesForAI = messages
        .filter(msg => msg.type !== 'system') // Exclude system messages
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      
      // Add the current user message
      messagesForAI.push({
        role: 'user',
        content: userMessage
      })
      
      // Get AI response
      const response = await aiAPI.getChatResponse(messagesForAI, context)
      
      return response.message
    } catch (error) {
      console.error('AI response failed:', error)
      setError('Failed to get AI response. Please try again.')
      
      // Fallback response
      return `I apologize, but I'm having trouble processing your request right now. Here are some things I can help you with:

🎵 **Licensing Fee Analysis** - Get market rates for your samples
📋 **Contract Review** - Understand terms and negotiate better deals  
📊 **Market Insights** - Track performance and trends
🤝 **Negotiation Strategy** - Tips for successful clearance

Please try rephrasing your question, and I'll do my best to help!`
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    try {
      const aiResponse = await generateAIResponse(inputMessage.trim())
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      setError('Failed to send message. Please try again.')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    {
      icon: DollarSign,
      label: 'Analyze Licensing Fees',
      prompt: 'What are typical licensing fees for funk/soul samples in hip-hop tracks?',
      color: 'text-green-400'
    },
    {
      icon: FileText,
      label: 'Review Contract Terms',
      prompt: 'What are the most important terms to negotiate in a sample clearance contract?',
      color: 'text-blue-400'
    },
    {
      icon: TrendingUp,
      label: 'Market Trends',
      prompt: 'What are the current trending sample genres and their typical clearance costs?',
      color: 'text-purple-400'
    },
    {
      icon: Search,
      label: 'Sample Discovery',
      prompt: 'Help me find popular samples that are easier and cheaper to clear.',
      color: 'text-orange-400'
    },
    {
      icon: Lightbulb,
      label: 'Negotiation Tips',
      prompt: 'Give me strategies for negotiating better licensing deals with publishers.',
      color: 'text-yellow-400'
    }
  ]

  const handleQuickAction = (prompt) => {
    setInputMessage(prompt)
  }

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-bg via-surface to-bg">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-primary/20 bg-surface/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-textPrimary">AI Licensing Assistant</h1>
            <p className="text-sm text-textSecondary">
              Powered by advanced AI • {user?.subscriptionTier || 'Free'} Plan
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-accent text-white ml-12'
                  : 'bg-surface/80 backdrop-blur-sm border border-primary/20 text-textPrimary mr-12'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-accent">AI Assistant</span>
                </div>
              )}
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
              <div className="mt-2 text-xs opacity-60">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3xl rounded-lg p-4 bg-surface/80 backdrop-blur-sm border border-primary/20 mr-12">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-accent">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span className="text-textSecondary">Analyzing your request...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex justify-center">
            <div className="max-w-md rounded-lg p-4 bg-red-500/20 border border-red-500/30 text-red-400">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 p-6 border-t border-primary/20 bg-surface/30 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-textSecondary mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="flex items-center space-x-3 p-3 bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50 rounded-lg transition-colors text-left"
                >
                  <Icon className={`w-4 h-4 ${action.color}`} />
                  <span className="text-sm text-textPrimary font-medium">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 p-6 border-t border-primary/20 bg-surface/50 backdrop-blur-sm">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about licensing fees, negotiation strategies, contract terms..."
              className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none resize-none transition-colors"
              rows="2"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Send</span>
          </button>
        </div>
        
        {error && (
          <button
            onClick={() => setError(null)}
            className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Dismiss error
          </button>
        )}
      </div>
    </div>
  )
}

export default EnhancedAIAssistant
