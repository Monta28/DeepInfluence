'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface FormationDetailProps {
  formationId: string;
}

export default function FormationDetail({ formationId }: FormationDetailProps) {
  const [activeTab, setActiveTab] = useState('apercu');
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [enrollmentStep, setEnrollmentStep] = useState(1);

  const formations = {
    '1': {
      id: 1,
      title: 'Stratégie Digitale Avancée',
      instructor: 'Dr. Sarah Martinez',
      category: 'Business',
      duration: '8 semaines',
      level: 'Avancé',
      price: 450,
      originalPrice: 600,
      rating: 4.9,
      students: 234,
      totalReviews: 89,
      image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20strategy%20training%20session%2C%20professional%20business%20workshop%2C%20contemporary%20classroom%20setting%2C%20digital%20marketing%20presentation%2C%20business%20strategy%20meeting%2C%20clean%20professional%20environment%2C%20modern%20technology%20integration%2C%20business%20professionals%20learning&width=800&height=400&seq=formation-digital-hero-001&orientation=landscape',
      description: 'Masterclass complète sur la transformation digitale et les stratégies modernes d\'entreprise. Apprenez à naviguer dans l\'économie numérique et à développer des stratégies gagnantes.',
      schedule: 'Mardi 18h - 20h',
      nextSession: '2024-02-15',
      language: 'Français',
      certificate: true,
      support: '24/7',
      accessDuration: '1 an',
      prerequisites: ['Expérience en gestion d\'entreprise', 'Notions de base en marketing'],
      objectives: [
        'Comprendre les enjeux de la transformation digitale',
        'Développer une stratégie digitale cohérente',
        'Maîtriser les outils d\'analyse et de mesure',
        'Implémenter des solutions innovantes'
      ],
      included: [
        'Accès à la plateforme de formation',
        'Matériel pédagogique complet',
        'Sessions live avec l\'expert',
        'Exercices pratiques et projets',
        'Certificat de fin de formation',
        'Support communautaire'
      ],
      tools: ['Google Analytics', 'SEMrush', 'Hootsuite', 'Slack', 'Trello'],
      program: [
        {
          week: 1,
          title: 'Introduction à la transformation digitale',
          content: 'Comprendre les enjeux et opportunités du digital',
          duration: '2h'
        },
        {
          week: 2,
          title: 'Stratégies marketing omnicanales',
          content: 'Développer une approche intégrée du marketing digital',
          duration: '2h'
        },
        {
          week: 3,
          title: 'Analytics et mesure de performance',
          content: 'Maîtriser les outils d\'analyse et KPIs',
          duration: '2h'
        },
        {
          week: 4,
          title: 'Leadership digital',
          content: 'Développer son leadership dans l\'ère numérique',
          duration: '2h'
        },
        {
          week: 5,
          title: 'Innovation et disruption',
          content: 'Anticiper les tendances et innover',
          duration: '2h'
        },
        {
          week: 6,
          title: 'Cas pratiques sectoriels',
          content: 'Études de cas réels et mises en situation',
          duration: '2h'
        },
        {
          week: 7,
          title: 'Projet final - Partie 1',
          content: 'Développement de votre stratégie digitale',
          duration: '2h'
        },
        {
          week: 8,
          title: 'Projet final - Partie 2',
          content: 'Présentation et validation du projet',
          duration: '2h'
        }
      ],
      instructor_details: {
        name: 'Dr. Sarah Martinez',
        title: 'Expert en Transformation Digitale',
        experience: '12 ans',
        rating: 4.9,
        students: 2847,
        image: 'https://readdy.ai/api/search-image?query=Professional%20female%20business%20consultant%20with%20confident%20smile%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20expertise%20in%20digital%20transformation%2C%20professional%20headshot%2C%20contemporary%20business%20environment&width=120&height=120&seq=instructor-sarah-001&orientation=squarish',
        bio: 'Dr. Sarah Martinez est une experte reconnue en transformation digitale avec plus de 12 ans d\'expérience. Elle a accompagné plus de 200 entreprises dans leur transition numérique.',
        expertise: ['Transformation digitale', 'Stratégie d\'entreprise', 'Marketing digital', 'Leadership'],
        education: ['PhD en Management - HEC Paris', 'MBA - INSEAD'],
        certifications: ['Google Analytics Certified', 'Facebook Blueprint Certified']
      },
      reviews: [
        {
          id: 1,
          name: 'Marie Dubois',
          rating: 5,
          comment: 'Formation exceptionnelle ! Dr. Martinez explique parfaitement les concepts complexes. Les cas pratiques sont très enrichissants.',
          date: '2024-01-10',
          verified: true
        },
        {
          id: 2,
          name: 'Jean-Pierre Martin',
          rating: 5,
          comment: 'Très pratique avec de vrais cas d\'usage. Les outils recommandés sont parfaitement adaptés. Je recommande vivement !',
          date: '2024-01-08',
          verified: true
        },
        {
          id: 3,
          name: 'Sophie Laurent',
          rating: 4,
          comment: 'Très bonne formation, peut-être un peu dense pour les débutants. Excellent suivi de l\'instructeur.',
          date: '2024-01-05',
          verified: true
        }
      ],
      availableSlots: 12,
      totalSlots: 25
    }
  };

  const formation = formations[formationId as keyof typeof formations];

  if (!formation) {
    return <div>Formation non trouvée</div>;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleEnrollment = () => {
    setShowEnrollmentModal(true);
    setEnrollmentStep(1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`ri-star-${i < rating ? 'fill' : 'line'} text-yellow-400`}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'apercu':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Objectifs de la formation
                </h3>
                <ul className="space-y-3">
                  {formation.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <i className="ri-check-line text-green-600 mr-3 mt-0.5"></i>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Prérequis
                </h3>
                <ul className="space-y-3">
                  {formation.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start">
                      <i className="ri-arrow-right-line text-blue-600 mr-3 mt-0.5"></i>
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ce qui est inclus
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formation.included.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <i className="ri-check-line text-green-600 mr-3"></i>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Outils utilisés
              </h3>
              <div className="flex flex-wrap gap-2">
                {formation.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'programme':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Programme détaillé - {formation.duration}
              </h3>
              <p className="text-gray-600">
                {formation.program.length} sessions de formation intensive
              </p>
            </div>
            
            <div className="space-y-4">
              {formation.program.map((session, index) => (
                <div key={index} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                        {session.week}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.content}</p>
                      </div>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">{session.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'instructeur':
        return (
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <img
                src={formation.instructor_details.image}
                alt={formation.instructor_details.name}
                className="w-32 h-32 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {formation.instructor_details.name}
                </h3>
                <p className="text-lg text-blue-600 mb-4">
                  {formation.instructor_details.title}
                </p>
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center">
                    {renderStars(formation.instructor_details.rating)}
                    <span className="ml-2 text-gray-600">
                      {formation.instructor_details.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    {formation.instructor_details.students} étudiants
                  </span>
                  <span className="text-gray-600">
                    {formation.instructor_details.experience} d'expérience
                  </span>
                </div>
                <p className="text-gray-700 mb-6">
                  {formation.instructor_details.bio}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Domaines d'expertise</h4>
                <div className="space-y-2">
                  {formation.instructor_details.expertise.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <i className="ri-star-line text-yellow-400 mr-2"></i>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Formation</h4>
                <div className="space-y-2">
                  {formation.instructor_details.education.map((edu, index) => (
                    <div key={index} className="flex items-center">
                      <i className="ri-graduation-cap-line text-blue-600 mr-2"></i>
                      <span className="text-gray-700">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {formation.instructor_details.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'avis':
        return (
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Avis des étudiants
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {renderStars(formation.rating)}
                    <span className="ml-2 text-lg font-semibold text-gray-900">
                      {formation.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    {formation.totalReviews} avis
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{star}</span>
                    <i className="ri-star-fill text-yellow-400 mr-2"></i>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: star === 5 ? '70%' : star === 4 ? '25%' : '5%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {formation.reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          {review.verified && (
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              Vérifié
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Accueil</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/formations" className="hover:text-blue-600">Formations</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">{formation.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <img
          src={formation.image}
          alt={formation.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(formation.level)}`}>
                {formation.level}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                {formation.category}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                {formation.duration}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {formation.title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              {formation.description}
            </p>
            
            <div className="flex items-center space-x-8 mb-8">
              <div className="flex items-center">
                {renderStars(formation.rating)}
                <span className="ml-2 text-lg font-semibold">{formation.rating}</span>
                <span className="ml-1 text-blue-200">({formation.totalReviews} avis)</span>
              </div>
              <div className="flex items-center">
                <i className="ri-group-line mr-2"></i>
                <span>{formation.students} étudiants</span>
              </div>
              <div className="flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                <span>Début: {formatDate(formation.nextSession)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold">{formation.price} coins</span>
                <span className="text-lg text-blue-200 line-through">{formation.originalPrice} coins</span>
              </div>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Économisez {formation.originalPrice - formation.price} coins
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {[
                  { id: 'apercu', label: 'Aperçu' },
                  { id: 'programme', label: 'Programme' },
                  { id: 'instructeur', label: 'Instructeur' },
                  { id: 'avis', label: 'Avis' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg p-8">
              {renderTabContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{formation.price} coins</span>
                  <span className="text-lg text-gray-400 line-through">{formation.originalPrice} coins</span>
                </div>
                <p className="text-green-600 font-medium">
                  Économisez {formation.originalPrice - formation.price} coins
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Places disponibles</span>
                  <span className="font-semibold text-gray-900">
                    {formation.availableSlots}/{formation.totalSlots}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${((formation.totalSlots - formation.availableSlots) / formation.totalSlots) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleEnrollment}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap mb-4"
              >
                S'inscrire maintenant
              </button>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="ri-calendar-line mr-3 text-blue-600"></i>
                  <span>Début: {formatDate(formation.nextSession)}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line mr-3 text-blue-600"></i>
                  <span>{formation.schedule}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-global-line mr-3 text-blue-600"></i>
                  <span>{formation.language}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-award-line mr-3 text-blue-600"></i>
                  <span>Certificat inclus</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-customer-service-line mr-3 text-blue-600"></i>
                  <span>Support {formation.support}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line mr-3 text-blue-600"></i>
                  <span>Accès {formation.accessDuration}</span>
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Votre instructeur</h3>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={formation.instructor_details.image}
                  alt={formation.instructor_details.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{formation.instructor_details.name}</p>
                  <p className="text-sm text-gray-600">{formation.instructor_details.title}</p>
                  <div className="flex items-center mt-1">
                    {renderStars(formation.instructor_details.rating)}
                    <span className="ml-1 text-sm text-gray-600">
                      {formation.instructor_details.rating}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {formation.instructor_details.experience} d'expérience • {formation.instructor_details.students} étudiants
              </p>
              <button
                onClick={() => setActiveTab('instructeur')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer whitespace-nowrap"
              >
                Voir le profil complet →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Inscription à la formation
              </h3>
              <button
                onClick={() => setShowEnrollmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {enrollmentStep === 1 && (
              <div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{formation.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{formation.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Prix de la formation</span>
                      <span className="font-semibold">{formation.price} coins</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Prix original</span>
                      <span className="line-through">{formation.originalPrice} coins</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowEnrollmentModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => setEnrollmentStep(2)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            )}

            {enrollmentStep === 2 && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line text-green-600 text-2xl"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Inscription confirmée !
                  </h4>
                  <p className="text-gray-600">
                    Vous êtes maintenant inscrit à la formation "{formation.title}".
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-blue-900 mb-2">Prochaines étapes :</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Vous recevrez un email de confirmation</li>
                    <li>• Rejoignez la session le {formatDate(formation.nextSession)}</li>
                    <li>• Accédez aux ressources dans votre dashboard</li>
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowEnrollmentModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
                  >
                    Fermer
                  </button>
                  <Link
                    href="/dashboard/appointments"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap text-center"
                  >
                    Voir mes rendez-vous
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}