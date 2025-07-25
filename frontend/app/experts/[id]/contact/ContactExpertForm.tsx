'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Expert } from '../../../../services/api';
import { useAuth } from '../../../../contexts/AuthContext';

export default function ContactExpertForm({ expert }: { expert: Expert }) {
  const router = useRouter();
  const [messageType, setMessageType] = useState('text');
  const [message, setMessage] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [sending, setSending] = useState(false);
  
  const { user } = useAuth();

  const handleContact = async () => {
    if (!message.trim()) {
      alert('Veuillez saisir un message');
      return;
    }

    try {
      setSending(true);
      
      // Simuler l'envoi du message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsRedirecting(true);
      // Redirect to chat page with expert
      router.push(`/dashboard/chat/${expert.id}`);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setSending(false);
    }
  };

  const getCost = () => {
    switch (messageType) {
      case 'text': return `${expert.pricePerMessage} coins`;
      case 'video': return `${expert.pricePerMessage * 2} coins`;
      default: return `${expert.pricePerMessage} coins`;
    }
  };

  const getIcon = () => {
    switch (messageType) {
      case 'text': return 'ri-message-line';
      case 'video': return 'ri-video-line';
      default: return 'ri-message-line';
    }
  };

  const hasEnoughCoins = () => {
    const cost = messageType === 'video' ? expert.pricePerMessage * 2 : expert.pricePerMessage;
    return (user?.coins || 0) >= cost;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link 
          href={`/experts/${expert.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Retour au profil
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Header avec info expert */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-24 h-24 rounded-full border-4 border-white/20"
              />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                expert.isOnline ? 'bg-green-500' : 'bg-gray-500'
              }`}>
                <i className={`ri-${expert.isOnline ? 'check' : 'time'}-line text-white text-sm`}></i>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{expert.name}</h1>
              <p className="text-blue-100 text-lg mb-3">{expert.specialty}</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <i className="ri-star-fill text-yellow-400 mr-1"></i>
                  <span>{expert.rating} ({expert.reviews} avis)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line mr-1"></i>
                  <span>Répond en {expert.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <i className={`ri-circle-fill mr-1 ${expert.isOnline ? 'text-green-400' : 'text-gray-400'}`}></i>
                  <span>{expert.isOnline ? 'En ligne' : 'Hors ligne'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Contacter {expert.name}
          </h2>

          {/* Type de message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Type de message
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setMessageType('text')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  messageType === 'text'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    messageType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <i className="ri-message-line text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Message texte</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{expert.pricePerMessage} coins</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMessageType('video')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  messageType === 'video'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    messageType === 'video' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <i className="ri-video-line text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Message vidéo</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{expert.pricePerMessage * 2} coins</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Votre message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Décrivez votre question ou problématique pour ${expert.name}...`}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Soyez précis dans votre demande pour obtenir une réponse adaptée.
            </p>
          </div>

          {/* Informations sur les coins */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <i className="ri-coin-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Coût du message</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vos coins: {user?.coins || 0} • Coût: {getCost()}
                  </p>
                </div>
              </div>
              
              {!hasEnoughCoins() && (
                <Link
                  href="/dashboard/coins"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                >
                  Acheter des coins
                </Link>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleContact}
              disabled={!message.trim() || !hasEnoughCoins() || sending || isRedirecting}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                !message.trim() || !hasEnoughCoins() || sending || isRedirecting
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : messageType === 'video'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {sending || isRedirecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{sending ? 'Envoi en cours...' : 'Redirection...'}</span>
                </>
              ) : (
                <>
                  <i className={`${getIcon()} text-xl`}></i>
                  <span>Envoyer le message ({getCost()})</span>
                </>
              )}
            </button>

            <Link
              href={`/experts/${expert.id}/book`}
              className="flex-1 flex items-center justify-center space-x-3 py-4 px-6 bg-white dark:bg-gray-700 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200"
            >
              <i className="ri-calendar-line text-xl"></i>
              <span>Réserver une consultation</span>
            </Link>
          </div>

          {!hasEnoughCoins() && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center">
                <i className="ri-error-warning-line text-yellow-600 dark:text-yellow-400 text-xl mr-3"></i>
                <p className="text-yellow-800 dark:text-yellow-200">
                  Vous n'avez pas assez de coins pour envoyer ce message. 
                  <Link href="/dashboard/coins" className="font-semibold underline ml-1">
                    Acheter des coins
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

