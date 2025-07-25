'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FormationCard from './FormationCard';
import ApiService, { Formation } from '../services/api';

export default function FormationsList() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await ApiService.getFormations({ limit: 6 });
      
      if (response.success) {
        setFormations(response.data);
      } else {
        setError('Erreur lors du chargement des formations');
      }
    } catch (err: any) {
      console.error('Erreur lors du chargement des formations:', err);
      if (err.message.includes('fetch')) {
        setError('Impossible de se connecter au serveur. Utilisation de données de démonstration.');
        
        // Données de fallback
        setFormations([
          {
            id: 1,
            title: 'Maîtrise du Leadership Moderne',
            instructor: 'Dr. Marie Dubois',
            duration: '8 semaines',
            level: 'Intermédiaire',
            rating: 4.9,
            students: 245,
            price: 299,
            type: 'live',
            maxPlaces: 30,
            currentPlaces: 18,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Leadership&size=400&background=3B82F6&color=ffffff',
            tags: ['Leadership', 'Management', 'Communication'],
            nextSession: '2024-02-15',
            description: 'Développez vos compétences en leadership et apprenez à inspirer votre équipe vers l\'excellence.',
            schedule: 'Mar/Jeu 19h-21h',
            modules: ['Leadership', 'Communication', 'Management', 'Motivation'],
            category: 'business'
          },
          {
            id: 2,
            title: 'Développement Personnel et Confiance',
            instructor: 'Sophie Laurent',
            duration: '6 semaines',
            level: 'Débutant',
            rating: 4.8,
            students: 189,
            price: 199,
            type: 'live',
            maxPlaces: 25,
            currentPlaces: 12,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Confiance&size=400&background=10B981&color=ffffff',
            tags: ['Confiance', 'Estime de soi', 'Motivation'],
            nextSession: '2024-02-20',
            description: 'Renforcez votre confiance en vous et découvrez votre potentiel personnel unique.',
            schedule: 'Lun/Mer 18h-20h',
            modules: ['Confiance', 'Estime de soi', 'Motivation', 'Communication'],
            category: 'bien-etre'
          },
          {
            id: 3,
            title: 'Marketing Digital Avancé',
            instructor: 'Thomas Martin',
            duration: '10 semaines',
            level: 'Avancé',
            rating: 4.7,
            students: 156,
            price: 399,
            type: 'live',
            maxPlaces: 20,
            currentPlaces: 8,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Marketing&size=400&background=8B5CF6&color=ffffff',
            tags: ['SEO', 'Social Media', 'Analytics'],
            nextSession: '2024-02-25',
            description: 'Maîtrisez les stratégies avancées du marketing digital et boostez votre présence en ligne.',
            schedule: 'Mar/Jeu 19h-21h',
            modules: ['SEO', 'Social Media', 'Email Marketing', 'Analytics'],
            category: 'marketing'
          }
        ]);
      } else {
        setError(err.message || 'Erreur lors du chargement des formations');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Formations Populaires
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Développez vos compétences avec nos formations certifiées animées par des experts reconnus
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400">Chargement des formations...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <i className="ri-information-line text-yellow-600 dark:text-yellow-400 text-xl mr-3"></i>
              <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
            </div>
          </div>
        )}

        {/* Formations Grid */}
        {!loading && formations.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {formations.slice(0, 6).map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link
                href="/formations"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Voir toutes les formations</span>
                <i className="ri-arrow-right-line ml-2 text-lg"></i>
              </Link>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && formations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-graduation-cap-line text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Aucune formation disponible
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Les formations seront bientôt disponibles.
            </p>
          </div>
        )}

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-live-line text-blue-600 dark:text-blue-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Sessions en Direct
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Participez à des sessions interactives avec nos experts en temps réel
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-certificate-line text-green-600 dark:text-green-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Certification
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Obtenez des certificats reconnus pour valider vos nouvelles compétences
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-group-line text-purple-600 dark:text-purple-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Communauté
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rejoignez une communauté d'apprenants motivés et partagez vos expériences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

