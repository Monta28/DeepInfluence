
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ContactExpertForm({ expertId }: { expertId: string }) {
  const router = useRouter();
  const [messageType, setMessageType] = useState('text');
  const [message, setMessage] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const expert = {
    id: expertId,
    name: 'Dr. Sarah Martinez',
    specialty: 'Consultante en Stratégie d\'Entreprise',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20businesswoman%20portrait%2C%20confident%20female%20business%20strategist%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional%2C%20expert%20consultant%2C%20high%20quality%20portrait&width=120&height=120&seq=contact-sarah-001&orientation=squarish',
    priceText: '25 coins/message',
    priceVideo: '45 coins/message vidéo',
    isOnline: true,
    responseTime: '< 2h'
  };

  const handleContact = () => {
    setIsRedirecting(true);
    // Redirect to chat page with expert
    router.push(`/dashboard/chat/${expert.id}`);
  };

  const getCost = () => {
    switch (messageType) {
      case 'text': return '25 coins';
      case 'video': return '45 coins';
      default: return '25 coins';
    }
  };

  const getIcon = () => {
    switch (messageType) {
      case 'text': return 'ri-message-line';
      case 'video': return 'ri-video-line';
      default: return 'ri-message-line';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link 
          href={`/experts/${expertId}`} 
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          <span>Retour au profil</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contacter l'expert</h1>
        <p className="text-gray-600 dark:text-gray-300">Choisissez votre mode de communication préféré.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Type de communication</h2>
            
            <div className="space-y-4 mb-6">
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  messageType === 'text' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setMessageType('text')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="ri-message-line text-blue-600 text-xl mr-3"></i>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Message texte</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Communication rapide et directe</p>
                    </div>
                  </div>
                  <span className="font-semibold text-blue-600">{expert.priceText}</span>
                </div>
              </div>

              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  messageType === 'video' 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setMessageType('video')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="ri-video-line text-purple-600 text-xl mr-3"></i>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Message vidéo</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Enregistrement vidéo personnalisé</p>
                    </div>
                  </div>
                  <span className="font-semibold text-purple-600">{expert.priceVideo}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Votre message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Décrivez votre demande ou vos questions..."
              />
            </div>

            <button
              onClick={handleContact}
              disabled={isRedirecting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              {isRedirecting ? 'Redirection...' : `Contacter maintenant (${getCost()})`}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expert sélectionné</h3>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <img 
                  src={expert.avatar} 
                  alt={expert.name}
                  className="w-16 h-16 rounded-full object-cover object-top"
                />
                {expert.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{expert.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{expert.specialty}</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {expert.isOnline ? 'En ligne' : 'Hors ligne'} • Répond en {expert.responseTime}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <i className={`${getIcon()} text-blue-600 mr-2`}></i>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {messageType === 'text' && 'Message texte'}
                  {messageType === 'video' && 'Message vidéo'}
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Coût: {getCost()}
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              <p>• Paiement sécurisé</p>
              <p>• Réponse garantie</p>
              <p>• Support 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
