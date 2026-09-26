import React from 'react';
import { Article } from '../types';
import { ArrowRight, Bookmark, Clock } from 'lucide-react';

interface LeadStoryProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const LeadStory: React.FC<LeadStoryProps> = ({
  article,
  onReadArticle,
  isSaved,
  onToggleSave,
}) => {
  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      
      {/* Editorial Chapter Marker */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-200 text-xs font-sans">
        <span className="uppercase tracking-widest text-stone-500 font-semibold">
          01. Featured Cover Story
        </span>
        <span className="text-stone-500">
          Editor’s seasonal pick
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Large Curated Visual Slot */}
        <div className="lg:col-span-7 group relative">
          <div 
            onClick={() => onReadArticle(article)}
            className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm cursor-pointer aspect-[4/3] relative"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
            {/* Corner label */}
            <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-sm text-stone-100 text-[11px] font-sans px-2.5 py-1 rounded">
              Full Pattern & Diagram Included
            </div>
          </div>
          <p className="text-[12px] font-serif text-stone-500 italic mt-2.5">
            Plate 1 — 13-motif granny square artisan tote crafted in combed botanical cotton with earthy clay and sage tones.
          </p>
        </div>

        {/* Narrative & Editorial Details */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          
          {/* Metadata - NO PILLS, clean text with separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mb-3 flex-wrap">
            <span className="font-semibold text-amber-900 uppercase tracking-wide">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>Skill: {article.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </div>

          <h2 
            onClick={() => onReadArticle(article)}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-stone-900 leading-tight tracking-tight hover:text-amber-900 transition-colors cursor-pointer text-balance"
          >
            {article.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {article.subtitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-stone-500 leading-relaxed font-sans line-clamp-3">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-6 pt-5 border-t border-stone-200/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center text-xs font-serif font-semibold text-stone-700">
                {article.author.avatarInitials}
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-900">
                  {article.author.name}
                </div>
                <div className="text-[11px] text-stone-500 font-sans">
                  {article.author.role}
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 border-amber-300 text-amber-800' 
                  : 'bg-white border-stone-200 text-stone-400 hover:text-stone-700 hover:border-stone-300'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-800' : ''}`} />
            </button>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => onReadArticle(article)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer group"
            >
              <span>Read Article & Pattern</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <span className="text-xs text-stone-500 font-sans">
              Includes stitch counts & materials checklist
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
