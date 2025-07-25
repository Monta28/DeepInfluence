'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    // Vérifier le mode sombre au chargement
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Vérifier la langue sauvegardée
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
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

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const getNavLinks = () => {
    const navLinks = {
      fr: [
        { href: '/', label: 'Accueil' },
        { href: '/experts', label: 'Experts' },
        { href: '/formations', label: 'Formations' },
        { href: '/videos', label: 'Vidéos' },
        ...(user ? [{ href: '/dashboard', label: 'Dashboard' }] : [])
      ],
      ar: [
        { href: '/', label: 'الرئيسية' },
        { href: '/experts', label: 'الخبراء' },
        { href: '/formations', label: 'التدريبات' },
        { href: '/videos', label: 'الفيديوهات' },
        ...(user ? [{ href: '/dashboard', label: 'لوحة التحكم' }] : [])
      ],
      en: [
        { href: '/', label: 'Home' },
        { href: '/experts', label: 'Experts' },
        { href: '/formations', label: 'Formations' },
        { href: '/videos', label: 'Videos' },
        ...(user ? [{ href: '/dashboard', label: 'Dashboard' }] : [])
      ]
    };
    return navLinks[currentLanguage as keyof typeof navLinks] || navLinks.fr;
  };

  const getButtonText = () => {
    const buttonText = {
      fr: { 
        signin: 'Se connecter', 
        getStarted: 'Commencer',
        profile: 'Profil',
        dashboard: 'Dashboard',
        logout: 'Déconnexion'
      },
      ar: { 
        signin: 'تسجيل الدخول', 
        getStarted: 'البدء',
        profile: 'الملف الشخصي',
        dashboard: 'لوحة التحكم',
        logout: 'تسجيل الخروج'
      },
      en: { 
        signin: 'Sign In', 
        getStarted: 'Get Started',
        profile: 'Profile',
        dashboard: 'Dashboard',
        logout: 'Logout'
      }
    };
    return buttonText[currentLanguage as keyof typeof buttonText] || buttonText.fr;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate" style={{ fontFamily: 'Pacifico, serif' }}>
              DeepInfluence
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-full px-2 py-1 backdrop-blur-sm">
            {getNavLinks().map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/70 dark:hover:bg-gray-700/70 rounded-full transition-all duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="text-lg">{languages.find(l => l.code === currentLanguage)?.flag}</span>
                <i className="ri-arrow-down-s-line text-sm"></i>
              </button>
              <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[120px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      currentLanguage === lang.code ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm font-medium truncate">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
            >
              <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line text-xl`}></i>
            </button>

            {/* User Authentication Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full px-4 py-2 transition-all duration-200"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&size=32&background=3B82F6&color=ffffff`}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                    {user.firstName}
                  </span>
                  <i className={`ri-arrow-down-s-line text-sm text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}></i>
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[200px] z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="ri-dashboard-line"></i>
                      <span>{getButtonText().dashboard}</span>
                    </Link>
                    
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="ri-user-line"></i>
                      <span>{getButtonText().profile}</span>
                    </Link>

                    {user.userType === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <i className="ri-admin-line"></i>
                        <span>Administration</span>
                      </Link>
                    )}
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <i className="ri-logout-box-line"></i>
                        <span>{getButtonText().logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                >
                  {getButtonText().signin}
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                >
                  {getButtonText().getStarted}
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-2">
              {getNavLinks().map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 truncate"
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&size=40&background=3B82F6&color=ffffff`}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200"
                  >
                    <i className="ri-user-line"></i>
                    <span>{getButtonText().profile}</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                  >
                    <i className="ri-logout-box-line"></i>
                    <span>{getButtonText().logout}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/signin" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 truncate"
                  >
                    {getButtonText().signin}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="mx-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center font-semibold shadow-lg whitespace-nowrap"
                  >
                    {getButtonText().getStarted}
                  </Link>
                </>
              )}
              
              <div className="px-4 py-2">
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line`}></i>
                  <span>{isDarkMode ? 'Mode Clair' : 'Mode Sombre'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

