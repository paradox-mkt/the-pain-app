'use client';

import { Heart, Share2, BadgeCheck, Play, ExternalLink } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';

// Simple URL extractor
const extractUrls = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

// Componente para previsualizar links
const LinkPreview = ({ url }: { url: string }) => {
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isInstagram = url.includes('instagram.com');
  
  if (isYouTube) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="mt-3 block relative rounded-xl overflow-hidden group">
        <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
          <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80" alt="Video Preview" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <Play size={24} className="ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white font-semibold text-sm truncate">Ver video en YouTube</p>
        </div>
      </a>
    );
  }

  if (isInstagram) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="mt-3 block border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
        <div className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-0.5">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
              <ExternalLink size={20} className="text-gray-900 dark:text-white" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Publicación de Instagram</p>
            <p className="text-xs text-gray-500">instagram.com</p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noreferrer" className="mt-3 block border border-gray-100 dark:border-slate-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-2">
        <ExternalLink size={16} className="text-brand-500" />
        <span className="text-sm font-medium text-brand-500 truncate">{url}</span>
      </div>
    </a>
  );
};

export default function FeedPage() {
  const { posts, toggleLike } = useMockData();

  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="pt-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Actualizaciones Médicas</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Información y recursos curados por especialistas</p>
      </header>

      <div className="space-y-4">
        {posts.map(post => {
          const urls = extractUrls(post.content);
          let cleanContent = post.content;
          
          // Remove URLs from the text to display them as rich previews instead
          urls.forEach(url => {
            cleanContent = cleanContent.replace(url, '').trim();
          });

          return (
            <article key={post.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-700" />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{post.author}</h3>
                    {post.isDoctor && <BadgeCheck size={16} className="text-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-500">{post.role} • {post.timeAgo}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-800 dark:text-gray-200 mb-2 leading-relaxed">
                {cleanContent}
              </p>
              
              {urls.map((url, i) => (
                <LinkPreview key={i} url={url} />
              ))}
              
              <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-slate-700 pt-3 mt-4">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${post.isLiked ? 'text-brand-500' : 'hover:text-brand-500'}`}
                >
                  <Heart size={18} className={post.isLiked ? 'fill-brand-500' : ''} /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors ml-auto">
                  <Share2 size={18} /> Compartir
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
