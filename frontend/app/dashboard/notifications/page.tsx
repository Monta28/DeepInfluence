'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '../../../contexts/AuthContext';
import ApiService from '../../../services/api';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }
    loadNotifications();
  }, [user, router]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Simuler un appel API pour les notifications
      // En attendant l'implémentation backend, on utilise des données de fallback
      const mockNotifications = [
        {
          id: 1,
          type: 'session',
          title: 'Rappel de rendez-vous',
          message: `Consultation avec Dr. Sarah Martin dans 30 minutes`,
          time: '2 minutes',
          read: false,
          category: 'Rendez-vous',
          priority: 'high',
          createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          type: 'message',
          title: 'Nouveau message',
          message: 'Marc Dubois vous a envoyé un message vidéo',
          time: '5 minutes',
          read: false,
          category: 'Messages',
          priority: 'medium',
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          type: 'formation',
          title: 'Formation disponible',
          message: 'Nouvelle formation "Marketing Digital Avancé" disponible',
          time: '1 heure',
          read: true,
          category: 'Formations',
          priority: 'low',
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
        },
        {
          id: 4,
          type: 'session',
          title: 'Session terminée',
          message: 'Votre consultation avec Emma Wilson est terminée',
          time: '3 heures',
          read: true,
          category: 'Rendez-vous',
          priority: 'medium',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 5,
          type: 'payment',
          title: 'Paiement confirmé',
          message: 'Votre paiement de 80€ pour la consultation a été confirmé',
          time: '1 jour',
          read: true,
          category: 'Paiements',
          priority: 'medium',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      setNotifications(mockNotifications);
    } catch (err: any) {
      console.error('Erreur lors du chargement des notifications:', err);
      setError('Erreur lors du chargement des notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      // Simuler l'appel API pour marquer comme lu
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la notification:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Simuler l'appel API pour marquer toutes comme lues
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour des notifications:', err);
    }
  };

  const deleteNotification = async (notificationId: number) => {
    try {
      // Simuler l'appel API pour supprimer
      setNotifications(prev => 
        prev.filter(notif => notif.id !== notificationId)
      );
    } catch (err) {
      console.error('Erreur lors de la suppression de la notification:', err);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    if (activeFilter === 'read') return notification.read;
    return notification.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'session': return 'ri-calendar-line';
      case 'message': return 'ri-message-line';
      case 'formation': return 'ri-graduation-cap-line';
      case 'payment': return 'ri-money-dollar-circle-line';
      default: return 'ri-notification-line';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Toutes les notifications sont lues'}
              </p>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Toutes', count: notifications.length },
              { id: 'unread', label: 'Non lues', count: unreadCount },
              { id: 'read', label: 'Lues', count: notifications.length - unreadCount },
              { id: 'session', label: 'Rendez-vous', count: notifications.filter(n => n.type === 'session').length },
              { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
              { id: 'formation', label: 'Formations', count: notifications.filter(n => n.type === 'formation').length }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400">Chargement des notifications...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-error-warning-line text-red-600 dark:text-red-400 text-xl mr-3"></i>
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {/* Notifications List */}
        {!loading && !error && (
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-notification-off-line text-gray-400 text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Aucune notification
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeFilter === 'all' 
                    ? 'Vous n\'avez aucune notification pour le moment.'
                    : `Aucune notification ${activeFilter === 'unread' ? 'non lue' : activeFilter === 'read' ? 'lue' : `de type "${activeFilter}"`} trouvée.`
                  }
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
                    notification.read 
                      ? 'border-gray-200 dark:border-gray-700' 
                      : 'border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPriorityColor(notification.priority)}`}>
                        <i className={`${getNotificationIcon(notification.type)} text-xl`}></i>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-semibold ${notification.read ? 'text-gray-900 dark:text-white' : 'text-blue-900 dark:text-blue-100'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                              <span className="text-sm text-gray-500 dark:text-gray-500">
                                Il y a {notification.time}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                {notification.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                              >
                                Marquer comme lu
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

