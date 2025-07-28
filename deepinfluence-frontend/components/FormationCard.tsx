
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Formation {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: number | string;
  type?: 'live' | 'presentiel';
  maxPlaces?: number;
  currentPlaces?: number;
  location?: string;
  image: string;
  tags?: string[];
  nextSession?: string;
  description?: string;
  category?: string;
  modules?: string[];
  schedule?: string;
}

export default function FormationCard({ formation }: { formation: Formation }) {
  const [isLiked, setIsLiked] = useState(false);

  const availablePlaces = formation.maxPlaces && formation.currentPlaces 
    ? formation.maxPlaces - formation.currentPlaces 
    : 0;
  const placesPercentage = formation.maxPlaces && formation.currentPlaces 
    ? (formation.currentPlaces / formation.maxPlaces) * 100 
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <img
          src={formation.image}
          alt={formation.title}
          className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30'
            }`}
          >
            <i className={`ri-heart-${isLiked ? 'fill' : 'line'} text-sm`}></i>
          </button>
          {formation.type && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              formation.type === 'live' 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            }`}>
              {formation.type === 'live' ? '🔴 Live' : '🏢 Présentiel'}
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
            {formation.duration}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            formation.level === 'Débutant' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
            formation.level === 'Intermédiaire' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}>
            {formation.level}
          </span>
          <div className="flex items-center space-x-1">
            <i className="ri-star-fill text-yellow-400 text-sm"></i>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {formation.rating}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {formation.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 truncate">
          par {formation.instructor}
        </p>

        {formation.tags && formation.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {formation.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Places disponibles */}
        {formation.maxPlaces && formation.currentPlaces !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Places disponibles</span>
              <span className="font-medium">{availablePlaces}/{formation.maxPlaces}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  placesPercentage > 80 ? 'bg-red-500' : 
                  placesPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${placesPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          {formation.location && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <i className="ri-map-pin-line"></i>
              <span className="truncate">{formation.location}</span>
            </div>
          )}
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {typeof formation.price === 'string' ? formation.price : `${formation.price} coins`}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          {formation.nextSession && (
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <i className="ri-calendar-line"></i>
              <span className="truncate">{formation.nextSession}</span>
            </div>
          )}
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
            <i className="ri-user-line"></i>
            <span>{formation.students} étudiants</span>
          </div>
        </div>

        <div className="space-y-2">
          <Link
            href={`/formations/${formation.id}`}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold text-center block whitespace-nowrap"
          >
            Voir la formation
          </Link>
          <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium whitespace-nowrap">
            Réserver maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
