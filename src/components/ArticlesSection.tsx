import React, { useState } from 'react';
import { Article, ArticleCategory } from '../types';
import { Bookmark, Clock, Search, X } from 'lucide-react';

interface ArticlesSectionProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
  activeCategory: ArticleCategory;
  onSelectCategory: (cat: ArticleCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CATEGORIES: ArticleCategory[] = [
  'All',
  'Patterns',
  'Stitch Guides',
  'Wearables & Fashion',
  'Home & Living',
  'Amigurumi',
  'Yarn & Care',
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return {
        badgeBg: 'bg-emerald-800/95 text-emerald-50 border border-emerald-400/40 shadow-xs',
        dot: 'bg-emerald-400',
        metaText: 'text-emerald-800',
        metaDot: 'bg-emerald-600',
      };
    case 'Intermediate':
      return {
        badgeBg: 'bg-amber-700/95 text-amber-50 border border-amber-300/40 shadow-xs',
        dot: 'bg-amber-300',
        metaText: 'text-amber-800',
        metaDot: 'bg-amber-600',
      };
    case 'Advanced':
      return {
        badgeBg: 'bg-rose-900/95 text-rose-50 border border-rose-400/40 shadow-xs',
        dot: 'bg-rose-300',
        metaText: 'text-rose-800',
        metaDot: 'bg-rose-600',
      };
    default:
      return {
        badgeBg: 'bg-stone-900/90 text-stone-100 border border-stone-600/40',
        dot: 'bg-stone-400',
        metaText: 'text-stone-700',
        metaDot: 'bg-stone-500',
      };
  }
};

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  onReadArticle,
  savedArticleIds,
  onToggleSave,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  // Filter logic
  const filteredArticles = articles.filter(article => {
    // Category filter
    if (activeCategory !== 'All' && article.category !== activeCategory) {
      return false;
    }
    // Difficulty filter
    if (selectedDifficulty !== 'all' && article.difficulty !== selectedDifficulty) {
      return false;
    }
    // Saved filter
    if (showSavedOnly && !savedArticleIds.includes(article.id)) {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchSubtitle = article.subtitle.toLowerCase().includes(q);
      const matchExcerpt = article.excerpt.toLowerCase().includes(q);
      const matchCategory = article.category.toLowerCase().includes(q);
      const matchAuthor = article.author.name.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchExcerpt && !matchCategory && !matchAuthor) {
        return false;
      }
    }
    return true;
  });

  return (
    <section id="articles" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-500 font-sans block mb-1">
            02. Editorial Archive & Patterns
          </span>
          <h2 className="text-3xl font-serif font-medium text-stone-900 tracking-tight">
            Articles, Guides & Step-by-Step Patterns
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-xl">
            Detailed step-by-step masterclasses with stitch charts, round-by-round counts, verified materials, and blocking notes.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search stitches, fibers, tools..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-900 placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-xs text-stone-500 font-sans">
            <span className="hidden sm:inline">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-xs bg-white border border-stone-300 rounded-md px-2 py-1 text-stone-700 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="all">All skill levels</option>
              <option value="Beginner">🟢 Beginner</option>
              <option value="Intermediate">🟡 Intermediate</option>
              <option value="Advanced">🔴 Advanced</option>
            </select>
          </div>

          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              showSavedOnly
                ? 'bg-amber-100/80 border-amber-300 text-amber-900'
                : 'bg-white border-stone-300 text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bookmark className={`w-3 h-3 ${showSavedOnly ? 'fill-amber-900' : ''}`} />
            <span>Saved ({savedArticleIds.length})</span>
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="my-16 text-center py-12 px-4 border border-dashed border-stone-300 rounded-xl bg-stone-50/50">
          <p className="font-serif text-lg text-stone-700">No articles found matching these criteria</p>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
            Try adjusting your search query or choosing another category from our library.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              setSelectedDifficulty('all');
              setShowSavedOnly(false);
              onSearchChange('');
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const isSaved = savedArticleIds.includes(article.id);
            const diffConfig = getDifficultyColor(article.difficulty);
            return (
              <article
                key={article.id}
                className="group flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                {/* Visual Thumbnail */}
                <div 
                  onClick={() => onReadArticle(article)}
                  className="aspect-[4/3] overflow-hidden bg-stone-100 relative cursor-pointer"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  {/* Color-coded Skill level badge & format badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className={`backdrop-blur-md text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1.5 ${diffConfig.badgeBg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${diffConfig.dot}`} aria-hidden="true" />
                      <span>{article.difficulty}</span>
                    </span>
                    {article.isReadingArticle ? (
                      <span className="bg-stone-900/80 backdrop-blur-md text-stone-200 text-[10px] px-2 py-0.5 rounded-md font-sans font-medium border border-white/10">
                        Guide
                      </span>
                    ) : (
                      <span className="bg-stone-900/80 backdrop-blur-md text-stone-200 text-[10px] px-2 py-0.5 rounded-md font-sans font-medium border border-white/10">
                        Pattern
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with color-coded difficulty */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mb-2 flex-wrap">
                      <span className="font-semibold text-amber-900">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${diffConfig.metaDot}`} aria-hidden="true" />
                        <span className={diffConfig.metaText}>{article.difficulty}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {article.readTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>

                    <h3 
                      onClick={() => onReadArticle(article)}
                      className="font-serif text-xl font-medium text-stone-900 leading-snug group-hover:text-amber-900 transition-colors cursor-pointer line-clamp-2"
                    >
                      {article.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Article tags if present */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-sans px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-serif font-bold text-stone-700">
                        {article.author.avatarInitials}
                      </div>
                      <span className="text-xs text-stone-700 font-medium">
                        {article.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleSave(article.id)}
                        className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-white border-stone-200 text-stone-400 hover:text-stone-700'
                        }`}
                        title={isSaved ? 'Saved' : 'Save'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-800' : ''}`} />
                      </button>

                      <button
                        onClick={() => onReadArticle(article)}
                        className="px-2.5 py-1 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
};
