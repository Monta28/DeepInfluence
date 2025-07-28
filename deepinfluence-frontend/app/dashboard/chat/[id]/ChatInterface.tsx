
'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Link from 'next/link';

interface ChatInterfaceProps {
  chatId: string;
}

export default function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageType, setMessageType] = useState('text');
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [isConversationFree, setIsConversationFree] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userCoins, setUserCoins] = useState(250);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [isChatFavorited, setIsChatFavorited] = useState(false);
  const [isChatArchived, setIsChatArchived] = useState(false);
  const [isChatBlocked, setIsChatBlocked] = useState(false);

  const expert = {
    id: chatId,
    name: 'Dr. Sarah Martin',
    specialty: 'Psychologue clinique',
    isOnline: true,
    pricing: {
      textMessage: 50,
      videoMessage: 100
    },
    image: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20with%20warm%20smile%2C%20modern%20office%20background%2C%20confident%20and%20approachable%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-1&orientation=squarish'
  };

  const messages = [
    {
      id: 1,
      type: 'received',
      content: 'Bonjour ! Je suis ravie de pouvoir vous accompagner. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: '10:30',
      messageType: 'text',
      cost: 0
    },
    {
      id: 2,
      type: 'sent',
      content: 'Bonjour Docteur Martin, j\'aimerais discuter de mes problèmes de stress au travail.',
      timestamp: '10:32',
      messageType: 'text',
      cost: 50
    },
    {
      id: 3,
      type: 'received',
      content: 'Je comprends parfaitement. Le stress professionnel est très courant. Pouvez-vous me parler de votre environnement de travail ?',
      timestamp: '10:35',
      messageType: 'text',
      cost: 0
    },
    {
      id: 4,
      type: 'sent',
      content: 'Je travaille dans une entreprise très exigeante, avec des deadlines serrées.',
      timestamp: '10:37',
      messageType: 'text',
      cost: 50
    },
    {
      id: 5,
      type: 'received',
      content: 'Voici une vidéo avec quelques techniques de relaxation que vous pouvez utiliser pendant vos pauses.',
      timestamp: '10:40',
      messageType: 'video',
      videoThumbnail: 'https://readdy.ai/api/search-image?query=Relaxation%20techniques%20video%20thumbnail%20with%20peaceful%20person%20meditating%2C%20calming%20environment%2C%20wellness%20theme&width=300&height=200&seq=video-message&orientation=landscape',
      cost: 0
    },
    {
      id: 6,
      type: 'sent',
      content: 'Merci beaucoup pour cette vidéo ! Les techniques semblent très utiles.',
      timestamp: '10:45',
      messageType: 'text',
      cost: 50
    },
    {
      id: 7,
      type: 'sent',
      content: 'Voici mon rapport de stress de la semaine dernière.',
      timestamp: '10:47',
      messageType: 'file',
      fileName: 'rapport_stress_semaine.pdf',
      fileSize: '2.1 MB',
      cost: 25
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const cost = isConversationFree ? 0 : 
                   messageType === 'text' ? expert.pricing.textMessage : 
                   expert.pricing.videoMessage;
      
      if (!isConversationFree && userCoins < cost) {
        setShowPaymentModal(true);
        return;
      }
      
      if (!isConversationFree) {
        setUserCoins(userCoins - cost);
      }
      
      setMessage('');
      setShowTypeSelector(false);
      
      // Ici, on ajouterait la logique pour envoyer le message
      // et déclencher le système de remboursement après 48h si pas de réponse
    }
  };

  const handleFileUpload = () => {
    setShowFileUpload(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Vérifier la taille du fichier (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximale: 10MB');
        return;
      }
      
      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Type de fichier non autorisé. Formats acceptés: JPG, PNG, GIF, PDF, TXT, DOC, DOCX');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSendFile = () => {
    if (selectedFile) {
      const cost = isConversationFree ? 0 : 25; // Coût fixe pour les fichiers
      
      if (!isConversationFree && userCoins < cost) {
        setShowPaymentModal(true);
        return;
      }
      
      if (!isConversationFree) {
        setUserCoins(userCoins - cost);
      }
      
      // Ici, on ajouterait la logique pour envoyer le fichier
      setSelectedFile(null);
      setShowFileUpload(false);
    }
  };

  const handleVideoCall = () => {
    // Logique de consultation en ligne
  };

  const toggleConversationFree = () => {
    setIsConversationFree(!isConversationFree);
  };

  const messageTypeOptions = [
    { 
      id: 'text', 
      label: 'Message texte', 
      icon: 'ri-message-line',
      cost: isConversationFree ? 0 : expert.pricing.textMessage,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      id: 'video', 
      label: 'Message vidéo', 
      icon: 'ri-video-line',
      cost: isConversationFree ? 0 : expert.pricing.videoMessage,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b bg-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard/chat"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-gray-600"></i>
                </Link>
                <div className="relative">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {expert.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{expert.name}</h3>
                  <p className="text-sm text-gray-600">{expert.specialty}</p>
                  <p className="text-xs text-green-600">
                    {expert.isOnline ? 'En ligne' : 'Hors ligne'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full">
                  <i className="ri-coins-line text-blue-600"></i>
                  <span className="text-sm font-medium text-blue-600">{userCoins} coins</span>
                </div>
                
                <button
                  onClick={toggleConversationFree}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isConversationFree 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={isConversationFree ? 'Conversation gratuite active' : 'Rendre la conversation gratuite'}
                >
                  {isConversationFree ? (
                    <>
                      <i className="ri-gift-line mr-1"></i>
                      Gratuit
                    </>
                  ) : (
                    <>
                      <i className="ri-money-dollar-circle-line mr-1"></i>
                      Payant
                    </>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowChatOptions(!showChatOptions)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    <i className="ri-more-line"></i>
                  </button>
                  
                  {showChatOptions && (
                    <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-10">
                      <button
                        onClick={() => {
                          setIsChatFavorited(!isChatFavorited);
                          setShowChatOptions(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <i className={`${isChatFavorited ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'}`}></i>
                        <span className="text-sm text-gray-700">
                          {isChatFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsChatArchived(!isChatArchived);
                          setShowChatOptions(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <i className={`${isChatArchived ? 'ri-inbox-unarchive-line text-blue-600' : 'ri-inbox-archive-line text-gray-600'}`}></i>
                        <span className="text-sm text-gray-700">
                          {isChatArchived ? 'Désarchiver' : 'Archiver'}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsChatBlocked(!isChatBlocked);
                          setShowChatOptions(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <i className={`${isChatBlocked ? 'ri-user-unfollow-line text-red-600' : 'ri-user-forbid-line text-gray-600'}`}></i>
                        <span className="text-sm text-gray-700">
                          {isChatBlocked ? 'Débloquer' : 'Bloquer'}
                        </span>
                      </button>
                      
                      <hr className="my-2" />
                      
                      <button
                        onClick={() => {
                          setShowChatOptions(false);
                          // Logique pour supprimer la conversation
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                      >
                        <i className="ri-delete-bin-line"></i>
                        <span className="text-sm">Supprimer la conversation</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.type === 'sent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.messageType === 'video' ? (
                    <div className="space-y-2">
                      <img
                        src={msg.videoThumbnail}
                        alt="Message vidéo"
                        className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      />
                      <div className="flex items-center space-x-2">
                        <i className="ri-play-circle-line text-lg"></i>
                        <span className="text-sm">Message vidéo</span>
                      </div>
                    </div>
                  ) : msg.messageType === 'file' ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <i className="ri-file-line text-2xl"></i>
                        <div>
                          <p className="text-sm font-medium">{msg.fileName}</p>
                          <p className="text-xs opacity-75">{msg.fileSize}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-attachment-line text-sm"></i>
                        <span className="text-sm">Fichier joint</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`text-xs ${
                        msg.type === 'sent' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                    {msg.cost > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        msg.type === 'sent' 
                          ? 'bg-blue-500 text-blue-100' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {msg.cost}c
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t bg-white rounded-b-lg">
            {/* Message Type Selector */}
            {showTypeSelector && (
              <div className="mb-4 flex space-x-2">
                {messageTypeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setMessageType(option.id);
                      setShowTypeSelector(false);
                    }}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      messageType === option.id
                        ? option.color
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <i className={option.icon}></i>
                    <span className="text-sm">{option.label}</span>
                    {option.cost > 0 && (
                      <span className="text-xs bg-white/80 text-gray-600 px-2 py-1 rounded-full">
                        {option.cost}c
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button
                onClick={handleFileUpload}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                <i className="ri-attachment-line"></i>
              </button>

              <button
                onClick={() => setShowTypeSelector(!showTypeSelector)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  showTypeSelector 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <i className={messageType === 'text' ? 'ri-message-line' : 'ri-video-line'}></i>
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Tapez votre ${messageType === 'text' ? 'message' : 'message vidéo'}...`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                {!isConversationFree && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    {messageType === 'text' ? expert.pricing.textMessage : expert.pricing.videoMessage}c
                  </div>
                )}
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-send-plane-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      {showFileUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Joindre un fichier
            </h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer"
                >
                  <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-600 mb-2">
                    Cliquez pour sélectionner un fichier
                  </p>
                  <p className="text-xs text-gray-500">
                    Formats acceptés: JPG, PNG, GIF, PDF, TXT, DOC, DOCX
                  </p>
                  <p className="text-xs text-gray-500">
                    Taille maximale: 10MB
                  </p>
                </label>
              </div>
              
              {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <i className="ri-file-line text-blue-600 text-xl"></i>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-800 text-sm">
                  <i className="ri_information-line mr-2"></i>
                  Coût: {isConversationFree ? 'Gratuit' : '25 coins'} pour l'envoi de fichier
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowFileUpload(false);
                  setSelectedFile(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                onClick={handleSendFile}
                disabled={!selectedFile}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Coins insuffisants
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas assez de coins pour envoyer ce message. 
              Vous avez {userCoins} coins et il vous faut {messageType === 'text' ? expert.pricing.textMessage : expert.pricing.videoMessage} coins.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Annuler
              </button>
              <Link
                href="/dashboard/coins"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center whitespace-nowrap"
              >
                Acheter des coins
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
