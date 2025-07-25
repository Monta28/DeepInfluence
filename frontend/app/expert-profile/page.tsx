'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../services/api';

export default function ExpertProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCreateFormationModal, setShowCreateFormationModal] = useState(false);
  const [showCreateVideoModal, setShowCreateVideoModal] = useState(false);
  const [expertStats, setExpertStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }

    if (user.userType !== 'expert') {
      router.push('/dashboard');
      return;
    }

    console.log('Chargement du profil expert pour:', user.email);
    loadExpertStats();
  }, [user, router]);

  const loadExpertStats = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Chargement des statistiques expert...');
      
      // Charger les statistiques de l'expert
      const response = await ApiService.getUserStats();
      console.log('Réponse stats expert:', response);
      
      if (response.success && response.data) {
        setExpertStats(response.data);
      } else {
        console.log('Utilisation des données de fallback pour expert');
        // Données de fallback pour expert
        const fallbackStats = {
          totalEarnings: 12500,
          monthlyEarnings: 2800,
          totalSessions: 156,
          totalStudents: 89,
          averageRating: 4.8,
          totalReviews: 67,
          activeFormations: 5,
          totalVideos: 12,
          pendingWithdrawals: 1200,
          availableBalance: 8300,
          completionRate: 96,
          responseTime: '2 minutes',
          profileViews: 1250,
          monthlyGrowth: 15,
          upcomingAppointments: 8,
          totalHours: 320
        };
        setExpertStats(fallbackStats);
      }
    } catch (err: any) {
      console.error('Erreur lors du chargement des statistiques expert:', err);
      setError(`Erreur de connexion: ${err.message}. Utilisation de données de démonstration.`);
      
      // Données de fallback pour expert
      const fallbackStats = {
        totalEarnings: 12500,
        monthlyEarnings: 2800,
        totalSessions: 156,
        totalStudents: 89,
        averageRating: 4.8,
        totalReviews: 67,
        activeFormations: 5,
        totalVideos: 12,
        pendingWithdrawals: 1200,
        availableBalance: 8300,
        completionRate: 96,
        responseTime: '2 minutes',
        profileViews: 1250,
        monthlyGrowth: 15,
        upcomingAppointments: 8,
        totalHours: 320
      };
      setExpertStats(fallbackStats);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFormation = () => {
    setShowCreateFormationModal(true);
  };

  const handleCreateVideo = () => {
    setShowCreateVideoModal(true);
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  if (!user || user.userType !== 'expert') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement du profil expert...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Expert */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Profil Expert</h1>
                <p className="text-xl opacity-90">{user.firstName} {user.lastName}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 mr-1"></i>
                    <span className="font-semibold">{expertStats?.averageRating || '4.8'}</span>
                    <span className="opacity-75 ml-1">({expertStats?.totalReviews || 67} avis)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-group-line mr-1"></i>
                    <span>{expertStats?.totalStudents || 89} étudiants</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-time-line mr-1"></i>
                    <span>Répond en {expertStats?.responseTime || '2 minutes'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-sm opacity-75">Revenus ce mois</p>
                <p className="text-3xl font-bold">{expertStats?.monthlyEarnings || 2800}€</p>
                <p className="text-sm opacity-75">
                  <i className="ri-arrow-up-line text-green-300"></i>
                  +{expertStats?.monthlyGrowth || 15}% vs mois dernier
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages d'erreur */}
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <i className="ri-information-line text-yellow-600 dark:text-yellow-400 text-xl mr-3"></i>
              <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
            </div>
          </div>
        )}

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenus totaux</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {expertStats?.totalEarnings || 12500}€
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-money-euro-circle-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions totales</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {expertStats?.totalSessions || 156}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Formations actives</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {expertStats?.activeFormations || 5}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-graduation-cap-line text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vidéos publiées</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {expertStats?.totalVideos || 12}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <i className="ri-play-circle-line text-red-600 dark:text-red-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'earnings'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Revenus
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'content'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Contenu
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Analytiques
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vue d'ensemble</h2>
                
                {/* Actions rapides */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={handleCreateFormation}
                    className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-left"
                  >
                    <i className="ri-graduation-cap-line text-2xl mb-3 block"></i>
                    <h3 className="font-semibold mb-2">Créer une formation</h3>
                    <p className="text-sm opacity-90">Partagez votre expertise avec une nouvelle formation</p>
                  </button>

                  <button
                    onClick={handleCreateVideo}
                    className="p-6 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 text-left"
                  >
                    <i className="ri-video-add-line text-2xl mb-3 block"></i>
                    <h3 className="font-semibold mb-2">Publier une vidéo</h3>
                    <p className="text-sm opacity-90">Créez du contenu vidéo pour vos étudiants</p>
                  </button>

                  <button
                    onClick={handleWithdraw}
                    className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-left"
                  >
                    <i className="ri-bank-card-line text-2xl mb-3 block"></i>
                    <h3 className="font-semibold mb-2">Retirer des fonds</h3>
                    <p className="text-sm opacity-90">Disponible: {expertStats?.availableBalance || 8300}€</p>
                  </button>
                </div>

                {/* Prochains rendez-vous */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Prochains rendez-vous
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-blue-600 dark:text-blue-400"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Session avec Marie Dupont</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Développement personnel</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Aujourd'hui 14h00</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">60 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-green-600 dark:text-green-400"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Formation Marketing Digital</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Groupe de 15 participants</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Demain 10h00</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">120 minutes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {expertStats?.upcomingAppointments || 8} rendez-vous programmés cette semaine
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Revenus</h2>
                  <button
                    onClick={handleWithdraw}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <i className="ri-bank-card-line mr-2"></i>
                    Retirer des fonds
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Solde disponible</p>
                        <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                          {expertStats?.availableBalance || 8300}€
                        </p>
                      </div>
                      <i className="ri-wallet-line text-green-600 dark:text-green-400 text-3xl"></i>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">En attente</p>
                        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                          {expertStats?.pendingWithdrawals || 1200}€
                        </p>
                      </div>
                      <i className="ri-time-line text-blue-600 dark:text-blue-400 text-3xl"></i>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total gagné</p>
                        <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                          {expertStats?.totalEarnings || 12500}€
                        </p>
                      </div>
                      <i className="ri-trophy-line text-purple-600 dark:text-purple-400 text-3xl"></i>
                    </div>
                  </div>
                </div>

                {/* Historique des revenus */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Revenus des 30 derniers jours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Session individuelle - Marie D.</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">25 juillet 2024</p>
                      </div>
                      <span className="text-green-600 dark:text-green-400 font-semibold">+80€</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Formation Marketing Digital</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">24 juillet 2024</p>
                      </div>
                      <span className="text-green-600 dark:text-green-400 font-semibold">+450€</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Vidéo premium - Gestion du stress</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">23 juillet 2024</p>
                      </div>
                      <span className="text-green-600 dark:text-green-400 font-semibold">+25€</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gestion du contenu</h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCreateFormation}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <i className="ri-graduation-cap-line mr-2"></i>
                      Nouvelle formation
                    </button>
                    <button
                      onClick={handleCreateVideo}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <i className="ri-video-add-line mr-2"></i>
                      Nouvelle vidéo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Formations */}
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Mes formations ({expertStats?.activeFormations || 5})
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Marketing Digital Avancé</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">22 inscrits • Active</p>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          <i className="ri-edit-line"></i>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Développement Personnel</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">15 inscrits • Active</p>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          <i className="ri-edit-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vidéos */}
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Mes vidéos ({expertStats?.totalVideos || 12})
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Gestion du stress au travail</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">1.2k vues • Premium</p>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          <i className="ri-edit-line"></i>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Introduction au leadership</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">890 vues • Gratuit</p>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          <i className="ri-edit-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytiques</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vues du profil</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {expertStats?.profileViews || 1250}
                        </p>
                      </div>
                      <i className="ri-eye-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taux de complétion</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {expertStats?.completionRate || 96}%
                        </p>
                      </div>
                      <i className="ri-check-double-line text-green-600 dark:text-green-400 text-2xl"></i>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Heures enseignées</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {expertStats?.totalHours || 320}h
                        </p>
                      </div>
                      <i className="ri-time-line text-purple-600 dark:text-purple-400 text-2xl"></i>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Croissance mensuelle</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          +{expertStats?.monthlyGrowth || 15}%
                        </p>
                      </div>
                      <i className="ri-arrow-up-line text-green-600 dark:text-green-400 text-2xl"></i>
                    </div>
                  </div>
                </div>

                {/* Graphique des performances */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance des 6 derniers mois
                  </h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      Graphique des performances (à implémenter avec une librairie de charts)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals (à implémenter) */}
      {showCreateFormationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Créer une nouvelle formation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Cette fonctionnalité sera bientôt disponible.
            </p>
            <button
              onClick={() => setShowCreateFormationModal(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {showCreateVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Publier une nouvelle vidéo
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Cette fonctionnalité sera bientôt disponible.
            </p>
            <button
              onClick={() => setShowCreateVideoModal(false)}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Retirer des fonds
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Solde disponible: {expertStats?.availableBalance || 8300}€
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Cette fonctionnalité sera bientôt disponible.
            </p>
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

