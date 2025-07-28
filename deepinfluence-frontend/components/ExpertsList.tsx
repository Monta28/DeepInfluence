
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ExpertCard from './ExpertCard';

export default function ExpertsList() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const experts = [
    {
      id: 1,
      name: 'Dr. Sarah Martin',
      specialty: 'Psychologue clinique',
      rating: 4.9,
      reviews: 234,
      hourlyRate: 150,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20psychologist%20with%20warm%20confident%20smile%2C%20modern%20psychology%20office%20background%2C%20professional%20medical%20attire%2C%20trustworthy%20and%20approachable%20appearance%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background%2C%20natural%20lighting&width=400&height=400&seq=expert-sarah-martin-landing&orientation=squarish',
      isOnline: true,
      nextAvailable: 'Disponible maintenant',
      tags: ['Anxiété', 'Dépression', 'Thérapie de couple'],
      verified: true
    },
    {
      id: 2,
      name: 'Marc Dubois',
      specialty: 'Coach en Business',
      rating: 4.8,
      reviews: 189,
      hourlyRate: 120,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20business%20coach%20with%20confident%20smile%2C%20modern%20corporate%20office%20background%2C%20elegant%20business%20suit%2C%20trustworthy%20leadership%20appearance%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background%2C%20professional%20lighting&width=400&height=400&seq=expert-marc-dubois-landing&orientation=squarish',
      isOnline: false,
      nextAvailable: 'Disponible dans 2h',
      tags: ['Startups', 'Stratégie', 'Leadership'],
      verified: true
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      specialty: 'Coach en Développement Personnel',
      rating: 4.9,
      reviews: 312,
      hourlyRate: 100,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20life%20coach%20with%20inspiring%20warm%20smile%2C%20bright%20modern%20coaching%20office%20background%2C%20professional%20casual%20attire%2C%20motivational%20and%20caring%20expression%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background%2C%20natural%20lighting&width=400&height=400&seq=expert-sophie-laurent-landing&orientation=squarish',
      isOnline: true,
      nextAvailable: 'Disponible maintenant',
      tags: ['Confiance en soi', 'Motivation', 'Objectifs'],
      verified: true
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      specialty: 'Expert en Marketing Digital',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 90,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20digital%20marketing%20expert%20with%20confident%20expression%2C%20modern%20digital%20office%20background%20with%20screens%2C%20contemporary%20business%20attire%2C%20trustworthy%20tech-savvy%20appearance%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background&width=400&height=400&seq=expert-ahmed-hassan-landing&orientation=squarish',
      isOnline: true,
      nextAvailable: 'Disponible maintenant',
      tags: ['SEO', 'Social Media', 'Publicité'],
      verified: true
    },
    {
      id: 5,
      name: 'Claire Rousseau',
      specialty: 'Développeuse Full Stack',
      rating: 4.8,
      reviews: 98,
      hourlyRate: 110,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20software%20developer%20with%20confident%20smile%2C%20modern%20technology%20office%20background%2C%20casual%20professional%20attire%2C%20innovative%20and%20approachable%20appearance%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background%2C%20natural%20lighting&width=400&height=400&seq=expert-claire-rousseau-landing&orientation=squarish',
      isOnline: false,
      nextAvailable: 'Disponible demain',
      tags: ['React', 'Node.js', 'MongoDB'],
      verified: true
    },
    {
      id: 6,
      name: 'Thomas Bernard',
      specialty: 'Conseiller Financier',
      rating: 4.9,
      reviews: 267,
      hourlyRate: 140,
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20financial%20advisor%20with%20trustworthy%20smile%2C%20elegant%20financial%20office%20background%2C%20premium%20business%20suit%2C%20reliable%20and%20sophisticated%20appearance%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background%2C%20professional%20lighting&width=400&height=400&seq=expert-thomas-bernard-landing&orientation=squarish',
      isOnline: true,
      nextAvailable: 'Disponible maintenant',
      tags: ['Investissement', 'Épargne', 'Retraite'],
      verified: true
    },
    {
      id: 7,
      name: 'Emma Wilson',
      specialty: 'Nutritionniste',
      rating: 4.6,
      reviews: 145,
      hourlyRate: 80,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20nutritionist%20with%20healthy%20radiant%20appearance%2C%20natural%20wellness%20clinic%20background%2C%20professional%20healthcare%20attire%2C%20trustworthy%20and%20caring%20expression%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background%2C%20natural%20lighting&width=400&height=400&seq=expert-emma-wilson-landing&orientation=squarish',
      isOnline: true,
      nextAvailable: 'Disponible maintenant',
      tags: ['Perte de poids', 'Nutrition sportive', 'Santé'],
      verified: true
    },
    {
      id: 8,
      name: 'Julie Lambert',
      specialty: 'Coach Fitness',
      rating: 4.7,
      reviews: 203,
      hourlyRate: 70,
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20fitness%20coach%20with%20energetic%20smile%2C%20modern%20gym%20background%2C%20athletic%20professional%20wear%2C%20motivational%20and%20inspiring%20appearance%2C%20high%20quality%20portrait%20photograph%2C%20clean%20simple%20background%2C%20dynamic%20lighting&width=400&height=400&seq=expert-julie-lambert-landing&orientation=squarish',
      isOnline: false,
      nextAvailable: 'Disponible dans 1h',
      tags: ['Musculation', 'Cardio', 'Flexibilité'],
      verified: true
    }
  ];

  const getTexts = () => {
    const texts = {
      fr: {
        title: 'Connectez-vous avec nos experts',
        subtitle: 'Trouvez l\'expert parfait pour vos besoins parmi nos professionnels vérifiés',
        viewMore: 'Voir plus d\'experts'
      },
      ar: {
        title: 'تواصل مع خبرائنا',
        subtitle: 'اعثر على الخبير المثالي لاحتياجاتك من بين المحترفين المعتمدين لدينا',
        viewMore: 'عرض المزيد من الخبراء'
      },
      en: {
        title: 'Connect with our experts',
        subtitle: 'Find the perfect expert for your needs among our verified professionals',
        viewMore: 'View more experts'
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
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/experts"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          >
            <span className="mr-2">{text.viewMore}</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
