"use client"

import { useState, useEffect } from "react"

const movieGenres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Documentary",
  "Fantasy",
]

// Simple UI Components
const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>{children}</div>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
)

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${className}`}
    rows="3"
    {...props}
  />
)

const Label = ({ children, className = "" }) => (
  <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>{children}</label>
)

// Icons
const User = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const Mail = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const Calendar = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
)

const Film = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v2m0 0v16l-4-2-4 2V4m8 0H8m8 0v16l-4-2-4 2V4"
    />
  </svg>
)

const Edit = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
)

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    dob: "",
    bio: "",
    favoriteGenres: [],
    watchedMovies: 0,
    favoriteMovies: 0,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState(profile)

  useEffect(() => {
    // Try to get user data from registration
    const regUser = localStorage.getItem("movieapp_user")
    let loadedProfile = null
    if (regUser) {
      const parsed = JSON.parse(regUser)
      loadedProfile = {
        name: parsed.name || "",
        email: parsed.email || "",
        dob: parsed.dob || "",
        bio: parsed.bio || "",
        favoriteGenres: parsed.genres || [],
        watchedMovies: 0,
        favoriteMovies: 0,
      }
    }
    // If edited profile exists, use it
    const savedProfile = localStorage.getItem("movieAppProfile")
    console.log("Loaded profile from localStorage:", savedProfile);
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
      setTempProfile(JSON.parse(savedProfile))
    } else if (loadedProfile) {
      setProfile(loadedProfile)
      setTempProfile(loadedProfile)
      localStorage.setItem("movieAppProfile", JSON.stringify(loadedProfile))
    }
  }, [])

  const handleSave = () => {
    setProfile(tempProfile)
    localStorage.setItem("movieAppProfile", JSON.stringify(tempProfile))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempProfile(profile)
    setIsEditing(false)
  }

  const toggleGenre = (genre) => {
    if (!isEditing) return
    setTempProfile((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }))
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                {getInitials(profile.name)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="flex items-center space-x-2 text-blue-100">
                  <Film />
                  <span>Movie Enthusiast</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 border-0"
                >
                  <Edit className="mr-2" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} variant="success" className="text-sm">
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="secondary" className="text-sm">
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{profile.watchedMovies}</div>
              <div className="text-gray-600">Movies Watched</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{profile.favoriteMovies}</div>
              <div className="text-gray-600">Favorite Movies</div>
            </Card>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User className="mr-2" />
                Profile Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={tempProfile.name}
                        onChange={(e) => setTempProfile((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <User className="text-gray-400" />
                        <span>{profile.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Mail className="text-gray-400" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={tempProfile.dob}
                      onChange={(e) => setTempProfile((prev) => ({ ...prev, dob: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <Calendar className="text-gray-400" />
                      <span>{profile.dob ? new Date(profile.dob).toLocaleDateString() : ""}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="text-gray-700">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Favorite Genres */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-4">Favorite Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movieGenres.map((genre) => {
                  const isSelected = (isEditing ? tempProfile : profile).favoriteGenres.includes(genre)
                  return (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        isSelected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } ${!isEditing && "cursor-default"}`}
                    >
                      {genre}
                    </button>
                  )
                })}
              </div>
              {isEditing && <p className="text-sm text-gray-500 mt-3">Click genres to add/remove from favorites</p>}
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Watched "Avatar 2"</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Added to favorites</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Rated "Top Gun" 5 stars</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
