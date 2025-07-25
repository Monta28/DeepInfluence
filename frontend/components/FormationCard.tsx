'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Formation } from '../services/api';

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
          src={formation.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formation.title)}&size=300&background=10B981&color=ffffff`}
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
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            formation.type === 'live'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}>
            {formation.type === 'live' ? 'En direct' : 'Présentiel'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {formation.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Par {formation.instructor}
            </p>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`ri-star-${i < Math.floor(formation.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}
              ></i>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {formation.rating} ({formation.students} étudiants)
          </span>
        </div>

        {formation.tags && formation.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {formation.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {formation.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{formation.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <i className="ri-time-line mr-1"></i>
              <span>{formation.duration}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <i className="ri-bar-chart-line mr-1"></i>
              <span>{formation.level}</span>
            </div>
          </div>

          {formation.location && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <i className="ri-map-pin-line mr-1"></i>
              <span>{formation.location}</span>
            </div>
          )}

          {formation.nextSession && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <i className="ri-calendar-line mr-1"></i>
              <span>Prochaine session: {new Date(formation.nextSession).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
        </div>

        {formation.maxPlaces && formation.currentPlaces && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Places disponibles</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {availablePlaces}/{formation.maxPlaces}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  placesPercentage > 80 ? 'bg-red-500' : placesPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${placesPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {typeof formation.price === 'number' ? `${formation.price}€` : formation.price}
          </div>
          {formation.schedule && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formation.schedule}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/formations/${formation.id}`}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center text-sm font-medium"
          >
            Voir détails
          </Link>
          <Link
            href={`/formations/${formation.id}/reserve`}
            className="flex-1 border border-green-600 text-green-600 dark:text-green-400 py-2 px-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors text-center text-sm font-medium"
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  );
}

