
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('statistics');
  const [showExpertStatsModal, setShowExpertStatsModal] = useState(false);
  const [showExpertProfileModal, setShowExpertProfileModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const tabs = [
    { id: 'statistics', label: 'Statistiques', icon: 'ri-bar-chart-line' },
    { id: 'users', label: 'Utilisateurs', icon: 'ri-user-line' },
    { id: 'experts', label: 'Experts', icon: 'ri-vip-crown-line' },
    { id: 'expert-requests', label: 'Demandes Expert', icon: 'ri-user-add-line' },
    { id: 'transactions', label: 'Transactions', icon: 'ri-money-dollar-circle-line' },
    { id: 'referrals', label: 'Parrainage', icon: 'ri-share-line' }
  ];

  const stats = {
    totalUsers: 12847,
    totalExperts: 356,
    totalTransactions: 45632,
    revenue: 2847350,
    growth: {
      users: 12.5,
      experts: 8.3,
      transactions: 23.7,
      revenue: 18.2
    }
  };

  const chartData = [
    { month: 'Jan', users: 800, experts: 25, revenue: 45000 },
    { month: 'Fév', users: 1200, experts: 32, revenue: 67000 },
    { month: 'Mar', users: 1800, experts: 28, revenue: 89000 },
    { month: 'Avr', users: 2100, experts: 35, revenue: 123000 },
    { month: 'Mai', users: 2400, experts: 41, revenue: 156000 },
    { month: 'Jun', users: 2800, experts: 38, revenue: 178000 }
  ];

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      status: 'active',
      joinDate: '2024-01-15',
      totalSpent: 1250,
      sessions: 24,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20woman%20headshot%20with%20friendly%20smile%2C%20neutral%20background%2C%20modern%20portrait&width=60&height=60&seq=user-1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Pierre Martin',
      email: 'pierre.martin@email.com',
      status: 'active',
      joinDate: '2024-01-10',
      totalSpent: 890,
      sessions: 18,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20man%20headshot%20with%20confident%20smile%2C%20neutral%20background%2C%20modern%20portrait&width=60&height=60&seq=user-2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      email: 'sophie.laurent@email.com',
      status: 'suspended',
      joinDate: '2024-01-08',
      totalSpent: 2100,
      sessions: 35,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20woman%20headshot%20with%20warm%20smile%2C%20neutral%20background%2C%20modern%20portrait&width=60&height=60&seq=user-3&orientation=squarish'
    }
  ]);

  const [experts, setExperts] = useState([
    {
      id: 1,
      name: 'Dr. Marie Dubois',
      email: 'marie.dubois@expert.com',
      specialty: 'Développement Personnel',
      status: 'verified',
      joinDate: '2024-01-01',
      totalEarnings: 15600,
      sessions: 156,
      rating: 4.9,
      reviews: 147,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20personal%20development%20coach%20with%20warm%20confident%20smile%2C%20modern%20coaching%20office%20background%2C%20professional%20attire%2C%20trustworthy%20and%20approachable%20appearance%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-marie-1&orientation=squarish',
      detailedStats: {
        monthlyEarnings: [
          { month: 'Jan', earnings: 2400, sessions: 24 },
          { month: 'Fév', earnings: 2800, sessions: 28 },
          { month: 'Mar', earnings: 3200, sessions: 32 },
          { month: 'Avr', earnings: 2900, sessions: 29 },
          { month: 'Mai', earnings: 2100, sessions: 21 },
          { month: 'Jun', earnings: 2200, sessions: 22 }
        ],
        clientSatisfaction: 98.5,
        responseTime: '2 minutes',
        popularityScore: 9.2,
        repeatClients: 78,
        averageSessionDuration: 45,
        totalMessages: 892,
        videoCallsCompleted: 234,
        formations: 5,
        followers: 12500,
        profileViews: 45600
      }
    },
    {
      id: 2,
      name: 'Marc Rodriguez',
      email: 'marc.rodriguez@expert.com',
      specialty: 'Business & Entrepreneuriat',
      status: 'pending',
      joinDate: '2024-01-05',
      totalEarnings: 8900,
      sessions: 89,
      rating: 4.8,
      reviews: 78,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20entrepreneur%20in%20elegant%20suit%2C%20confident%20businessman%20portrait%2C%20modern%20corporate%20office%20background%2C%20professional%20headshot%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-marc-2&orientation=squarish',
      detailedStats: {
        monthlyEarnings: [
          { month: 'Jan', earnings: 1200, sessions: 12 },
          { month: 'Fév', earnings: 1500, sessions: 15 },
          { month: 'Mar', earnings: 1800, sessions: 18 },
          { month: 'Avr', earnings: 1600, sessions: 16 },
          { month: 'Mai', earnings: 1400, sessions: 14 },
          { month: 'Jun', earnings: 1400, sessions: 14 }
        ],
        clientSatisfaction: 96.2,
        responseTime: '15 minutes',
        popularityScore: 8.8,
        repeatClients: 45,
        averageSessionDuration: 60,
        totalMessages: 456,
        videoCallsCompleted: 123,
        formations: 3,
        followers: 8900,
        profileViews: 28400
      }
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@expert.com',
      specialty: 'Marketing Digital',
      status: 'blocked',
      joinDate: '2024-01-03',
      totalEarnings: 12400,
      sessions: 124,
      rating: 4.7,
      reviews: 156,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20digital%20marketing%20expert%20with%20confident%20expression%2C%20modern%20digital%20office%20background%2C%20contemporary%20business%20attire%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-ahmed-4&orientation=squarish',
      detailedStats: {
        monthlyEarnings: [
          { month: 'Jan', earnings: 1800, sessions: 18 },
          { month: 'Fév', earnings: 2100, sessions: 21 },
          { month: 'Mar', earnings: 2400, sessions: 24 },
          { month: 'Avr', earnings: 2200, sessions: 22 },
          { month: 'Mai', earnings: 2000, sessions: 20 },
          { month: 'Jun', earnings: 1900, sessions: 19 }
        ],
        clientSatisfaction: 94.8,
        responseTime: '3 minutes',
        popularityScore: 8.5,
        repeatClients: 67,
        averageSessionDuration: 38,
        totalMessages: 723,
        videoCallsCompleted: 189,
        formations: 8,
        followers: 22100,
        profileViews: 67800
      }
    }
  ]);

  const transactions = [
    {
      id: 1,
      userId: 1,
      expertId: 2,
      userName: 'Marie Dubois',
      expertName: 'Marc Rodriguez',
      amount: 150,
      type: 'consultation',
      status: 'completed',
      date: '2024-01-20',
      commission: 30
    },
    {
      id: 2,
      userId: 2,
      expertId: 1,
      userName: 'Pierre Martin',
      expertName: 'Dr. Marie Dubois',
      amount: 75,
      type: 'message',
      status: 'completed',
      date: '2024-01-19',
      commission: 15
    },
    {
      id: 3,
      userId: 3,
      expertId: 3,
      userName: 'Sophie Laurent',
      expertName: 'Ahmed Hassan',
      amount: 200,
      type: 'formation',
      status: 'pending',
      date: '2024-01-18',
      commission: 40
    }
  ];

  const referralStats = {
    totalReferrals: 1245,
    activeReferrals: 892,
    totalCommissions: 45600,
    averageCommission: 35.2,
    topReferrers: [
      { name: 'Marie Dubois', referrals: 45, earnings: 2250 },
      { name: 'Pierre Martin', referrals: 38, earnings: 1890 },
      { name: 'Sophie Laurent', referrals: 32, earnings: 1600 }
    ]
  };

  const [expertRequests, setExpertRequests] = useState([
    {
      id: 1,
      name: 'Julie Moreau',
      email: 'julie.moreau@email.com',
      specialty: 'Coaching de Vie',
      experience: '8 ans',
      certifications: ['Certification PNL', 'Coach Professionnel Certifié'],
      description: 'Passionnée par le développement personnel depuis plus de 8 ans, j\'aide mes clients à atteindre leurs objectifs et à révéler leur potentiel.',
      motivation: 'Je souhaite partager mon expertise et accompagner plus de personnes dans leur épanouissement personnel et professionnel.',
      portfolio: ['Formation en PNL - Institut Français', 'Coaching en entreprise - 200+ clients accompagnés'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/juliemoreau',
        website: 'https://juliemoreau-coaching.com'
      },
      requestDate: '2024-01-25',
      status: 'pending',
      documents: ['CV', 'Certificats', 'Portfolio'],
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20life%20coach%20with%20warm%20confident%20smile%2C%20modern%20coaching%20office%20background%2C%20professional%20attire%2C%20trustworthy%20and%20inspiring%20appearance%2C%20high%20quality%20portrait&width=80&height=80&seq=expert-request-1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      specialty: 'Consultant en Stratégie',
      experience: '12 ans',
      certifications: ['MBA Strategy', 'Consultant Senior McKinsey'],
      description: 'Expert en stratégie d\'entreprise avec 12 ans d\'expérience chez McKinsey. Spécialisé dans la transformation digitale et l\'innovation.',
      motivation: 'Accompagner les entrepreneurs et dirigeants dans leurs décisions stratégiques et leur développement d\'entreprise.',
      portfolio: ['Transformation digitale - 50+ entreprises', 'Levées de fonds - 25M€ accompagnés'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/thomasdubois',
        website: 'https://strategy-consulting-td.com'
      },
      requestDate: '2024-01-24',
      status: 'pending',
      documents: ['CV', 'Références clients', 'Cas d\'études'],
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20strategy%20consultant%20in%20elegant%20suit%2C%20confident%20businessman%20portrait%2C%20modern%20corporate%20office%20background%2C%20professional%20headshot%2C%20trustworthy%20and%20competent%20appearance&width=80&height=80&seq=expert-request-2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      specialty: 'Expert en IA et Data Science',
      experience: '6 ans',
      certifications: ['PhD Computer Science', 'Google Cloud Professional', 'AWS Certified'],
      description: 'Docteure en informatique spécialisée en intelligence artificielle et science des données. Expérience en startup et grandes entreprises.',
      motivation: 'Démocratiser l\'IA et aider les entreprises à intégrer ces technologies dans leur stratégie.',
      portfolio: ['Développement d\'algorithmes ML pour e-commerce', 'Système de recommandation - 2M+ utilisateurs'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        github: 'https://github.com/sarahchen'
      },
      requestDate: '2024-01-23',
      status: 'pending',
      documents: ['CV', 'Publications', 'Projets GitHub'],
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20AI%20data%20scientist%20with%20confident%20expression%2C%20modern%20tech%20office%20background%2C%20contemporary%20business%20attire%2C%20intelligent%20and%20approachable%20appearance%2C%20high%20quality%20portrait&width=80&height=80&seq=expert-request-3&orientation=squarish'
    }
  ]);

  const updateUserStatus = (userId: number, status: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };

  const updateExpertStatus = (expertId: number, status: string) => {
    setExperts(experts.map(expert => 
      expert.id === expertId ? { ...expert, status } : expert
    ));
  };

  const showExpertStats = (expert: any) => {
    setSelectedExpert(expert);
    setShowExpertStatsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'verified':
        return 'Vérifié';
      case 'pending':
        return 'En attente';
      case 'suspended':
        return 'Suspendu';
      case 'blocked':
        return 'Bloqué';
      default:
        return status;
    }
  };

  const approveExpertRequest = (requestId: number) => {
    const request = expertRequests.find(req => req.id === requestId);
    if (request) {
      const newExpert = {
        id: experts.length + 1,
        name: request.name,
        email: request.email,
        specialty: request.specialty,
        status: 'verified',
        joinDate: new Date().toISOString().split('T')[0],
        totalEarnings: 0,
        sessions: 0,
        rating: 0,
        reviews: 0,
        avatar: request.avatar,
        detailedStats: {
          monthlyEarnings: [],
          clientSatisfaction: 0,
          responseTime: '0 minutes',
          popularityScore: 0,
          repeatClients: 0,
          averageSessionDuration: 0,
          totalMessages: 0,
          videoCallsCompleted: 0,
          formations: 0,
          followers: 0,
          profileViews: 0
        }
      };
      setExperts([...experts, newExpert]);
      setExpertRequests(expertRequests.filter(req => req.id !== requestId));
    }
  };

  const rejectExpertRequest = (requestId: number) => {
    setExpertRequests(expertRequests.filter(req => req.id !== requestId));
  };

  const showExpertProfile = (expert: any) => {
    setSelectedExpert(expert);
    setShowExpertProfileModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="ri-admin-line text-white text-xl"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                  <span className="text-white text-xs font-bold">{expertRequests.length}</span>
                </div>
                <i className="ri-notification-2-line text-gray-600 text-xl"></i>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20administrator%20headshot%20with%20confident%20expression%2C%20modern%20office%20background%2C%20business%20attire%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait&width=40&height=40&seq=admin-avatar&orientation=squarish"
                  alt="Admin"
                  className="w-8 h-8 rounded-full object-cover object-top"
                />
                <span className="text-sm font-medium text-gray-700">Administrateur</span>
              </div>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <i className="ri-logout-circle-line text-xl"></i>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
                {tab.id === 'expert-requests' && expertRequests.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                    {expertRequests.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-blue-600 text-2xl"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    +{stats.growth.users}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.totalUsers.toLocaleString()}
                </h3>
                <p className="text-gray-600 text-sm">Utilisateurs totaux</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-vip-crown-line text-purple-600 text-2xl"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    +{stats.growth.experts}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.totalExperts.toLocaleString()}
                </h3>
                <p className="text-gray-600 text-sm">Experts actifs</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-exchange-line text-green-600 text-2xl"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    +{stats.growth.transactions}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.totalTransactions.toLocaleString()}
                </h3>
                <p className="text-gray-600 text-sm">Transactions</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-yellow-600 text-2xl"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    +{stats.growth.revenue}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {(stats.revenue / 1000).toFixed(0)}K€
                </h3>
                <p className="text-gray-600 text-sm">Revenus totaux</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Évolution des utilisateurs</h3>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.month}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(item.users / 3000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-12">
                          {item.users}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenus mensuels</h3>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.month}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(item.revenue / 200000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-16">
                          {(item.revenue / 1000).toFixed(0)}K€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Exporter
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dépenses
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
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover object-top"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {getStatusText(user.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.totalSpent}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.sessions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            {user.status === 'active' ? (
                              <button
                                onClick={() => updateUserStatus(user.id, 'suspended')}
                                className="text-red-600 hover:text-red-900 font-medium"
                              >
                                Suspendre
                              </button>
                            ) : (
                              <button
                                onClick={() => updateUserStatus(user.id, 'active')}
                                className="text-green-600 hover:text-green-900 font-medium"
                              >
                                Activer
                              </button>
                            )}
                            <button className="text-blue-600 hover:text-blue-900 font-medium">
                              Détails
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Experts Tab */}
        {activeTab === 'experts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des experts</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un expert..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                  <option>Tous les statuts</option>
                  <option>Vérifié</option>
                  <option>En attente</option>
                  <option>Bloqué</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expert
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Spécialité
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gains
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
                      <tr key={expert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={expert.avatar}
                              alt={expert.name}
                              className="w-10 h-10 rounded-full object-cover object-top"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {expert.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {expert.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expert.specialty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(expert.status)}`}>
                            {getStatusText(expert.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex items-center space-x-1 text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`ri-star-${i < Math.floor(expert.rating) ? 'fill' : 'line'} text-xs`}></i>
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {expert.rating} ({expert.reviews})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expert.totalEarnings}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expert.sessions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            {expert.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateExpertStatus(expert.id, 'verified')}
                                  className="text-green-600 hover:text-green-900 font-medium"
                                >
                                  Approuver
                                </button>
                                <button
                                  onClick={() => updateExpertStatus(expert.id, 'blocked')}
                                  className="text-red-600 hover:text-red-900 font-medium"
                                >
                                  Rejeter
                                </button>
                              </>
                            )}
                            {expert.status === 'verified' && (
                              <button
                                onClick={() => updateExpertStatus(expert.id, 'blocked')}
                                className="text-red-600 hover:text-red-900 font-medium"
                              >
                                Bloquer
                              </button>
                            )}
                            {expert.status === 'blocked' && (
                              <button
                                onClick={() => updateExpertStatus(expert.id, 'verified')}
                                className="text-green-600 hover:text-green-900 font-medium"
                              >
                                Débloquer
                              </button>
                            )}
                            <button 
                              onClick={() => showExpertStats(expert)}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              Statistiques
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des transactions</h2>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                  <option>Tous les types</option>
                  <option>Consultation</option>
                  <option>Message</option>
                  <option>Formation</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                  <option>Tous les statuts</option>
                  <option>Terminé</option>
                  <option>En attente</option>
                  <option>Annulé</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenus totaux</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {transactions.reduce((sum, t) => sum + t.amount, 0)}€
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-green-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Commissions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {transactions.reduce((sum, t) => sum + t.commission, 0)}€
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-percent-line text-blue-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Transactions totales</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {transactions.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-exchange-line text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expert
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div 
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.type === 'consultation' ? 'bg-blue-100' : transaction.type === 'message' ? 'bg-green-100' : 'bg-purple-100'}`}
                            >
                              <i className={`${transaction.type === 'consultation' ? 'ri-vidicon-line text-blue-600' : transaction.type === 'message' ? 'ri-message-2-line text-green-600' : 'ri-graduation-cap-line text-purple-600'}`}></i>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                #{transaction.id}
                              </div>
                              <div className="text-sm text-gray-500 capitalize">
                                {transaction.type}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.expertName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.amount}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.commission}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {transaction.status === 'completed' ? 'Terminé' : transaction.status === 'pending' ? 'En attente' : 'Annulé'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Système de parrainage</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Configurer les taux
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Parrainages totaux</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {referralStats.totalReferrals}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-share-line text-blue-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Parrainages actifs</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {referralStats.activeReferrals}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-add-line text-green-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Commissions totales</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {referralStats.totalCommissions}€
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Commission moyenne</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {referralStats.averageCommission}€
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-percent-line text-yellow-600 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top parrains</h3>
              <div className="space-y-4">
                {referralStats.topReferrers.map((referrer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{referrer.name}</p>
                        <p className="text-sm text-gray-600">{referrer.referrals} parrainages</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{referrer.earnings}€</p>
                      <p className="text-sm text-gray-600">Gains totaux</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expert Requests Tab */}
        {activeTab === 'expert-requests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Demandes d'experts</h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{expertRequests.length}</span> demandes en attente
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                  <option>Toutes les demandes</option>
                  <option>Récentes</option>
                  <option>Par spécialité</option>
                </select>
              </div>
            </div>

            {expertRequests.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-add-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande en attente</h3>
                <p className="text-gray-600">Toutes les demandes d'experts ont été traitées.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {expertRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img
                          src={request.avatar}
                          alt={request.name}
                          className="w-16 h-16 rounded-full object-cover object-top"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              En attente
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <i className="ri-mail-line"></i>
                              <span>{request.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="ri-briefcase-line"></i>
                              <span>{request.specialty}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="ri-time-line"></i>
                              <span>{request.experience} d'expérience</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="ri-calendar-line"></i>
                              <span>Demande du {new Date(request.requestDate).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => showExpertProfile(request)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          Voir le profil
                        </button>
                        <button
                          onClick={() => approveExpertRequest(request.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => rejectExpertRequest(request.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                        >
                          Rejeter
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                          <p className="text-sm text-gray-600">{request.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Motivation</h4>
                          <p className="text-sm text-gray-600">{request.motivation}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                          <div className="flex flex-wrap gap-1">
                            {request.certifications.map((cert, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                          <div className="flex flex-wrap gap-1">
                            {request.documents.map((doc, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Liens</h4>
                          <div className="flex space-x-2">
                            {request.socialLinks.linkedin && (
                              <a href={request.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                <i className="ri-linkedin-fill"></i>
                              </a>
                            )}
                            {request.socialLinks.website && (
                              <a href={request.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                <i className="ri-global-line"></i>
                              </a>
                            )}
                            {request.socialLinks.github && (
                              <a href={request.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                <i className="ri-github-fill"></i>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expert Profile Review Modal */}
        {showExpertProfileModal && selectedExpert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Évaluation du profil expert</h3>
                <button
                  onClick={() => setShowExpertProfileModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <i className="ri-close-line text-gray-500"></i>
                </button>
              </div>

              <div className="space-y-8">
                {/* Profil principal */}
                <div className="flex items-start space-x-6">
                  <img
                    src={selectedExpert.avatar}
                    alt={selectedExpert.name}
                    className="w-24 h-24 rounded-full object-cover object-top"
                  />
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedExpert.name}</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <i className="ri-mail-line"></i>
                        <span>{selectedExpert.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-briefcase-line"></i>
                        <span>{selectedExpert.specialty}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-time-line"></i>
                        <span>{selectedExpert.experience} d'expérience</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description et motivation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Description professionnelle</h4>
                    <p className="text-gray-700">{selectedExpert.description}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Motivation</h4>
                    <p className="text-gray-700">{selectedExpert.motivation}</p>
                  </div>
                </div>

                {/* Certifications et portfolio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Certifications</h4>
                    <div className="space-y-2">
                      {selectedExpert.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <i className="ri-award-line text-blue-600"></i>
                          <span className="text-gray-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Portfolio</h4>
                    <div className="space-y-2">
                      {selectedExpert.portfolio.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <i className="ri-star-line text-yellow-600"></i>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Documents et liens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Documents fournis</h4>
                    <div className="space-y-2">
                      {selectedExpert.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <i className="ri-file-line text-gray-600"></i>
                            <span className="text-gray-700">{doc}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Voir
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Liens professionnels</h4>
                    <div className="space-y-3">
                      {selectedExpert.socialLinks.linkedin && (
                        <a href={selectedExpert.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-blue-600 hover:text-blue-800">
                          <i className="ri-linkedin-fill"></i>
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {selectedExpert.socialLinks.website && (
                        <a href={selectedExpert.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-blue-600 hover:text-blue-800">
                          <i className="ri-global-line"></i>
                          <span>Site web</span>
                        </a>
                      )}
                      {selectedExpert.socialLinks.github && (
                        <a href={selectedExpert.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-blue-600 hover:text-blue-800">
                          <i className="ri-github-fill"></i>
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Évaluation et notes */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Évaluation administrative</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                      <div className="text-sm text-gray-600">Profil complet</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">✓</div>
                      <div className="text-sm text-gray-600">Documents valides</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">Excellent</div>
                      <div className="text-sm text-gray-600">Qualité du profil</div>
                    </div>
                  </div>
                </div>

                {/* Actions de validation */}
                <div className="flex justify-center space-x-4 pt-6 border-t">
                  <button
                    onClick={() => {
                      rejectExpertRequest(selectedExpert.id);
                      setShowExpertProfileModal(false);
                    }}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Rejeter la demande
                  </button>
                  <button
                    onClick={() => setShowExpertProfileModal(false)}
                    className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      approveExpertRequest(selectedExpert.id);
                      setShowExpertProfileModal(false);
                    }}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    Approuver et activer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expert Statistics Modal */}
        {showExpertStatsModal && selectedExpert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedExpert.avatar}
                    alt={selectedExpert.name}
                    className="w-16 h-16 rounded-full object-cover object-top"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedExpert.name}</h3>
                    <p className="text-gray-600">{selectedExpert.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(selectedExpert.rating) ? 'fill' : 'line'} text-sm`}></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{selectedExpert.rating} ({selectedExpert.reviews} avis)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowExpertStatsModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <i className="ri-close-line text-gray-500"></i>
                </button>
              </div>

              {/* Vue d'ensemble des statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Gains totaux</p>
                      <p className="text-2xl font-bold">{selectedExpert.totalEarnings}€</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <i className="ri-money-dollar-circle-line text-xl"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Sessions totales</p>
                      <p className="text-2xl font-bold">{selectedExpert.sessions}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <i className="ri-calendar-check-line text-xl"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Abonnés</p>
                      <p className="text-2xl font-bold">{selectedExpert.detailedStats.followers.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <i className="ri-user-star-line text-xl"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Satisfaction</p>
                      <p className="text-2xl font-bold">{selectedExpert.detailedStats.clientSatisfaction}%</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <i className="ri-heart-line text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Évolution mensuelle */}
                <div className="bg-white rounded-xl border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Évolution mensuelle</h4>
                  <div className="space-y-4">
                    {selectedExpert.detailedStats.monthlyEarnings.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">{item.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(item.earnings / 3500) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{item.earnings}€</div>
                            <div className="text-xs text-gray-500">{item.sessions} sessions</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Métriques de performance */}
                <div className="bg-white rounded-xl border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Métriques de performance</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <i className="ri-time-line text-blue-600"></i>
                        </div>
                        <span className="text-sm text-gray-700">Temps de réponse</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.responseTime}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <i className="ri-user-heart-line text-green-600"></i>
                        </div>
                        <span className="text-sm text-gray-700">Clients fidèles</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.repeatClients}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <i className="ri-timer-line text-purple-600"></i>
                        </div>
                        <span className="text-sm text-gray-700">Durée moyenne des sessions</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.averageSessionDuration} min</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <i className="ri-star-line text-yellow-600"></i>
                        </div>
                        <span className="text-sm text-gray-700">Score de popularité</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.popularityScore}/10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistiques détaillées */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Messages envoyés</span>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.totalMessages}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Appels vidéo</span>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.videoCallsCompleted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Formations créées</span>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.formations}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Visibilité</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Vues du profil</span>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.profileViews.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Abonnés</span>
                      <span className="text-sm font-medium text-gray-900">{selectedExpert.detailedStats.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Taux de conversion</span>
                      <span className="text-sm font-medium text-gray-900">12.5%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Dernière connexion</span>
                      <span className="text-sm font-medium text-gray-900">Il y a 2h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sessions cette semaine</span>
                      <span className="text-sm font-medium text-gray-900">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Revenus ce mois</span>
                      <span className="text-sm font-medium text-gray-900">2,200€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="mt-8 flex justify-center space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Voir le profil complet
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap">
                  Exporter les données
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
