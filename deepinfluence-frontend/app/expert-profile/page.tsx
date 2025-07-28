'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

export default function ExpertProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCreateFormationModal, setShowCreateFormationModal] = useState(false);
  const [showCreateVideoModal, setShowCreateVideoModal] = useState(false);
  const [videoStep, setVideoStep] = useState(1);
  const [formationStep, setFormationStep] = useState(1);
  const [formationType, setFormationType] = useState(''); // 'single' or 'multiple'
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'free', // 'free' or 'premium'
    price: '',
    duration: '',
    thumbnail: null,
    videoFile: null,
    tags: []
  });
  const [formationData, setFormationData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    price: '',
    maxStudents: '',
    sessionType: 'single', // 'single' or 'multiple'
    singleSession: {
      date: '',
      time: '',
      duration: '60'
    },
    multipleSessions: {
      totalWeeks: '4',
      sessionsPerWeek: '1',
      sessionDuration: '60',
      weeklySchedule: 'tuesday',
      startDate: ''
    }
  });

  const handleCreateFormation = () => {
    setShowCreateFormationModal(true);
    setFormationStep(1);
    setFormationType('');
  };

  const handleCreateVideo = () => {
    setShowCreateVideoModal(true);
    setVideoStep(1);
  };

  const handleVideoDataChange = (field: string, value: any) => {
    setVideoData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormationDataChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormationData(prev => ({ ...prev, [parent]: { ...prev[parent as keyof typeof prev], [child]: value } }));
    } else {
      setFormationData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleVideoNextStep = () => {
    if (videoStep < 3) {
      setVideoStep(videoStep + 1);
    }
  };

  const handleVideoPreviousStep = () => {
    if (videoStep > 1) {
      setVideoStep(videoStep - 1);
    }
  };

  const handleSubmitVideo = () => {
    // Ici vous pourriez envoyer les données au backend
    console.log('Vidéo créée:', videoData);
    setShowCreateVideoModal(false);
    setVideoStep(1);
    // Réinitialiser les données
    setVideoData({
      title: '',
      description: '',
      category: '',
      type: 'free',
      price: '',
      duration: '',
      thumbnail: null,
      videoFile: null,
      tags: []
    });
  };

  const handleNextStep = () => {
    if (formationStep < 3) {
      setFormationStep(formationStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (formationStep > 1) {
      setFormationStep(formationStep - 1);
    }
  };

  const handleSubmitFormation = () => {
    // Ici vous pourriez envoyer les données au backend
    console.log('Formation créée:', formationData);
    setShowCreateFormationModal(false);
    setFormationStep(1);
    setFormationType('');
    // Réinitialiser les données
    setFormationData({
      title: '',
      description: '',
      category: '',
      level: '',
      duration: '',
      price: '',
      maxStudents: '',
      sessionType: 'single',
      singleSession: {
        date: '',
        time: '',
        duration: '60'
      },
      multipleSessions: {
        totalWeeks: '4',
        sessionsPerWeek: '1',
        sessionDuration: '60',
        weeklySchedule: 'tuesday',
        startDate: ''
      }
    });
  };

  const handleFileUpload = (field: string, file: File) => {
    handleVideoDataChange(field, file);
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !videoData.tags.includes(tag)) {
      handleVideoDataChange('tags', [...videoData.tags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    handleVideoDataChange('tags', videoData.tags.filter(tag => tag !== tagToRemove));
  };

  const expertData = {
    name: 'Dr. Sarah Martin',
    specialty: 'Psychologue clinique',
    rating: 4.9,
    totalSessions: 234,
    totalStudents: 1847,
    totalEarnings: 15680,
    pendingEarnings: 2340,
    image: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20expert%20with%20warm%20confident%20smile%2C%20modern%20office%20background%2C%20high%20quality%20portrait&width=120&height=120&seq=expert-profile&orientation=squarish'
  };

  const stats = [
    { label: 'Sessions ce mois', value: '28', icon: 'ri-calendar-check-line', color: 'bg-green-500', change: '+12%' },
    { label: 'Nouveaux étudiants', value: '45', icon: 'ri-user-add-line', color: 'bg-blue-500', change: '+8%' },
    { label: 'Revenus ce mois', value: '3,240€', icon: 'ri-money-euro-circle-line', color: 'bg-purple-500', change: '+15%' },
    { label: 'Note moyenne', value: '4.9', icon: 'ri-star-line', color: 'bg-yellow-500', change: '+0.1' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'session',
      title: 'Session avec Marie Dupont',
      description: 'Consultation de 60 minutes terminée',
      time: '2 heures',
      amount: '80€',
      status: 'completed'
    },
    {
      id: 2,
      type: 'booking',
      title: 'Nouvelle réservation',
      description: 'Pierre Martin - Consultation individuelle',
      time: '4 heures',
      amount: '75€',
      status: 'pending'
    },
    {
      id: 3,
      type: 'formation',
      title: 'Formation mise à jour',
      description: 'Gestion du stress au travail',
      time: '1 jour',
      amount: '150€',
      status: 'published'
    }
  ];

  const pricing = {
    textMessage: 5,
    videoMessage: 10,
    videoCallPerMinute: 1,
  };

  const [pricingState, setPricing] = useState(pricing);

  const myFormations = [
    {
      id: 1,
      title: 'Gestion du stress au travail',
      students: 156,
      earnings: '2,340€',
      status: 'active',
      thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20stress%20management%20training%20course%20thumbnail%2C%20peaceful%20office%20environment%2C%20wellness%20theme&width=300&height=200&seq=formation-1&orientation=landscape'
    },
    {
      id: 2,
      title: 'Techniques de relaxation',
      students: 89,
      earnings: '1,335€',
      status: 'active',
      thumbnail: 'https://readdy.ai/api/search-image?query=Relaxation%20techniques%20course%20thumbnail%2C%20calm%20meditation%20environment%2C%20wellness%20and%20peace%20theme&width=300&height=200&seq=formation-2&orientation=landscape'
    }
  ];

  const myVideos = [
    {
      id: 1,
      title: '5 techniques anti-stress',
      views: '2.3k',
      likes: '156',
      earnings: '45€',
      type: 'free',
      thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20woman%20explaining%20stress%20relief%20techniques%2C%20modern%20office%20background%2C%20educational%20content&width=300&height=200&seq=video-expert-1&orientation=landscape'
    },
    {
      id: 2,
      title: 'Méditation guidée - 10 min',
      views: '1.8k',
      likes: '92',
      earnings: '120€',
      type: 'premium',
      thumbnail: 'https://readdy.ai/api/search-image?query=Calm%20professional%20woman%20leading%20meditation%20session%2C%20peaceful%20environment%2C%20wellness%20theme&width=300&height=200&seq=video-expert-2&orientation=landscape'
    }
  ];

  const appointments = [
    {
      id: 1,
      client: 'Marie Dupont',
      type: 'Consultation individuelle',
      date: '2024-01-15',
      time: '14:30',
      duration: '60 min',
      price: 80,
      status: 'pending'
    },
    {
      id: 2,
      client: 'Pierre Martin',
      type: 'Séance de groupe',
      date: '2024-01-16',
      time: '10:00',
      duration: '90 min',
      price: 45,
      status: 'confirmed'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: 'ri-dashboard-line' },
    { id: 'bio', label: 'Bio', icon: 'ri-user-line' },
    { id: 'pricing', label: 'Tarifs', icon: 'ri-price-tag-line' },
    { id: 'formations', label: 'Formations', icon: 'ri-graduation-cap-line' },
    { id: 'videos', label: 'Vidéos', icon: 'ri-video-line' },
    { id: 'schedule', label: 'Disponibilités', icon: 'ri-calendar-line' },
    { id: 'appointments', label: 'Rendez-vous', icon: 'ri-calendar-check-line' },
    { id: 'earnings', label: 'Gains', icon: 'ri-money-euro-circle-line' },
    { id: 'referral', label: 'Parrainage', icon: 'ri-user-shared-line' },
    { id: 'analytics', label: 'Statistiques', icon: 'ri-bar-chart-line' }
  ];

  const videoStats = [
    {
      id: 1,
      title: '5 techniques anti-stress',
      thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20woman%20explaining%20stress%20relief%20techniques%2C%20modern%20office%20background%2C%20educational%20content&width=300&height=200&seq=video-expert-1&orientation=landscape',
      views: 2300,
      likes: 156,
      duration: '10 min'
    },
    {
      id: 2,
      title: 'Méditation guidée - 10 min',
      thumbnail: 'https://readdy.ai/api/search-image?query=Calm%20professional%20woman%20leading%20meditation%20session%2C%20peaceful%20environment%2C%20wellness%20theme&width=300&height=200&seq=video-expert-2&orientation=landscape',
      views: 1800,
      likes: 92,
      duration: '10 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Profile */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-600 rounded-t-xl"></div>
            <div className="absolute -bottom-12 left-6">
              <img
                src={expertData.image}
                alt="Expert Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          <div className="pt-16 pb-6 px-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{expertData.name}</h1>
                <p className="text-gray-600 mt-1">{expertData.specialty}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <i className="ri-star-fill text-yellow-400"></i>
                    <span className="text-sm text-gray-600">{expertData.rating} ({expertData.totalSessions} avis)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-user-line text-gray-400"></i>
                    <span className="text-sm text-gray-600">{expertData.totalStudents} étudiants</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{expertData.totalEarnings}€</div>
                <p className="text-sm text-gray-600">Revenus totaux</p>
                <p className="text-sm text-orange-600">{expertData.pendingEarnings}€ en attente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-white text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b p-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                        <i className="ri-add-line text-blue-600 text-2xl mb-2"></i>
                        <p className="text-sm font-medium text-blue-600">Nouvelle formation</p>
                      </button>
                      <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                        <i className="ri-video-add-line text-green-600 text-2xl mb-2"></i>
                        <p className="text-sm font-medium text-green-600">Publier une vidéo</p>
                      </button>
                      <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                        <i className="ri-calendar-line text-purple-600 text-2xl mb-2"></i>
                        <p className="text-sm font-medium text-purple-600">Gérer planning</p>
                      </button>
                      <button
                        onClick={() => setShowWithdrawModal(true)}
                        className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-bank-card-line text-orange-600 text-2xl mb-2"></i>
                        <p className="text-sm font-medium text-orange-600">Retirer gains</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i
                              className={`${activity.type === 'session' ? 'ri-video-line' : activity.type === 'booking' ? 'ri-calendar-line' : 'ri-book-line'} text-blue-600 text-sm`}
                            ></i>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                            <p className="text-xs text-gray-600">{activity.description}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">Il y a {activity.time}</span>
                              <span className="text-xs font-medium text-green-600">{activity.amount}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bio' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                      <input
                        type="text"
                        defaultValue="Dr. Sarah Martin"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Spécialité</label>
                      <input
                        type="text"
                        defaultValue="Psychologue clinique"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="sarah.martin@expert.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        defaultValue="+33 6 12 34 56 78"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
                  <textarea
                    rows={4}
                    defaultValue="Psychologue clinique avec plus de 10 ans d'expérience dans l'accompagnement des troubles anxieux et la gestion du stress. Spécialisée dans les techniques de relaxation et la thérapie cognitivo-comportementale."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compétences</label>
                  <div className="flex flex-wrap gap-2">
                    {['Gestion du stress', 'Anxiété', 'Relaxation', 'TCC', 'Méditation', 'Burn-out'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    Enregistrer
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer">
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion des tarifs</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <i className="ri-message-line text-white text-2xl"></i>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">Réponse par message texte</h4>
                        <p className="text-sm text-gray-600">Format écrit</p>
                      </div>
                      <div className="text-center mb-4">
                        <input
                          type="number"
                          value={pricingState.textMessage}
                          onChange={(e) => setPricing({ ...pricingState, textMessage: parseInt(e.target.value) })}
                          className="w-20 text-center text-2xl font-bold border-2 border-blue-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-600 mt-1">coins par message</p>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• Réponse détaillée par écrit</li>
                        <li>• Conseils personnalisés</li>
                        <li>• Suivi de conversation</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <i className="ri-video-line text-white text-2xl"></i>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">Réponse par message vidéo</h4>
                        <p className="text-sm text-gray-600">Format vidéo</p>
                      </div>
                      <div className="text-center mb-4">
                        <input
                          type="number"
                          value={pricingState.videoMessage}
                          onChange={(e) => setPricing({ ...pricingState, videoMessage: parseInt(e.target.value) })}
                          className="w-20 text-center text-2xl font-bold border-2 border-green-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-sm text-gray-600 mt-1">coins par message</p>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• Réponse vidéo personnalisée</li>
                        <li>• Explications détaillées</li>
                        <li>• Connexion plus humaine</li>
                        <li>• Durée: 2-5 minutes</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <i className="ri-vidicon-line text-white text-2xl"></i>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">Rendez-vous en ligne</h4>
                        <p className="text-sm text-gray-600">Tarif par minute</p>
                      </div>
                      <div className="text-center mb-4">
                        <input
                          type="number"
                          value={pricingState.videoCallPerMinute}
                          onChange={(e) => setPricing({ ...pricingState, videoCallPerMinute: parseInt(e.target.value) })}
                          className="w-20 text-center text-2xl font-bold border-2 border-purple-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-sm text-gray-600 mt-1">coins par minute</p>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• Consultation en temps réel</li>
                        <li>• Échange interactif</li>
                        <li>• Séance personnalisée</li>
                        <li>• Minimum 10 minutes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Paramètres de tarification</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Remise pour pack de sessions</label>
                      <input
                        type="number"
                        placeholder="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">% de remise pour 5 sessions ou plus</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Frais d'annulation</label>
                      <input
                        type="number"
                        placeholder="25"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">% du tarif en cas d'annulation tardive</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'formations' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Mes formations</h3>
                  <button
                    onClick={handleCreateFormation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Créer une formation
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myFormations.map((formation) => (
                    <div key={formation.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={formation.thumbnail}
                        alt={formation.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{formation.title}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <span>{formation.students} étudiants</span>
                          <span className="font-medium text-green-600">{formation.earnings}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                            Modifier
                          </button>
                          <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm whitespace-nowrap cursor-pointer">
                            Statistiques
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Mes vidéos</h3>
                  <button
                    onClick={handleCreateVideo}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Nouvelle vidéo
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Mes vidéos</h2>
                  <div className="space-y-4">
                    {videoStats.map((video) => (
                      <div key={video.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-20 h-14 object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                            <i className="ri-play-circle-fill text-white text-2xl"></i>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{video.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <i className="ri-eye-line mr-1"></i>
                              {video.views.toLocaleString('fr-FR')}
                            </span>
                            <span className="flex items-center">
                              <i className="ri-thumb-up-line mr-1"></i>
                              {video.likes.toLocaleString('fr-FR')}
                            </span>
                            <span className="flex items-center">
                              <i className="ri-time-line mr-1"></i>
                              {video.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setShowModal('editVideo')}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Modifier
                          </button>
                          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                            Stats
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setShowModal('video')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Nouvelle vidéo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Gestion des disponibilités</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Horaires de travail</h4>
                    <div className="space-y-4">
                      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                        <div key={day} className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" defaultChecked={day !== 'Dimanche'} />
                            <span className="w-20 text-sm">{day}</span>
                          </label>
                          <input
                            type="time"
                            defaultValue="09:00"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-600">à</span>
                          <input
                            type="time"
                            defaultValue="18:00"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Paramètres</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium text-gray-900">Acceptation automatique</label>
                          <p className="text-sm text-gray-600">Accepter automatiquement les réservations</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Durée des créneaux</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                          <option value="30">30 minutes</option>
                          <option value="60" selected>
                            60 minutes
                          </option>
                          <option value="90">90 minutes</option>
                          <option value="120">120 minutes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Limite quotidienne</label>
                        <input
                          type="number"
                          defaultValue="6"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    Enregistrer les disponibilités
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Gestion des rendez-vous</h3>

                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <i className="ri-user-line text-gray-600"></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{appointment.client}</h4>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                            <div className="flex items-center space-x-3 mt-1">
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
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-medium text-green-600 mb-2">{appointment.price}€</div>
                          <div className="flex space-x-2">
                            {appointment.status === 'pending' && (
                              <>
                                <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                                  Accepter
                                </button>
                                <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                                  Refuser
                                </button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                                Reprogrammer
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Suivi des revenus</h3>
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Demander un retrait
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Revenus disponibles</h4>
                    <p className="text-3xl font-bold text-green-600">{expertData.pendingEarnings}€</p>
                    <p className="text-sm text-green-700 mt-1">Prêt pour retrait</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Revenus ce mois</h4>
                    <p className="text-3xl font-bold text-blue-600">3,240€</p>
                    <p className="text-sm text-blue-700 mt-1">+15% vs mois dernier</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">Revenus totaux</h4>
                    <p className="text-3xl font-bold text-purple-600">{expertData.totalEarnings}€</p>
                    <p className="text-sm text-purple-700 mt-1">Depuis le début</p>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Historique des transactions</h4>
                  <div className="space-y-3">
                    {[
                      { date: '2024-01-15', description: 'Session avec Marie Dupont', amount: '+80€', type: 'session' },
                      { date: '2024-01-14', description: 'Retrait vers compte bancaire', amount: '-500€', type: 'withdrawal' },
                      { date: '2024-01-13', description: 'Vente formation "Gestion du stress"', amount: '+150€', type: 'formation' },
                      { date: '2024-01-12', description: 'Session de groupe', amount: '+45€', type: 'group' }
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-green-100'
                              }`}
                          >
                            <i
                              className={`${transaction.type === 'withdrawal' ? 'ri-arrow-up-line text-red-600' : 'ri-arrow-down-line text-green-600'
                                } text-sm`}
                            ></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <span
                          className={`font-medium ${transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {transaction.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'referral' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Programme de parrainage</h3>

                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                  <h4 className="text-xl font-bold mb-2">Votre code de parrainage</h4>
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                      <span className="text-xl font-mono">SARAH2024</span>
                    </div>
                    <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors cursor-pointer">
                      Copier
                    </button>
                  </div>
                  <p className="mt-3 text-blue-100">Gagnez 20€ pour chaque nouvel expert parrainé</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Statistiques de parrainage</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experts parrainés</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bonus gagnés</span>
                        <span className="font-medium text-green-600">160€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">En attente</span>
                        <span className="font-medium text-orange-600">40€</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Parrainages récents</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Claire Martin', date: '2024-01-10', status: 'confirmed' },
                        { name: 'Pierre Dubois', date: '2024-01-08', status: 'pending' },
                        { name: 'Sophie Laurent', date: '2024-01-05', status: 'confirmed' }
                      ].map((referral, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{referral.name}</p>
                            <p className="text-xs text-gray-500">{referral.date}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${referral.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}
                          >
                            {referral.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Statistiques détaillées</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Taux de conversion</p>
                        <p className="text-2xl font-bold text-gray-900">68%</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i className="ri-arrow-up-line text-white text-xl"></i>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">+5% ce mois</p>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Satisfaction client</p>
                        <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                      </div>
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i className="ri-star-line text-white text-xl"></i>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">+0.1 ce mois</p>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Temps de réponse</p>
                        <p className="text-2xl font-bold text-gray-900">12min</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i className="ri-time-line text-white text-xl"></i>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">-3min ce mois</p>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Taux d'annulation</p>
                        <p className="text-2xl font-bold text-gray-900">2%</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <i className="ri-close-line text-white text-xl"></i>
                      </div>
                    </div>
                    <p className="text-sm text-red-600 mt-2">-1% ce mois</p>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Évolution des revenus</h4>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Graphique des revenus sur 12 mois</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Formation Modal */}
      {showCreateFormationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Créer une nouvelle formation
                </h3>
                <button
                  onClick={() => setShowCreateFormationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      formationStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    1
                  </div>
                  <div className={`w-8 h-1 ${formationStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      formationStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    2
                  </div>
                  <div className={`w-8 h-1 ${formationStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      formationStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    3
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Étape {formationStep} sur 3
                </div>
              </div>

              {/* Step 1: Type de formation */}
              {formationStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Quel type de formation souhaitez-vous créer ?
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() => {
                          setFormationType('single');
                          setFormationData((prev) => ({ ...prev, sessionType: 'single' }));
                        }}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          formationType === 'single'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="ri-time-line text-green-600 text-2xl"></i>
                          </div>
                          <h5 className="text-lg font-semibold text-gray-900">
                            Session unique
                          </h5>
                          <p className="text-sm text-gray-600 mb-4">
                            Une seule session d'apprentissage concentrée sur un sujet spécifique
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Durée: 60-180 minutes</li>
                            <li>• Format: Webinaire ou atelier</li>
                            <li>• Idéal pour: Concepts spécifiques</li>
                          </ul>
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          setFormationType('multiple');
                          setFormationData((prev) => ({ ...prev, sessionType: 'multiple' }));
                        }}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          formationType === 'multiple'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="ri-graduation-cap-line text-purple-600 text-2xl"></i>
                          </div>
                          <h5 className="text-lg font-semibold text-gray-900">
                            Formation complète
                          </h5>
                          <p className="text-sm text-gray-600 mb-4">
                            Plusieurs sessions étalées sur plusieurs semaines pour un apprentissage approfondi
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Durée: 4-12 semaines</li>
                            <li>• Format: Cours structuré</li>
                            <li>• Idéal pour: Formations complètes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Informations de base */}
              {formationStep === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900">
                    Informations de base
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de la formation *
                    </label>
                    <input
                      type="text"
                      value={formationData.title}
                      onChange={(e) => handleFormationDataChange('title', e.target.value)}
                      placeholder="Ex: Gestion du stress au travail"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formationData.description}
                      onChange={(e) => handleFormationDataChange('description', e.target.value)}
                      placeholder="Décrivez le contenu et les objectifs de votre formation..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie *
                      </label>
                      <select
                        value={formationData.category}
                        onChange={(e) => handleFormationDataChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="bien-etre">Bien-être</option>
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                        <option value="technologie">Technologie</option>
                        <option value="finance">Finance</option>
                        <option value="developpement-personnel">Développement personnel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Niveau *
                      </label>
                      <select
                        value={formationData.level}
                        onChange={(e) => handleFormationDataChange('level', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="">Sélectionnez un niveau</option>
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="avance">Avancé</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix (en €) *
                      </label>
                      <input
                        type="number"
                        value={formationData.price}
                        onChange={(e) => handleFormationDataChange('price', e.target.value)}
                        placeholder="99"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre max d'étudiants
                      </label>
                      <input
                        type="number"
                        value={formationData.maxStudents}
                        onChange={(e) => handleFormationDataChange('maxStudents', e.target.value)}
                        placeholder="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Planning */}
              {formationStep === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900">
                    Planning et organisation
                  </h4>

                  {formationType === 'single' && (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">
                          <i className="ri-calendar-line mr-2"></i>
                          Session unique
                        </h5>
                        <p className="text-sm text-green-700">
                          Configurez votre session d'apprentissage unique
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date de la session *
                          </label>
                          <input
                            type="date"
                            value={formationData.singleSession.date}
                            onChange={(e) => handleFormationDataChange('singleSession.date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Heure de début *
                          </label>
                          <input
                            type="time"
                            value={formationData.singleSession.time}
                            onChange={(e) => handleFormationDataChange('singleSession.time', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Durée de la session *
                        </label>
                        <select
                          value={formationData.singleSession.duration}
                          onChange={(e) => handleFormationDataChange('singleSession.duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                        >
                          <option value="60">1 heure</option>
                          <option value="90">1h30</option>
                          <option value="120">2 heures</option>
                          <option value="180">3 heures</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {formationType === 'multiple' && (
                    <div className="space-y-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h5 className="font-medium text-purple-800 mb-2">
                          <i className="ri-graduation-cap-line mr-2"></i>
                          Formation complète
                        </h5>
                        <p className="text-sm text-purple-700">
                          Configurez votre formation sur plusieurs semaines
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Durée totale *
                          </label>
                          <select
                            value={formationData.multipleSessions.totalWeeks}
                            onChange={(e) => handleFormationDataChange('multipleSessions.totalWeeks', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          >
                            <option value="4">4 semaines</option>
                            <option value="6">6 semaines</option>
                            <option value="8">8 semaines</option>
                            <option value="10">10 semaines</option>
                            <option value="12">12 semaines</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sessions par semaine *
                          </label>
                          <select
                            value={formationData.multipleSessions.sessionsPerWeek}
                            onChange={(e) => handleFormationDataChange('multipleSessions.sessionsPerWeek', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          >
                            <option value="1">1 session</option>
                            <option value="2">2 sessions</option>
                            <option value="3">3 sessions</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jour de la semaine *
                          </label>
                          <select
                            value={formationData.multipleSessions.weeklySchedule}
                            onChange={(e) => handleFormationDataChange('multipleSessions.weeklySchedule', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          >
                            <option value="monday">Lundi</option>
                            <option value="tuesday">Mardi</option>
                            <option value="wednesday">Mercredi</option>
                            <option value="thursday">Jeudi</option>
                            <option value="friday">Vendredi</option>
                            <option value="saturday">Samedi</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Durée par session *
                          </label>
                          <select
                            value={formationData.multipleSessions.sessionDuration}
                            onChange={(e) => handleFormationDataChange('multipleSessions.sessionDuration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                          >
                            <option value="60">1 heure</option>
                            <option value="90">1h30</option>
                            <option value="120">2 heures</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de début *
                        </label>
                        <input
                          type="date"
                          value={formationData.multipleSessions.startDate}
                          onChange={(e) => handleFormationDataChange('multipleSessions.startDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <button
                  onClick={handlePreviousStep}
                  disabled={formationStep === 1}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    formationStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                  }`}
                >
                  Précédent
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateFormationModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Annuler
                  </button>

                  {formationStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      disabled={formationStep === 1 && !formationType}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                        (formationStep === 1 && !formationType)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                      }`}
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitFormation}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Créer la formation
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Video Modal */}
      {showCreateVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Créer une nouvelle vidéo
                </h3>
                <button
                  onClick={() => setShowCreateVideoModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      videoStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    1
                  </div>
                  <div className={`w-8 h-1 ${videoStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      videoStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    2
                  </div>
                  <div className={`w-8 h-1 ${videoStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      videoStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    3
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Étape {videoStep} sur 3
                </div>
              </div>

              {/* Step 1: Informations de base */}
              {videoStep === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900">
                    Informations de base
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de la vidéo *
                    </label>
                    <input
                      type="text"
                      value={videoData.title}
                      onChange={(e) => handleVideoDataChange('title', e.target.value)}
                      placeholder="Ex: 5 techniques pour réduire le stress"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={videoData.description}
                      onChange={(e) => handleVideoDataChange('description', e.target.value)}
                      placeholder="Décrivez le contenu de votre vidéo..."
                      rows={4}
                      maxLength={500}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {videoData.description.length}/500 caractères
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie *
                      </label>
                      <select
                        value={videoData.category}
                        onChange={(e) => handleVideoDataChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="bien-etre">Bien-être</option>
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                        <option value="technologie">Technologie</option>
                        <option value="finance">Finance</option>
                        <option value="developpement-personnel">Développement personnel</option>
                        <option value="education">Éducation</option>
                        <option value="sante">Santé</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Durée estimée *
                      </label>
                      <select
                        value={videoData.duration}
                        onChange={(e) => handleVideoDataChange('duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="">Sélectionnez la durée</option>
                        <option value="1-3">1-3 minutes</option>
                        <option value="3-5">3-5 minutes</option>
                        <option value="5-10">5-10 minutes</option>
                        <option value="10-15">10-15 minutes</option>
                        <option value="15-20">15-20 minutes</option>
                        <option value="20+">Plus de 20 minutes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de vidéo *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() => handleVideoDataChange('type', 'free')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          videoData.type === 'free'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="ri-gift-line"></i>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Gratuite</h5>
                            <p className="text-sm text-gray-600">Accessible à tous</p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleVideoDataChange('type', 'premium')}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          videoData.type === 'premium'
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i className="ri-vip-crown-line"></i>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Premium</h5>
                            <p className="text-sm text-gray-600">Contenu payant</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {videoData.type === 'premium' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix (coins) *
                      </label>
                      <input
                        type="number"
                        value={videoData.price}
                        onChange={(e) => handleVideoDataChange('price', e.target.value)}
                        placeholder="Ex: 25"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Prix recommandé : 10-50 coins selon la durée
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Fichiers multimédias */}
              {videoStep === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900">
                    Fichiers multimédias
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fichier vidéo *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => e.target.files && handleFileUpload('videoFile', e.target.files[0])}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload" className="cursor-pointer">
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <i className="ri-video-upload-line text-blue-600"></i>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              {videoData.videoFile ? videoData.videoFile.name : 'Cliquez pour sélectionner votre vidéo'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Formats acceptés: MP4, MOV, AVI (Max: 500MB)
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Miniature personnalisée (optionnel)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && handleFileUpload('thumbnail', e.target.files[0])}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label htmlFor="thumbnail-upload" className="cursor-pointer">
                        <div className="space-y-2">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                            <i className="ri-image-line"></i>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              {videoData.thumbnail ? videoData.thumbnail.name : 'Sélectionner une miniature'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Format recommandé: 16:9 (1920x1080px)
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">
                      <i className="ri-information-line mr-2"></i>
                      Conseils pour vos vidéos
                    </h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Utilisez un éclairage naturel ou une lampe LED</li>
                      <li>• Enregistrez dans un environnement calme</li>
                      <li>• Parlez clairement et distinctement</li>
                      <li>• Structurez votre contenu avec une introduction, développement et conclusion</li>
                      <li>• Gardez vos vidéos engageantes et concises</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 3: Optimisation et publication */}
              {videoStep === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900">
                    Optimisation et publication
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mots-clés (tags)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {videoData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{tag}</span>
                          <button
                            onClick={() => handleTagRemove(tag)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ajouter un mot-clé..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = e.target.value.trim();
                            if (value) {
                              handleTagAdd(value);
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector(
                            'input[placeholder="Ajouter un mot-clé..."]'
                          ) as HTMLInputElement;
                          if (input && input.value.trim()) {
                            handleTagAdd(input.value.trim());
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Ajoutez des mots-clés pour améliorer la découverte de votre vidéo
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Récapitulatif</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Titre:</p>
                        <p className="font-medium text-gray-900">{videoData.title || 'Non défini'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Catégorie:</p>
                        <p className="font-medium text-gray-900">{videoData.category || 'Non définie'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Type:</p>
                        <p className="font-medium text-gray-900">
                          {videoData.type === 'free' ? 'Gratuite' : `Premium (${videoData.price} coins)`}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Durée:</p>
                        <p className="font-medium text-gray-900">{videoData.duration || 'Non définie'} min</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fichier vidéo:</p>
                        <p className="font-medium text-gray-900">
                          {videoData.videoFile ? '✓ Téléchargé' : '✗ Manquant'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Miniature:</p>
                        <p className="font-medium text-gray-900">
                          {videoData.thumbnail ? '✓ Personnalisée' : '⚠ Auto-générée'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-medium text-green-800 mb-2">
                      <i className="ri-check-line mr-2"></i>
                      Prêt pour la publication
                    </h5>
                    <p className="text-sm text-green-700">
                      Votre vidéo sera traitée et publiée dans les prochaines minutes. Vous recevrez une notification une
                      fois qu'elle sera disponible.
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <button
                  onClick={handleVideoPreviousStep}
                  disabled={videoStep === 1}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    videoStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                  }`}
                >
                  Précédent
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateVideoModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Annuler
                  </button>

                  {videoStep < 3 ? (
                    <button
                      onClick={handleVideoNextStep}
                      disabled={
                        (videoStep === 1 && (!videoData.title || !videoData.category || !videoData.type)) ||
                        (videoStep === 2 && !videoData.videoFile)
                      }
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                        (videoStep === 1 && (!videoData.title || !videoData.category || !videoData.type)) ||
                        (videoStep === 2 && !videoData.videoFile)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                      }`}
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitVideo}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Publier la vidéo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demander un retrait</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Montant disponible</label>
                <p className="text-2xl font-bold text-green-600">{expertData.pendingEarnings}€</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Montant à retirer</label>
                <input
                  type="number"
                  max={expertData.pendingEarnings}
                  placeholder="Montant"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Méthode de retrait</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                  <option>Virement bancaire</option>
                  <option>PayPal</option>
                  <option>Stripe</option>
                </select>
              </div>

              <p className="text-sm text-gray-600">
                Délai de traitement : 2-3 jours ouvrables
              </p>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
