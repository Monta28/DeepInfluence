'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '../../../contexts/AuthContext';
import ApiService from '../../../services/api';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user, updateUser } = useAuth();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    joinDate: ''
  });

  const [userStats, setUserStats] = useState<any>(null);

  // Rediriger si non connecté
  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }

    console.log('Chargement du profil pour utilisateur:', user.email);

    // Initialiser les données utilisateur
    setUserInfo({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      location: user.location || '',
      joinDate: user.createdAt ? `Membre depuis ${new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}` : 'Nouveau membre'
    });

    // Charger les statistiques utilisateur
    loadUserStats();
  }, [user, router]);

  const loadUserStats = async () => {
    try {
      console.log('Chargement des statistiques utilisateur...');
      const response = await ApiService.getUserStats();
      console.log('Réponse stats utilisateur:', response);
      
      if (response.success) {
        setUserStats(response.data);
      } else {
        console.log('Utilisation des statistiques de fallback');
        // Données de fallback basées sur le type d'utilisateur
        const fallbackStats = {
          sessionsCompleted: user?.userType === 'expert' ? 45 : 12,
          activeFormations: user?.userType === 'expert' ? 8 : 2,
          learningHours: user?.userType === 'expert' ? 320 : 78,
          followedExperts: user?.userType === 'expert' ? 0 : 8,
          totalStudents: user?.userType === 'expert' ? 156 : 0,
          totalRevenue: user?.userType === 'expert' ? 12500 : 0,
          averageRating: user?.userType === 'expert' ? 4.8 : null,
          completionRate: user?.userType === 'expert' ? 96 : 87,
          monthlyGrowth: user?.userType === 'expert' ? 15 : 12,
          totalReviews: user?.userType === 'expert' ? 147 : 23,
          responseTime: user?.userType === 'expert' ? '2 minutes' : null,
          profileViews: user?.userType === 'expert' ? 1250 : null
        };
        setUserStats(fallbackStats);
      }
    } catch (err: any) {
      console.error('Erreur lors du chargement des statistiques:', err);
      // Données de fallback en cas d'erreur
      const fallbackStats = {
        sessionsCompleted: user?.userType === 'expert' ? 45 : 12,
        activeFormations: user?.userType === 'expert' ? 8 : 2,
        learningHours: user?.userType === 'expert' ? 320 : 78,
        followedExperts: user?.userType === 'expert' ? 0 : 8,
        totalStudents: user?.userType === 'expert' ? 156 : 0,
        totalRevenue: user?.userType === 'expert' ? 12500 : 0,
        averageRating: user?.userType === 'expert' ? 4.8 : null,
        completionRate: user?.userType === 'expert' ? 96 : 87,
        monthlyGrowth: user?.userType === 'expert' ? 15 : 12,
        totalReviews: user?.userType === 'expert' ? 147 : 23,
        responseTime: user?.userType === 'expert' ? '2 minutes' : null,
        profileViews: user?.userType === 'expert' ? 1250 : null
      };
      setUserStats(fallbackStats);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      console.log('Sauvegarde des informations utilisateur:', userInfo);

      const response = await ApiService.updateUserProfile({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        bio: userInfo.bio,
        location: userInfo.location
      });

      console.log('Réponse mise à jour profil:', response);

      if (response.success) {
        // Mettre à jour le contexte utilisateur
        await updateUser({
          ...user,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phone: userInfo.phone,
          bio: userInfo.bio,
          location: userInfo.location
        });

        setSuccess('Profil mis à jour avec succès !');
        setIsEditing(false);
      } else {
        setError(response.message || 'Erreur lors de la mise à jour du profil');
      }
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Restaurer les données originales
    setUserInfo({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      joinDate: user?.createdAt ? `Membre depuis ${new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}` : 'Nouveau membre'
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
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
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.userType === 'expert' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {user.userType === 'expert' ? 'Expert' : 'Utilisateur'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {userInfo.joinDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <i className="ri-edit-line mr-2"></i>
                    Modifier
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                          Sauvegarde...
                        </>
                      ) : (
                        <>
                          <i className="ri-save-line mr-2"></i>
                          Sauvegarder
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6">
            <nav className="flex space-x-8">
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
                onClick={() => setActiveTab('personal')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'personal'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Informations personnelles
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Statistiques
              </button>
            </nav>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-error-warning-line text-red-600 dark:text-red-400 text-xl mr-3"></i>
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-check-line text-green-600 dark:text-green-400 text-xl mr-3"></i>
              <p className="text-green-800 dark:text-green-200">{success}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vue d'ensemble</h2>
              
              {/* Coins */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Mes Coins</h3>
                    <p className="text-3xl font-bold">{user.coins || 0}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-coin-line text-3xl"></i>
                  </div>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user?.userType === 'expert' ? (
                  <>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Étudiants</p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            {userStats?.totalStudents || 156}
                          </p>
                        </div>
                        <i className="ri-group-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">Revenus</p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                            {userStats?.totalRevenue ? `${userStats.totalRevenue}€` : '12 500€'}
                          </p>
                        </div>
                        <i className="ri-money-euro-circle-line text-green-600 dark:text-green-400 text-2xl"></i>
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Note moyenne</p>
                          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                            {userStats?.averageRating || '4.8'}/5
                          </p>
                        </div>
                        <i className="ri-star-line text-purple-600 dark:text-purple-400 text-2xl"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Sessions</p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            {userStats?.sessionsCompleted || 12}
                          </p>
                        </div>
                        <i className="ri-calendar-check-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">Formations</p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                            {userStats?.activeFormations || 2}
                          </p>
                        </div>
                        <i className="ri-book-open-line text-green-600 dark:text-green-400 text-2xl"></i>
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Heures</p>
                          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                            {userStats?.learningHours || 78}h
                          </p>
                        </div>
                        <i className="ri-time-line text-purple-600 dark:text-purple-400 text-2xl"></i>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informations personnelles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    L'email ne peut pas être modifié
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Votre numéro de téléphone"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={userInfo.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Votre ville ou région"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Biographie
                </label>
                <textarea
                  name="bio"
                  value={userInfo.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Parlez-nous de vous..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Statistiques détaillées</h2>
              
              {userStats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user?.userType === 'expert' ? (
                    <>
                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions terminées</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.sessionsCompleted}
                            </p>
                          </div>
                          <i className="ri-calendar-check-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total étudiants</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.totalStudents}
                            </p>
                          </div>
                          <i className="ri-group-line text-green-600 dark:text-green-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenus totaux</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.totalRevenue}€
                            </p>
                          </div>
                          <i className="ri-money-euro-circle-line text-yellow-600 dark:text-yellow-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Note moyenne</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.averageRating}/5
                            </p>
                          </div>
                          <i className="ri-star-line text-purple-600 dark:text-purple-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taux de complétion</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.completionRate}%
                            </p>
                          </div>
                          <i className="ri-check-double-line text-green-600 dark:text-green-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Temps de réponse</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.responseTime}
                            </p>
                          </div>
                          <i className="ri-time-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions terminées</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.sessionsCompleted}
                            </p>
                          </div>
                          <i className="ri-calendar-check-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Formations actives</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.activeFormations}
                            </p>
                          </div>
                          <i className="ri-book-open-line text-green-600 dark:text-green-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Heures d'apprentissage</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.learningHours}h
                            </p>
                          </div>
                          <i className="ri-time-line text-yellow-600 dark:text-yellow-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Experts suivis</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.followedExperts}
                            </p>
                          </div>
                          <i className="ri-user-star-line text-purple-600 dark:text-purple-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taux de complétion</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {userStats.completionRate}%
                            </p>
                          </div>
                          <i className="ri-check-double-line text-green-600 dark:text-green-400 text-2xl"></i>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Croissance mensuelle</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              +{userStats.monthlyGrowth}%
                            </p>
                          </div>
                          <i className="ri-arrow-up-line text-green-600 dark:text-green-400 text-2xl"></i>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600 dark:text-gray-400">Chargement des statistiques...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

