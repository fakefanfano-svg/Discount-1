import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { Heart, Plus, X, ZoomIn } from 'lucide-react';

interface PhotoGallerySectionProps {
  photos: GalleryPhoto[];
  onOpenPhotoLightbox: (photo: GalleryPhoto) => void;
  onLikePhoto: (photoId: string) => void;
  onAddNewPhoto: (newPhoto: GalleryPhoto) => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  photos,
  onOpenPhotoLightbox,
  onLikePhoto,
  onAddNewPhoto,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Form states for adding new photo
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Bags & Accessories');
  const [newHookSize, setNewHookSize] = useState('4.0 mm (US G-6)');
  const [newYarnType, setNewYarnType] = useState('Botanical Organic Cotton');
  const [newDescription, setNewDescription] = useState('');
  const [selectedSampleImage, setSelectedSampleImage] = useState<string>(
    '/src/assets/images/article_granny_square_1790433589295.jpg'
  );

  const categories = [
    'All',
    'Bags & Accessories',
    'Amigurumi',
    'Wearables & Apparel',
    'Lace & Wraps',
    'Home & Living',
    'Studio & Process'
  ];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const created: GalleryPhoto = {
      id: `custom-photo-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: newAuthor.trim(),
      location: 'Crochet Simply Maker Guild',
      image: selectedSampleImage,
      hookSize: newHookSize,
      yarnType: newYarnType,
      timeSpent: 'Approx. 8 hours',
      likes: 1,
      userLiked: true,
      description: newDescription.trim() || 'Handmade project shared with the international maker community.'
    };

    onAddNewPhoto(created);
    setIsSubmitModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewAuthor('');
    setNewDescription('');
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-[#F5F2EB]/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-sans block mb-1">
              03. Visual Exhibition
            </span>
            <h2 className="text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Curated Gallery of Finished Works & Textures
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Close-up details of stitch tension, natural fiber blooms, botanical palettes, and artisan garments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Share Your Project</span>
            </button>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/50 rounded-lg max-w-fit">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Photo Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Photo Box */}
              <div 
                onClick={() => onOpenPhotoLightbox(photo)}
                className="aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-100 relative cursor-pointer"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 bg-white/90 backdrop-blur-xs rounded-full text-stone-900 shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Category tag */}
                <span className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-sans px-2 py-0.5 rounded">
                  {photo.category}
                </span>
              </div>

              {/* Photo Metadata */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 
                    onClick={() => onOpenPhotoLightbox(photo)}
                    className="font-serif text-base font-medium text-stone-900 leading-snug group-hover:text-amber-900 transition-colors cursor-pointer line-clamp-1"
                  >
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                    By {photo.author} {photo.location ? `· ${photo.location}` : ''}
                  </p>
                  
                  {/* Technical Specs */}
                  <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-600 font-sans space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Hook:</span>
                      <span className="font-mono text-stone-800">{photo.hookSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Yarn:</span>
                      <span className="text-stone-800 truncate max-w-[130px]">{photo.yarnType}</span>
                    </div>
                  </div>
                </div>

                {/* Footer with Likes & Details */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => onLikePhoto(photo.id)}
                    className={`inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                      photo.userLiked ? 'text-rose-600' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${photo.userLiked ? 'fill-rose-600' : ''}`} />
                    <span className="font-mono text-xs">{photo.likes}</span>
                  </button>

                  <button
                    onClick={() => onOpenPhotoLightbox(photo)}
                    className="text-xs text-amber-900 hover:text-stone-950 font-medium cursor-pointer"
                  >
                    View specs →
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Community Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900 font-semibold block mb-1">
              Maker Community Guild
            </span>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Share Your Handcrafted Project
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Your stitches will inspire thousands of fellow fiber artists. Select a project sample image and log your technical specifications.
            </p>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nordic Openwork Throw in Pure Wool"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Maker Name / Alias *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                  >
                    <option value="Bags & Accessories">Bags & Accessories</option>
                    <option value="Amigurumi">Amigurumi</option>
                    <option value="Wearables & Apparel">Wearables & Apparel</option>
                    <option value="Lace & Wraps">Lace & Wraps</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Studio & Process">Studio & Process</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Hook Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4.0 mm (US G-6)"
                    value={newHookSize}
                    onChange={(e) => setNewHookSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Yarn Fiber & Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Merino DK"
                    value={newYarnType}
                    onChange={(e) => setNewYarnType(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Representative Studio Photography
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    '/src/assets/images/article_granny_square_1790433589295.jpg',
                    '/src/assets/images/article_amigurumi_botanical_1790433600852.jpg',
                    '/src/assets/images/article_chunky_cardigan_1790433611241.jpg',
                    '/src/assets/images/article_bucket_hat_1790440175101.jpg',
                    '/src/assets/images/article_lace_shawl_1790440189535.jpg',
                    '/src/assets/images/article_tapestry_decor_1790440202934.jpg',
                    '/src/assets/images/article_baby_blanket_1790440214777.jpg',
                    '/src/assets/images/hero_crochet_artisan_1790433576727.jpg'
                  ].map((imgSrc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSampleImage(imgSrc)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedSampleImage === imgSrc ? 'border-amber-700 ring-2 ring-amber-600/30' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgSrc} alt="Sample" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Process Notes, Modifications, or Blocking Secrets
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Worked this during cool autumn evenings. Found that wet blocking with rustproof wires completely transformed the edge drape."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Publish to Gallery
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
