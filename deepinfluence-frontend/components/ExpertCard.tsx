
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Expert {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  hourlyRate?: number;
  priceText?: string;
  image: string;
  isOnline: boolean;
  nextAvailable?: string;
  tags?: string[];
  verified: boolean;
  category?: string;
  languages?: string[];
  responseTime?: string;
  sessions?: number;
  followers?: number;
  avatar?: string;
}

export default function ExpertCard({ expert }: { expert: Expert }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <img
          src={expert.image}
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
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <i className="ri-verified-badge-fill mr-1"></i>
              Vérifié
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
            expert.isOnline
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${expert.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="whitespace-nowrap">{expert.nextAvailable || (expert.isOnline ? 'En ligne' : 'Hors ligne')}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {expert.name}
          </h3>
          <div className="flex items-center space-x-1">
            <i className="ri-star-fill text-yellow-400 text-sm"></i>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {expert.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 truncate">
          {expert.specialty}
        </p>

        {expert.tags && expert.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {expert.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <i className="ri-user-line"></i>
            <span>{expert.reviews} avis</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {expert.hourlyRate ? `${expert.hourlyRate}€/h` : expert.priceText || 'N/A'}
          </div>
        </div>

        <div className="space-y-2">
          <Link
            href={`/experts/${expert.id}`}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-center block whitespace-nowrap"
          >
            Voir le profil
          </Link>
          <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium whitespace-nowrap">
            Message rapide
          </button>
        </div>
      </div>
    </div>
  );
}
