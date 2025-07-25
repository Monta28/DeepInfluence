'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApiService, { Expert } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

interface ExpertProfileProps {
  expertId: string;
}

export default function ExpertProfile({ expertId }: ExpertProfileProps) {
  const [activeTab, setActiveTab] = useState('about');
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  // Charger les données de l'expert
  useEffect(() => {
    loadExpert();
  }, [expertId]);

  const loadExpert = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await ApiService.getExpert(parseInt(expertId));
      
      if (response.success) {
        setExpert(response.data);
      } else {
        setError('Expert non trouvé');
      }
    } catch (err: any) {
      console.error('Erreur lors du chargement de l\'expert:', err);
      if (err.message.includes('fetch')) {
        setError('Impossible de se connecter au serveur. Vérifiez que le backend est démarré.');
        
        // Données de fallback avec structure correcte
        setExpert({
          id: parseInt(expertId),
          name: 'Dr. Sarah Martin',
          specialty: 'Psychologue clinique',
          rating: 4.9,
          reviews: 147,
          hourlyRate: 80,
          pricePerMessage: 15,
          image: 'https://ui-avatars.com/api/?name=Sarah+Martin&size=300&background=3B82F6&color=ffffff',
          isOnline: true,
          verified: true,
          category: 'bien-etre',
          languages: ['Français', 'Anglais'],
          responseTime: '2 minutes',
          sessions: 450,
          followers: 12500,
          tags: ['Stress', 'Anxiété', 'Développement personnel']
        });
      } else {
        setError(err.message || 'Erreur lors du chargement de l\'expert');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContact = () => {
    if (!user) {
      router.push('/signin');
      return;
    }
    setShowContactModal(true);
  };

  const handleBooking = () => {
    if (!user) {
      router.push('/signin');
      return;
    }
    setShowBookingModal(true);
  };

  const handleFavorite = async () => {
    if (!user) {
      router.push('/signin');
      return;
    }
    
    try {
      // TODO: Implémenter l'endpoint pour ajouter/retirer des favoris
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Erreur lors de la gestion des favoris:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Chargement du profil...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center py-32">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-error-warning-line text-red-600 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert non trouvé</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
          <Link 
            href="/experts"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Retour aux experts
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Photo et infos principales */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={expert.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&size=200&background=3B82F6&color=ffffff`}
                  alt={expert.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
                />
                {expert.isOnline && (
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
                {expert.verified && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <i className="ri-shield-check-line text-white text-sm"></i>
                  </div>
                )}
              </div>
            </div>

            {/* Informations */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{expert.name}</h1>
                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <i className={`ri-heart-${isFavorite ? 'fill' : 'line'}`}></i>
                </button>
              </div>
              
              <p className="text-xl text-blue-100 mb-4">{expert.specialty}</p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-6">
                <div className="flex items-center text-yellow-400">
                  <i className="ri-star-fill mr-1"></i>
                  <span className="font-semibold">{expert.rating}</span>
                  <span className="text-blue-100 ml-1">({expert.reviews} avis)</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <i className="ri-user-line mr-1"></i>
                  <span>{expert.sessions} sessions</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <i className="ri-heart-line mr-1"></i>
                  <span>{expert.followers} followers</span>
                </div>
                {expert.responseTime && (
                  <div className="flex items-center text-green-300">
                    <i className="ri-time-line mr-1"></i>
                    <span>Répond en {expert.responseTime}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
                {expert.languages.map((lang, index) => (
                  <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleContact}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <i className="ri-message-line mr-2"></i>
                  Contacter ({expert.pricePerMessage} coins/message)
                </button>
                <button
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-500 transition-colors shadow-lg"
                >
                  <i className="ri-calendar-line mr-2"></i>
                  Réserver ({expert.hourlyRate} coins/heure)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation des onglets */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'about', label: 'À propos', icon: 'ri-user-line' },
              { id: 'reviews', label: 'Avis', icon: 'ri-star-line' },
              { id: 'availability', label: 'Disponibilités', icon: 'ri-calendar-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">À propos de {expert.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {expert.description || `${expert.name} est un expert reconnu dans le domaine de ${expert.specialty}. Avec de nombreuses années d'expérience, il/elle accompagne ses clients vers l'excellence et la réussite.`}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Domaines d'expertise</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {expert.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Tarifs</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <i className="ri-message-line text-blue-600 mr-3"></i>
                      <span className="font-medium">Message</span>
                    </div>
                    <span className="font-bold text-blue-600">{expert.pricePerMessage} coins</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <i className="ri-time-line text-green-600 mr-3"></i>
                      <span className="font-medium">Consultation</span>
                    </div>
                    <span className="font-bold text-green-600">{expert.hourlyRate} coins/h</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleContact}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <i className="ri-message-line mr-2"></i>
                    Envoyer un message
                  </button>
                  <button
                    onClick={handleBooking}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-colors font-semibold"
                  >
                    <i className="ri-calendar-line mr-2"></i>
                    Réserver une consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Avis clients ({expert.reviews})</h2>
            
            {/* Statistiques des avis */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{expert.rating}</div>
                  <div className="flex items-center justify-center text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`ri-star-${i < Math.floor(expert.rating) ? 'fill' : 'line'} text-xl`}></i>
                    ))}
                  </div>
                  <div className="text-gray-600 text-sm">{expert.reviews} avis</div>
                </div>
              </div>
            </div>

            {/* Message pour les avis */}
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-star-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Avis en cours de chargement</h3>
              <p className="text-gray-600">Les avis détaillés seront bientôt disponibles.</p>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Disponibilités</h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-calendar-line text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendrier de réservation</h3>
                <p className="text-gray-600 mb-6">Le système de réservation sera bientôt disponible.</p>
                <button
                  onClick={handleBooking}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Demander une consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contacter {expert.name}</h3>
            <p className="text-gray-600 mb-6">
              Cette fonctionnalité sera bientôt disponible. Vous pourrez envoyer des messages directement à l'expert.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
              <Link
                href={`/experts/${expertId}/contact`}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Continuer
              </Link>
            </div>
          </div>
        </div>
      )}

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Réserver avec {expert.name}</h3>
            <p className="text-gray-600 mb-6">
              Cette fonctionnalité sera bientôt disponible. Vous pourrez réserver des créneaux directement avec l'expert.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
              <Link
                href={`/experts/${expertId}/book`}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Continuer
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

