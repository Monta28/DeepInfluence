'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormationCard from '@/components/FormationCard';

export default function FormationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formations = [
    {
      id: 1,
      title: 'Stratégie Digitale Avancée',
      instructor: 'Dr. Sarah Martinez',
      category: 'business',
      duration: '8 semaines',
      level: 'Avancé',
      price: '450 coins',
      rating: 4.9,
      students: 234,
      image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20strategy%20training%20session%2C%20professional%20business%20workshop%2C%20contemporary%20classroom%20setting%2C%20digital%20marketing%20presentation%2C%20business%20strategy%20meeting%2C%20clean%20professional%20environment%2C%20modern%20technology%20integration&width=400&height=250&seq=formation-digital-001&orientation=landscape',
      description: 'Masterclass complète sur la transformation digitale et les stratégies modernes d\'entreprise.',
      schedule: 'Mardi 18h - 20h',
      nextSession: '2024-02-15',
      modules: [
        'Introduction à la transformation digitale',
        'Stratégies marketing omnicanales',
        'Analytics et mesure de performance',
        'Leadership digital',
        'Innovation et disruption',
        'Cas pratiques et projets',
        'Certification finale'
      ]
    },
    {
      id: 2,
      title: 'Développement Personnel & Leadership',
      instructor: 'Marie Lefebvre',
      category: 'bien-etre',
      duration: '6 semaines',
      level: 'Intermédiaire',
      price: '320 coins',
      rating: 4.8,
      students: 189,
      image: 'https://readdy.ai/api/search-image?query=Personal%20development%20workshop%2C%20leadership%20training%20session%2C%20motivational%20coaching%20environment%2C%20professional%20development%20classroom%2C%20inspiring%20learning%20atmosphere%2C%20modern%20training%20facility%2C%20group%20coaching%20session&width=400&height=250&seq=formation-leadership-001&orientation=landscape',
      description: 'Développez votre potentiel de leadership et vos compétences en développement personnel.',
      schedule: 'Jeudi 19h - 21h',
      nextSession: '2024-02-20',
      modules: [
        'Connaissance de soi et leadership',
        'Communication efficace',
        'Gestion des émotions',
        'Prise de décision et résolution de problèmes',
        'Motivation et engagement d\'équipe',
        'Mise en pratique avec coaching individuel'
      ]
    },
    {
      id: 3,
      title: 'Marketing Digital & E-commerce',
      instructor: 'Thomas Dubois',
      category: 'marketing',
      duration: '10 semaines',
      level: 'Débutant',
      price: '380 coins',
      rating: 4.7,
      students: 312,
      image: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20training%20workshop%2C%20e-commerce%20strategy%20session%2C%20modern%20marketing%20classroom%2C%20online%20business%20presentation%2C%20social%20media%20marketing%20training%2C%20contemporary%20learning%20environment%2C%20digital%20strategy%20workshop&width=400&height=250&seq=formation-marketing-001&orientation=landscape',
      description: 'Formation complète pour maîtriser les outils du marketing digital et lancer votre e-commerce.',
      schedule: 'Lundi 17h - 19h',
      nextSession: '2024-02-12',
      modules: [
        'Fondamentaux du marketing digital',
        'SEO et référencement naturel',
        'Publicité en ligne (Google Ads, Facebook)',
        'Marketing des réseaux sociaux',
        'E-commerce et marketplaces',
        'Email marketing et automation',
        'Analytics et ROI',
        'Stratégies de content marketing',
        'Projet final e-commerce'
      ]
    },
    {
      id: 4,
      title: 'Intelligence Artificielle & Data Science',
      instructor: 'Alexandre Chen',
      category: 'technologie',
      duration: '12 semaines',
      level: 'Avancé',
      price: '620 coins',
      rating: 4.9,
      students: 156,
      image: 'https://readdy.ai/api/search-image?query=Artificial%20intelligence%20training%20workshop%2C%20data%20science%20classroom%2C%20modern%20technology%20education%2C%20AI%20programming%20session%2C%20machine%20learning%20training%2C%20contemporary%20tech%20learning%20environment%2C%20digital%20innovation%20workshop&width=400&height=250&seq=formation-ai-001&orientation=landscape',
      description: 'Plongez dans l\'univers de l\'IA et de la Data Science avec des projets pratiques.',
      schedule: 'Mercredi 18h - 21h',
      nextSession: '2024-02-28',
      modules: [
        'Introduction à l\'IA et Machine Learning',
        'Python pour la Data Science',
        'Réseaux de neurones et Deep Learning',
        'Traitement du langage naturel (NLP)',
        'Computer Vision',
        'Big Data et Cloud Computing',
        'Éthique et IA responsable',
        'Projets pratiques sectoriels',
        'Déploiement de modèles IA'
      ]
    },
    {
      id: 5,
      title: 'Gestion Financière & Investissement',
      instructor: 'Dr. Emma Wilson',
      category: 'finance',
      duration: '8 semaines',
      level: 'Intermédiaire',
      price: '480 coins',
      rating: 4.8,
      students: 198,
      image: 'https://readdy.ai/api/search-image?query=Financial%20management%20training%20workshop%2C%20investment%20strategy%20session%2C%20modern%20finance%20classroom%2C%20financial%20planning%20education%2C%20professional%20finance%20training%2C%20contemporary%20learning%20environment%2C%20business%20finance%20workshop&width=400&height=250&seq=formation-finance-001&orientation=landscape',
      description: 'Apprenez à gérer vos finances personnelles et professionnelles comme un expert.',
      schedule: 'Vendredi 18h - 20h',
      nextSession: '2024-02-16',
      modules: [
        'Fondamentaux de la finance',
        'Analyse financière d\'entreprise',
        'Stratégies d\'investissement',
        'Gestion de portefeuille',
        'Crypto-monnaies et blockchain',
        'Planification financière personnelle',
        'Fiscalité et optimisation',
        'Cas pratiques et simulations'
      ]
    },
    {
      id: 6,
      title: 'Nutrition & Coaching Sportif',
      instructor: 'Lucas Martin',
      category: 'bien-etre',
      duration: '6 semaines',
      level: 'Débutant',
      price: '280 coins',
      rating: 4.6,
      students: 267,
      image: 'https://readdy.ai/api/search-image?query=Fitness%20nutrition%20training%20workshop%2C%20sports%20coaching%20session%2C%20wellness%20education%20classroom%2C%20healthy%20lifestyle%20training%2C%20modern%20gym%20training%20environment%2C%20fitness%20coaching%20workshop%2C%20nutrition%20education%20session&width=400&height=250&seq=formation-fitness-001&orientation=landscape',
      description: 'Devenez expert en nutrition sportive et coaching pour transformer votre vie et celle des autres.',
      schedule: 'Samedi 10h - 12h',
      nextSession: '2024-02-17',
      modules: [
        'Bases de la nutrition sportive',
        'Planification d\'entraînement',
        'Psychologie du sport',
        'Récupération et performance',
        'Supplémentation naturelle',
        'Coaching et accompagnement'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les formations' },
    { id: 'business', name: 'Business' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'technologie', name: 'Technologie' },
    { id: 'finance', name: 'Finance' },
    { id: 'bien-etre', name: 'Bien-être' }
  ];

  const filteredFormations = selectedCategory === 'all' 
    ? formations 
    : formations.filter(formation => formation.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Formations en Direct avec des Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participez à des sessions de formation interactives avec nos experts certifiés. 
            Apprenez, échangez et développez vos compétences en temps réel.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-gray-600 mb-6">
              Contactez-nous pour créer une formation sur mesure adaptée à vos besoins spécifiques.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
              Demander une formation personnalisée
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}