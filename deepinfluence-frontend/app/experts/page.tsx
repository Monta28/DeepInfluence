'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertCard from '@/components/ExpertCard';
import ExpertFilters from '@/components/ExpertFilters';

export default function ExpertsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const experts = [
    {
      id: 1,
      name: 'Dr. Marie Dubois',
      specialty: 'Développement Personnel',
      category: 'bien-etre',
      rating: 4.9,
      reviews: 147,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20personal%20development%20coach%20with%20warm%20confident%20smile%2C%20modern%20coaching%20office%20background%2C%20professional%20attire%2C%20trustworthy%20and%20approachable%20appearance%2C%20high%20quality%20portrait%2C%20professional%20headshot%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-marie-dubois-001&orientation=squarish',
      priceText: '50 coins/message',
      priceVideo: '100 coins/message vidéo',
      priceCall: '150 coins/minute',
      isOnline: true,
      verified: true,
      responseTime: '2 minutes',
      expertise: ['Coaching de vie', 'Développement personnel', 'Gestion du stress'],
      bio: 'Dr. Marie Dubois est une coach certifiée en développement personnel avec plus de 12 ans d\'expérience.',
      languages: ['Français', 'Anglais'],
      sessions: 450,
      followers: 12500,
      tags: ['Coaching de vie', 'Stress', 'Confiance']
    },
    {
      id: 2,
      name: 'Marc Rodriguez',
      specialty: 'Business & Entrepreneuriat',
      category: 'business',
      rating: 4.8,
      reviews: 203,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20entrepreneur%20in%20elegant%20suit%2C%20confident%20businessman%20portrait%2C%20modern%20corporate%20office%20background%2C%20professional%20headshot%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-marc-rodriguez-001&orientation=squarish',
      priceText: '75 coins/message',
      priceVideo: '125 coins/message vidéo',
      priceCall: '200 coins/minute',
      isOnline: false,
      verified: true,
      responseTime: '15 minutes',
      expertise: ['Stratégie d\'entreprise', 'Marketing digital', 'Leadership'],
      bio: 'Marc Rodriguez est un entrepreneur expérimenté et consultant en stratégie d\'entreprise.',
      languages: ['Français', 'Espagnol'],
      sessions: 680,
      followers: 8900,
      tags: ['Stratégie', 'Leadership', 'Innovation']
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      specialty: 'Bien-être & Nutrition',
      category: 'bien-etre',
      rating: 4.9,
      reviews: 89,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20wellness%20and%20nutrition%20coach%20with%20healthy%20radiant%20appearance%2C%20natural%20wellness%20environment%20background%2C%20professional%20attire%2C%20trustworthy%20and%20caring%20expression%2C%20high%20quality%20portrait%2C%20professional%20headshot%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-sophie-laurent-001&orientation=squarish',
      priceText: '40 coins/message',
      priceVideo: '80 coins/message vidéo',
      priceCall: '120 coins/minute',
      isOnline: true,
      verified: true,
      responseTime: '5 minutes',
      expertise: ['Nutrition sportive', 'Entraînement', 'Récupération'],
      bio: 'Sophie Laurent est une nutritionniste diplômée et coach bien-être.',
      languages: ['Français'],
      sessions: 320,
      followers: 15600,
      tags: ['Nutrition', 'Fitness', 'Bien-être']
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      specialty: 'Marketing Digital',
      category: 'marketing',
      rating: 4.7,
      reviews: 156,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20digital%20marketing%20expert%20with%20confident%20expression%2C%20modern%20digital%20office%20background%2C%20contemporary%20business%20attire%2C%20trustworthy%20appearance%2C%20high%20quality%20portrait%2C%20professional%20headshot%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-ahmed-hassan-001&orientation=squarish',
      priceText: '60 coins/message',
      priceVideo: '110 coins/message vidéo',
      priceCall: '180 coins/minute',
      isOnline: true,
      verified: true,
      responseTime: '3 minutes',
      expertise: ['SEO/SEM', 'Réseaux sociaux', 'E-commerce'],
      bio: 'Ahmed Hassan est un expert en marketing digital avec plus de 10 ans d\'expérience.',
      languages: ['Français', 'Arabe'],
      sessions: 520,
      followers: 22100,
      tags: ['SEO', 'Social Media', 'Analytics']
    },
    {
      id: 5,
      name: 'Claire Rousseau',
      specialty: 'Développement Web',
      category: 'technologie',
      rating: 4.8,
      reviews: 124,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20casual%20professional%20attire%2C%20high%20quality%20portrait%2C%20professional%20headshot%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-claire-rousseau-001&orientation=squarish',
      priceText: '100 coins/message',
      priceVideo: '150 coins/message vidéo',
      priceCall: '250 coins/minute',
      isOnline: false,
      verified: true,
      responseTime: '3h',
      expertise: ['React', 'Node.js', 'TypeScript'],
      bio: 'Claire Rousseau est une développeuse full-stack avec une expertise approfondie en développement web moderne.',
      languages: ['Français', 'Anglais'],
      sessions: 350,
      followers: 8900,
      tags: ['React', 'Node.js', 'Full-Stack']
    },
    {
      id: 6,
      name: 'Thomas Bernard',
      specialty: 'Finance & Investissement',
      category: 'finance',
      rating: 4.9,
      reviews: 178,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit%2C%20high%20quality%20portrait%2C%20professional%20headshot%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-thomas-bernard-001&orientation=squarish',
      priceText: '110 coins/message',
      priceVideo: '160 coins/message vidéo',
      priceCall: '220 coins/minute',
      isOnline: true,
      verified: true,
      responseTime: '1h',
      expertise: ['Investissement', 'Planification financière', 'Crypto-monnaies'],
      bio: 'Thomas Bernard est un conseiller financier certifié avec expertise en investissements.',
      languages: ['Français'],
      sessions: 450,
      followers: 12000,
      tags: ['Investissement', 'Finance', 'Crypto']
    },
    {
      id: 7,
      name: 'Lisa Chen',
      specialty: 'Design UX/UI',
      category: 'design',
      rating: 4.8,
      reviews: 92,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20UX%20UI%20designer%20with%20creative%20smile%2C%20modern%20design%20studio%20background%2C%20stylish%20professional%20attire%2C%20innovative%20and%20artistic%20appearance%2C%20high%20quality%20portrait%2C%20professional%20headshot%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-lisa-chen-001&orientation=squarish',
      priceText: '85 coins/message',
      priceVideo: '140 coins/message vidéo',
      priceCall: '200 coins/minute',
      isOnline: true,
      verified: true,
      responseTime: '10 minutes',
      expertise: ['Design d\'interface', 'Expérience utilisateur', 'Prototypage'],
      bio: 'Lisa Chen est une designer UX/UI avec 8 ans d\'expérience dans des startups innovantes.',
      languages: ['Français', 'Anglais', 'Mandarin'],
      sessions: 280,
      followers: 9500,
      tags: ['UX Design', 'UI Design', 'Prototyping']
    },
    {
      id: 8,
      name: 'Alexandre Moreau',
      specialty: 'Coaching Sportif',
      category: 'sport',
      rating: 4.9,
      reviews: 165,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20fitness%20coach%20with%20energetic%20smile%2C%20modern%20gym%20background%2C%20athletic%20professional%20wear%2C%20motivational%20and%20inspiring%20appearance%2C%20high%20quality%20portrait%2C%20professional%20headshot%2C%20business%20casual%2C%20clean%20simple%20background&width=400&height=400&seq=expert-alexandre-moreau-001&orientation=squarish',
      priceText: '45 coins/message',
      priceVideo: '90 coins/message vidéo',
      priceCall: '130 coins/minute',
      isOnline: true,
      verified: true,
      responseTime: '5 minutes',
      expertise: ['Musculation', 'Cardio', 'Nutrition sportive'],
      bio: 'Alexandre Moreau est un coach sportif certifié spécialisé dans la transformation physique.',
      languages: ['Français'],
      sessions: 420,
      followers: 18200,
      tags: ['Musculation', 'Cardio', 'Transformation']
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesCategory = selectedCategory === 'all' || expert.category === selectedCategory;
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         expert.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>

        {/* No Results */}
        {filteredExperts.length === 0 && (
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

        {/* Load More Button */}
        {filteredExperts.length > 0 && (
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap">
              <i className="ri-refresh-line mr-2"></i>
              Charger plus d'experts
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vous êtes un expert ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez notre communauté d'experts et partagez votre expertise avec des milliers d'utilisateurs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap">
              <i className="ri-user-add-line mr-2"></i>
              Devenir expert
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 whitespace-nowrap">
              <i className="ri-information-line mr-2"></i>
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}