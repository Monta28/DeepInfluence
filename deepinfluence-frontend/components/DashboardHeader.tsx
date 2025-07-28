
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCoinsPopup, setShowCoinsPopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const favoriteExperts = [
    {
      id: 1,
      name: 'Dr. Sarah Martin',
      specialty: 'Psychologue clinique',
      rating: 4.9,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20with%20warm%20smile%2C%20modern%20office%20background%2C%20confident%20and%20approachable%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-1&orientation=squarish',
      isOnline: true
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      specialty: 'Coach en Développement Personnel',
      rating: 4.9,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20life%20coach%20with%20inspiring%20smile%2C%20bright%20modern%20office%20background%2C%20professional%20attire%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-3&orientation=squarish',
      isOnline: true
    },
    {
      id: 6,
      name: 'Thomas Bernard',
      specialty: 'Conseiller Financier',
      rating: 4.9,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-6&orientation=squarish',
      isOnline: false
    }
  ];

  const favoriteFormations = [
    {
      id: 2,
      title: 'Développement Personnel et Leadership',
      instructor: 'Sophie Laurent',
      level: 'Débutant',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=Professional%20leadership%20training%20workshop%20with%20confident%20people%2C%20modern%20conference%20room%2C%20motivational%20atmosphere%2C%20bright%20lighting&width=60&height=60&seq=formation-2&orientation=squarish'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'session',
      title: 'Rappel de rendez-vous',
      message: 'Consultation avec Dr. Sarah Martin dans 30 minutes',
      time: '2 min',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message',
      message: 'Marc Dubois vous a envoyé un message',
      time: '5 min',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'formation',
      title: 'Formation disponible',
      message: 'Nouvelle formation Marketing Digital',
      time: '1h',
      read: true,
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'session':
        return 'ri-calendar-line';
      case 'message':
        return 'ri-message-2-line';
      case 'formation':
        return 'ri-graduation-cap-line';
      default:
        return 'ri-notification-line';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate" style={{ fontFamily: 'Pacifico, serif' }}>
              DeepInfluence
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-full px-2 py-1 backdrop-blur-sm">
            <Link href="/dashboard" className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/70 dark:hover:bg-gray-700/70 rounded-full transition-all duration-200 whitespace-nowrap">
              Home
            </Link>
            <Link href="/dashboard/explorer" className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/70 dark:hover:bg-gray-700/70 rounded-full transition-all duration-200 whitespace-nowrap">
              Explorer
            </Link>
            <Link href="/dashboard/search" className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/70 dark:hover:bg-gray-700/70 rounded-full transition-all duration-200 whitespace-nowrap">
              Search
            </Link>
            <Link href="/dashboard/appointments" className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/70 dark:hover:bg-gray-700/70 rounded-full transition-all duration-200 whitespace-nowrap">
              Appointments
            </Link>
            <Link href="/dashboard/chat" className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/70 dark:hover:bg-gray-700/70 rounded-full transition-all duration-200 whitespace-nowrap">
              Messages
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
            >
              <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line text-xl`}></i>
            </button>

            {/* Notifications with Pop-up */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 flex items-center justify-center relative hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
              >
                <i className="ri-notification-line text-xl text-gray-600 dark:text-gray-400"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg animate-pulse">
                  {notifications.filter(n => !n.read).length}
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-4 z-50 animate-in slide-in-from-top-2 duration-300">
                  <div className="px-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                      <i className="ri-notification-line text-blue-600 dark:text-blue-400 mr-2"></i>
                      Notifications
                    </h3>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 border-l-4 ${
                        notification.read ? 'border-transparent' : 'border-blue-500'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                            notification.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
                            'bg-green-100 dark:bg-green-900/30'
                          }`}>
                            <i className={`${getNotificationIcon(notification.type)} text-sm ${getPriorityColor(notification.priority)}`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                    <Link href="/dashboard/notifications" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-center block font-semibold shadow-lg text-sm whitespace-nowrap">
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Favorites with Pop-up */}
            <div className="relative">
              <button
                onClick={() => setShowFavoritesPopup(!showFavoritesPopup)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 relative"
              >
                <i className="ri-heart-line text-xl"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                  {favoriteExperts.length + favoriteFormations.length}
                </span>
              </button>
              
              {showFavoritesPopup && (
                <div className="absolute right-0 mt-3 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-6 z-50 animate-in slide-in-from-top-2 duration-300">
                  <div className="px-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        <i className="ri-heart-fill text-red-500 mr-2"></i>
                        My Favorites
                      </h3>
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {favoriteExperts.length + favoriteFormations.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {/* Favorite Experts */}
                    <div className="px-6 py-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                        <i className="ri-user-star-line mr-2"></i>
                        Experts ({favoriteExperts.length})
                      </h4>
                      <div className="space-y-3">
                        {favoriteExperts.map((expert) => (
                          <Link key={expert.id} href={`/dashboard/expert/${expert.id}`}>
                            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 cursor-pointer group">
                              <div className="relative">
                                <img
                                  src={expert.avatar}
                                  alt={expert.name}
                                  className="w-12 h-12 rounded-full object-cover object-top shadow-md"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${expert.isOnline ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white dark:border-gray-800`}></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                  {expert.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {expert.specialty}
                                </p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <i className="ri-star-fill text-yellow-400 text-xs"></i>
                                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                    {expert.rating}
                                  </span>
                                </div>
                              </div>
                              <button className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all duration-200">
                                <i className="ri-heart-fill text-sm"></i>
                              </button>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Favorite Formations */}
                    <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                        <i className="ri-graduation-cap-line mr-2"></i>
                        Formations ({favoriteFormations.length})
                      </h4>
                      <div className="space-y-3">
                        {favoriteFormations.map((formation) => (
                          <Link key={formation.id} href={`/formations/${formation.id}`}>
                            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 cursor-pointer group">
                              <img
                                src={formation.image}
                                alt={formation.title}
                                className="w-12 h-12 rounded-xl object-cover shadow-md"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                  {formation.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  by {formation.instructor}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                                    {formation.level}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <i className="ri-star-fill text-yellow-400 text-xs"></i>
                                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                      {formation.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all duration-200">
                                <i className="ri-heart-fill text-sm"></i>
                              </button>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <Link href="/dashboard/favorites" className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 text-center block font-semibold shadow-lg text-sm whitespace-nowrap">
                      View All Favorites
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Coins with Pop-up */}
            <div className="relative">
              <button
                onClick={() => setShowCoinsPopup(!showCoinsPopup)}
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 px-4 py-2 rounded-full hover:from-yellow-100 hover:to-amber-100 dark:hover:from-yellow-800/40 dark:hover:to-amber-800/40 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <i className="ri-coin-line text-yellow-600 dark:text-yellow-400 text-lg"></i>
                <span className="text-yellow-700 dark:text-yellow-300 font-bold whitespace-nowrap">1,250</span>
                <i className="ri-arrow-down-s-line text-yellow-600 dark:text-yellow-400 text-sm"></i>
              </button>
              
              {showCoinsPopup && (
                <div className="absolute right-0 mt-3 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-4 z-50 animate-in slide-in-from-top-2 duration-300">
                  <div className="px-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                      <i className="ri-coin-line text-yellow-600 dark:text-yellow-400 mr-2"></i>
                      My Coins
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                          <i className="ri-coin-line text-white text-xl"></i>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">1,250</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">coins disponibles</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">625,000</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">millimes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Dernière transaction</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">+50 coins</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Dépensé ce mois</span>
                      <span className="text-red-600 dark:text-red-400 font-medium">-125 coins</span>
                    </div>
                  </div>
                  
                  <div className="px-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
                    <Link href="/dashboard/coins" className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-2 px-4 rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all duration-200 text-center block font-semibold shadow-lg text-sm whitespace-nowrap">
                      Acheter des coins
                    </Link>
                    <Link href="/dashboard/coins" className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 text-center block text-sm whitespace-nowrap">
                      Voir l'historique
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
              >
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20business%20person%20headshot%20photo%20with%20friendly%20smile%2C%20modern%20office%20background%2C%20high%20quality%20portrait&width=40&height=40&seq=user-avatar&orientation=squarish"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover shadow-md"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Marie Dupont</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Premium User</p>
                </div>
                <i className="ri-arrow-down-s-line text-gray-400 dark:text-gray-500"></i>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50 animate-in slide-in-from-top-2 duration-300">
                  <Link href="/dashboard/profile" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 rounded-xl mx-2">
                    <i className="ri-user-line mr-3"></i>
                    Profile
                  </Link>
                  <Link href="/dashboard/settings" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 rounded-xl mx-2">
                    <i className="ri-settings-line mr-3"></i>
                    Settings
                  </Link>
                  <hr className="my-2 border-gray-200/50 dark:border-gray-700/50" />
                  <Link href="/signin" className="block px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 rounded-xl mx-2">
                    <i className="ri-logout-box-line mr-3"></i>
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-2">
              <Link href="/dashboard" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Home
              </Link>
              <Link href="/dashboard/explorer" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Explorer
              </Link>
              <Link href="/dashboard/search" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Search
              </Link>
              <Link href="/dashboard/appointments" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Appointments
              </Link>
              <Link href="/dashboard/chat" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Messages
              </Link>
              <Link href="/dashboard/notifications" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Notifications
              </Link>
              <Link href="/dashboard/favorites" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Favorites
              </Link>
              <Link href="/dashboard/profile" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Profile
              </Link>
              <Link href="/dashboard/settings" className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200">
                Settings
              </Link>
              <div className="px-4 py-2">
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line`}></i>
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
