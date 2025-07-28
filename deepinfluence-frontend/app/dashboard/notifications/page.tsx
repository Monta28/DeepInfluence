
'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'session',
      title: 'Rappel de rendez-vous',
      message: 'Consultation avec Dr. Sarah Martin dans 30 minutes',
      time: '2 minutes',
      read: false,
      category: 'Rendez-vous',
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message',
      message: 'Marc Dubois vous a envoyé un message vidéo',
      time: '5 minutes',
      read: false,
      category: 'Messages',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'formation',
      title: 'Formation disponible',
      message: 'Nouvelle formation "Marketing Digital Avancé" disponible',
      time: '1 heure',
      read: true,
      category: 'Formations',
      priority: 'low'
    },
    {
      id: 4,
      type: 'session',
      title: 'Session terminée',
      message: 'Votre consultation avec Emma Wilson est terminée',
      time: '3 heures',
      read: true,
      category: 'Rendez-vous',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'message',
      title: 'Réponse reçue',
      message: 'Julie Lambert a répondu à votre question',
      time: '1 jour',
      read: false,
      category: 'Messages',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'formation',
      title: 'Formation commencée',
      message: 'Votre formation "Investissement Personnel" a commencé',
      time: '2 jours',
      read: true,
      category: 'Formations',
      priority: 'high'
    }
  ]);

  const filters = [
    { id: 'all', label: 'Toutes', count: notifications.length },
    { id: 'unread', label: 'Non lues', count: notifications.filter(n => !n.read).length },
    { id: 'session', label: 'Sessions', count: notifications.filter(n => n.type === 'session').length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'formation', label: 'Formations', count: notifications.filter(n => n.type === 'formation').length }
  ];

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'session':
        return notifications.filter(n => n.type === 'session');
      case 'message':
        return notifications.filter(n => n.type === 'message');
      case 'formation':
        return notifications.filter(n => n.type === 'formation');
      default:
        return notifications;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'session':
        return 'ri-calendar-line';
      case 'message':
        return 'ri-message-2-line';
      case 'formation':
        return 'ri-graduation-cap-line';
      default:
        return 'ri-notification-line';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <DashboardHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Gérez vos notifications et restez informé</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Tout marquer comme lu
            </button>
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-settings-3-line text-xl text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 px-2 py-1 text-xs bg-white/20 dark:bg-gray-600/50 rounded-full">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-notification-off-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune notification</h3>
                <p className="text-gray-500 dark:text-gray-400">Vous n'avez aucune notification dans cette catégorie</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      notification.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                      notification.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      <i className={`${getNotificationIcon(notification.type)} text-xl ${
                        notification.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                        notification.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
                      }`}></i>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getPriorityColor(notification.priority)}`}>
                          {notification.category}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Il y a {notification.time}</span>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                            >
                              Marquer comme lu
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 cursor-pointer"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <i className="ri-more-line text-gray-400"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
