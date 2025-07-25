'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactExpertForm from './ContactExpertForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '../../../../contexts/AuthContext';
import ApiService, { Expert } from '../../../../services/api';

export default function ContactExpertPage({ params }: { params: { id: string } }) {
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }
    loadExpert();
  }, [params.id, user, router]);

  const loadExpert = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await ApiService.getExpert(parseInt(params.id));
      
      if (response.success) {
        setExpert(response.data);
      } else {
        setError('Expert non trouvé');
      }
    } catch (err: any) {
      console.error('Erreur lors du chargement de l\'expert:', err);
      if (err.message.includes('fetch')) {
        setError('Impossible de se connecter au serveur. Vérifiez que le backend est démarré.');
        
        // Données de fallback
        setExpert({
          id: parseInt(params.id),
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
        });
      } else {
        setError(err.message || 'Erreur lors du chargement de l\'expert');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400">Chargement...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !expert) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-error-warning-line text-red-600 dark:text-red-400 text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Erreur de chargement
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={loadExpert}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Réessayer
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      {expert && <ContactExpertForm expert={expert} />}
      <Footer />
    </div>
  );
}

