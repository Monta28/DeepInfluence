
'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';

interface FormationDetailProps {
  formationId: string;
}

export default function FormationDetail({ formationId }: FormationDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollmentStep, setEnrollmentStep] = useState(1);

  const formation = {
    id: formationId,
    title: 'Marketing Digital Avancé',
    instructor: 'Marc Dubois',
    instructorImage: 'https://readdy.ai/api/search-image?query=Professional%20male%20marketing%20expert%20with%20confident%20smile%2C%20modern%20digital%20office%20background%2C%20business%20casual%20attire%2C%20high%20quality%20portrait&width=80&height=80&seq=expert-2&orientation=squarish',
    instructorBio: 'Expert en marketing digital avec 15 ans d\'expérience, ancien directeur marketing chez Google France.',
    duration: '8 semaines',
    level: 'Intermédiaire',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    students: 1250,
    language: 'Français',
    certificate: true,
    category: 'Marketing',
    image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20marketing%20training%20session%20with%20laptop%2C%20charts%2C%20and%20social%20media%20icons%2C%20professional%20learning%20environment%2C%20bright%20colors&width=800&height=400&seq=formation-1&orientation=landscape',
    description: 'Maîtrisez les stratégies avancées du marketing digital avec cette formation complète. Apprenez à créer des campagnes performantes, analyser les données et optimiser votre ROI.',
    learningObjectives: [
      'Développer une stratégie marketing digital complète',
      'Maîtriser les outils d\'analyse et de mesure',
      'Optimiser les campagnes publicitaires',
      'Créer du contenu engageant pour les réseaux sociaux',
      'Automatiser les processus marketing',
      'Mesurer et améliorer le ROI'
    ],
    prerequisites: [
      'Connaissances de base en marketing',
      'Familiarité avec les réseaux sociaux',
      'Accès à un ordinateur avec internet',
      'Motivation et disponibilité 4h/semaine'
    ],
    schedule: [
      { 
        week: 1,
        date: '2024-02-15', 
        time: '19:00 - 21:00', 
        topic: 'Introduction au marketing digital',
        description: 'Panorama complet du marketing digital et ses enjeux'
      },
      { 
        week: 2,
        date: '2024-02-22', 
        time: '19:00 - 21:00', 
        topic: 'Stratégies de contenu et SEO',
        description: 'Création de contenu optimisé et référencement naturel'
      },
      { 
        week: 3,
        date: '2024-03-01', 
        time: '19:00 - 21:00', 
        topic: 'Publicité en ligne (Google Ads)',
        description: 'Création et optimisation de campagnes publicitaires'
      },
      { 
        week: 4,
        date: '2024-03-08', 
        time: '19:00 - 21:00', 
        topic: 'Marketing sur les réseaux sociaux',
        description: 'Stratégies avancées pour Facebook, Instagram, LinkedIn'
      },
      { 
        week: 5,
        date: '2024-03-15', 
        time: '19:00 - 21:00', 
        topic: 'Email marketing et automation',
        description: 'Création de séquences automatisées et nurturing'
      },
      { 
        week: 6,
        date: '2024-03-22', 
        time: '19:00 - 21:00', 
        topic: 'Analytics et mesure de performance',
        description: 'Google Analytics, KPIs et tableau de bord'
      },
      { 
        week: 7,
        date: '2024-03-29', 
        time: '19:00 - 21:00', 
        topic: 'Stratégies d\'optimisation avancées',
        description: 'A/B testing, personnalisation et conversion'
      },
      { 
        week: 8,
        date: '2024-04-05', 
        time: '19:00 - 21:00', 
        topic: 'Projet final et certification',
        description: 'Présentation des projets et évaluation finale'
      }
    ],
    materials: [
      'Accès à la plateforme de formation 24h/24',
      'Documents PDF téléchargeables',
      'Modèles et templates exclusifs',
      'Enregistrements des sessions en direct',
      'Support technique et pédagogique'
    ],
    tools: [
      'Google Analytics',
      'Google Ads',
      'Facebook Business Manager',
      'Mailchimp',
      'Canva Pro',
      'Hootsuite'
    ]
  };

  const reviews = [
    {
      id: 1,
      user: 'Alice Martin',
      rating: 5,
      date: '2024-01-10',
      comment: 'Formation excellente ! Marc explique très clairement et les exemples sont concrets. J\'ai pu appliquer directement dans mon entreprise.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20woman%20headshot%20with%20friendly%20smile%2C%20neutral%20background%2C%20modern%20portrait&width=60&height=60&seq=review-1&orientation=squarish',
      verified: true
    },
    {
      id: 2,
      user: 'Thomas Dubois',
      rating: 5,
      date: '2024-01-08',
      comment: 'Très pratique avec de vrais cas d\'usage. Les outils recommandés sont parfaitement adaptés. Je recommande vivement !',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20man%20headshot%20with%20confident%20smile%2C%20neutral%20background%2C%20modern%20portrait&width=60&height=60&seq=review-2&orientation=squarish',
      verified: true
    },
    {
      id: 3,
      user: 'Sophie Lambert',
      rating: 4,
      date: '2024-01-05',
      comment: 'Contenu riche et bien structuré. Le support est réactif. Quelques concepts avancés mais Marc rend tout accessible.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20woman%20headshot%20with%20warm%20smile%2C%20neutral%20background%2C%20modern%20portrait&width=60&height=60&seq=review-3&orientation=squarish',
      verified: false
    },
    {
      id: 4,
      user: 'David Chen',
      rating: 5,
      date: '2024-01-03',
      comment: 'ROI immédiat ! J\'ai augmenté mes ventes de 40% en appliquant les techniques apprises. Formation au top !',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20man%20headshot%20with%20confident%20smile%2C%20neutral%20background%2C%20modern%20portrait&width=60&height=60&seq=review-4&orientation=squarish',
      verified: true
    }
  ];

  const handleEnroll = () => {
    setShowEnrollModal(true);
    setEnrollmentStep(1);
  };

  const confirmEnrollment = () => {
    if (enrollmentStep < 3) {
      setEnrollmentStep(enrollmentStep + 1);
    } else {
      setShowEnrollModal(false);
      setEnrollmentStep(1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-8 text-sm">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
            Tableau de bord
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/dashboard/search" className="text-gray-500 hover:text-gray-700">
            Recherche
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Formation</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="relative">
            <img
              src={formation.image}
              alt={formation.title}
              className="w-full h-64 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                  {formation.level}
                </span>
                <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                  {formation.language}
                </span>
                {formation.certificate && (
                  <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                    Certificat inclus
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{formation.title}</h1>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 mb-6 lg:mb-0 lg:pr-8">
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{formation.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <i className="ri-time-line text-blue-600"></i>
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-group-line text-blue-600"></i>
                    <span>{formation.students} étudiants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ri-star-${i < Math.floor(formation.rating) ? 'fill' : 'line'}`}></i>
                      ))}
                    </div>
                    <span className="text-gray-900 font-medium">{formation.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <img
                    src={formation.instructorImage}
                    alt={formation.instructor}
                    className="w-14 h-14 rounded-full object-cover object-top"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{formation.instructor}</h3>
                    <p className="text-sm text-gray-600">{formation.instructorBio}</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900">{formation.price}€</span>
                      {formation.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">{formation.originalPrice}€</span>
                      )}
                    </div>
                    {formation.originalPrice && (
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                          -{Math.round((1 - formation.price / formation.originalPrice) * 100)}%
                        </span>
                        <span className="text-sm text-green-600">
                          Économisez {formation.originalPrice - formation.price}€
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Début de la formation</span>
                      <span className="font-medium text-gray-900">15 février 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Places disponibles</span>
                      <span className="font-medium text-green-600">8 places</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Accès</span>
                      <span className="font-medium text-gray-900">À vie</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg whitespace-nowrap"
                  >
                    S'inscrire maintenant
                  </button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Garantie satisfait ou remboursé 30 jours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg border border-gray-200">
            {[
              { id: 'overview', label: 'Aperçu', icon: 'ri-eye-line' },
              { id: 'program', label: 'Programme', icon: 'ri-book-open-line' },
              { id: 'instructor', label: 'Instructeur', icon: 'ri-user-line' },
              { id: 'reviews', label: 'Avis', icon: 'ri-star-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {activeTab === 'overview' && (
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Ce que vous apprendrez
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {formation.learningObjectives.map((objective, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="ri-check-line text-green-600 text-sm"></i>
                          </div>
                          <span className="text-gray-700">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Prérequis
                    </h3>
                    <ul className="space-y-3">
                      {formation.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="ri-information-line text-blue-600 text-sm"></i>
                          </div>
                          <span className="text-gray-700">{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Ressources incluses
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {formation.materials.map((material, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="ri-gift-line text-purple-600 text-sm"></i>
                          </div>
                          <span className="text-gray-700">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Détails de la formation
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <i className="ri-time-line text-gray-600"></i>
                        <div>
                          <p className="font-medium text-gray-900">Durée</p>
                          <p className="text-sm text-gray-600">{formation.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-bar-chart-line text-gray-600"></i>
                        <div>
                          <p className="font-medium text-gray-900">Niveau</p>
                          <p className="text-sm text-gray-600">{formation.level}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-global-line text-gray-600"></i>
                        <div>
                          <p className="font-medium text-gray-900">Langue</p>
                          <p className="text-sm text-gray-600">{formation.language}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-award-line text-gray-600"></i>
                        <div>
                          <p className="font-medium text-gray-900">Certificat</p>
                          <p className="text-sm text-gray-600">
                            {formation.certificate ? 'Inclus' : 'Non inclus'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Outils utilisés
                    </h3>
                    <div className="space-y-2">
                      {formation.tools.map((tool, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <i className="ri-tools-line text-blue-600"></i>
                          <span className="text-sm text-gray-700">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'program' && (
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Programme détaillé - {formation.duration}
              </h3>
              <div className="space-y-4">
                {formation.schedule.map((session, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                        {session.week}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{session.topic}</h4>
                        <p className="text-gray-600 mb-3">{session.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <i className="ri-calendar-line"></i>
                            <span>{formatDate(session.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <i className="ri-time-line"></i>
                            <span>{session.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="p-8">
              <div className="flex items-start space-x-6 mb-8">
                <img
                  src={formation.instructorImage}
                  alt={formation.instructor}
                  className="w-24 h-24 rounded-full object-cover object-top"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{formation.instructor}</h3>
                  <p className="text-gray-600 mb-4">{formation.instructorBio}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <i className="ri-user-line"></i>
                      <span>{formation.students} étudiants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <span>{formation.rating} note moyenne</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Expertise</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span className="text-sm text-gray-700">Marketing Digital</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span className="text-sm text-gray-700">Growth Hacking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span className="text-sm text-gray-700">E-commerce</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span className="text-sm text-gray-700">Analytics</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Expérience</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900">Ex-Google France</p>
                      <p className="text-sm text-gray-600">Directeur Marketing (2018-2022)</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Consultant Indépendant</p>
                      <p className="text-sm text-gray-600">Depuis 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Avis des étudiants
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`ri-star-${i < Math.floor(formation.rating) ? 'fill' : 'line'}`}></i>
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{formation.rating}</span>
                  <span className="text-gray-600">({reviews.length} avis)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover object-top"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{review.user}</h4>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Vérifié
                            </span>
                          )}
                          <div className="flex items-center space-x-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-sm`}></i>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showEnrollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {enrollmentStep === 1 && 'Confirmer l\'inscription'}
                  {enrollmentStep === 2 && 'Paiement'}
                  {enrollmentStep === 3 && 'Inscription confirmée'}
                </h3>
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {enrollmentStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Formation:</span>
                      <span className="font-medium text-gray-900">{formation.title}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Instructeur:</span>
                      <span className="font-medium text-gray-900">{formation.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Prix:</span>
                      <span className="font-medium text-gray-900">{formation.price}€</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Début:</span>
                      <span className="font-medium text-gray-900">15 février 2024</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowEnrollModal(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={confirmEnrollment}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Continuer
                    </button>
                  </div>
                </div>
              )}

              {enrollmentStep === 2 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <i className="ri-secure-payment-line text-4xl text-blue-600 mb-2"></i>
                    <p className="text-gray-600">Paiement sécurisé</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total à payer:</span>
                      <span>{formation.price}€</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setEnrollmentStep(1)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                    >
                      Retour
                    </button>
                    <button
                      onClick={confirmEnrollment}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Payer maintenant
                    </button>
                  </div>
                </div>
              )}

              {enrollmentStep === 3 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="ri-check-line text-2xl text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Inscription confirmée !
                    </h4>
                    <p className="text-gray-600">
                      Vous recevrez bientôt un email de confirmation avec tous les détails.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowEnrollModal(false)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Fermer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}