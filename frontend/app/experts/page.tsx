'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertCard from '@/components/ExpertCard';
import ExpertFilters from '@/components/ExpertFilters';
import ApiService, { Expert } from '../../services/api';

export default function ExpertsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Charger les experts depuis l'API
  useEffect(() => {
    loadExperts();
  }, []);

  const loadExperts = async (pageNum = 1, reset = true) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Chargement des experts depuis:', `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/experts`);
      
      const response = await ApiService.getExperts({
        page: pageNum,
        limit: 12,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchTerm || undefined
      });

      console.log('Réponse API experts:', response);

      if (response.success && response.data && response.data.length > 0) {
        if (reset) {
          setExperts(response.data);
        } else {
          setExperts(prev => [...prev, ...response.data]);
        }
        setHasMore(response.data.length === 12);
        setPage(pageNum);
        console.log('Experts chargés avec succès:', response.data.length);
      } else {
        console.warn('Aucun expert trouvé dans la réponse API');
        setError('Aucun expert trouvé dans la base de données');
        
        // Forcer l'affichage des données de fallback
        if (reset) {
          setExperts([
            {
              id: 1,
              name: 'Dr. Sarah Martin',
              specialty: 'Psychologue clinique',
              rating: 4.9,
              reviews: 147,
              hourlyRate: 80,
              pricePerMessage: 15,
              image: 'https://ui-avatars.com/api/?name=Sarah+Martin&size=300&background=3B82F6&color=ffffff',
              isOnline: true,
              verified: true,
              category: 'bien-etre',
              languages: ['Français', 'Anglais'],
              responseTime: '2 minutes',
              sessions: 450,
              followers: 12500,
              tags: ['Stress', 'Anxiété', 'Développement personnel']
            },
            {
              id: 2,
              name: 'Marc Dubois',
              specialty: 'Expert en Investissement',
              rating: 4.8,
              reviews: 203,
              hourlyRate: 120,
              pricePerMessage: 25,
              image: 'https://ui-avatars.com/api/?name=Marc+Dubois&size=300&background=10B981&color=ffffff',
              isOnline: false,
              verified: true,
              category: 'finance',
              languages: ['Français'],
              responseTime: '5 minutes',
              sessions: 320,
              followers: 8900,
              tags: ['Immobilier', 'Bourse', 'Crypto']
            },
            {
              id: 3,
              name: 'Emma Wilson',
              specialty: 'Coach en Leadership',
              rating: 4.7,
              reviews: 89,
              hourlyRate: 95,
              pricePerMessage: 20,
              image: 'https://ui-avatars.com/api/?name=Emma+Wilson&size=300&background=8B5CF6&color=ffffff',
              isOnline: true,
              verified: true,
              category: 'business',
              languages: ['Français', 'Anglais'],
              responseTime: '1 minute',
              sessions: 280,
              followers: 6700,
              tags: ['Leadership', 'Management', 'Équipe']
            }
          ]);
        }
      }
    } catch (err: any) {
      console.error('Erreur API experts:', err);
      setError(`Erreur de connexion: ${err.message}. Utilisation de données de démonstration.`);
      
      // Données de fallback si l'API n'est pas disponible
      if (reset) {
        setExperts([
          {
            id: 1,
            name: 'Dr. Sarah Martin',
            specialty: 'Psychologue clinique',
            rating: 4.9,
            reviews: 147,
            hourlyRate: 80,
            pricePerMessage: 15,
            image: 'https://ui-avatars.com/api/?name=Sarah+Martin&size=300&background=3B82F6&color=ffffff',
            isOnline: true,
            verified: true,
            category: 'bien-etre',
            languages: ['Français', 'Anglais'],
            responseTime: '2 minutes',
            sessions: 450,
            followers: 12500,
            tags: ['Stress', 'Anxiété', 'Développement personnel']
          },
          {
            id: 2,
            name: 'Marc Dubois',
            specialty: 'Expert en Investissement',
            rating: 4.8,
            reviews: 203,
            hourlyRate: 120,
            pricePerMessage: 25,
            image: 'https://ui-avatars.com/api/?name=Marc+Dubois&size=300&background=10B981&color=ffffff',
            isOnline: false,
            verified: true,
            category: 'finance',
            languages: ['Français'],
            responseTime: '5 minutes',
            sessions: 320,
            followers: 8900,
            tags: ['Immobilier', 'Bourse', 'Crypto']
          },
          {
            id: 3,
            name: 'Emma Wilson',
            specialty: 'Coach en Leadership',
            rating: 4.7,
            reviews: 89,
            hourlyRate: 95,
            pricePerMessage: 20,
            image: 'https://ui-avatars.com/api/?name=Emma+Wilson&size=300&background=8B5CF6&color=ffffff',
            isOnline: true,
            verified: true,
            category: 'business',
            languages: ['Français', 'Anglais'],
            responseTime: '1 minute',
            sessions: 280,
            followers: 6700,
            tags: ['Leadership', 'Management', 'Équipe']
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Recharger quand les filtres changent
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadExperts(1, true);
    }, 300); // Debounce pour éviter trop de requêtes

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm]);

  const handleLoadMore = () => {
    loadExperts(page + 1, false);
  };

  const stats = [
    { label: 'Experts vérifiés', value: '500+', icon: 'ri-shield-check-line' },
    { label: 'Sessions réalisées', value: '50K+', icon: 'ri-video-line' },
    { label: 'Satisfaction', value: '98%', icon: 'ri-star-line' },
    { label: 'Domaines d\'expertise', value: '25+', icon: 'ri-graduation-cap-line' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-30"
          style={{
            backgroundImage: 'url("https://readdy.ai/api/search-image?query=Professional%20expert%20consultation%20meeting%2C%20modern%20business%20environment%2C%20diverse%20group%20of%20professionals%20collaborating%2C%20bright%20modern%20office%20space%2C%20professional%20consultation%20setting%2C%20clean%20minimalist%20background%2C%20high%20quality%20business%20photography&width=1920&height=800&seq=experts-hero-bg-001&orientation=landscape")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connectez-vous avec les
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Meilleurs Experts
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Découvrez notre communauté d'experts certifiés prêts à vous accompagner dans votre développement personnel et professionnel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap">
                <i className="ri-play-circle-line mr-2"></i>
                Voir la démo
              </button>
              <button 
                onClick={() => document.getElementById('experts-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
              >
                <i className="ri-search-line mr-2"></i>
                Trouver un expert
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="experts-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nos Experts Vérifiés
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Chaque expert de notre plateforme est soigneusement sélectionné et vérifié pour garantir la meilleure expérience possible
          </p>
        </div>

        <ExpertFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Loading State */}
        {loading && experts.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-300">Chargement des experts...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-error-warning-line text-red-600 dark:text-red-400 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Erreur de chargement</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">{error}</p>
            <button 
              onClick={() => loadExperts(1, true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Experts Grid */}
        {!loading && !error && experts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Chargement...</span>
                    </div>
                  ) : (
                    <>
                      <i className="ri-refresh-line mr-2"></i>
                      Charger plus d'experts
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && experts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-search-line text-blue-600 dark:text-blue-400 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Aucun expert trouvé</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
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

