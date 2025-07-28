
'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Link from 'next/link';

export default function Appointments() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = {
    upcoming: [
      {
        id: 1,
        expert: 'Dr. Sarah Martin',
        type: 'Consultation individuelle',
        date: '2024-01-15',
        time: '14:30',
        duration: '60 min',
        price: 150,
        coins: 150,
        status: 'confirmed',
        category: 'Bien-être',
        joinLink: '/consultation/1',
        canJoin: true,
        image: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20with%20warm%20smile%2C%20modern%20office%20background%2C%20confident%20and%20approachable%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-1&orientation=squarish'
      },
      {
        id: 2,
        expert: 'Marc Dubois',
        type: 'Formation - Marketing Digital',
        date: '2024-01-16',
        time: '10:00',
        duration: '90 min',
        price: 299,
        coins: 299,
        status: 'confirmed',
        category: 'Formation',
        joinLink: '/formation/1/live',
        canJoin: false,
        formationId: 1,
        enrolled: 45,
        minEnrolled: 10,
        image: 'https://readdy.ai/api/search-image?query=Professional%20male%20marketing%20expert%20with%20confident%20smile%2C%20modern%20digital%20office%20background%2C%20business%20casual%20attire%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-2&orientation=squarish'
      },
      {
        id: 3,
        expert: 'Sophie Laurent',
        type: 'Coaching personnel',
        date: '2024-01-18',
        time: '16:00',
        duration: '45 min',
        price: 120,
        coins: 120,
        status: 'confirmed',
        category: 'Développement Personnel',
        joinLink: '/consultation/3',
        canJoin: true,
        image: 'https://readdy.ai/api/search-image?query=Professional%20female%20life%20coach%20with%20inspiring%20smile%2C%20bright%20modern%20office%20background%2C%20professional%20attire%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-3&orientation=squarish'
      }
    ],
    completed: [
      {
        id: 4,
        expert: 'Thomas Bernard',
        type: 'Conseil financier',
        date: '2024-01-10',
        time: '11:00',
        duration: '60 min',
        price: 180,
        coins: 180,
        status: 'completed',
        category: 'Finance',
        rating: 5,
        review: 'Excellente session, très informatif !',
        image: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-6&orientation=squarish'
      },
      {
        id: 5,
        expert: 'Claire Rousseau',
        type: 'Formation - Développement Web',
        date: '2024-01-08',
        time: '15:30',
        duration: '2 heures',
        price: 250,
        coins: 250,
        status: 'completed',
        category: 'Formation',
        rating: 4,
        review: 'Très technique et bien expliqué.',
        certificateAvailable: true,
        image: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20casual%20professional%20attire%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-5&orientation=squarish'
      }
    ],
    cancelled: [
      {
        id: 6,
        expert: 'Jean-Pierre Moreau',
        type: 'Stratégie d\'entreprise',
        date: '2024-01-12',
        time: '09:00',
        duration: '60 min',
        price: 200,
        coins: 200,
        status: 'cancelled',
        category: 'Business',
        refunded: true,
        refundAmount: 200,
        image: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20consultant%20with%20serious%20expression%2C%20corporate%20office%20background%2C%20elegant%20suit%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-4&orientation=squarish'
      }
    ]
  };

  const handleJoinSession = (appointment) => {
    setSelectedAppointment(appointment);
    setShowJoinModal(true);
  };

  const handleJoinFormation = (appointment) => {
    if (appointment.formationId) {
      window.open(`/dashboard/formation/${appointment.formationId}/live`, '_blank');
    }
  };

  const isDateToday = (dateString) => {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return today.toDateString() === appointmentDate.toDateString();
  };

  const isTimeNow = (dateString, timeString) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${dateString}T${timeString}`);
    const timeDiff = Math.abs(appointmentDateTime.getTime() - now.getTime());
    return timeDiff <= 15 * 60 * 1000; // 15 minutes
  };

  const canJoinNow = (appointment) => {
    return isDateToday(appointment.date) && isTimeNow(appointment.date, appointment.time);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes Rendez-vous
          </h1>
          <p className="text-gray-600">
            Gérez vos consultations et formations avec nos experts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <i className="ri-calendar-line text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{appointments.upcoming.length}</h3>
                <p className="text-gray-600 text-sm">À venir</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{appointments.completed.length}</h3>
                <p className="text-gray-600 text-sm">Terminés</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <i className="ri-graduation-cap-line text-purple-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {appointments.upcoming.filter(a => a.type.includes('Formation')).length}
                </h3>
                <p className="text-gray-600 text-sm">Formations</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-coins-line text-orange-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {appointments.upcoming.reduce((sum, a) => sum + a.coins, 0)}
                </h3>
                <p className="text-gray-600 text-sm">Coins investis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg max-w-md">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'upcoming'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              À venir ({appointments.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Terminés ({appointments.completed.length})
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'cancelled'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annulés ({appointments.cancelled.length})
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments[activeTab].map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={appointment.image}
                    alt={appointment.expert}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.expert}</h3>
                    <p className="text-gray-600">{appointment.type}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">
                        <i className="ri-calendar-line mr-1"></i>
                        {new Date(appointment.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="text-sm text-gray-500">
                        <i className="ri-time-line mr-1"></i>
                        {appointment.time}
                      </span>
                      <span className="text-sm text-gray-500">
                        <i className="ri-timer-line mr-1"></i>
                        {appointment.duration}
                      </span>
                    </div>
                    
                    {/* Formation specific info */}
                    {appointment.type.includes('Formation') && appointment.enrolled && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-blue-600">
                            <i className="ri-group-line mr-1"></i>
                            {appointment.enrolled} inscrits
                          </span>
                          <span className="text-sm text-gray-500">
                            (minimum: {appointment.minEnrolled})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {appointment.status === 'confirmed' ? 'Confirmé' :
                       appointment.status === 'pending' ? 'En attente' :
                       appointment.status === 'cancelled' ? 'Annulé' : 'Terminé'}
                    </span>
                    
                    {appointment.status === 'confirmed' && new Date(appointment.date + 'T' + appointment.time) <= new Date() && (
                      <Link
                        href={`/video-session/session-${appointment.id}`}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap cursor-pointer"
                      >
                        Rejoindre
                      </Link>
                    )}
                    
                    {appointment.status === 'confirmed' && new Date(appointment.date + 'T' + appointment.time) > new Date() && (
                      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg text-sm">
                        Planifié
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {activeTab === 'upcoming' && appointment.status === 'confirmed' && (
                      <>
                        {appointment.type.includes('Formation') ? (
                          <button
                            onClick={() => handleJoinFormation(appointment)}
                            disabled={!canJoinNow(appointment)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                              canJoinNow(appointment)
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {canJoinNow(appointment) ? 'Rejoindre formation' : 'Pas encore disponible'}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleJoinSession(appointment)}
                            disabled={!canJoinNow(appointment)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                              canJoinNow(appointment)
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {canJoinNow(appointment) ? 'Rejoindre' : 'Pas encore disponible'}
                          </button>
                        )}
                        
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                          Reprogrammer
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm whitespace-nowrap">
                          Annuler
                        </button>
                      </>
                    )}
                    
                    {activeTab === 'completed' && (
                      <>
                        {appointment.certificateAvailable && (
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm whitespace-nowrap">
                            Télécharger certificat
                          </button>
                        )}
                        {!appointment.rating && (
                          <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors text-sm whitespace-nowrap">
                            Laisser un avis
                          </button>
                        )}
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm whitespace-nowrap">
                          Voir détails
                        </button>
                      </>
                    )}
                    
                    {activeTab === 'cancelled' && appointment.refunded && (
                      <div className="text-green-600 text-sm">
                        <i className="ri-refund-line mr-1"></i>
                        Remboursé: {appointment.refundAmount} coins
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appointments[activeTab].length === 0 && (
          <div className="text-center py-12">
            <i className="ri-calendar-line text-6xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun rendez-vous
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n\'avez aucun rendez-vous dans cette catégorie.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/dashboard/search"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
              >
                Trouver un expert
              </Link>
              <Link
                href="/formations"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold whitespace-nowrap"
              >
                Voir les formations
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Join Session Modal */}
      {showJoinModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Rejoindre la session
            </h3>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                <strong>Expert:</strong> {selectedAppointment.expert}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Type:</strong> {selectedAppointment.type}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Durée:</strong> {selectedAppointment.duration}
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <i className="ri-information-line mr-2"></i>
                Assurez-vous d\'avoir un environnement calme et une connexion internet stable.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  if (selectedAppointment.joinLink) {
                    window.open(selectedAppointment.joinLink, '_blank');
                  }
                }}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Rejoindre maintenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
