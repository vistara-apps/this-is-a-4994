import React, { useState } from 'react'
import { Upload, X, Music, User, Building, Mail, Calendar } from 'lucide-react'

function RequestForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    sampleInfo: {
      originalArtist: '',
      originalTrack: '',
      snippet: null
    },
    trackInfo: {
      title: '',
      artist: '',
      genre: '',
      releaseDate: ''
    },
    rightsHolderInfo: {
      name: '',
      contact: ''
    }
  })

  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleFileUpload = (files) => {
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        sampleInfo: {
          ...prev.sampleInfo,
          snippet: files[0].name
        }
      }))
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-textPrimary mb-2">New Clearance Request</h1>
          <p className="text-textSecondary">
            Submit a new sample clearance request with all required information
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-textSecondary hover:text-textPrimary rounded-lg hover:bg-primary/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sample Information */}
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <div className="flex items-center space-x-2 mb-6">
            <Music className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold text-textPrimary">Sample Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Original Artist
              </label>
              <input
                type="text"
                value={formData.sampleInfo.originalArtist}
                onChange={(e) => handleInputChange('sampleInfo', 'originalArtist', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
                placeholder="e.g., James Brown"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Original Track Title
              </label>
              <input
                type="text"
                value={formData.sampleInfo.originalTrack}
                onChange={(e) => handleInputChange('sampleInfo', 'originalTrack', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
                placeholder="e.g., Funky Drummer"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Sample Audio File
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-accent bg-accent/10' 
                  : 'border-primary/30 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-textSecondary mx-auto mb-4" />
              <p className="text-textPrimary font-medium mb-2">
                {formData.sampleInfo.snippet ? formData.sampleInfo.snippet : 'Drop your sample file here'}
              </p>
              <p className="text-textSecondary text-sm">
                or click to browse (WAV, MP3, AIFF)
              </p>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Your Track Information */}
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold text-textPrimary">Your Track Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Track Title
              </label>
              <input
                type="text"
                value={formData.trackInfo.title}
                onChange={(e) => handleInputChange('trackInfo', 'title', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
                placeholder="e.g., Night Drive"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Artist Name
              </label>
              <input
                type="text"
                value={formData.trackInfo.artist}
                onChange={(e) => handleInputChange('trackInfo', 'artist', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
                placeholder="e.g., Producer Mike"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Genre
              </label>
              <select
                value={formData.trackInfo.genre}
                onChange={(e) => handleInputChange('trackInfo', 'genre', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none transition-colors"
                required
              >
                <option value="">Select Genre</option>
                <option value="hip-hop">Hip Hop</option>
                <option value="electronic">Electronic</option>
                <option value="jazz">Jazz</option>
                <option value="funk">Funk</option>
                <option value="soul">Soul</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Planned Release Date
              </label>
              <input
                type="date"
                value={formData.trackInfo.releaseDate}
                onChange={(e) => handleInputChange('trackInfo', 'releaseDate', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Rights Holder Information */}
        <div className="bg-surface rounded-xl p-6 shadow-card">
          <div className="flex items-center space-x-2 mb-6">
            <Building className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold text-textPrimary">Rights Holder Information</h2>
            <span className="text-sm text-textSecondary">(Optional - we can help identify)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Rights Holder Name
              </label>
              <input
                type="text"
                value={formData.rightsHolderInfo.name}
                onChange={(e) => handleInputChange('rightsHolderInfo', 'name', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
                placeholder="e.g., Universal Music Group"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Contact Information
              </label>
              <input
                type="text"
                value={formData.rightsHolderInfo.contact}
                onChange={(e) => handleInputChange('rightsHolderInfo', 'contact', e.target.value)}
                className="w-full px-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
                placeholder="e.g., licensing@umg.com"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-textSecondary hover:text-textPrimary border border-primary/30 hover:border-primary/50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  )
}

export default RequestForm