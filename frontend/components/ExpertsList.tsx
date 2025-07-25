'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ExpertCard from './ExpertCard';
import ApiService, { Expert } from '../services/api';

export default function ExpertsList() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getExperts({ limit: 8 });
      if (response.success) {
        setExperts(response.data.experts);
      } else {
        setError('Erreur lors du chargement des experts');
      }
    } catch (error) {
      console.error('Error fetching experts:', error);
      setError('Erreur lors du chargement des experts');
    } finally {
      setLoading(false);
    }
  };

  const getTexts = () => {
    const texts = {
      fr: {
        title: 'Connectez-vous avec nos experts',
        subtitle: 'Trouvez l\'expert parfait pour vos besoins parmi nos professionnels vérifiés',
        viewMore: 'Voir plus d\'experts',
        loading: 'Chargement des experts...',
        error: 'Erreur lors du chargement'
      },
      ar: {
        title: 'تواصل مع خبرائنا',
        subtitle: 'اعثر على الخبير المثالي لاحتياجاتك من بين المحترفين المعتمدين لدينا',
        viewMore: 'عرض المزيد من الخبراء',
        loading: 'جاري تحميل الخبراء...',
        error: 'خطأ في التحميل'
      },
      en: {
        title: 'Connect with our experts',
        subtitle: 'Find the perfect expert for your needs among our verified professionals',
        viewMore: 'View more experts',
        loading: 'Loading experts...',
        error: 'Loading error'
      }
    };
    return texts[currentLanguage as keyof typeof texts] || texts.fr;
  };

  const text = getTexts();

  if (loading) {
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
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-300">{text.loading}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{text.error}</p>
            <button 
              onClick={fetchExperts}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

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

