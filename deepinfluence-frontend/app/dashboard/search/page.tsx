
'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';
import ExpertCard from '@/components/ExpertCard';
import FormationCard from '@/components/FormationCard';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'business', name: 'Business' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'wellness', name: 'Bien-être' },
    { id: 'tech', name: 'Tech' },
    { id: 'finance', name: 'Finance' },
  ];

  const experts = [
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
    }
  ];

  const formations = [
    {
      id: 1,
      title: 'Marketing Digital Avancé',
      instructor: 'Marc Dubois',
      category: 'Marketing',
      duration: '8 semaines',
      level: 'Intermédiaire',
      price: '299€',
      rating: 4.8,
      students: 1250,
      image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20marketing%20training%20session%20with%20laptop%2C%20charts%2C%20and%20social%20media%20icons%2C%20professional%20learning%20environment%2C%20bright%20colors&width=400&height=250&seq=formation-1&orientation=landscape',
      description: 'Maîtrisez les stratégies avancées du marketing digital avec cette formation complète.',
      schedule: 'Mardi 18h - 20h',
      nextSession: '2024-02-15',
      modules: [
        'Stratégies marketing digital',
        'SEO et référencement',
        'Publicité en ligne',
        'Analytics et mesure',
        'Réseaux sociaux',
        'Email marketing',
        'Automatisation',
        'Projet final'
      ]
    },
    {
      id: 2,
      title: 'Développement Personnel et Leadership',
      instructor: 'Sophie Laurent',
      category: 'Développement Personnel',
      duration: '6 semaines',
      level: 'Débutant',
      price: '199€',
      rating: 4.9,
      students: 890,
      image: 'https://readdy.ai/api/search-image?query=Professional%20leadership%20training%20workshop%20with%20confident%20people%2C%20modern%20conference%20room%2C%20motivational%20atmosphere%2C%20bright%20lighting&width=400&height=250&seq=formation-2&orientation=landscape',
      description: 'Développez votre potentiel de leader et vos compétences interpersonnelles.',
      schedule: 'Jeudi 19h - 21h',
      nextSession: '2024-02-20',
      modules: [
        'Connaissance de soi',
        'Leadership authentique',
        'Communication efficace',
        'Gestion d\'équipe',
        'Motivation',
        'Résolution de conflits'
      ]
    },
    {
      id: 3,
      title: 'Intelligence Artificielle pour Débutants',
      instructor: 'Dr. Alexandre Chen',
      category: 'Technologie',
      duration: '10 semaines',
      level: 'Débutant',
      price: '399€',
      rating: 4.7,
      students: 567,
      image: 'https://readdy.ai/api/search-image?query=AI%20artificial%20intelligence%20training%20workshop%2C%20modern%20technology%20classroom%2C%20futuristic%20learning%20environment%2C%20computer%20programming%20session&width=400&height=250&seq=formation-3&orientation=landscape',
      description: 'Découvrez le monde de l\'IA et apprenez à créer vos premiers algorithmes.',
      schedule: 'Mercredi 18h - 20h',
      nextSession: '2024-02-28',
      modules: [
        'Introduction à l\'IA',
        'Machine Learning',
        'Python basics',
        'Réseaux neuronaux',
        'Traitement du langage',
        'Computer Vision',
        'Projets pratiques'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recherche Avancée
          </h1>
          <p className="text-gray-600">
            Trouvez l'expert ou la formation parfaite pour vos besoins
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Filtres</h3>

              {/* Search Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de recherche
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="all">Tous</option>
                  <option value="experts">Experts seulement</option>
                  <option value="formations">Formations seulement</option>
                </select>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fourchette de prix
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note minimum
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-6 h-6 flex items-center justify-center ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <i className="ri-star-fill"></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disponibilité
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="all">Toutes</option>
                  <option value="online">En ligne maintenant</option>
                  <option value="today">Disponible aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                Appliquer les filtres
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher par nom, spécialité, ou mot-clé..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Results */}
            <div className="space-y-10">
              {/* Experts Results */}
              {(searchType === 'all' || searchType === 'experts') && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Experts ({experts.length})
                  </h2>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {experts.map((expert) => (
                      <ExpertCard key={expert.id} expert={expert}>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/dashboard/chat/${expert.id}`}
                            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium whitespace-nowrap text-center cursor-pointer"
                          >
                            Message rapide
                          </Link>
                          <Link
                            href={`/experts/${expert.id}`}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap text-center cursor-pointer"
                          >
                            Voir profil
                          </Link>
                        </div>
                      </ExpertCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Formations Results */}
              {(searchType === 'all' || searchType === 'formations') && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Formations ({formations.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {formations.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
