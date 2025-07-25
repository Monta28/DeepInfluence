'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ExpertCard from '@/components/ExpertCard';
import FormationCard from '@/components/FormationCard';

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('experts');

  const favoriteExperts = [
    {
      id: 1,
      name: 'Dr. Sarah Martin',
      specialty: 'Psychologue clinique',
      rating: 4.9,
      reviews: 147,
      price: 80,
      category: 'wellness',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20with%20warm%20smile%2C%20modern%20office%20background%2C%20confident%20and%20approachable%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-1&orientation=squarish',
      isOnline: true,
      languages: ['Français', 'Anglais'],
      responseTime: '< 1h'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      specialty: 'Coach en Développement Personnel',
      rating: 4.9,
      reviews: 89,
      price: 75,
      category: 'wellness',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20life%20coach%20with%20inspiring%20smile%2C%20bright%20modern%20office%20background%2C%20professional%20attire%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-3&orientation=squarish',
      isOnline: true,
      languages: ['Français', 'Anglais'],
      responseTime: '< 30min'
    },
    {
      id: 6,
      name: 'Thomas Bernard',
      specialty: 'Conseiller Financier',
      rating: 4.9,
      reviews: 178,
      price: 110,
      category: 'finance',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit%2C%20high%20quality%20portrait&width=300&height=300&seq=expert-6&orientation=squarish',
      isOnline: true,
      languages: ['Français'],
      responseTime: '< 1h'
    }
  ];

  const favoriteFormations = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Favoris</h1>
            <p className="text-gray-600 mt-2">Retrouvez vos experts et formations préférés</p>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-heart-fill text-red-500 text-2xl"></i>
            <span className="text-lg font-semibold text-gray-900">
              {favoriteExperts.length + favoriteFormations.length}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b p-6">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('experts')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'experts'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Experts ({favoriteExperts.length})
              </button>
              <button
                onClick={() => setActiveTab('formations')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'formations'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Formations ({favoriteFormations.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'experts' && (
              <div>
                {favoriteExperts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteExperts.map((expert) => (
                      <ExpertCard key={expert.id} expert={expert} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-heart-line text-2xl text-gray-400"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun expert favori</h3>
                    <p className="text-gray-500">Commencez à suivre vos experts préférés</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'formations' && (
              <div>
                {favoriteFormations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteFormations.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-heart-line text-2xl text-gray-400"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation favorite</h3>
                    <p className="text-gray-500">Sauvegardez vos formations préférées</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}