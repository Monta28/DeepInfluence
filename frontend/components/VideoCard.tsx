'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Video } from '../services/api';

export default function VideoCard({ video }: { video: Video }) {
  const [isLiked, setIsLiked] = useState(false);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <img
          src={video.thumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(video.title)}&size=300&background=8B5CF6&color=ffffff`}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <i className="ri-play-fill text-2xl text-gray-800 ml-1"></i>
          </div>
        </div>
        
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
          {video.isPremium && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Premium
            </div>
          )}
        </div>
        
        <div className="absolute bottom-4 right-4">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {formatDuration(video.duration)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Par {video.instructor}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <i className="ri-eye-line mr-1"></i>
              <span>{formatViews(video.views)} vues</span>
            </div>
            <div className="flex items-center">
              <i className="ri-heart-line mr-1"></i>
              <span>{video.likes}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(video.publishedAt).toLocaleDateString('fr-FR')}
          </div>
        </div>

        <div className="mb-4">
          <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full">
            {video.category}
          </span>
        </div>

        {video.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {video.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {video.price > 0 ? `${video.price}€` : 'Gratuit'}
          </div>
          <Link
            href={`/videos/${video.id}`}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Regarder
          </Link>
        </div>
      </div>
    </div>
  );
}

