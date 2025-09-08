import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  DollarSign, 
  TrendingUp,
  FileText,
  Lightbulb,
  Zap
} from 'lucide-react'
import AIAssistantChat from './AIAssistantChat'

function AIAssistant({ user }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: `Hello! I'm your AI negotiation and licensing assistant. I can help you with:

• **Licensing Fee Analysis** - Get market insights on fair pricing for samples
• **Negotiation Strategies** - Tactical advice for rights holder discussions  
• **Contract Review** - Analysis of licensing terms and conditions
• **Market Intelligence** - Comparable deals and industry benchmarks
• **Trend Insights** - How sample popularity affects pricing

What would you like help with today?`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    {
      title: 'Analyze Sample Value',
      description: 'Get AI insights on fair licensing fees',
      icon: DollarSign,
      prompt: 'I need help determining a fair licensing fee for a sample. Can you analyze the market value?'
    },
    {
      title: 'Negotiation Strategy',
      description: 'Get tactical advice for rights holder discussions',
      icon: TrendingUp,
      prompt: 'I need negotiation strategies for discussing licensing terms with a rights holder.'
    },
    {
      title: 'Contract Review',
      description: 'Review licensing terms and conditions',
      icon: FileText,
      prompt: 'Can you help me review and understand these licensing contract terms?'
    },
    {
      title: 'Market Trends',
      description: 'Understand current sample licensing trends',
      icon: Lightbulb,
      prompt: 'What are the current trends in sample licensing and how do they affect pricing?'
    }
  ]

  const generateAIResponse = async (userMessage) => {
    // Simulate AI response - in a real app, this would call an AI service
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    let response = ''
    
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('licensing fee') || lowerMessage.includes('fair price') || lowerMessage.includes('market value')) {
      response = `Based on current market analysis, here's what I found:

**Sample Licensing Fee Analysis:**

For a **funk/soul break** like "Funky Drummer":
• **Indie Release**: $500 - $2,000 upfront + 2-5% royalties
• **Major Label**: $5,000 - $25,000 upfront + 5-15% royalties
• **Commercial/Sync**: $10,000 - $100,000+ depending on usage

**Key Factors Affecting Price:**
1. **Recognition Level** - Famous breaks command premium prices
2. **Usage Type** - Lead sample vs. background element
3. **Distribution Scale** - Independent vs. major label release
4. **Territory Rights** - Worldwide vs. specific regions

**Negotiation Tips:**
• Start with a fair offer based on your projected revenue
• Propose a step-deal structure (increases with sales milestones)
• Consider offering additional promotional value (credits, marketing)

Would you like me to analyze a specific sample or help craft a negotiation strategy?`
    } else if (lowerMessage.includes('negotiation') || lowerMessage.includes('strategy')) {
      response = `Here's a proven negotiation strategy for sample clearances:

**Pre-Negotiation Preparation:**
1. **Research Comparable Deals** - Find similar samples/artists and their rates
2. **Know Your Budget** - Set maximum limits before entering discussions
3. **Understand Their Position** - Research the rights holder's typical deals

**Negotiation Tactics:**
• **Start with Relationship Building** - Acknowledge the original artist's contribution
• **Present Your Vision** - Explain how the sample fits your creative concept
• **Offer Multiple Options** - Different fee structures (upfront vs. royalty-heavy)
• **Emphasize Mutual Benefits** - New audience exposure for the original work

**Common Negotiation Points:**
1. **Upfront vs. Royalty Split** - Balance immediate payment with ongoing revenue share
2. **Territory Rights** - Negotiate specific regions if budget is limited
3. **Usage Limitations** - Define how the sample can be used (full track vs. segments)
4. **Credit Requirements** - Ensure proper attribution in all materials

**Red Flags to Avoid:**
• Never commit to rates you can't afford
• Avoid vague language in agreements
• Don't rush due to release pressure

Would you like me to help you prepare for a specific negotiation scenario?`
    } else if (lowerMessage.includes('contract') || lowerMessage.includes('terms')) {
      response = `I'll help you understand key contract terms in sample licensing agreements:

**Essential Contract Elements:**

**1. Usage Rights & Scope:**
• **Master Recording Rights** - Permission to use the actual recording
• **Publishing Rights** - Permission to use the underlying composition
• **Territory** - Where you can distribute (worldwide vs. specific countries)
• **Duration** - How long the rights last (perpetual vs. term-limited)

**2. Financial Terms:**
• **Upfront Fee** - One-time payment upon signing
• **Royalty Rate** - Percentage of revenue sharing
• **Advance vs. Royalty** - Whether upfront fee counts against future royalties
• **Minimum Guarantees** - Promised minimum payments regardless of sales

**3. Creative Control:**
• **Approval Rights** - Whether rights holder can approve final track
• **Credit Requirements** - How original artist must be credited
• **Derivative Works** - Can you create remixes or alternate versions?

**4. Important Clauses to Watch:**
• **Most Favored Nations** - Ensures equal treatment with other samples
• **Reversion Rights** - What happens if you don't use the sample
• **Indemnification** - Who's responsible if there are legal issues

**Red Flag Terms:**
⚠️ Unlimited approval rights for rights holder
⚠️ Excessive royalty rates (>20% is usually unreasonable)
⚠️ Broad rights reversion clauses

Would you like me to review specific contract language or explain any particular clause?`
    } else if (lowerMessage.includes('trend') || lowerMessage.includes('market') || lowerMessage.includes('industry')) {
      response = `Here are the current trends shaping sample licensing:

**Current Market Trends (2024):**

**1. Pricing Evolution:**
• **Upfront fees** have increased 25-40% since 2020
• **Royalty rates** are becoming more negotiable (2-15% range)
• **Micro-licensing** for short-form content (TikTok, Reels) emerging

**2. Popular Sample Categories:**
🔥 **Afrobeats percussion** - 200% increase in licensing requests
🔥 **Lo-fi vinyl textures** - Huge demand for nostalgic elements
🔥 **Classic soul/funk breaks** - Evergreen, but increasingly expensive
📉 **Trap 808s** - Market oversaturation, declining rates

**3. Platform-Specific Trends:**
• **TikTok/Social Media** - Driving demand for short, catchy loops
• **Streaming Royalties** - Focus shifting to performance-based deals
• **Sync Licensing** - Premium rates for advertising/film placement

**4. Technology Impact:**
• **AI Detection** - Making unauthorized sampling harder to hide
• **Blockchain Rights** - Emerging smart contract solutions
• **Sample ID Tools** - Faster clearance identification processes

**5. Negotiation Landscape:**
• **Artist-Friendly Terms** - More rights holders open to collaboration
• **Revenue Sharing Models** - Less upfront, more backend participation
• **Global Rights** - Simplified worldwide licensing becoming standard

**Predictions for Next 6-12 Months:**
• Continued price increases for premium samples (15-20%)
• More automated licensing platforms
• Greater focus on emerging genre samples (Amapiano, UK Drill)

What specific trend would you like me to analyze further?`
    } else {
      response = `I'm here to help with all aspects of sample licensing and negotiation! 

I can assist you with:

🎯 **Licensing Fee Analysis** - Market research and fair pricing insights
🤝 **Negotiation Strategies** - Tactical advice for rights holder discussions
📋 **Contract Review** - Understanding complex licensing terms
📊 **Market Intelligence** - Industry trends and comparable deals
💡 **Creative Solutions** - Alternative approaches to challenging clearances

Feel free to ask me specific questions about:
• Sample valuation and pricing
• Negotiation tactics and strategies  
• Contract terms and legal language
• Market trends and industry insights
• Alternative licensing approaches

What would you like to explore today?`
    }
    
    setIsLoading(false)
    return response
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    const aiResponse = await generateAIResponse(inputMessage)
    
    const assistantMessage = {
      id: messages.length + 2,
      type: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])
  }

  const handleQuickAction = (prompt) => {
    setInputMessage(prompt)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-textPrimary mb-2">AI Licensing Assistant</h1>
        <p className="text-textSecondary">
          Get expert guidance on sample licensing, negotiation strategies, and market insights
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3 bg-surface rounded-xl shadow-card flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-accent ml-3' : 'bg-purple-500 mr-3'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-accent text-white' 
                        : 'bg-primary/20 text-textPrimary'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 opacity-70 ${
                        message.type === 'user' ? 'text-white' : 'text-textSecondary'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-purple-500 mr-3 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-primary/20 rounded-lg p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-textSecondary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-textSecondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-textSecondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-primary/20">
            <div className="flex space-x-4">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about licensing fees, negotiation strategies, contract terms..."
                className="flex-1 px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none resize-none"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-textPrimary">Quick Actions</h3>
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="w-full p-4 bg-surface hover:bg-primary/20 rounded-lg border border-primary/30 hover:border-accent/50 transition-colors text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-textPrimary group-hover:text-accent transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-sm text-textSecondary mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}

          {/* AI Capabilities */}
          <div className="bg-surface rounded-lg p-4 border border-primary/30">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-textPrimary">AI Capabilities</span>
            </div>
            <ul className="text-xs text-textSecondary space-y-2">
              <li>• Real-time market analysis</li>
              <li>• Contract term explanation</li>
              <li>• Negotiation strategy development</li>
              <li>• Industry trend insights</li>
              <li>• Risk assessment guidance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant