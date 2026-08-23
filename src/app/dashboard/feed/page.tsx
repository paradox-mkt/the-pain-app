'use client';

import { useState } from 'react';
import { MessageSquare, Heart, Share2, BadgeCheck, Send } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';

export default function FeedPage() {
  const { posts, addPost, toggleLike } = useMockData();
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if(!newPost.trim()) return;
    addPost(newPost);
    setNewPost('');
  };

  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="pt-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comunidad</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tips, consejos y apoyo mutuo</p>
      </header>

      {/* Caja de nuevo post */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6">
        <textarea 
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Comparte cómo te sientes hoy o algún consejo..."
          className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm min-h-[80px]"
        />
        <div className="flex justify-end mt-3">
          <button 
            onClick={handlePost}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Send size={16} /> Publicar
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
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
            
            <p className="text-sm text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
              {post.content}
            </p>
            
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-slate-700 pt-3">
              <button 
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 text-xs transition-colors ${post.isLiked ? 'text-brand-500' : 'hover:text-brand-500'}`}
              >
                <Heart size={18} className={post.isLiked ? 'fill-brand-500' : ''} /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors">
                <MessageSquare size={18} /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors ml-auto">
                <Share2 size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
