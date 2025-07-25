'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import ApiService from '../../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('statistics');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExperts: 0,
    totalFormations: 0,
    totalVideos: 0,
    totalAppointments: 0,
    totalMessages: 0
  });
  const [users, setUsers] = useState([]);
  const [experts, setExperts] = useState([]);

  const { user } = useAuth();
  const router = useRouter();

  const tabs = [
    { id: 'statistics', label: 'Statistiques', icon: 'ri-bar-chart-line' },
    { id: 'users', label: 'Utilisateurs', icon: 'ri-user-line' },
    { id: 'experts', label: 'Experts', icon: 'ri-vip-crown-line' },
    { id: 'content', label: 'Contenu', icon: 'ri-file-list-line' },
    { id: 'system', label: 'Système', icon: 'ri-settings-line' }
  ];

  // Vérifier les permissions d'accès
  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }

    // Vérifier si l'utilisateur est admin (à adapter selon votre logique)
    if (user.userType !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadDashboardData();
  }, [user, router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Charger les statistiques générales
      const [usersResponse, expertsResponse, formationsResponse, videosResponse] = await Promise.all([
        ApiService.getUsers({ page: 1, limit: 10 }),
        ApiService.getExperts({ page: 1, limit: 10 }),
        ApiService.getFormations({ page: 1, limit: 1 }),
        ApiService.getVideos({ page: 1, limit: 1 })
      ]);

      if (usersResponse.success) {
        setUsers(usersResponse.data);
        setStats(prev => ({ ...prev, totalUsers: usersResponse.data.length }));
      }

      if (expertsResponse.success) {
        setExperts(expertsResponse.data);
        setStats(prev => ({ ...prev, totalExperts: expertsResponse.data.length }));
      }

      if (formationsResponse.success) {
        setStats(prev => ({ ...prev, totalFormations: formationsResponse.data.length }));
      }

      if (videosResponse.success) {
        setStats(prev => ({ ...prev, totalVideos: videosResponse.data.length }));
      }

    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.userType !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-shield-cross-line text-red-600 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Accès refusé</h3>
          <p className="text-gray-600 mb-6">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <Link 
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Retour au dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Chargement du tableau de bord...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-admin-line text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Connecté en tant que {user.firstName} {user.lastName}</span>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Retour au dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation des onglets */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
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

        {/* Contenu des onglets */}
        {activeTab === 'statistics' && (
          <div className="space-y-8">
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
                    <p className="text-gray-600 text-sm">Utilisateurs</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-vip-crown-line text-green-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalExperts}</h3>
                    <p className="text-gray-600 text-sm">Experts</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-book-line text-purple-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalFormations}</h3>
                    <p className="text-gray-600 text-sm">Formations</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-play-circle-line text-orange-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalVideos}</h3>
                    <p className="text-gray-600 text-sm">Vidéos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphiques et métriques */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu de la plateforme</h3>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-bar-chart-line text-gray-400 text-2xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Graphiques en développement</h4>
                <p className="text-gray-600">Les graphiques détaillés et les métriques avancées seront bientôt disponibles.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Gestion des utilisateurs</h3>
            </div>
            <div className="p-6">
              {users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&size=40&background=3B82F6&color=ffffff`}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.userType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isVerified 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.isVerified ? 'Vérifié' : 'En attente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Voir
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Suspendre
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-user-line text-gray-400 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun utilisateur</h4>
                  <p className="text-gray-600">Les utilisateurs apparaîtront ici une fois qu'ils se seront inscrits.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'experts' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Gestion des experts</h3>
            </div>
            <div className="p-6">
              {experts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expert
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Spécialité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Note
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sessions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {experts.map((expert) => (
                        <tr key={expert.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={expert.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&size=40&background=8B5CF6&color=ffffff`}
                                alt={expert.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {expert.name}
                                </div>
                                {expert.verified && (
                                  <div className="text-xs text-blue-600">
                                    <i className="ri-shield-check-line mr-1"></i>
                                    Vérifié
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {expert.specialty}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <i className="ri-star-fill text-yellow-400 mr-1"></i>
                              {expert.rating} ({expert.reviews})
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {expert.sessions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Voir
                            </button>
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              Approuver
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Suspendre
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-vip-crown-line text-gray-400 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun expert</h4>
                  <p className="text-gray-600">Les experts apparaîtront ici une fois qu'ils se seront inscrits.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion du contenu</h3>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-list-line text-gray-400 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Gestion du contenu</h4>
              <p className="text-gray-600">Les outils de gestion du contenu seront bientôt disponibles.</p>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres système</h3>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-settings-line text-gray-400 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Paramètres système</h4>
              <p className="text-gray-600">Les paramètres système seront bientôt disponibles.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-error-warning-line text-red-500 mr-2"></i>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

