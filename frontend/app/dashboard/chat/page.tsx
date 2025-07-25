
'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Link from 'next/link';

export default function ChatList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const chats = [
    {
      id: 1,
      expert: 'Dr. Sarah Martin',
      specialty: 'Psychologue clinique',
      lastMessage: 'Je vous remercie pour votre confiance. À très bientôt !',
      timestamp: '14:30',
      unread: 0,
      isOnline: true,
      priority: 'high',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20with%20warm%20smile%2C%20modern%20office%20background%2C%20confident%20and%20approachable%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-1&orientation=squarish'
    },
    {
      id: 2,
      expert: 'Marc Dubois',
      specialty: 'Expert en Marketing Digital',
      lastMessage: 'Voici les documents que vous avez demandés pour votre stratégie.',
      timestamp: '12:45',
      unread: 2,
      isOnline: false,
      priority: 'medium',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20marketing%20expert%20with%20confident%20smile%2C%20modern%20digital%20office%20background%2C%20business%20casual%20attire%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-2&orientation=squarish'
    },
    {
      id: 3,
      expert: 'Sophie Laurent',
      specialty: 'Coach en Développement Personnel',
      lastMessage: 'Excellent travail ! Continuez sur cette lancée.',
      timestamp: 'Hier',
      unread: 1,
      isOnline: true,
      priority: 'high',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20life%20coach%20with%20inspiring%20smile%2C%20bright%20modern%20office%20background%2C%20professional%20attire%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-3&orientation=squarish'
    },
    {
      id: 4,
      expert: 'Thomas Bernard',
      specialty: 'Conseiller Financier',
      lastMessage: 'N\'hésitez pas si vous avez d\'autres questions sur votre portefeuille.',
      timestamp: 'Lundi',
      unread: 0,
      isOnline: false,
      priority: 'low',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-6&orientation=squarish'
    },
    {
      id: 5,
      expert: 'Claire Rousseau',
      specialty: 'Développeuse Full Stack',
      lastMessage: 'Le code que vous avez envoyé semble correct. Quelques optimisations sont possibles.',
      timestamp: 'Dimanche',
      unread: 0,
      isOnline: true,
      priority: 'medium',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20casual%20professional%20attire%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-5&orientation=squarish'
    },
    {
      id: 6,
      expert: 'Jean-Pierre Moreau',
      specialty: 'Consultant en Stratégie',
      lastMessage: 'Merci pour votre retour. Je vais préparer le rapport pour demain.',
      timestamp: 'Samedi',
      unread: 0,
      isOnline: false,
      priority: 'low',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20consultant%20with%20serious%20expression%2C%20corporate%20office%20background%2C%20elegant%20suit%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-4&orientation=squarish'
    }
  ];

  const filters = [
    { id: 'all', label: 'Toutes', count: chats.length },
    { id: 'unread', label: 'Non lues', count: chats.filter(c => c.unread > 0).length },
    { id: 'online', label: 'En ligne', count: chats.filter(c => c.isOnline).length },
    { id: 'priority', label: 'Prioritaires', count: chats.filter(c => c.priority === 'high').length }
  ];

  const getFilteredChats = () => {
    let filtered = chats;
    
    if (activeFilter === 'unread') {
      filtered = chats.filter(c => c.unread > 0);
    } else if (activeFilter === 'online') {
      filtered = chats.filter(c => c.isOnline);
    } else if (activeFilter === 'priority') {
      filtered = chats.filter(c => c.priority === 'high');
    }
    
    return filtered.filter(chat =>
      chat.expert.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredChats = getFilteredChats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <DashboardHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Messagerie
          </h1>
          <p className="text-xl text-gray-600">
            Communiquez avec vos experts en temps réel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <i className="ri-message-2-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{chats.length}</h3>
                <p className="text-gray-600 text-sm">Conversations</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <i className="ri-user-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{chats.filter(c => c.isOnline).length}</h3>
                <p className="text-gray-600 text-sm">Experts en ligne</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <i className="ri-notification-3-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{chats.reduce((acc, chat) => acc + chat.unread, 0)}</h3>
                <p className="text-gray-600 text-sm">Messages non lus</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <i className="ri-time-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">&lt; 2h</h3>
                <p className="text-gray-600 text-sm">Temps de réponse</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 overflow-hidden">
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="relative flex-1 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-search-line text-gray-400 text-xl"></i>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeFilter === filter.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                    <span className="ml-2 px-2 py-1 text-xs bg-white/20 rounded-full">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200/50">
            {filteredChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/dashboard/chat/${chat.id}`}
                className="block hover:bg-blue-50/50 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={chat.image}
                        alt={chat.expert}
                        className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                      />
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
                      )}
                      {chat.priority === 'high' && (
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 truncate text-lg group-hover:text-blue-600 transition-colors">
                          {chat.expert}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500 font-medium">
                            {chat.timestamp}
                          </span>
                          {chat.unread > 0 && (
                            <span className="min-w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-lg">
                          {chat.specialty}
                        </span>
                        {chat.isOnline && (
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                            En ligne
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 truncate text-base">
                        {chat.lastMessage}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors group">
                        <i className="ri-video-line text-blue-600 group-hover:scale-110 transition-transform"></i>
                      </button>
                      <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors group">
                        <i className="ri-phone-line text-gray-600 group-hover:scale-110 transition-transform"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredChats.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-chat-3-line text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Aucune conversation trouvée
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Commencez une conversation avec un expert pour démarrer votre apprentissage personnalisé.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                Trouver un expert
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-add-line text-2xl"></i>
              </div>
              <h4 className="font-semibold mb-2">Nouveau contact</h4>
              <p className="text-blue-100 text-sm mb-4">Ajouter un nouvel expert</p>
              <button className="bg-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/30 transition-colors whitespace-nowrap">
                Ajouter
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-2xl"></i>
              </div>
              <h4 className="font-semibold mb-2">Conversation de groupe</h4>
              <p className="text-blue-100 text-sm mb-4">Créer un groupe d'experts</p>
              <button className="bg-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/30 transition-colors whitespace-nowrap">
                Créer
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-history-line text-2xl"></i>
              </div>
              <h4 className="font-semibold mb-2">Historique</h4>
              <p className="text-blue-100 text-sm mb-4">Voir l'historique complet</p>
              <button className="bg-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/30 transition-colors whitespace-nowrap">
                Consulter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
