
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ExpertProfileProps {
  expertId: string;
}

export default function ExpertProfile({ expertId }: ExpertProfileProps) {
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);
  const [userCoins, setUserCoins] = useState(150);
  const [unlockedVideos, setUnlockedVideos] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Données des experts avec leurs vidéos spécifiques
  const expertsData = {
    '1': {
      name: 'Dr. Sarah Martinez',
      title: 'Consultante en Stratégie d\'Entreprise',
      specialty: 'Business Strategy & Digital Transformation',
      videos: [
        {
          id: 1,
          title: 'Stratégie digitale : Les fondamentaux',
          description: 'Les clés pour réussir sa transformation digitale',
          duration: '8:42',
          views: 1250,
          likes: 89,
          date: '2024-01-20',
          type: 'free',
          price: 0,
          thumbnail: 'https://readdy.ai/api/search-image?query=Digital%20strategy%20tutorial%20thumbnail%2C%20modern%20business%20presentation%2C%20professional%20training%20content%2C%20digital%20transformation%20concept%2C%20business%20strategy%20visualization&width=320&height=180&seq=video-tutorial-001&orientation=landscape'
        },
        {
          id: 2,
          title: 'Leadership à l\'ère numérique',
          description: 'Comment adapter son leadership aux enjeux digitaux',
          duration: '12:15',
          views: 980,
          likes: 67,
          date: '2024-01-18',
          type: 'premium',
          price: 35,
          thumbnail: 'https://readdy.ai/api/search-image?query=Digital%20leadership%20conference%20thumbnail%2C%20modern%20business%20presentation%2C%20professional%20speaking%20event%2C%20leadership%20development%20concept%2C%20executive%20training&width=320&height=180&seq=video-conference-001&orientation=landscape'
        },
        {
          id: 3,
          title: 'Cas pratique : Transformation d\'une PME',
          description: 'Étude de cas complète d\'une transformation réussie',
          duration: '15:30',
          views: 1540,
          likes: 112,
          date: '2024-01-15',
          type: 'free',
          price: 0,
          thumbnail: 'https://readdy.ai/api/search-image?query=Business%20case%20study%20thumbnail%2C%20company%20transformation%20example%2C%20professional%20business%20analysis%2C%20practical%20business%20example%2C%20success%20story%20presentation&width=320&height=180&seq=video-case-study-001&orientation=landscape'
        }
      ]
    },
    '2': {
      name: 'Marc Rodriguez',
      title: 'Expert en Marketing Digital',
      specialty: 'Marketing Digital & Growth Hacking',
      videos: [
        {
          id: 4,
          title: 'Growth Hacking : Méthodes avancées',
          description: 'Techniques de croissance pour startups',
          duration: '14:22',
          views: 2100,
          likes: 134,
          date: '2024-01-18',
          type: 'free',
          price: 0,
          thumbnail: 'https://readdy.ai/api/search-image?query=Growth%20hacking%20presentation%20thumbnail%2C%20startup%20growth%20strategies%2C%20digital%20marketing%20tactics%2C%20business%20growth%20methods%2C%20marketing%20automation&width=320&height=180&seq=video-growth-001&orientation=landscape'
        },
        {
          id: 5,
          title: 'Publicité Facebook avancée',
          description: 'Optimisation ROI et targeting précis',
          duration: '18:45',
          views: 1890,
          likes: 156,
          date: '2024-01-16',
          type: 'premium',
          price: 40,
          thumbnail: 'https://readdy.ai/api/search-image?query=Facebook%20advertising%20training%20thumbnail%2C%20social%20media%20marketing%2C%20paid%20advertising%20strategies%2C%20digital%20marketing%20course%2C%20ROI%20optimization&width=320&height=180&seq=video-facebook-001&orientation=landscape'
        }
      ]
    },
    '3': {
      name: 'Sophie Laurent',
      title: 'Coach Bien-être & Nutrition',
      specialty: 'Nutrition & Développement Personnel',
      videos: [
        {
          id: 6,
          title: 'Nutrition et performance sportive',
          description: 'Optimiser son alimentation pour le sport',
          duration: '16:30',
          views: 3200,
          likes: 245,
          date: '2024-01-20',
          type: 'free',
          price: 0,
          thumbnail: 'https://readdy.ai/api/search-image?query=Sports%20nutrition%20workshop%20thumbnail%2C%20healthy%20food%20and%20fitness%2C%20nutrition%20coaching%2C%20athletic%20performance%2C%20wellness%20training&width=320&height=180&seq=video-nutrition-001&orientation=landscape'
        },
        {
          id: 7,
          title: 'Méditation et gestion du stress',
          description: 'Techniques de relaxation au quotidien',
          duration: '12:15',
          views: 2800,
          likes: 189,
          date: '2024-01-17',
          type: 'premium',
          price: 25,
          thumbnail: 'https://readdy.ai/api/search-image?query=Meditation%20and%20stress%20management%20thumbnail%2C%20mindfulness%20practice%2C%20relaxation%20techniques%2C%20wellness%20coaching%2C%20mental%20health&width=320&height=180&seq=video-meditation-001&orientation=landscape'
        }
      ]
    },
    '4': {
      name: 'Ahmed Hassan',
      title: 'Expert en Marketing Digital',
      specialty: 'SEO & Marketing Digital',
      videos: [
        {
          id: 8,
          title: 'SEO et référencement naturel 2024',
          description: 'Stratégies SEO modernes et efficaces',
          duration: '22:45',
          views: 4500,
          likes: 298,
          date: '2024-01-19',
          type: 'free',
          price: 0,
          thumbnail: 'https://readdy.ai/api/search-image?query=SEO%20tutorial%20thumbnail%2C%20search%20engine%20optimization%2C%20digital%20marketing%20training%2C%20website%20ranking%20strategies%2C%20modern%20SEO%20techniques&width=320&height=180&seq=video-seo-001&orientation=landscape'
        },
        {
          id: 9,
          title: 'Marketing automation avancé',
          description: 'Automatiser vos campagnes marketing',
          duration: '19:30',
          views: 2650,
          likes: 187,
          date: '2024-01-16',
          type: 'premium',
          price: 45,
          thumbnail: 'https://readdy.ai/api/search-image?query=Marketing%20automation%20tutorial%20thumbnail%2C%20automated%20marketing%20campaigns%2C%20digital%20marketing%20workflow%2C%20business%20automation%2C%20marketing%20technology&width=320&height=180&seq=video-automation-001&orientation=landscape'
        },
        {
          id: 10,
          title: 'Analytics et mesure de performance',
          description: 'Comprendre et optimiser vos KPIs',
          duration: '15:20',
          views: 1890,
          likes: 134,
          date: '2024-01-14',
          type: 'premium',
          price: 35,
          thumbnail: 'https://readdy.ai/api/search-image?query=Analytics%20dashboard%20tutorial%20thumbnail%2C%20data%20analysis%2C%20marketing%20metrics%2C%20performance%20measurement%2C%20business%20intelligence&width=320&height=180&seq=video-analytics-001&orientation=landscape'
        }
      ]
    }
  };

  const expert = expertsData[expertId] || {
    name: 'Dr. Sarah Martinez',
    title: 'Consultante en Stratégie d\'Entreprise',
    specialty: 'Business Strategy & Digital Transformation',
    videos: expertsData['1'].videos
  };

  const expertProfile = {
    id: expertId,
    name: expert.name,
    title: expert.title,
    specialty: expert.specialty,
    avatar: `https://readdy.ai/api/search-image?query=Professional%20business%20expert%20portrait%2C%20confident%20$%7Bexpert.name.includes%28Ahmed%29%20%3F%20male%20:%20female%7D%20professional%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional%2C%20expert%20consultant%2C%20high%20quality%20portrait&width=200&height=200&seq=profile-${expertId}&orientation=squarish`,
    cover: `https://readdy.ai/api/search-image?query=Modern%20professional%20business%20consultation%20office%2C%20contemporary%20workspace%2C%20clean%20minimalist%20design%2C%20business%20strategy%20environment%2C%20professional%20atmosphere%2C%20natural%20lighting%2C%20elegant%20office%20interior%2C%20business%20consulting%20backdrop&width=1200&height=400&seq=cover-${expertId}&orientation=landscape`,
    rating: 4.9,
    reviewCount: 127,
    responseTime: '< 2h',
    languages: ['Français', 'Anglais', 'Espagnol'],
    isOnline: true,
    priceText: '25 coins/message',
    priceVideo: '45 coins/message vidéo',
    priceCall: '3 coins/minute (min. 10 min)',
    expertise: [
      'Stratégie d\'entreprise',
      'Transformation digitale',
      'Marketing digital',
      'Leadership',
      'Développement commercial',
      'Innovation'
    ],
    bio: 'Forte de 15 ans d\'expérience en conseil stratégique, j\'accompagne les entreprises dans leur transformation digitale et leur développement commercial. Diplômée de HEC Paris et certifiée en Digital Marketing, j\'ai travaillé avec plus de 200 entreprises, des startups aux grandes corporations.\n\nMon approche combine analyse stratégique rigoureuse et pragmatisme opérationnel pour des résultats concrets et mesurables.',
    certifications: [
      {
        name: 'MBA Strategy & Innovation',
        institution: 'HEC Paris',
        year: '2015'
      },
      {
        name: 'Digital Marketing Certified',
        institution: 'Google',
        year: '2023'
      },
      {
        name: 'Leadership Excellence',
        institution: 'Stanford Executive Program',
        year: '2021'
      }
    ],
    experience: [
      {
        role: 'Senior Strategy Consultant',
        company: 'McKinsey & Company',
        duration: '2018-2023',
        description: 'Conseil stratégique pour des entreprises du Fortune 500'
      },
      {
        role: 'Head of Digital Transformation',
        company: 'Accenture',
        duration: '2015-2018',
        description: 'Direction des projets de transformation digitale'
      }
    ],
    reviewsList: [
      {
        id: 1,
        user: 'Marie Dubois',
        rating: 5,
        comment: 'Excellente consultante ! Sarah m\'a aidé à restructurer ma stratégie marketing. Résultats impressionnants.',
        date: '2024-01-15',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20businesswoman%20portrait%2C%20confident%20female%20entrepreneur%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional&width=60&height=60&seq=review-marie-dubois-001&orientation=squarish'
      },
      {
        id: 2,
        user: 'Thomas Laurent',
        rating: 5,
        comment: 'Approche très professionnelle et conseils pertinents. Je recommande vivement !',
        date: '2024-01-10',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20businessman%20portrait%2C%20confident%20male%20entrepreneur%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional&width=60&height=60&seq=review-thomas-laurent-001&orientation=squarish'
      },
      {
        id: 3,
        user: 'Emma Wilson',
        rating: 4,
        comment: 'Très bonne expertise en transformation digitale. Communication claire et efficace.',
        date: '2024-01-05',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20businesswoman%20portrait%2C%20confident%20female%20business%20expert%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional&width=60&height=60&seq=review-emma-wilson-001&orientation=squarish'
      }
    ],
    linkedinUrl: 'https://linkedin.com/in/sarah-martinez-strategy',
    videoCount: expert.videos.length,
    videos: expert.videos
  };

  const tabs = [
    { id: 'about', label: 'À propos', icon: 'ri-user-line' },
    { id: 'reviews', label: 'Avis', icon: 'ri-star-line' },
    { id: 'videos', label: 'Vidéos', icon: 'ri-video-line' }
  ];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleUnlockVideo = (video) => {
    if (userCoins < video.price) {
      setSelectedVideo(video);
      setShowPaymentModal(true);
      return;
    }

    setUserCoins(prev => prev - video.price);
    setUnlockedVideos(prev => [...prev, video.id]);
  };

  const handleWatchVideo = (video) => {
    window.location.href = `/videos/${video.id}`;
  };

  const isVideoUnlocked = (videoId) => {
    return unlockedVideos.includes(videoId);
  };

  const getVideoStatusBadge = (video) => {
    if (video.type === 'free') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          <i className="ri-play-circle-line mr-1"></i>
          Gratuit
        </span>
      );
    } else if (isVideoUnlocked(video.id)) {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          <i className="ri-lock-unlock-line mr-1"></i>
          Débloqué
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
          <i className="ri-vip-crown-line mr-1"></i>
          Premium - {video.price} coins
        </span>
      );
    }
  };

  const getVideoActionButton = (video) => {
    if (video.type === 'free') {
      return (
        <button
          onClick={() => handleWatchVideo(video)}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
        >
          <i className="ri-play-line mr-2"></i>
          Regarder gratuitement
        </button>
      );
    } else if (isVideoUnlocked(video.id)) {
      return (
        <button
          onClick={() => handleWatchVideo(video)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
        >
          <i className="ri-play-line mr-2"></i>
          Regarder
        </button>
      );
    } else {
      return (
        <button
          onClick={() => handleUnlockVideo(video)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium whitespace-nowrap"
        >
          <i className="ri-lock-unlock-line mr-2"></i>
          Débloquer - {video.price} coins
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="relative">
        <div
          className="h-64 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${expertProfile.cover})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-32 pb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={expertProfile.avatar}
                      alt={expertProfile.name}
                      className="w-32 h-32 rounded-full object-cover object-top border-4 border-white dark:border-gray-800 shadow-lg"
                    />
                    {expertProfile.isOnline && (
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{expertProfile.name}</h1>
                      <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">{expertProfile.title}</p>
                      <p className="text-gray-500 dark:text-gray-400">{expertProfile.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-lg">
                        <i className="ri-coins-line text-yellow-600"></i>
                        <span className="font-semibold text-yellow-800 dark:text-yellow-300">{userCoins} coins</span>
                      </div>
                      <button
                        onClick={toggleFavorite}
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                          isFavorite ? 'bg-red-100 dark:bg-red-900/20 text-red-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <i className={`${isFavorite ? 'ri-heart-fill' : 'ri-heart-line'} text-xl`}></i>
                      </button>
                      <a
                        href={expertProfile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        <i className="ri-linkedin-fill text-xl"></i>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/experts/${expertProfile.id}/contact`} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-center">
                      Contacter maintenant
                    </Link>
                    <Link href={`/experts/${expertProfile.id}/book`} className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer whitespace-nowrap text-center">
                      Réserver un appel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-600">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Présentation</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{expertProfile.bio}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Domaines d'expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {expertProfile.expertise.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Certifications et formations</h3>
                  <div className="space-y-4">
                    {expertProfile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <i className="ri-award-line text-white"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h4>
                          <p className="text-gray-600 dark:text-gray-300">{cert.institution} • {cert.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Expérience professionnelle</h3>
                  <div className="space-y-4">
                    {expertProfile.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{exp.duration}</p>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Avis des utilisateurs</h3>
                  <div className="flex items-center space-x-2">
                    <i className="ri-star-fill text-yellow-400"></i>
                    <span className="font-semibold text-gray-900 dark:text-white">{expertProfile.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400">({expertProfile.reviewCount} avis)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {expertProfile.reviewsList.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover object-top"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{review.user}</h4>
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Vidéos de l'expert</h3>
                  <span className="text-gray-500 dark:text-gray-400">{expertProfile.videoCount} vidéos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {expertProfile.videos.map((video) => (
                    <div key={video.id} className="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 overflow-hidden">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <i className="ri-play-circle-fill text-white text-4xl"></i>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                        <div className="absolute top-2 left-2">
                          {getVideoStatusBadge(video)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{video.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{video.description}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <i className="ri-eye-line mr-1"></i>
                              <span>{video.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-heart-line mr-1"></i>
                              <span>{video.likes}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-calendar-line mr-1"></i>
                            <span>{new Date(video.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>

                        {getVideoActionButton(video)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPaymentModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-vip-crown-line text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Débloquer cette vidéo premium
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {selectedVideo.title}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 dark:text-gray-300">Prix de la vidéo:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedVideo.price} coins</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 dark:text-gray-300">Votre solde:</span>
                <span className={`font-semibold ${userCoins >= selectedVideo.price ? 'text-green-600' : 'text-red-600'}`}>
                  {userCoins} coins
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Après achat:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {userCoins >= selectedVideo.price ? userCoins - selectedVideo.price : 0} coins
                  </span>
                </div>
              </div>
            </div>

            {userCoins >= selectedVideo.price ? (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    handleUnlockVideo(selectedVideo);
                    setShowPaymentModal(false);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold whitespace-nowrap"
                >
                  <i className="ri-lock-unlock-line mr-2"></i>
                  Débloquer pour {selectedVideo.price} coins
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors whitespace-nowrap"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <i className="ri-error-warning-line text-red-600 mr-2"></i>
                    <span className="text-red-700 dark:text-red-300 text-sm">
                      Solde insuffisant. Il vous manque {selectedVideo.price - userCoins} coins.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => window.location.href = '/dashboard/coins'}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
                >
                  <i className="ri-shopping-cart-line mr-2"></i>
                  Acheter des coins
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors whitespace-nowrap"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
