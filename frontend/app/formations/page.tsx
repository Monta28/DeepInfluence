'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormationCard from '@/components/FormationCard';
import ApiService, { Formation } from '../../services/api';

export default function FormationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    { id: 'all', name: 'Toutes les formations', icon: 'ri-apps-line' },
    { id: 'business', name: 'Business', icon: 'ri-briefcase-line' },
    { id: 'marketing', name: 'Marketing', icon: 'ri-megaphone-line' },
    { id: 'technologie', name: 'Technologie', icon: 'ri-computer-line' },
    { id: 'bien-etre', name: 'Bien-être', icon: 'ri-heart-line' },
    { id: 'finance', name: 'Finance', icon: 'ri-money-dollar-circle-line' },
    { id: 'design', name: 'Design', icon: 'ri-palette-line' }
  ];

  // Charger les formations depuis l'API
  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async (pageNum = 1, reset = true) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Chargement des formations depuis:', `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/formations`);
      
      const response = await ApiService.getFormations({
        page: pageNum,
        limit: 12,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchTerm || undefined
      });

      console.log('Réponse API formations:', response);

      if (response.success && response.data && response.data.length > 0) {
        if (reset) {
          setFormations(response.data);
        } else {
          setFormations(prev => [...prev, ...response.data]);
        }
        setHasMore(response.data.length === 12);
        setPage(pageNum);
        console.log('Formations chargées avec succès:', response.data.length);
      } else {
        console.warn('Aucune formation trouvée dans la réponse API');
        setError('Aucune formation trouvée dans la base de données');
        
        // Forcer l'affichage des données de fallback
        if (reset) {
          setFormations([
            {
              id: 1,
              title: 'Marketing Digital Avancé',
              instructor: 'Sophie Laurent',
              duration: '8 semaines',
              level: 'Intermédiaire',
              rating: 4.8,
              students: 1250,
              price: 299,
              type: 'live',
              maxPlaces: 30,
              currentPlaces: 22,
              location: 'En ligne',
              image: 'https://ui-avatars.com/api/?name=Marketing+Digital&size=300&background=8B5CF6&color=ffffff',
              tags: ['SEO', 'Social Media', 'Analytics'],
              nextSession: '2024-02-15',
              description: 'Formation complète en marketing digital avec cas pratiques',
              schedule: 'Mar/Jeu 19h-21h',
              modules: ['SEO', 'Social Media', 'Email Marketing', 'Analytics'],
              category: 'marketing'
            },
            {
              id: 2,
              title: 'Développement Personnel',
              instructor: 'Dr. Sarah Martin',
              duration: '6 semaines',
              level: 'Débutant',
              rating: 4.9,
              students: 890,
              price: 199,
              type: 'live',
              maxPlaces: 20,
              currentPlaces: 15,
              location: 'En ligne',
              image: 'https://ui-avatars.com/api/?name=Développement+Personnel&size=300&background=10B981&color=ffffff',
              tags: ['Confiance', 'Motivation', 'Leadership'],
              nextSession: '2024-02-20',
              description: 'Développez votre potentiel et renforcez votre confiance en vous',
              schedule: 'Lun/Mer 18h-20h',
              modules: ['Confiance en soi', 'Gestion du stress', 'Communication', 'Leadership'],
              category: 'bien-etre'
            },
            {
              id: 3,
              title: 'Gestion Financière',
              instructor: 'Marc Dubois',
              duration: '10 semaines',
              level: 'Avancé',
              rating: 4.7,
              students: 567,
              price: 399,
              type: 'live',
              maxPlaces: 15,
              currentPlaces: 8,
              location: 'En ligne',
              image: 'https://ui-avatars.com/api/?name=Gestion+Financière&size=300&background=F59E0B&color=ffffff',
              tags: ['Investissement', 'Budget', 'Épargne'],
              nextSession: '2024-02-25',
              description: 'Maîtrisez la gestion de vos finances personnelles et professionnelles',
              schedule: 'Sam 10h-12h',
              modules: ['Budget', 'Investissement', 'Fiscalité', 'Épargne'],
              category: 'finance'
            }
          ]);
        }
      }
    } catch (err: any) {
      console.error('Erreur API formations:', err);
      setError(`Erreur de connexion: ${err.message}. Utilisation de données de démonstration.`);
      
      // Données de fallback si l'API n'est pas disponible
      if (reset) {
        setFormations([
          {
            id: 1,
            title: 'Marketing Digital Avancé',
            instructor: 'Sophie Laurent',
            duration: '8 semaines',
            level: 'Intermédiaire',
            rating: 4.8,
            students: 1250,
            price: 299,
            type: 'live',
            maxPlaces: 30,
            currentPlaces: 22,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Marketing+Digital&size=300&background=8B5CF6&color=ffffff',
            tags: ['SEO', 'Social Media', 'Analytics'],
            nextSession: '2024-02-15',
            description: 'Formation complète en marketing digital avec cas pratiques',
            schedule: 'Mar/Jeu 19h-21h',
            modules: ['SEO', 'Social Media', 'Email Marketing', 'Analytics'],
            category: 'marketing'
          },
          {
            id: 2,
            title: 'Développement Personnel',
            instructor: 'Dr. Sarah Martin',
            duration: '6 semaines',
            level: 'Débutant',
            rating: 4.9,
            students: 890,
            price: 199,
            type: 'live',
            maxPlaces: 20,
            currentPlaces: 15,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Développement+Personnel&size=300&background=10B981&color=ffffff',
            tags: ['Confiance', 'Motivation', 'Leadership'],
            nextSession: '2024-02-20',
            description: 'Développez votre potentiel et renforcez votre confiance en vous',
            schedule: 'Lun/Mer 18h-20h',
            modules: ['Confiance en soi', 'Gestion du stress', 'Communication', 'Leadership'],
            category: 'bien-etre'
          },
          {
            id: 3,
            title: 'Gestion Financière',
            instructor: 'Marc Dubois',
            duration: '10 semaines',
            level: 'Avancé',
            rating: 4.7,
            students: 567,
            price: 399,
            type: 'live',
            maxPlaces: 15,
            currentPlaces: 8,
            location: 'En ligne',
            image: 'https://ui-avatars.com/api/?name=Gestion+Financière&size=300&background=F59E0B&color=ffffff',
            tags: ['Investissement', 'Budget', 'Épargne'],
            nextSession: '2024-02-25',
            description: 'Maîtrisez la gestion de vos finances personnelles et professionnelles',
            schedule: 'Sam 10h-12h',
            modules: ['Budget', 'Investissement', 'Fiscalité', 'Épargne'],
            category: 'finance'
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };
            image: 'https://ui-avatars.com/api/?name=Développement+Personnel&size=300&background=10B981&color=ffffff',
            tags: ['Confiance', 'Leadership', 'Communication'],
            nextSession: '2024-02-20',
            description: 'Développez votre potentiel et votre confiance en vous',
            schedule: 'Sam 10h-12h',
            modules: ['Confiance en soi', 'Communication', 'Leadership', 'Gestion du stress'],
            category: 'bien-etre'
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
      loadFormations(1, true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm]);

  const handleLoadMore = () => {
    loadFormations(page + 1, false);
  };

  const stats = [
    { label: 'Formations disponibles', value: '150+', icon: 'ri-book-line' },
    { label: 'Étudiants actifs', value: '5K+', icon: 'ri-user-line' },
    { label: 'Taux de réussite', value: '94%', icon: 'ri-trophy-line' },
    { label: 'Certificats délivrés', value: '2.5K+', icon: 'ri-award-line' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Formations
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Professionnelles
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Développez vos compétences avec nos formations certifiantes animées par des experts reconnus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <i className="ri-play-circle-line mr-2"></i>
                Découvrir les formations
              </button>
              <button 
                onClick={() => document.getElementById('formations-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <i className="ri-search-line mr-2"></i>
                Parcourir le catalogue
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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
      <div id="formations-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Catalogue de Formations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez parmi notre large sélection de formations professionnelles pour développer vos compétences
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
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm hover:shadow-md transition-all duration-300"
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
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg scale-105'
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
        {loading && formations.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Chargement des formations...</span>
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
              onClick={() => loadFormations(1, true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Formations Grid */}
        {!loading && !error && formations.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {formations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Chargement...</span>
                    </div>
                  ) : (
                    <>
                      <i className="ri-refresh-line mr-2"></i>
                      Charger plus de formations
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && formations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-search-line text-green-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucune formation trouvée</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
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

