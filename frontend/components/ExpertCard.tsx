'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Expert } from '../services/api';

export default function ExpertCard({ expert }: { expert: Expert }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <img
          src={expert.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&size=300&background=3B82F6&color=ffffff`}
          alt={expert.name}
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
          {expert.verified && (
            <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
              <i className="ri-verified-badge-fill text-sm"></i>
            </div>
          )}
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            expert.isOnline
              ? 'bg-green-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {expert.isOnline ? 'En ligne' : 'Hors ligne'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {expert.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {expert.specialty}
            </p>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`ri-star-${i < Math.floor(expert.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}
              ></i>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {expert.rating} ({expert.reviews} avis)
          </span>
        </div>

        {expert.tags && expert.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {expert.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {expert.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{expert.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center mb-1">
              <i className="ri-user-line mr-1"></i>
              <span>{expert.sessions} sessions</span>
            </div>
            {expert.responseTime && (
              <div className="flex items-center">
                <i className="ri-time-line mr-1"></i>
                <span>Répond en {expert.responseTime}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {expert.hourlyRate}€/h
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {expert.pricePerMessage}€/msg
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/experts/${expert.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
          >
            Voir le profil
          </Link>
          <Link
            href={`/experts/${expert.id}/contact`}
            className="flex-1 border border-blue-600 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-center text-sm font-medium"
          >
            Contacter
          </Link>
        </div>
      </div>
    </div>
  );
}

