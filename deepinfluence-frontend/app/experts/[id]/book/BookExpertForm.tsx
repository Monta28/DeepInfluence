
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface BookExpertFormProps {
  expertId: string;
}

export default function BookExpertForm({ expertId }: BookExpertFormProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [customDuration, setCustomDuration] = useState('');
  const [subject, setSubject] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const expert = {
    id: expertId,
    name: 'Dr. Sarah Martinez',
    specialty: 'Consultante en Stratégie d\'Entreprise',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20businesswoman%20portrait%2C%20confident%20female%20business%20strategist%2C%20modern%20business%20attire%2C%20professional%20headshot%2C%20clean%20background%2C%20trustworthy%20appearance%2C%20contemporary%20business%20professional%2C%20expert%20consultant%2C%20high%20quality%20portrait&width=120&height=120&seq=book-sarah-001&orientation=squarish',
    priceCall: '3 coins/minute',
    isOnline: true,
    responseTime: '< 2h',
    timezone: 'Europe/Paris'
  };

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        })
      });
    }
    return days;
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !subject || getFinalDuration() < 10) return;
    
    setIsBooking(true);
    
    try {
      // Simulate booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to appointments
      router.push('/dashboard/appointments');
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const getFinalDuration = () => {
    if (duration === 'custom') {
      return parseInt(customDuration) || 0;
    }
    return parseInt(duration);
  };

  const getTotalCost = () => {
    return getFinalDuration() * 3; // 3 coins per minute
  };

  const isFormValid = selectedDate && selectedTime && subject.trim() && getFinalDuration() >= 10;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link 
            href={`/experts/${expertId}`} 
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            <span>Retour au profil</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Réserver un appel vidéo</h1>
          <p className="text-gray-600 dark:text-gray-300">Planifiez votre consultation personnalisée.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Détails de la réservation</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date souhaitée
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-8"
                  >
                    <option value="">Sélectionnez une date</option>
                    {getNextDays().map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Heure souhaitée
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-blue-500'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Durée de l'appel
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => {
                      setDuration(e.target.value);
                      if (e.target.value !== 'custom') {
                        setCustomDuration('');
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-8"
                  >
                    <option value="15">15 minutes (45 coins)</option>
                    <option value="30">30 minutes (90 coins)</option>
                    <option value="45">45 minutes (135 coins)</option>
                    <option value="60">60 minutes (180 coins)</option>
                    <option value="custom">Durée personnalisée</option>
                  </select>
                  
                  {duration === 'custom' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre de minutes (minimum 10)
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="120"
                        value={customDuration}
                        onChange={(e) => setCustomDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Entrez le nombre de minutes"
                      />
                      {customDuration && parseInt(customDuration) < 10 && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          La durée minimum est de 10 minutes
                        </p>
                      )}
                      {customDuration && parseInt(customDuration) >= 10 && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Coût: {parseInt(customDuration) * 3} coins
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sujet de consultation
                  </label>
                  <textarea
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Décrivez brièvement le sujet que vous souhaitez aborder durant la consultation..."
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {subject.length}/500 caractères
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center text-blue-800 dark:text-blue-200">
                    <i className="ri-information-line mr-2"></i>
                    <span className="font-medium">Informations importantes</span>
                  </div>
                  <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Durée minimum : 10 minutes</li>
                    <li>• Vous recevrez un lien de connexion par email</li>
                    <li>• Arrivez 5 minutes avant l'heure prévue</li>
                    <li>• Assurez-vous d'avoir une connexion stable</li>
                    <li>• Annulation possible jusqu'à 2h avant</li>
                  </ul>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!isFormValid || isBooking}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isFormValid && !isBooking
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isBooking ? 'Réservation en cours...' : `Réserver maintenant (${getTotalCost()} coins)`}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Après confirmation, vous recevrez un lien pour rejoindre la session vidéo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Récapitulatif</h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover object-top"
                  />
                  {expert.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{expert.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{expert.specialty}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {expert.isOnline ? 'En ligne' : 'Hors ligne'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long' 
                    }) : 'Non sélectionnée'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Heure:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedTime || 'Non sélectionnée'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Durée:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getFinalDuration()} minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tarif:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {expert.priceCall}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                  <span className="text-xl font-bold text-blue-600">{getTotalCost()} coins</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                <p>• Paiement sécurisé</p>
                <p>• Confirmation immédiate</p>
                <p>• Support technique inclus</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
