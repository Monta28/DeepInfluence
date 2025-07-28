
'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormationCard from './FormationCard';

export default function FormationsList() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const formations = [
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
      image: 'https://readdy.ai/api/search-image?query=Professional%20leadership%20training%20workshop%20with%20confident%20people%2C%20modern%20conference%20room%2C%20motivational%20atmosphere%2C%20bright%20lighting&width=400&height=250&seq=formation-leadership&orientation=landscape',
      tags: ['Leadership', 'Management', 'Communication'],
      nextSession: '15 Janvier 2024',
      description: 'Développez vos compétences en leadership et apprenez à inspirer votre équipe vers l\'excellence.'
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
      type: 'presentiel',
      maxPlaces: 25,
      currentPlaces: 12,
      location: 'Paris, France',
      image: 'https://readdy.ai/api/search-image?query=Personal%20development%20workshop%20with%20people%20in%20circle%2C%20bright%20modern%20training%20room%2C%20positive%20atmosphere%2C%20professional%20coaching%20environment&width=400&height=250&seq=formation-personal&orientation=landscape',
      tags: ['Confiance', 'Estime de soi', 'Motivation'],
      nextSession: '20 Janvier 2024',
      description: 'Renforcez votre confiance en vous et découvrez votre potentiel personnel unique.'
    },
    {
      id: 3,
      title: 'Marketing Digital Avancé',
      instructor: 'Ahmed Hassan',
      duration: '10 semaines',
      level: 'Avancé',
      rating: 4.7,
      students: 156,
      price: 399,
      type: 'live',
      maxPlaces: 40,
      currentPlaces: 28,
      location: 'En ligne',
      image: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20training%20session%20with%20laptops%2C%20charts%2C%20social%20media%20graphics%2C%20modern%20tech%20classroom%2C%20professional%20learning%20environment&width=400&height=250&seq=formation-marketing&orientation=landscape',
      tags: ['SEO', 'Social Media', 'Analytics'],
      nextSession: '22 Janvier 2024',
      description: 'Maîtrisez les stratégies de marketing digital les plus efficaces pour booster votre business.'
    },
    {
      id: 4,
      title: 'Investissement et Finance Personnelle',
      instructor: 'Thomas Bernard',
      duration: '12 semaines',
      level: 'Intermédiaire',
      rating: 4.9,
      students: 234,
      price: 449,
      type: 'presentiel',
      maxPlaces: 20,
      currentPlaces: 15,
      location: 'Lyon, France',
      image: 'https://readdy.ai/api/search-image?query=Financial%20investment%20workshop%20with%20charts%2C%20graphs%2C%20business%20meeting%20room%2C%20professional%20finance%20training%20environment&width=400&height=250&seq=formation-finance&orientation=landscape',
      tags: ['Investissement', 'Épargne', 'Bourse'],
      nextSession: '25 Janvier 2024',
      description: 'Apprenez à gérer et faire fructifier votre argent avec des stratégies d\'investissement éprouvées.'
    },
    {
      id: 5,
      title: 'Développement Web Full Stack',
      instructor: 'Claire Rousseau',
      duration: '16 semaines',
      level: 'Débutant',
      rating: 4.8,
      students: 98,
      price: 599,
      type: 'live',
      maxPlaces: 35,
      currentPlaces: 22,
      location: 'En ligne',
      image: 'https://readdy.ai/api/search-image?query=Web%20development%20coding%20bootcamp%20with%20multiple%20screens%2C%20programming%20environment%2C%20modern%20tech%20classroom%2C%20students%20coding&width=400&height=250&seq=formation-coding&orientation=landscape',
      tags: ['React', 'Node.js', 'MongoDB'],
      nextSession: '28 Janvier 2024',
      description: 'Devenez développeur full stack et créez des applications web complètes de A à Z.'
    },
    {
      id: 6,
      title: 'Nutrition et Bien-être',
      instructor: 'Emma Wilson',
      duration: '4 semaines',
      level: 'Débutant',
      rating: 4.6,
      students: 145,
      price: 149,
      type: 'presentiel',
      maxPlaces: 15,
      currentPlaces: 8,
      location: 'Marseille, France',
      image: 'https://readdy.ai/api/search-image?query=Nutrition%20wellness%20workshop%20with%20healthy%20foods%2C%20vegetables%2C%20fruits%2C%20bright%20natural%20lighting%2C%20professional%20health%20coaching%20environment&width=400&height=250&seq=formation-nutrition&orientation=landscape',
      tags: ['Nutrition', 'Santé', 'Bien-être'],
      nextSession: '30 Janvier 2024',
      description: 'Découvrez les secrets d\'une alimentation saine et équilibrée pour une vie plus épanouie.'
    },
    {
      id: 7,
      title: 'Fitness et Remise en Forme',
      instructor: 'Julie Lambert',
      duration: '8 semaines',
      level: 'Tous niveaux',
      rating: 4.7,
      students: 203,
      price: 179,
      type: 'presentiel',
      maxPlaces: 12,
      currentPlaces: 5,
      location: 'Nice, France',
      image: 'https://readdy.ai/api/search-image?query=Fitness%20training%20group%20class%20with%20people%20exercising%2C%20modern%20gym%20equipment%2C%20energetic%20atmosphere%2C%20professional%20fitness%20coaching&width=400&height=250&seq=formation-fitness&orientation=landscape',
      tags: ['Fitness', 'Musculation', 'Cardio'],
      nextSession: '1 Février 2024',
      description: 'Atteignez vos objectifs de forme physique avec un programme d\'entraînement personnalisé.'
    },
    {
      id: 8,
      title: 'Psychologie Positive',
      instructor: 'Dr. Sarah Martin',
      duration: '6 semaines',
      level: 'Intermédiaire',
      rating: 4.9,
      students: 167,
      price: 249,
      type: 'live',
      maxPlaces: 25,
      currentPlaces: 19,
      location: 'En ligne',
      image: 'https://readdy.ai/api/search-image?query=Psychology%20positive%20thinking%20workshop%20with%20people%20in%20bright%20room%2C%20motivational%20atmosphere%2C%20professional%20therapy%20training%20environment&width=400&height=250&seq=formation-psychology&orientation=landscape',
      tags: ['Psychologie', 'Bonheur', 'Mindfulness'],
      nextSession: '3 Février 2024',
      description: 'Développez votre bien-être mental et apprenez les techniques de psychologie positive.'
    }
  ];

  const getTexts = () => {
    const texts = {
      fr: {
        title: 'Formations Professionnelles',
        subtitle: 'Développez vos compétences avec nos formations certifiées dispensées par des experts',
        viewMore: 'Voir plus de formations'
      },
      ar: {
        title: 'التدريبات المهنية',
        subtitle: 'طور مهاراتك مع تدريباتنا المعتمدة التي يقدمها خبراء',
        viewMore: 'عرض المزيد من التدريبات'
      },
      en: {
        title: 'Professional Formations',
        subtitle: 'Develop your skills with our certified training programs delivered by experts',
        viewMore: 'View more formations'
      }
    };
    return texts[currentLanguage as keyof typeof texts] || texts.fr;
  };

  const text = getTexts();

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {formations.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/formations"
            className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          >
            <span className="mr-2">{text.viewMore}</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
