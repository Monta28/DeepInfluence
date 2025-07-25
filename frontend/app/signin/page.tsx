'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '../../contexts/AuthContext';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, user } = useAuth();
  const router = useRouter();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      // Redirection immédiate après connexion réussie
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implémenter la connexion sociale
    alert(`Connexion avec ${provider} sera bientôt disponible`);
  };

  // Comptes de test pour faciliter les tests
  const testAccounts = [
    { email: 'sarah.martin@email.com', type: 'Expert - Psychologue' },
    { email: 'user1@email.com', type: 'Utilisateur' },
    { email: 'marc.dubois@email.com', type: 'Expert - Coach Business' }
  ];

  const fillTestAccount = (email: string) => {
    setFormData(prev => ({
      ...prev,
      email: email,
      password: 'password123'
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
              <p className="text-gray-600">Connectez-vous à votre compte DeepInfluence</p>
            </div>

            {/* Comptes de test */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Comptes de test :</h3>
              <div className="space-y-1">
                {testAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => fillTestAccount(account.email)}
                    className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {account.email} ({account.type})
                  </button>
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-1">Mot de passe : password123</p>
            </div>

            {/* Affichage des erreurs */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-500 mr-2"></i>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Boutons de connexion sociale */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-google-fill text-red-500"></i>
                </div>
                Continuer avec Google
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white rounded-xl py-3 px-4 hover:bg-blue-700 transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-facebook-fill"></i>
                </div>
                Continuer avec Facebook
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Formulaire de connexion */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`ri-eye-${showPassword ? 'off-' : ''}line`}></i>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Vous n'avez pas de compte ?{' '}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

