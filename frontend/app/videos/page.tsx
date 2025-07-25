'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import ApiService, { Video } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();

  const categories = [
    { id: 'all', name: 'Toutes les vidéos', icon: 'ri-play-circle-line' },
    { id: 'business', name: 'Business', icon: 'ri-briefcase-line' },
    { id: 'marketing', name: 'Marketing', icon: 'ri-megaphone-line' },
    { id: 'technologie', name: 'Technologie', icon: 'ri-computer-line' },
    { id: 'bien-etre', name: 'Bien-être', icon: 'ri-heart-line' },
    { id: 'finance', name: 'Finance', icon: 'ri-money-dollar-circle-line' },
    { id: 'design', name: 'Design', icon: 'ri-palette-line' }
  ];

  // Charger les vidéos depuis l'API
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async (pageNum = 1, reset = true) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Chargement des vidéos depuis:', `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/videos`);
      
      const response = await ApiService.getVideos({
        page: pageNum,
        limit: 12,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchTerm || undefined
      });

      console.log('Réponse API videos:', response);

      if (response.success && response.data && response.data.length > 0) {
        if (reset) {
          setVideos(response.data);
        } else {
          setVideos(prev => [...prev, ...response.data]);
        }
        setHasMore(response.data.length === 12);
        setPage(pageNum);
        console.log('Vidéos chargées avec succès:', response.data.length);
      } else {
        console.warn('Aucune vidéo trouvée dans la réponse API');
        setError('Aucune vidéo trouvée dans la base de données');
        
        // Forcer l'affichage des données de fallback
        if (reset) {
          setVideos([
            {
              id: 1,
              title: 'Introduction au Marketing Digital',
              instructor: 'Sophie Laurent',
              duration: 1800, // 30 minutes en secondes
              views: 15420,
              likes: 892,
              category: 'marketing',
              isPremium: false,
              price: 0,
              thumbnail: 'https://ui-avatars.com/api/?name=Marketing+Digital&size=400&background=8B5CF6&color=ffffff',
              description: 'Découvrez les bases du marketing digital moderne',
              publishedAt: '2024-01-15T10:00:00Z'
            },
            {
              id: 2,
              title: 'Gestion du Stress au Travail',
              instructor: 'Dr. Sarah Martin',
              duration: 2700, // 45 minutes
              views: 8930,
              likes: 567,
              category: 'bien-etre',
              isPremium: true,
              price: 15,
              thumbnail: 'https://ui-avatars.com/api/?name=Gestion+Stress&size=400&background=10B981&color=ffffff',
              description: 'Techniques efficaces pour gérer le stress professionnel',
              publishedAt: '2024-01-20T14:30:00Z'
            },
            {
              id: 3,
              title: 'Stratégies d\'Investissement',
              instructor: 'Marc Dubois',
              duration: 3600, // 60 minutes
              views: 12340,
              likes: 734,
              category: 'finance',
              isPremium: true,
              price: 25,
              thumbnail: 'https://ui-avatars.com/api/?name=Investissement&size=400&background=F59E0B&color=ffffff',
              description: 'Apprenez les meilleures stratégies d\'investissement',
              publishedAt: '2024-01-25T16:00:00Z'
            },
            {
              id: 4,
              title: 'Leadership et Management',
              instructor: 'Emma Wilson',
              duration: 2400, // 40 minutes
              views: 9876,
              likes: 456,
              category: 'business',
              isPremium: false,
              price: 0,
              thumbnail: 'https://ui-avatars.com/api/?name=Leadership&size=400&background=EF4444&color=ffffff',
              description: 'Développez vos compétences en leadership',
              publishedAt: '2024-01-30T11:15:00Z'
            }
          ]);
        }
      }
    } catch (err: any) {
      console.error('Erreur API videos:', err);
      setError(`Erreur de connexion: ${err.message}. Utilisation de données de démonstration.`);
      
      // Données de fallback si l'API n'est pas disponible
      if (reset) {
        setVideos([
          {
            id: 1,
            title: 'Introduction au Marketing Digital',
            instructor: 'Sophie Laurent',
            duration: 1800, // 30 minutes en secondes
            views: 15420,
            likes: 892,
            category: 'marketing',
            isPremium: false,
            price: 0,
            thumbnail: 'https://ui-avatars.com/api/?name=Marketing+Digital&size=400&background=8B5CF6&color=ffffff',
            description: 'Découvrez les bases du marketing digital moderne',
            publishedAt: '2024-01-15T10:00:00Z'
          },
          {
            id: 2,
            title: 'Gestion du Stress au Travail',
            instructor: 'Dr. Sarah Martin',
            duration: 2700, // 45 minutes
            views: 8930,
            likes: 567,
            category: 'bien-etre',
            isPremium: true,
            price: 15,
            thumbnail: 'https://ui-avatars.com/api/?name=Gestion+Stress&size=400&background=10B981&color=ffffff',
            description: 'Techniques efficaces pour gérer le stress professionnel',
            publishedAt: '2024-01-20T14:30:00Z'
          },
          {
            id: 3,
            title: 'Stratégies d\'Investissement',
            instructor: 'Marc Dubois',
            duration: 3600, // 60 minutes
            views: 12340,
            likes: 734,
            category: 'finance',
            isPremium: true,
            price: 25,
            thumbnail: 'https://ui-avatars.com/api/?name=Investissement&size=400&background=F59E0B&color=ffffff',
            description: 'Apprenez les meilleures stratégies d\'investissement',
            publishedAt: '2024-01-25T16:00:00Z'
          },
          {
            id: 4,
            title: 'Leadership et Management',
            instructor: 'Emma Wilson',
            duration: 2400, // 40 minutes
            views: 9876,
            likes: 456,
            category: 'business',
            isPremium: false,
            price: 0,
            thumbnail: 'https://ui-avatars.com/api/?name=Leadership&size=400&background=EF4444&color=ffffff',
            description: 'Développez vos compétences en leadership',
            publishedAt: '2024-01-30T11:15:00Z'
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };
    } finally {
      setLoading(false);
    }
  };

  // Recharger quand les filtres changent
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadVideos(1, true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm]);

  const handleLoadMore = () => {
    loadVideos(page + 1, false);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const stats = [
    { label: 'Vidéos disponibles', value: '500+', icon: 'ri-play-circle-line' },
    { label: 'Heures de contenu', value: '200h+', icon: 'ri-time-line' },
    { label: 'Vues totales', value: '1M+', icon: 'ri-eye-line' },
    { label: 'Experts contributeurs', value: '50+', icon: 'ri-user-star-line' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Bibliothèque
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Vidéo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              Accédez à des centaines de vidéos éducatives créées par nos experts pour développer vos compétences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <i className="ri-play-circle-line mr-2"></i>
                Regarder maintenant
              </button>
              <button 
                onClick={() => document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <i className="ri-search-line mr-2"></i>
                Explorer la bibliothèque
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="videos-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bibliothèque Vidéo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre collection de vidéos éducatives créées par des experts reconnus dans leur domaine
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-12">
          {/* Barre de recherche */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400 text-xl"></i>
            </div>
            <input
              type="text"
              placeholder="Rechercher une vidéo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-sm hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Catégories */}
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                }`}
              >
                <i className={`${category.icon} text-xl`}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && videos.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Chargement des vidéos...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-error-warning-line text-red-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Erreur de chargement</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button 
              onClick={() => loadVideos(1, true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Videos Grid */}
        {!loading && !error && videos.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Chargement...</span>
                    </div>
                  ) : (
                    <>
                      <i className="ri-refresh-line mr-2"></i>
                      Charger plus de vidéos
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-search-line text-purple-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucune vidéo trouvée</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

