import React, { useState } from 'react'
import { 
  Plus, 
  Upload, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  User,
  Calendar,
  DollarSign
} from 'lucide-react'
import RequestForm from './RequestForm'
import DataTable from './DataTable'

function ClearanceWorkflow({ user }) {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [clearanceRequests, setClearanceRequests] = useState([
    {
      requestId: 1,
      sampleInfo: {
        originalArtist: 'James Brown',
        originalTrack: 'Funky Drummer',
        snippet: 'drum_break_8_bars.wav'
      },
      rightsHolderInfo: {
        name: 'Universal Music Group',
        contact: 'licensing@umg.com'
      },
      status: 'pending',
      submissionDate: '2024-01-15',
      lastUpdate: '2024-01-18',
      trackInfo: {
        title: 'Night Drive',
        artist: 'Producer Mike'
      }
    },
    {
      requestId: 2,
      sampleInfo: {
        originalArtist: 'Amen Break',
        originalTrack: 'Amen, My Brother',
        snippet: 'amen_break_loop.wav'
      },
      rightsHolderInfo: {
        name: 'Winston Records',
        contact: 'rights@winston.com'
      },
      status: 'approved',
      submissionDate: '2024-01-10',
      lastUpdate: '2024-01-16',
      trackInfo: {
        title: 'Breakbeat Symphony',
        artist: 'Beat Master'
      }
    },
    {
      requestId: 3,
      sampleInfo: {
        originalArtist: 'Chic',
        originalTrack: 'Good Times',
        snippet: 'bassline_4_bars.wav'
      },
      rightsHolderInfo: {
        name: 'Warner Music',
        contact: 'clearance@warner.com'
      },
      status: 'negotiating',
      submissionDate: '2024-01-12',
      lastUpdate: '2024-01-17',
      trackInfo: {
        title: 'Disco Revival',
        artist: 'Funk Squad'
      }
    }
  ])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'negotiating':
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      approved: 'bg-green-500/20 text-green-400',
      negotiating: 'bg-blue-500/20 text-blue-400',
      rejected: 'bg-red-500/20 text-red-400'
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const handleNewRequest = (requestData) => {
    const newRequest = {
      requestId: clearanceRequests.length + 1,
      ...requestData,
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0]
    }
    setClearanceRequests([...clearanceRequests, newRequest])
    setShowRequestForm(false)
  }

  if (showRequestForm) {
    return (
      <RequestForm 
        onSubmit={handleNewRequest}
        onCancel={() => setShowRequestForm(false)}
      />
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-textPrimary mb-2">Sample Clearance</h1>
          <p className="text-textSecondary">
            Manage your sample clearance requests and track their progress
          </p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-textPrimary mb-1">
            {clearanceRequests.filter(r => r.status === 'pending').length}
          </p>
          <p className="text-sm text-textSecondary">Pending Requests</p>
        </div>

        <div className="bg-surface rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-textPrimary mb-1">
            {clearanceRequests.filter(r => r.status === 'approved').length}
          </p>
          <p className="text-sm text-textSecondary">Approved</p>
        </div>

        <div className="bg-surface rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-textPrimary mb-1">
            {clearanceRequests.filter(r => r.status === 'negotiating').length}
          </p>
          <p className="text-sm text-textSecondary">In Negotiation</p>
        </div>

        <div className="bg-surface rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-2xl font-bold text-textPrimary mb-1">{clearanceRequests.length}</p>
          <p className="text-sm text-textSecondary">Total Requests</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-surface rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-primary/20">
          <h2 className="text-xl font-semibold text-textPrimary">Your Clearance Requests</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Sample Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Your Track
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Rights Holder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/20">
              {clearanceRequests.map((request) => (
                <tr key={request.requestId} className="hover:bg-primary/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-textPrimary">
                        {request.sampleInfo.originalArtist}
                      </p>
                      <p className="text-sm text-textSecondary">
                        "{request.sampleInfo.originalTrack}"
                      </p>
                      <p className="text-xs text-textSecondary mt-1">
                        {request.sampleInfo.snippet}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-textPrimary">
                        "{request.trackInfo.title}"
                      </p>
                      <p className="text-sm text-textSecondary">
                        by {request.trackInfo.artist}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-textPrimary">
                        {request.rightsHolderInfo.name}
                      </p>
                      <p className="text-sm text-textSecondary">
                        {request.rightsHolderInfo.contact}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      {getStatusBadge(request.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {request.lastUpdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-accent hover:text-accent/80 mr-3">
                      View Details
                    </button>
                    {request.status === 'negotiating' && (
                      <button className="text-purple-400 hover:text-purple-300">
                        AI Assist
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClearanceWorkflow