
'use client';

import { useState } from 'react';
import Link from 'next/link';
import VideoCard from './VideoCard';

export default function VideosList() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const videos = [
    {
      id: 1,
      title: 'Les 5 clés du leadership efficace',
      expert: 'Dr. Marie Dubois',
      duration: '08:45',
      views: 12500,
      likes: 856,
      category: 'business',
      type: 'free',
      price: 0,
      thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20business%20woman%20presenting%20leadership%20concepts%2C%20modern%20office%20background%2C%20confident%20posture%2C%20professional%20attire%2C%20engaging%20presentation&width=400&height=250&seq=video-leadership&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20female%20personal%20development%20coach%20with%20warm%20confident%20smile%2C%20modern%20coaching%20office%20background%2C%20professional%20attire%2C%20trustworthy%20and%20approachable%20appearance&width=60&height=60&seq=expert-marie-1&orientation=squarish',
      publishedAt: '2024-01-15',
      description: 'Découvrez les techniques fondamentales pour développer votre leadership et inspirer vos équipes.'
    },
    {
      id: 2,
      title: 'Stratégies de marketing digital 2024',
      expert: 'Ahmed Hassan',
      duration: '12:30',
      views: 8900,
      likes: 647,
      category: 'marketing',
      type: 'premium',
      price: 25,
      thumbnail: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20strategy%20presentation%20with%20charts%2C%20graphs%2C%20social%20media%20icons%2C%20modern%20technology%20theme%2C%20professional%20setting&width=400&height=250&seq=video-marketing&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20male%20digital%20marketing%20expert%20with%20confident%20expression%2C%20modern%20digital%20office%20background%2C%20contemporary%20business%20attire%2C%20trustworthy%20appearance&width=60&height=60&seq=expert-ahmed-4&orientation=squarish',
      publishedAt: '2024-01-14',
      description: 'Les dernières tendances et stratégies pour réussir votre marketing digital en 2024.'
    },
    {
      id: 3,
      title: 'Méditation et gestion du stress',
      expert: 'Sophie Laurent',
      duration: '15:20',
      views: 15600,
      likes: 1234,
      category: 'wellness',
      type: 'free',
      price: 0,
      thumbnail: 'https://readdy.ai/api/search-image?query=Peaceful%20meditation%20session%20with%20woman%20in%20serene%20environment%2C%20calming%20nature%20background%2C%20wellness%20theme%2C%20relaxing%20atmosphere&width=400&height=250&seq=video-meditation&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20female%20wellness%20and%20nutrition%20coach%20with%20healthy%20radiant%20appearance%2C%20natural%20wellness%20environment%20background%2C%20professional%20attire%2C%20trustworthy%20and%20caring%20expression&width=60&height=60&seq=expert-sophie-3&orientation=squarish',
      publishedAt: '2024-01-13',
      description: 'Apprenez des techniques de méditation efficaces pour gérer le stress quotidien.'
    },
    {
      id: 4,
      title: 'Créer une startup rentable',
      expert: 'Marc Rodriguez',
      duration: '18:45',
      views: 7200,
      likes: 523,
      category: 'business',
      type: 'premium',
      price: 35,
      thumbnail: 'https://readdy.ai/api/search-image?query=Entrepreneur%20presenting%20startup%20ideas%2C%20modern%20coworking%20space%2C%20business%20planning%2C%20innovative%20atmosphere%2C%20professional%20setting&width=400&height=250&seq=video-startup&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20entrepreneur%20in%20elegant%20suit%2C%20confident%20businessman%20portrait%2C%20modern%20corporate%20office%20background%2C%20professional%20headshot%2C%20trustworthy%20appearance&width=60&height=60&seq=expert-marc-2&orientation=squarish',
      publishedAt: '2024-01-12',
      description: 'Guide complet pour créer et développer une startup profitable en 2024.'
    },
    {
      id: 5,
      title: 'Développement web moderne',
      expert: 'Claire Rousseau',
      duration: '22:15',
      views: 6800,
      likes: 445,
      category: 'tech',
      type: 'premium',
      price: 30,
      thumbnail: 'https://readdy.ai/api/search-image?query=Female%20developer%20coding%20on%20modern%20setup%2C%20multiple%20screens%2C%20programming%20environment%2C%20tech%20workspace%2C%20professional%20coding%20atmosphere&width=400&height=250&seq=video-coding&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20casual%20professional%20attire&width=60&height=60&seq=expert-claire-5&orientation=squarish',
      publishedAt: '2024-01-11',
      description: 'Les technologies et frameworks incontournables pour le développement web moderne.'
    },
    {
      id: 6,
      title: 'Nutrition et performance',
      expert: 'Sophie Laurent',
      duration: '14:30',
      views: 11200,
      likes: 789,
      category: 'wellness',
      type: 'free',
      price: 0,
      thumbnail: 'https://readdy.ai/api/search-image?query=Healthy%20nutrition%20setup%20with%20fresh%20vegetables%2C%20fruits%2C%20nutritionist%20explaining%20healthy%20eating%2C%20wellness%20theme%2C%20bright%20natural%20lighting&width=400&height=250&seq=video-nutrition&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20female%20wellness%20and%20nutrition%20coach%20with%20healthy%20radiant%20appearance%2C%20natural%20wellness%20environment%20background%2C%20professional%20attire%2C%20trustworthy%20and%20caring%20expression&width=60&height=60&seq=expert-sophie-3&orientation=squarish',
      publishedAt: '2024-01-10',
      description: 'Optimisez votre nutrition pour améliorer vos performances physiques et mentales.'
    },
    {
      id: 7,
      title: 'Investissement pour débutants',
      expert: 'Thomas Bernard',
      duration: '16:20',
      views: 9500,
      likes: 634,
      category: 'business',
      type: 'premium',
      price: 40,
      thumbnail: 'https://readdy.ai/api/search-image?query=Financial%20advisor%20explaining%20investment%20strategies%2C%20charts%20and%20graphs%2C%20professional%20financial%20setting%2C%20money%20management%20theme&width=400&height=250&seq=video-investment&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20office%20background%2C%20business%20suit&width=60&height=60&seq=expert-thomas-6&orientation=squarish',
      publishedAt: '2024-01-09',
      description: 'Guide complet pour commencer à investir intelligemment et en toute sécurité.'
    },
    {
      id: 8,
      title: 'SEO et référencement naturel',
      expert: 'Ahmed Hassan',
      duration: '19:45',
      views: 8200,
      likes: 567,
      category: 'marketing',
      type: 'free',
      price: 0,
      thumbnail: 'https://readdy.ai/api/search-image?query=SEO%20specialist%20showing%20search%20engine%20optimization%20techniques%2C%20analytics%20dashboard%2C%20digital%20marketing%20tools%2C%20professional%20workspace&width=400&height=250&seq=video-seo&orientation=landscape',
      expertImage: 'https://readdy.ai/api/search-image?query=Professional%20male%20digital%20marketing%20expert%20with%20confident%20expression%2C%20modern%20digital%20office%20background%2C%20contemporary%20business%20attire%2C%20trustworthy%20appearance&width=60&height=60&seq=expert-ahmed-4&orientation=squarish',
      publishedAt: '2024-01-08',
      description: 'Maîtrisez les techniques de SEO pour améliorer la visibilité de votre site web.'
    }
  ];

  const getTexts = () => {
    const texts = {
      fr: {
        title: 'Bibliothèque de Vidéos',
        subtitle: 'Accédez à une vaste collection de vidéos éducatives créées par nos experts',
        viewMore: 'Voir plus de vidéos'
      },
      ar: {
        title: 'مكتبة الفيديوهات',
        subtitle: 'اطلع على مجموعة واسعة من الفيديوهات التعليمية التي أنشأها خبراؤنا',
        viewMore: 'عرض المزيد من الفيديوهات'
      },
      en: {
        title: 'Video Library',
        subtitle: 'Access a vast collection of educational videos created by our experts',
        viewMore: 'View more videos'
      }
    };
    return texts[currentLanguage as keyof typeof texts] || texts.fr;
  };

  const text = getTexts();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/dashboard/explorer"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          >
            <span className="mr-2">{text.viewMore}</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
