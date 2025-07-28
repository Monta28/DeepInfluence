'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface VideoSessionProps {
  sessionId: string;
}

export default function VideoSession({ sessionId }: VideoSessionProps) {
  const router = useRouter();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionCost, setSessionCost] = useState(0);
  const [remoteParticipant, setRemoteParticipant] = useState<any>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [showEndModal, setShowEndModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'stopped'>('idle');
  const [userRole, setUserRole] = useState<'expert' | 'user'>('user');
  const [sessionData, setSessionData] = useState<any>(null);

  // Données de session simulées
  const mockSessionData = {
    expert: {
      id: '1',
      name: 'Dr. Sarah Martin',
      specialty: 'Psychologue clinique',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20with%20warm%20smile%2C%20confident%20and%20approachable%20expression%2C%20modern%20office%20background%2C%20high%20quality%20portrait&width=60&height=60&seq=expert-video-1&orientation=squarish',
      pricePerMinute: 3
    },
    user: {
      id: '2',
      name: 'Marie Dubois',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20woman%20participant%20in%20video%20call%2C%20friendly%20expression%2C%20modern%20home%20office%20background%2C%20natural%20lighting&width=60&height=60&seq=user-video-1&orientation=squarish'
    },
    sessionId: sessionId,
    startTime: new Date().toISOString(),
    status: 'active'
  };

  useEffect(() => {
    setSessionData(mockSessionData);
    setUserRole(Math.random() > 0.5 ? 'expert' : 'user');
    initializeSession();
    
    // Compteur de temps
    const timer = setInterval(() => {
      setSessionTime(prev => {
        const newTime = prev + 1;
        setSessionCost(newTime * mockSessionData.expert.pricePerMinute);
        return newTime;
      });
    }, 60000); // Chaque minute

    return () => {
      clearInterval(timer);
      cleanup();
    };
  }, []);

  const initializeSession = async () => {
    try {
      // Initialiser la caméra et le micro
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Simuler la connexion au participant distant
      setTimeout(() => {
        setIsConnected(true);
        setConnectionStatus('connected');
        simulateRemoteParticipant();
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      setConnectionStatus('disconnected');
    }
  };

  const simulateRemoteParticipant = async () => {
    try {
      // Simuler le flux vidéo du participant distant
      const remoteStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setRemoteStream(remoteStream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      
      setRemoteParticipant({
        id: userRole === 'expert' ? mockSessionData.user.id : mockSessionData.expert.id,
        name: userRole === 'expert' ? mockSessionData.user.name : mockSessionData.expert.name,
        avatar: userRole === 'expert' ? mockSessionData.user.avatar : mockSessionData.expert.avatar
      });
      
    } catch (error) {
      console.error('Erreur simulation participant distant:', error);
    }
  };

  const startRecording = async () => {
    try {
      if (!localStream) return;
      
      const mediaRecorder = new MediaRecorder(localStream);
      recordedChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Télécharger automatiquement
        const a = document.createElement('a');
        a.href = url;
        a.download = `session-${sessionId}-${new Date().toISOString().split('T')[0]}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };
      
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordingStatus('recording');
      
    } catch (error) {
      console.error('Erreur lors du démarrage de l\'enregistrement:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingStatus('stopped');
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      setScreenStream(screenStream);
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = screenStream;
      }
      
      setIsScreenSharing(true);
      
      // Arrêter automatiquement quand l'utilisateur ferme le partage
      screenStream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
      
    } catch (error) {
      console.error('Erreur lors du partage d\'écran:', error);
    }
  };

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: userRole === 'expert' ? sessionData.expert.name : sessionData.user.name,
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
      
      // Simuler une réponse
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: userRole === 'expert' ? sessionData.user.name : sessionData.expert.name,
          message: 'Merci pour votre message !',
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          isOwn: false
        };
        setChatMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const endSession = () => {
    setShowEndModal(true);
  };

  const confirmEndSession = () => {
    if (isRecording) {
      stopRecording();
    }
    if (isScreenSharing) {
      stopScreenShare();
    }
    cleanup();
    router.push('/dashboard/appointments');
  };

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Chargement de la session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              <i className="ri-arrow-left-line text-xl"></i>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={remoteParticipant?.avatar || sessionData.expert.avatar}
                  alt={remoteParticipant?.name || sessionData.expert.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div>
                <h1 className="text-lg font-semibold">
                  {remoteParticipant?.name || sessionData.expert.name}
                </h1>
                <p className="text-sm text-gray-400">
                  {isConnected ? 'Connecté' : 'Connexion en cours...'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Compteur de temps et coût */}
            <div className="bg-gray-700 rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold text-green-400">
                {formatDuration(sessionTime)}
              </div>
              <div className="text-sm text-gray-300">
                {sessionCost} coins
              </div>
            </div>

            {/* Statut d'enregistrement */}
            {recordingStatus === 'recording' && (
              <div className="flex items-center space-x-2 bg-red-600 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">REC</span>
              </div>
            )}

            {/* Statut de connexion */}
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              connectionStatus === 'connected' ? 'bg-green-600' :
              connectionStatus === 'connecting' ? 'bg-yellow-600' : 'bg-red-600'
            }`}>
              {connectionStatus === 'connected' ? 'Connecté' :
               connectionStatus === 'connecting' ? 'Connexion...' : 'Déconnecté'}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Zone vidéo principale */}
        <div className="flex-1 relative">
          {/* Vidéo du participant distant */}
          <div className="relative h-full">
            {isScreenSharing && screenStream ? (
              <video
                ref={screenShareRef}
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover bg-black"
              />
            )}
            
            {!isConnected && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-xl">Connexion au participant...</p>
                </div>
              </div>
            )}
          </div>

          {/* Vidéo locale (incrustation) */}
          <div className="absolute top-4 right-4 w-64 h-48 bg-black rounded-lg overflow-hidden border-2 border-gray-600">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
              Vous ({userRole === 'expert' ? 'Expert' : 'Utilisateur'})
            </div>
          </div>

          {/* Contrôles vidéo */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-3">
              <button
                onClick={toggleMic}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
                title={isMicOn ? 'Couper le micro' : 'Activer le micro'}
              >
                <i className={`${isMicOn ? 'ri-mic-line' : 'ri-mic-off-line'} text-xl`}></i>
              </button>

              <button
                onClick={toggleCamera}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isCameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
                title={isCameraOn ? 'Couper la caméra' : 'Activer la caméra'}
              >
                <i className={`${isCameraOn ? 'ri-camera-line' : 'ri-camera-off-line'} text-xl`}></i>
              </button>

              <button
                onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                title={isScreenSharing ? 'Arrêter le partage' : 'Partager l\'écran'}
              >
                <i className={`${isScreenSharing ? 'ri-stop-circle-line' : 'ri-share-box-line'} text-xl`}></i>
              </button>

              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                title={isRecording ? 'Arrêter l\'enregistrement' : 'Démarrer l\'enregistrement'}
              >
                <i className={`${isRecording ? 'ri-stop-circle-line' : 'ri-record-circle-line'} text-xl`}></i>
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Chat"
              >
                <i className="ri-chat-1-line text-xl"></i>
              </button>

              <button
                onClick={endSession}
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
                title="Terminer la session"
              >
                <i className="ri-phone-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Chat latéral */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      msg.isOwn 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-75 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendChatMessage}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <i className="ri-send-plane-line text-white"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de fin de session */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Terminer la session</h3>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir terminer cette session ? 
              {isRecording && ' L\'enregistrement sera automatiquement sauvegardé.'}
            </p>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Durée:</span>
                <span className="font-bold text-green-400">{formatDuration(sessionTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Coût total:</span>
                <span className="font-bold text-blue-400">{sessionCost} coins</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors"
              >
                Continuer
              </button>
              <button
                onClick={confirmEndSession}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg transition-colors"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}