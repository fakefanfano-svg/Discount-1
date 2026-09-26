import React from 'react';
import { GalleryPhoto } from '../types';
import { Heart, Share2, X } from 'lucide-react';

interface PhotoLightboxModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onLikePhoto: (id: string) => void;
  onGoToArticle?: (articleId: string) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photo,
  onClose,
  onLikePhoto,
  onGoToArticle,
}) => {
  if (!photo) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Photograph link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF8F5] border border-stone-300 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer"
          title="Close view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Showcase */}
        <div className="md:w-3/5 bg-stone-950 flex items-center justify-center p-4 sm:p-6 relative">
          <img
            src={photo.image}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="max-h-[60vh] md:max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-stone-900/80 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-xs font-sans">
            High Resolution · 100% Hand Crocheted
          </div>
        </div>

        {/* Accession & Maker Metadata Column */}
        <div className="md:w-2/5 p-6 overflow-y-auto flex flex-col justify-between bg-[#FAF8F5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mb-1">
              <span className="font-semibold text-amber-900 uppercase tracking-wider">{photo.category}</span>
              {photo.location && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{photo.location}</span>
                </>
              )}
            </div>

            <h3 className="font-serif text-2xl font-medium text-stone-900 leading-tight">
              {photo.title}
            </h3>

            <p className="text-xs text-stone-600 font-sans mt-1">
              Crafted by <strong className="text-stone-900 font-semibold">{photo.author}</strong>
            </p>

            <p className="mt-4 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              {photo.description}
            </p>

            {/* Technical Specifications Definition List */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700 font-sans mb-3">
                Technical Specifications
              </h4>

              <dl className="text-xs space-y-2 font-sans">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <dt className="text-stone-500">Hook caliber</dt>
                  <dd className="font-mono font-medium text-stone-900">{photo.hookSize}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <dt className="text-stone-500">Yarn composition</dt>
                  <dd className="font-medium text-stone-900">{photo.yarnType}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <dt className="text-stone-500">Crafting time</dt>
                  <dd className="font-mono text-stone-900">{photo.timeSpent}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <dt className="text-stone-500">Primary category</dt>
                  <dd className="font-medium text-stone-900">{photo.category}</dd>
                </div>
              </dl>
            </div>

            {/* Pattern linkage if available */}
            {photo.articleId && onGoToArticle && (
              <div className="mt-6 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl">
                <span className="text-[11px] font-sans font-semibold text-amber-900 uppercase block mb-1">
                  Full Pattern Article Available
                </span>
                <p className="text-xs text-stone-600 mb-2">
                  We have the complete step-by-step editorial guide with stitch charts, counts, and materials checklist for this project.
                </p>
                <button
                  onClick={() => {
                    onGoToArticle(photo.articleId!);
                    onClose();
                  }}
                  className="w-full py-2 bg-amber-900 hover:bg-amber-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Open Step-by-Step Pattern
                </button>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={() => onLikePhoto(photo.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                photo.userLiked 
                  ? 'bg-rose-50 border-rose-300 text-rose-700' 
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${photo.userLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{photo.likes} likes</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
