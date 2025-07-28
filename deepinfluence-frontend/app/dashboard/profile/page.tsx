'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Passionnée par le développement personnel et l\'entrepreneuriat. Toujours en quête de nouvelles connaissances.',
    location: 'Paris, France',
    joinDate: 'Membre depuis janvier 2024'
  });

  const stats = [
    { label: 'Sessions terminées', value: '24', icon: 'ri-calendar-check-line', color: 'bg-green-500' },
    { label: 'Formations suivies', value: '8', icon: 'ri-graduation-cap-line', color: 'bg-blue-500' },
    { label: 'Heures d\'apprentissage', value: '156', icon: 'ri-time-line', color: 'bg-purple-500' },
    { label: 'Experts suivis', value: '12', icon: 'ri-user-star-line', color: 'bg-orange-500' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'session',
      title: 'Consultation avec Dr. Sarah Martin',
      description: 'Session de coaching en leadership',
      time: '2 heures',
      icon: 'ri-video-line',
      status: 'completed'
    },
    {
      id: 2,
      type: 'formation',
      title: 'Formation Marketing Digital',
      description: 'Chapitre 3: Stratégies SEO avancées',
      time: '1 jour',
      icon: 'ri-play-circle-line',
      status: 'in-progress'
    },
    {
      id: 3,
      type: 'message',
      title: 'Message à Marc Dubois',
      description: 'Question sur l\'investissement immobilier',
      time: '3 jours',
      icon: 'ri-message-2-line',
      status: 'replied'
    },
    {
      id: 4,
      type: 'video',
      title: 'Vidéo publiée',
      description: 'Mes conseils pour débuter en entrepreneuriat',
      time: '1 semaine',
      icon: 'ri-video-add-line',
      status: 'published'
    }
  ];

  const myVideos = [
    {
      id: 1,
      title: 'Mes conseils pour débuter en entrepreneuriat',
      views: '2.3k',
      likes: '156',
      duration: '02:34',
      thumbnail: 'https://readdy.ai/api/search-image?query=Young%20professional%20woman%20speaking%20confidently%20about%20entrepreneurship%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20natural%20lighting&width=300&height=200&seq=video-1&orientation=landscape',
      status: 'published'
    },
    {
      id: 2,
      title: 'Comment gérer le stress au travail',
      views: '1.8k',
      likes: '92',
      duration: '03:12',
      thumbnail: 'https://readdy.ai/api/search-image?query=Calm%20professional%20woman%20demonstrating%20stress%20management%20techniques%2C%20peaceful%20office%20environment%2C%20wellness%20theme&width=300&height=200&seq=video-2&orientation=landscape',
      status: 'published'
    },
    {
      id: 3,
      title: 'Mes 5 applications productivité préférées',
      views: '987',
      likes: '43',
      duration: '01:56',
      thumbnail: 'https://readdy.ai/api/search-image?query=Woman%20demonstrating%20productivity%20apps%20on%20smartphone%2C%20modern%20workspace%2C%20technology%20theme%2C%20bright%20lighting&width=300&height=200&seq=video-3&orientation=landscape',
      status: 'draft'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: 'ri-dashboard-line' },
    { id: 'activity', label: 'Activité', icon: 'ri-history-line' },
    { id: 'videos', label: 'Mes Vidéos', icon: 'ri-video-line' },
    { id: 'settings', label: 'Modifier', icon: 'ri-edit-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl"></div>
            <div className="absolute -bottom-12 left-6">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20business%20woman%20portrait%2C%20friendly%20smile%2C%20modern%20office%20attire%2C%20high%20quality%20headshot%20photo&width=120&height=120&seq=profile-main&orientation=squarish"
                alt="Profil"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          
          <div className="pt-16 pb-6 px-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                <p className="text-gray-600 mt-1">{userInfo.email}</p>
                <p className="text-gray-500 text-sm mt-1">{userInfo.joinDate}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Modifier le profil
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b p-6">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                      <p className="text-gray-900">{userInfo.firstName} {userInfo.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{userInfo.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <p className="text-gray-900">{userInfo.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                      <p className="text-gray-900">{userInfo.location}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <p className="text-gray-900">{userInfo.bio}</p>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className={`${activity.icon} text-blue-600`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                        <p className="text-gray-500 text-xs mt-2">Il y a {activity.time}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        activity.status === 'replied' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.status === 'completed' ? 'Terminé' :
                         activity.status === 'in-progress' ? 'En cours' :
                         activity.status === 'replied' ? 'Répondu' : 'Publié'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Mes Vidéos</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    Nouvelle vidéo
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myVideos.map((video) => (
                    <div key={video.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${
                          video.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {video.status === 'published' ? 'Publié' : 'Brouillon'}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{video.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <i className="ri-eye-line"></i>
                            <span>{video.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <i className="ri-heart-line"></i>
                            <span>{video.likes}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Modifier le profil</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      value={userInfo.firstName}
                      onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                    <input
                      type="text"
                      value={userInfo.location}
                      onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={userInfo.bio}
                    onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Parlez-nous de vous..."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}