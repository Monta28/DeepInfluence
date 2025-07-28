
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Video {
  id: number;
  title: string;
  expert: string;
  duration: string;
  views: number;
  likes: number;
  category: string;
  type: 'free' | 'premium';
  price: number;
  thumbnail: string;
  expertImage: string;
  publishedAt: string;
  description: string;
}

interface VideoCardProps {
  video: Video;
  onUnlock?: (video: Video) => void;
  onWatchFree?: (video: Video) => void;
  onAddToWatchList?: (video: Video) => void;
  isUnlocked?: boolean;
  isInWatchList?: boolean;
}

export default function VideoCard({ 
  video, 
  onUnlock, 
  onWatchFree, 
  onAddToWatchList, 
  isUnlocked = false, 
  isInWatchList = false 
}: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const handleWatchClick = () => {
    if (video.type === 'free') {
      onWatchFree?.(video);
    } else if (isUnlocked) {
      // Aller directement à la vidéo si elle est débloquée
      window.location.href = `/videos/${video.id}`;
    } else {
      onUnlock?.(video);
    }
  };

  const handleAddToWatchList = () => {
    onAddToWatchList?.(video);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
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
          {video.type === 'premium' && !isUnlocked && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <i className="ri-vip-crown-fill mr-1"></i>
              Premium
            </div>
          )}
          {isUnlocked && video.type === 'premium' && (
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <i className="ri-check-line mr-1"></i>
              Débloqué
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {video.duration}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <i className="ri-play-fill text-white text-2xl ml-1"></i>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <img
              src={video.expertImage}
              alt={video.expert}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {video.expert}
            </span>
          </div>
          {video.type === 'premium' && !isUnlocked && (
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {video.price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">coins</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {video.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {video.description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <i className="ri-eye-line"></i>
              <span>{formatViews(video.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="ri-heart-line"></i>
              <span>{video.likes}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <i className="ri-calendar-line"></i>
            <span>{new Date(video.publishedAt).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        <div className="space-y-2">
          {video.type === 'free' ? (
            <button
              onClick={handleWatchClick}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold text-center whitespace-nowrap"
            >
              Regarder gratuitement
            </button>
          ) : isUnlocked ? (
            <button
              onClick={handleWatchClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-center whitespace-nowrap"
            >
              Regarder maintenant
            </button>
          ) : (
            <button
              onClick={handleWatchClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold text-center whitespace-nowrap"
            >
              Débloquer ({video.price} coins)
            </button>
          )}
          <button 
            onClick={handleAddToWatchList}
            className={`w-full py-2 px-4 rounded-lg transition-colors font-medium whitespace-nowrap ${
              isInWatchList
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {isInWatchList ? (
              <>
                <i className="ri-check-line mr-2"></i>
                Dans la liste
              </>
            ) : (
              <>
                <i className="ri-add-line mr-2"></i>
                Ajouter à la liste
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
