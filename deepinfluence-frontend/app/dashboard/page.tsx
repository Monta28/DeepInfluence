
'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ExpertCard from '@/components/ExpertCard';
import FormationCard from '@/components/FormationCard';
import Link from 'next/link';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'Tous', icon: 'ri-apps-line' },
    { id: 'business', name: 'Business', icon: 'ri-briefcase-line' },
    { id: 'marketing', name: 'Marketing', icon: 'ri-megaphone-line' },
    { id: 'wellness', name: 'Bien-être', icon: 'ri-heart-line' },
    { id: 'tech', name: 'Tech', icon: 'ri-computer-line' },
    { id: 'finance', name: 'Finance', icon: 'ri-money-dollar-circle-line' },
  ];

  const quickStats = [
    { label: 'Sessions terminées', value: '24', icon: 'ri-calendar-check-line', color: 'from-green-500 to-emerald-600' },
    { label: 'Formations actives', value: '3', icon: 'ri-graduation-cap-line', color: 'from-blue-500 to-cyan-600' },
    { label: 'Heures d\'apprentissage', value: '156', icon: 'ri-time-line', color: 'from-purple-500 to-violet-600' },
    { label: 'Experts suivis', value: '12', icon: 'ri-user-star-line', color: 'from-orange-500 to-amber-600' }
  ];

  const recommendedExperts = [
    {
      id: 1,
      name: 'Dr. Marie Dubois',
      specialty: 'Développement Personnel',
      rating: 4.9,
      reviews: 147,
      priceText: '50 coins/message',
      category: 'wellness',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20personal%20development%20coach%20with%20warm%20confident%20smile%2C%20modern%20coaching%20office%20background%2C%20professional%20attire%2C%20trustworthy%20and%20approachable%20appearance%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-marie-1&orientation=squarish',
      isOnline: true,
      isVerified: true,
      languages: ['Français', 'Anglais'],
      responseTime: '2 minutes',
      sessions: 450,
      followers: 12500,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20personal%20development%20coach%20with%20warm%20confident%20smile%2C%20modern%20coaching%20office%20background%2C%20professional%20attire%2C%20trustworthy%20and%20approachable%20appearance%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-marie-1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Marc Rodriguez',
      specialty: 'Business & Entrepreneuriat',
      rating: 4.8,
      reviews: 203,
      priceText: '75 coins/message',
      category: 'business',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20entrepreneur%20in%20elegant%20suit%2C%20confident%20businessman%20portrait%2C%20modern%20corporate%20office%20background%2C%20professional%20headshot%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-marc-2&orientation=squarish',
      isOnline: false,
      isVerified: true,
      languages: ['Français', 'Espagnol'],
      responseTime: '15 minutes',
      sessions: 680,
      followers: 8900,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20entrepreneur%20in%20elegant%20suit%2C%20confident%20businessman%20portrait%2C%20modern%20corporate%20office%20background%2C%20professional%20headshot%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-marc-2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      specialty: 'Bien-être & Nutrition',
      rating: 4.9,
      reviews: 89,
      priceText: '40 coins/message',
      category: 'wellness',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20wellness%20and%20nutrition%20coach%20with%20healthy%20radiant%20appearance%2C%20natural%20wellness%20environment%20background%2C%20professional%20attire%2C%20trustworthy%20and%20caring%20expression%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-sophie-3&orientation=squarish',
      isOnline: true,
      isVerified: true,
      languages: ['Français'],
      responseTime: '5 minutes',
      sessions: 320,
      followers: 15600,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20wellness%20and%20nutrition%20coach%20with%20healthy%20radiant%20appearance%2C%20natural%20wellness%20environment%20background%2C%20professional%20attire%2C%20trustworthy%20and%20caring%20expression%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-sophie-3&orientation=squarish'
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      specialty: 'Marketing Digital',
      rating: 4.7,
      reviews: 156,
      priceText: '60 coins/message',
      category: 'marketing',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20digital%20marketing%20expert%20with%20confident%20expression%2C%20modern%20digital%20office%20background%2C%20contemporary%20business%20attire%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-ahmed-4&orientation=squarish',
      isOnline: true,
      isVerified: true,
      languages: ['Français', 'Arabe'],
      responseTime: '3 minutes',
      sessions: 520,
      followers: 22100,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20digital%20marketing%20expert%20with%20confident%20expression%2C%20modern%20digital%20office%20background%2C%20contemporary%20business%20attire%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-ahmed-4&orientation=squarish'
    },
    {
      id: 5,
      name: 'Claire Rousseau',
      specialty: 'Développeuse Full Stack',
      rating: 4.8,
      reviews: 124,
      priceText: '100 coins/message',
      category: 'tech',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20casual%20professional%20attire%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-5&orientation=squarish',
      isOnline: false,
      isVerified: true,
      languages: ['Français', 'Anglais'],
      responseTime: '3h',
      sessions: 350,
      followers: 8900,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20casual%20professional%20attire%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-5&orientation=squarish'
    },
    {
      id: 6,
      name: 'Thomas Bernard',
      specialty: 'Conseiller Financier',
      rating: 4.9,
      reviews: 178,
      priceText: '110 coins/message',
      category: 'finance',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-6&orientation=squarish',
      isOnline: true,
      isVerified: true,
      languages: ['Français'],
      responseTime: '1h',
      sessions: 450,
      followers: 12000,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-6&orientation=squarish'
    }
  ];

  const popularFormations = [
    {
      id: 1,
      title: 'Marketing Digital Avancé',
      instructor: 'Marc Dubois',
      duration: '8 semaines',
      level: 'Intermédiaire',
      price: '299€',
      rating: 4.8,
      students: 1250,
      image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20marketing%20training%20session%20with%20laptop%2C%20charts%2C%20and%20social%20media%20icons%2C%20professional%20learning%20environment%2C%20bright%20colors&width=400&height=250&seq=formation-1&orientation=landscape',
      category: 'Marketing',
      description: 'Maîtrisez les stratégies avancées du marketing digital avec cette formation complète.',
      schedule: 'Tous les mardis et jeudis',
      nextSession: '2024-02-15',
      modules: [
        'Stratégies de contenu digital',
        'Publicité en ligne et SEA',
        'Analytics et mesure de performance',
        'Email marketing automation',
        'Réseaux sociaux avancés'
      ]
    },
    {
      id: 2,
      title: 'Développement Personnel et Leadership',
      instructor: 'Sophie Laurent',
      duration: '6 semaines',
      level: 'Débutant',
      price: '199€',
      rating: 4.9,
      students: 890,
      image: 'https://readdy.ai/api/search-image?query=Professional%20leadership%20training%20workshop%20with%20confident%20people%2C%20modern%20conference%20room%2C%20motivational%20atmosphere%2C%20bright%20lighting&width=400&height=250&seq=formation-2&orientation=landscape',
      category: 'Développement Personnel',
      description: 'Développez votre leadership et vos compétences interpersonnelles.',
      schedule: 'Tous les lundis',
      nextSession: '2024-02-12',
      modules: [
        'Communication efficace',
        'Gestion des émotions',
        'Techniques de motivation',
        'Prise de décision',
        'Gestion du stress'
      ]
    },
    {
      id: 3,
      title: 'Gestion Financière pour Entrepreneurs',
      instructor: 'Thomas Bernard',
      duration: '10 semaines',
      level: 'Avancé',
      price: '399€',
      rating: 4.7,
      students: 567,
      image: 'https://readdy.ai/api/search-image?query=Professional%20financial%20management%20training%20with%20calculator%2C%20charts%2C%20and%20business%20documents%2C%20modern%20office%20setting%2C%20professional%20atmosphere&width=400&height=250&seq=formation-3&orientation=landscape',
      category: 'Finance',
      description: 'Apprenez à gérer efficacement les finances de votre entreprise.',
      schedule: 'Tous les mercredis',
      nextSession: '2024-02-14',
      modules: [
        'Analyse financière',
        'Budgétisation et prévisions',
        'Gestion de trésorerie',
        'Investissements et financements',
        'Fiscalité d\'entreprise'
      ]
    }
  ];

  const filteredExperts = selectedCategory === 'all'
    ? recommendedExperts
    : recommendedExperts.filter(expert => expert.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Welcome */}
        <div className="relative mb-12">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-3">
                    Bonjour Marie ! 👋
                  </h1>
                  <p className="text-xl text-blue-100 mb-6">
                    Prêt pour votre prochaine session d\'apprentissage ?
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/dashboard/appointments">
                      <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
                        Réserver une consultation
                      </button>
                    </Link>
                    <Link href="/formations">
                      <button className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors whitespace-nowrap">
                        Explorer les formations
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <img
                    src="https://readdy.ai/api/search-image?query=Happy%20professional%20woman%20using%20laptop%20in%20modern%20office%2C%20learning%20and%20development%20theme%2C%20bright%20and%20positive%20atmosphere%2C%20high%20quality%20illustration&width=300&height=200&seq=hero-dashboard&orientation=landscape"
                    alt="Dashboard Hero"
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400 text-xl"></i>
            </div>
            <input
              type="text"
              placeholder="Rechercher un expert, une formation, ou un domaine d\'expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm hover:shadow-md transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
              <Link href="/dashboard/search">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Rechercher
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-white/50'
                }`}
              >
                <i className={`${category.icon} text-xl`}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Experts Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Experts recommandés</h2>
              <p className="text-gray-600">Découvrez nos experts les mieux notés dans votre domaine</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-white/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-layout-grid-line"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-layout-row-line"></i>
                </button>
              </div>
              <Link href="/experts">
                <button className="text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap">
                  Voir tous les experts
                </button>
              </Link>
            </div>
          </div>

          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>

        {/* Enhanced Popular Formations */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Formations populaires</h2>
              <p className="text-gray-600">Développez vos compétences avec nos formations les plus appréciées</p>
            </div>
            <Link href="/formations">
              <button className="text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap">
                Voir toutes les formations
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularFormations.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="ri-calendar-check-line text-white text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Réserver une consultation</h4>
              <p className="text-gray-600 text-sm mb-4">Planifiez une session avec un expert</p>
              <Link href="/dashboard/appointments">
                <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap">
                  Réserver maintenant
                </button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="ri-graduation-cap-line text-white text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Rejoindre une formation</h4>
              <p className="text-gray-600 text-sm mb-4">Inscrivez-vous à une formation</p>
              <Link href="/formations">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Parcourir les formations
                </button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="ri-message-2-line text-white text-2xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Contacter un expert</h4>
              <p className="text-gray-600 text-sm mb-4">Démarrez une conversation</p>
              <Link href="/dashboard/chat">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors whitespace-nowrap">
                  Envoyer un message
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
