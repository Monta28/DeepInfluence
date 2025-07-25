'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import ExpertCard from '@/components/ExpertCard';
import FormationCard from '@/components/FormationCard';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import ApiService, { Expert, Formation } from '../../services/api';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [experts, setExperts] = useState<Expert[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const router = useRouter();

  // Rediriger si non connecté
  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }
    loadDashboardData();
  }, [user, router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Chargement des données dashboard pour utilisateur:', user?.email);
      
      // Charger les statistiques utilisateur depuis l'API
      let statsData = null;
      try {
        const statsResponse = await ApiService.getUserStats();
        console.log('Réponse stats API:', statsResponse);
        if (statsResponse.success) {
          statsData = statsResponse.data;
          setDashboardData(statsData);
        }
      } catch (statsErr) {
        console.log('Stats API non disponible:', statsErr);
      }

      // Charger les experts recommandés (limité à 6)
      let expertsData = [];
      try {
        const expertsResponse = await ApiService.getExperts({ limit: 6 });
        console.log('Réponse experts API:', expertsResponse);
        if (expertsResponse.success && expertsResponse.data) {
          expertsData = expertsResponse.data;
          setExperts(expertsData);
        }
      } catch (expertsErr) {
        console.log('Experts API non disponible:', expertsErr);
      }

      // Charger les formations recommandées (limité à 6)
      let formationsData = [];
      try {
        const formationsResponse = await ApiService.getFormations({ limit: 6 });
        console.log('Réponse formations API:', formationsResponse);
        if (formationsResponse.success && formationsResponse.data) {
          formationsData = formationsResponse.data;
          setFormations(formationsData);
        }
      } catch (formationsErr) {
        console.log('Formations API non disponible:', formationsErr);
      }

      // Si aucune donnée n'a été chargée, utiliser les données de fallback
      if (!statsData) {
        console.log('Utilisation des données de fallback pour les statistiques');
        const fallbackData = {
          sessionsCompleted: user?.userType === 'expert' ? 45 : 12,
          activeFormations: user?.userType === 'expert' ? 8 : 2,
          learningHours: user?.userType === 'expert' ? 320 : 78,
          followedExperts: user?.userType === 'expert' ? 0 : 8,
          totalStudents: user?.userType === 'expert' ? 156 : 0,
          totalRevenue: user?.userType === 'expert' ? 12500 : 0,
          recentAppointments: user?.userType === 'expert' ? 23 : 5,
          completionRate: user?.userType === 'expert' ? 96 : 87,
          averageRating: user?.userType === 'expert' ? 4.8 : null,
          monthlyGrowth: user?.userType === 'expert' ? 15 : 12
        };
        setDashboardData(fallbackData);
      }

      if (expertsData.length === 0) {
        console.log('Utilisation des données de fallback pour les experts');
        setExperts([
          {
            id: 1,
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
          },
          {
            id: 2,
            name: 'Marc Dubois',
            specialty: 'Expert en Investissement',
            rating: 4.8,
            reviews: 203,
            hourlyRate: 120,
            pricePerMessage: 25,
            image: 'https://ui-avatars.com/api/?name=Marc+Dubois&size=300&background=10B981&color=ffffff',
            isOnline: false,
            verified: true,
            category: 'finance',
            languages: ['Français'],
            responseTime: '5 minutes',
            sessions: 320,
            followers: 8900,
            tags: ['Immobilier', 'Bourse', 'Crypto']
          },
          {
            id: 3,
            name: 'Emma Wilson',
            specialty: 'Coach en Leadership',
            rating: 4.7,
            reviews: 89,
            hourlyRate: 95,
            pricePerMessage: 20,
            image: 'https://ui-avatars.com/api/?name=Emma+Wilson&size=300&background=8B5CF6&color=ffffff',
            isOnline: true,
            verified: true,
            category: 'business',
            languages: ['Français', 'Anglais'],
            responseTime: '1 minute',
            sessions: 280,
            followers: 6700,
            tags: ['Leadership', 'Management', 'Équipe']
          }
        ]);
      }

      if (formationsData.length === 0) {
        console.log('Utilisation des données de fallback pour les formations');
        setFormations([
          {
            id: 1,
            title: 'Marketing Digital Avancé',
            instructor: 'Sophie Laurent',
            duration: '8 semaines',
            level: 'Intermédiaire',
            rating: 4.8,
            students: 1250,
            price: 299,
            type: 'live',
            maxPlaces: 30,
            currentPlaces: 22,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Marketing+Digital&size=300&background=8B5CF6&color=ffffff',
            tags: ['SEO', 'Social Media', 'Analytics'],
            nextSession: '2024-02-15',
            description: 'Formation complète en marketing digital avec cas pratiques',
            schedule: 'Mar/Jeu 19h-21h',
            modules: ['SEO', 'Social Media', 'Email Marketing', 'Analytics'],
            category: 'marketing'
          },
          {
            id: 2,
            title: 'Développement Personnel',
            instructor: 'Dr. Sarah Martin',
            duration: '6 semaines',
            level: 'Débutant',
            rating: 4.9,
            students: 890,
            price: 199,
            type: 'live',
            maxPlaces: 20,
            currentPlaces: 15,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Développement+Personnel&size=300&background=10B981&color=ffffff',
            tags: ['Confiance', 'Motivation', 'Leadership'],
            nextSession: '2024-02-20',
            description: 'Développez votre potentiel et renforcez votre confiance en vous',
            schedule: 'Lun/Mer 18h-20h',
            modules: ['Confiance en soi', 'Gestion du stress', 'Communication', 'Leadership'],
            category: 'bien-etre'
          },
          {
            id: 3,
            title: 'Gestion Financière',
            instructor: 'Marc Dubois',
            duration: '10 semaines',
            level: 'Avancé',
            rating: 4.7,
            students: 567,
            price: 399,
            type: 'live',
            maxPlaces: 15,
            currentPlaces: 8,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Gestion+Financière&size=300&background=F59E0B&color=ffffff',
            tags: ['Investissement', 'Budget', 'Épargne'],
            nextSession: '2024-02-25',
            description: 'Maîtrisez la gestion de vos finances personnelles et professionnelles',
            schedule: 'Sam 10h-12h',
            modules: ['Budget', 'Investissement', 'Fiscalité', 'Épargne'],
            category: 'finance'
          }
        ]);
      }

    } catch (err: any) {
      console.error('Erreur lors du chargement du dashboard:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400">Chargement du dashboard...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <i className="ri-error-warning-line text-red-600 dark:text-red-400 text-xl mr-3"></i>
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {user?.userType === 'expert' ? (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions terminées</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dashboardData?.sessionsCompleted || 45}
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
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Étudiants actifs</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dashboardData?.totalStudents || 156}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <i className="ri-group-line text-green-600 dark:text-green-400 text-xl"></i>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenus ce mois</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dashboardData?.totalRevenue ? `${dashboardData.totalRevenue}€` : '12 500€'}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                        <i className="ri-money-euro-circle-line text-yellow-600 dark:text-yellow-400 text-xl"></i>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Note moyenne</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dashboardData?.averageRating || '4.8'}/5
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <i className="ri-star-line text-purple-600 dark:text-purple-400 text-xl"></i>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions terminées</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dashboardData?.sessionsCompleted || 12}
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
                          {dashboardData?.activeFormations || 2}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <i className="ri-book-open-line text-green-600 dark:text-green-400 text-xl"></i>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Heures d'apprentissage</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dashboardData?.learningHours || 78}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                        <i className="ri-time-line text-yellow-600 dark:text-yellow-400 text-xl"></i>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Experts suivis</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dashboardData?.followedExperts || 8}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <i className="ri-user-star-line text-purple-600 dark:text-purple-400 text-xl"></i>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions rapides */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Actions rapides</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user?.userType === 'expert' ? (
                  <>
                    <Link href="/expert-profile" className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      <i className="ri-user-settings-line text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Mon profil expert</span>
                    </Link>
                    <Link href="/dashboard/appointments" className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      <i className="ri-calendar-line text-green-600 dark:text-green-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-green-900 dark:text-green-100">Mes rendez-vous</span>
                    </Link>
                    <Link href="/dashboard/formations" className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors">
                      <i className="ri-graduation-cap-line text-yellow-600 dark:text-yellow-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Mes formations</span>
                    </Link>
                    <Link href="/dashboard/messages" className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      <i className="ri-message-line text-purple-600 dark:text-purple-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Messages</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/experts" className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      <i className="ri-user-star-line text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Trouver un expert</span>
                    </Link>
                    <Link href="/formations" className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      <i className="ri-graduation-cap-line text-green-600 dark:text-green-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-green-900 dark:text-green-100">Formations</span>
                    </Link>
                    <Link href="/videos" className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors">
                      <i className="ri-play-circle-line text-yellow-600 dark:text-yellow-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Vidéos</span>
                    </Link>
                    <Link href="/dashboard/appointments" className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      <i className="ri-calendar-line text-purple-600 dark:text-purple-400 text-2xl mb-2"></i>
                      <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Mes rendez-vous</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Experts recommandés */}
            {user?.userType !== 'expert' && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experts recommandés</h2>
                  <Link href="/experts" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    Voir tous les experts →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experts.slice(0, 3).map((expert) => (
                    <ExpertCard key={expert.id} expert={expert} />
                  ))}
                </div>
              </div>
            )}

            {/* Formations recommandées */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.userType === 'expert' ? 'Formations populaires' : 'Formations recommandées'}
                </h2>
                <Link href="/formations" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  Voir toutes les formations →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formations.slice(0, 3).map((formation) => (
                  <FormationCard key={formation.id} formation={formation} />
                ))}
              </div>
            </div>

            {/* Activités récentes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Activités récentes</h2>
              <div className="space-y-4">
                {user?.userType === 'expert' ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <i className="ri-user-add-line text-green-600 dark:text-green-400"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Nouveau client inscrit</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <i className="ri-calendar-check-line text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Session terminée avec succès</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 5 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                        <i className="ri-star-line text-yellow-600 dark:text-yellow-400"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Nouvelle évaluation 5 étoiles</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Hier</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <i className="ri-book-open-line text-green-600 dark:text-green-400"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Formation "Marketing Digital" complétée</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 1 jour</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <i className="ri-calendar-line text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Rendez-vous programmé avec Dr. Sarah Martin</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 2 jours</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <i className="ri-play-circle-line text-purple-600 dark:text-purple-400"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Vidéo "Gestion du stress" visionnée</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 3 jours</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

