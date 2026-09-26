import React, { useEffect, useState } from 'react';
import { ARTICLES_DATA, GALLERY_PHOTOS_DATA } from './data/crochetData';
import { Article, ArticleCategory, GalleryPhoto } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LeadStory } from './components/LeadStory';
import { ArticlesSection } from './components/ArticlesSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { StitchLibrary } from './components/StitchLibrary';
import { TechniquesGrid } from './components/TechniquesGrid';
import { SeoFaqSection } from './components/SeoFaqSection';
import { NewsletterClub } from './components/NewsletterClub';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { RowCounterModal } from './components/RowCounterModal';
import { YarnCalculatorModal } from './components/YarnCalculatorModal';
import { HookConversionModal } from './components/HookConversionModal';
import { HookConversionSection } from './components/HookConversionSection';
import { EditorialPoliciesModal, PolicyTab } from './components/EditorialPoliciesModal';

export default function App() {
  const [articles] = useState<Article[]>(ARTICLES_DATA);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('crochet_simply_photos_v2');
    return saved ? JSON.parse(saved) : GALLERY_PHOTOS_DATA;
  });

  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('crochet_saved_articles_v2');
    return saved ? JSON.parse(saved) : ['granny-square-designer-tote'];
  });

  const [activeCategory, setActiveCategory] = useState<ArticleCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isRowCounterOpen, setIsRowCounterOpen] = useState<boolean>(false);
  const [isYarnCalculatorOpen, setIsYarnCalculatorOpen] = useState<boolean>(false);
  const [isHookConverterOpen, setIsHookConverterOpen] = useState<boolean>(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [policyModalTab, setPolicyModalTab] = useState<PolicyTab>('privacy');

  // Sync saved articles to localStorage
  useEffect(() => {
    localStorage.setItem('crochet_saved_articles_v2', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  // Sync photos to localStorage
  useEffect(() => {
    localStorage.setItem('crochet_simply_photos_v2', JSON.stringify(photos));
  }, [photos]);

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticleIds(prev => 
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleLikePhoto = (photoId: string) => {
    setPhotos(prev => prev.map(p => {
      if (p.id === photoId) {
        const isLiked = !p.userLiked;
        return {
          ...p,
          userLiked: isLiked,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      }
      return p;
    }));

    // If active photo modal is open, sync it
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(curr => {
        if (!curr) return null;
        const isLiked = !curr.userLiked;
        return {
          ...curr,
          userLiked: isLiked,
          likes: isLiked ? curr.likes + 1 : Math.max(0, curr.likes - 1)
        };
      });
    }
  };

  const handleAddNewPhoto = (newPhoto: GalleryPhoto) => {
    setPhotos(prev => [newPhoto, ...prev]);
  };

  const handleGoToArticleFromPhoto = (articleId: string) => {
    const found = articles.find(a => a.id === articleId || a.slug === articleId);
    if (found) {
      setSelectedArticle(found);
    }
  };

  const leadArticle = articles[0]; // Lead story is "The Modern Granny Square Revival"

  const scrollToArticles = () => {
    const el = document.getElementById('articles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-stone-900">
      
      {/* Primary Top Bar */}
      <Header
        onOpenRowCounter={() => setIsRowCounterOpen(true)}
        onOpenYarnCalculator={() => setIsYarnCalculatorOpen(true)}
        onOpenHookConverter={() => setIsHookConverterOpen(true)}
        savedArticlesCount={savedArticleIds.length}
        onSelectCategory={(cat) => {
          setActiveCategory(cat as ArticleCategory);
          scrollToArticles();
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) scrollToArticles();
        }}
      />

      <main className="flex-1">
        {/* Editorial Hero */}
        <Hero
          onExploreArticles={scrollToArticles}
          onExploreGallery={scrollToGallery}
          onOpenHookConverter={() => setIsHookConverterOpen(true)}
        />

        {/* Lead Story Feature */}
        {leadArticle && (
          <LeadStory
            article={leadArticle}
            onReadArticle={(art) => setSelectedArticle(art)}
            isSaved={savedArticleIds.includes(leadArticle.id)}
            onToggleSave={toggleSaveArticle}
          />
        )}

        {/* Articles & Step-by-Step Patterns Section */}
        <ArticlesSection
          articles={articles}
          onReadArticle={(art) => setSelectedArticle(art)}
          savedArticleIds={savedArticleIds}
          onToggleSave={toggleSaveArticle}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* High-Resolution Photo Gallery Section */}
        <PhotoGallerySection
          photos={photos}
          onOpenPhotoLightbox={(photo) => setSelectedPhoto(photo)}
          onLikePhoto={handleLikePhoto}
          onAddNewPhoto={handleAddNewPhoto}
        />

        {/* Interactive Stitch Library & Demonstration Studio */}
        <StitchLibrary />

        {/* Interactive Crochet Hook Conversion & Swatch Gauge Tool */}
        <HookConversionSection
          onOpenModal={() => setIsHookConverterOpen(true)}
        />

        {/* Core Workshop Techniques */}
        <TechniquesGrid />

        {/* SEO Knowledge Base & FAQ */}
        <SeoFaqSection />

        {/* Community & Newsletter */}
        <NewsletterClub />
      </main>

      {/* Editorial Footer */}
      <Footer 
        onOpenPolicyModal={(tab) => {
          setPolicyModalTab(tab);
          setIsPolicyModalOpen(true);
        }}
      />

      {/* Article Reader Modal with Row Counter & Checklist */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isSaved={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
        onToggleSave={toggleSaveArticle}
      />

      {/* High-Resolution Photo Lightbox */}
      <PhotoLightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onLikePhoto={handleLikePhoto}
        onGoToArticle={handleGoToArticleFromPhoto}
      />

      {/* Active Project Row Counter Modal */}
      <RowCounterModal
        isOpen={isRowCounterOpen}
        onClose={() => setIsRowCounterOpen(false)}
      />

      {/* Yarn Estimation Calculator Modal */}
      <YarnCalculatorModal
        isOpen={isYarnCalculatorOpen}
        onClose={() => setIsYarnCalculatorOpen(false)}
      />

      {/* Universal Crochet Hook Conversion Modal */}
      <HookConversionModal
        isOpen={isHookConverterOpen}
        onClose={() => setIsHookConverterOpen(false)}
      />

      {/* Google AdSense & Publisher Compliance Policies Modal */}
      <EditorialPoliciesModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        initialTab={policyModalTab}
      />

    </div>
  );
}
