import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { 
  Bookmark, Check, Clock, Hash, Minus, Plus, 
  Printer, RotateCcw, Share2, X, Square, 
  CheckSquare, Image, ImageOff, Eye, ArrowLeft,
  CheckCircle2, ListChecks, Award, Sparkles
} from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenRowCounterStandalone?: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!article) return null;

  // Local interactive checklist for materials
  const [checkedMaterials, setCheckedMaterials] = useState<Record<number, boolean>>({});
  
  // Local active row counter for this specific article
  const [activeRound, setActiveRound] = useState<number>(1);
  const totalSteps = article.steps.length;

  // Persistent completed steps tracking for this pattern
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(() => {
    if (!article) return {};
    try {
      const saved = localStorage.getItem(`crochet_step_progress_${article.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Re-sync completed steps if user opens a different article
  useEffect(() => {
    if (!article) return;
    try {
      const saved = localStorage.getItem(`crochet_step_progress_${article.id}`);
      setCompletedSteps(saved ? JSON.parse(saved) : {});
    } catch {
      setCompletedSteps({});
    }
  }, [article?.id]);

  const toggleStepCompleted = (index: number) => {
    setCompletedSteps(prev => {
      const next = {
        ...prev,
        [index]: !prev[index]
      };
      try {
        if (article) {
          localStorage.setItem(`crochet_step_progress_${article.id}`, JSON.stringify(next));
        }
      } catch {}
      return next;
    });
  };

  const markAllStepsCompleted = () => {
    if (!article) return;
    const allDone: Record<number, boolean> = {};
    article.steps.forEach((_, idx) => {
      allDone[idx] = true;
    });
    setCompletedSteps(allDone);
    try {
      localStorage.setItem(`crochet_step_progress_${article.id}`, JSON.stringify(allDone));
    } catch {}
  };

  const resetAllSteps = () => {
    if (!article) return;
    setCompletedSteps({});
    try {
      localStorage.removeItem(`crochet_step_progress_${article.id}`);
    } catch {}
  };

  const completedStepsCount = article.steps.filter((_, idx) => !!completedSteps[idx]).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedStepsCount / totalSteps) * 100) : 0;
  const isAllCompleted = totalSteps > 0 && completedStepsCount === totalSteps;

  // Print-friendly layout state
  const [isPrintFriendly, setIsPrintFriendly] = useState<boolean>(false);
  const [includePhotoInPrint, setIncludePhotoInPrint] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const toggleMaterial = (index: number) => {
    setCheckedMaterials(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTogglePrintFriendly = () => {
    setIsPrintFriendly(prev => !prev);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="printable-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`printable-modal-card relative w-full flex flex-col overflow-hidden shadow-2xl transition-colors duration-200 ${
          isPrintFriendly 
            ? 'bg-white text-black max-w-4xl max-h-[96vh] rounded-xl border-2 border-stone-800' 
            : 'bg-[#FAF8F5] text-stone-900 max-w-4xl max-h-[94vh] rounded-2xl border border-stone-300'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* STICKY ACTION TOPBAR (Hidden in physical print) */}
        <div className={`print:hidden sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 border-b transition-colors ${
          isPrintFriendly 
            ? 'bg-white border-black text-black' 
            : 'bg-[#FAF8F5]/95 backdrop-blur-md border-stone-200 text-stone-500'
        }`}>
          <div className="flex items-center gap-2 text-xs font-sans truncate">
            {isPrintFriendly ? (
              <span className="font-mono uppercase font-bold text-black flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" />
                [PRINT FRIENDLY MODE]
              </span>
            ) : (
              <span className="font-semibold text-amber-900 uppercase tracking-wider">{article.category}</span>
            )}
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="truncate font-serif text-stone-800">{article.title}</span>

            {/* Persistent Topbar Progress Indicator */}
            {totalSteps > 0 && !isPrintFriendly && (
              <div className="hidden md:flex items-center gap-2 pl-3 ml-2 border-l border-stone-300 text-stone-600 shrink-0">
                <span className="text-[11px] font-mono">
                  Progress: <strong className="text-stone-900 font-bold">{completedStepsCount}/{totalSteps}</strong> ({progressPercent}%)
                </span>
                <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${isAllCompleted ? 'bg-emerald-500' : 'bg-amber-600'}`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Copied Link Toast */}
          {copiedLink && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 animate-in fade-in z-50">
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
              <span>Article link copied to clipboard!</span>
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0">
            {/* PRINT FRIENDLY BUTTON */}
            <button
              onClick={handleTogglePrintFriendly}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer shadow-xs ${
                isPrintFriendly
                  ? 'bg-black text-white border-black hover:bg-stone-800'
                  : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-900 font-sans'
              }`}
              title={isPrintFriendly ? 'Switch back to normal magazine view' : 'Switch to clean black-and-white print-friendly layout'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isPrintFriendly ? 'Normal Magazine View' : 'Print Friendly'}</span>
            </button>

            {/* If in print-friendly mode, provide immediate Print trigger button */}
            {isPrintFriendly && (
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-stone-900 hover:bg-black text-white rounded-lg transition-colors cursor-pointer shadow-sm"
                title="Open browser print dialog"
              >
                <span>Print Document</span>
              </button>
            )}

            {!isPrintFriendly && (
              <button
                onClick={() => onToggleSave(article.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-amber-100/90 border-amber-300 text-amber-900'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-900' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ml-1 ${
                isPrintFriendly 
                  ? 'bg-stone-100 hover:bg-stone-200 text-black' 
                  : 'bg-stone-200/80 hover:bg-stone-300 text-stone-800'
              }`}
              title="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINT FRIENDLY CONTROLS BANNER (Only shown on screen when Print Friendly is enabled; hidden in actual print) */}
        {isPrintFriendly && (
          <div className="print:hidden bg-stone-100 border-b border-stone-300 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                <strong>Print-Friendly Layout Active:</strong> High-contrast black & white text, ink-saving format, printable checkboxes for materials & steps, and zero ads or navigation.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIncludePhotoInPrint(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-stone-300 hover:bg-stone-50 text-[11px] text-stone-700 cursor-pointer"
                title="Toggle cover photo to save printer ink"
              >
                {includePhotoInPrint ? (
                  <>
                    <Image className="w-3.5 h-3.5 text-stone-700" />
                    <span>Photo Included (Click to Hide & Save Ink)</span>
                  </>
                ) : (
                  <>
                    <ImageOff className="w-3.5 h-3.5 text-stone-500" />
                    <span>Photo Omitted (Saving Ink)</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-black text-white font-medium hover:bg-stone-800 cursor-pointer"
              >
                <Printer className="w-3 h-3" />
                <span>Print Now</span>
              </button>
            </div>
          </div>
        )}

        {/* SCROLLABLE ARTICLE BODY */}
        <div className={`printable-modal-body overflow-y-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8 ${
          isPrintFriendly ? 'bg-white text-black font-sans' : ''
        }`}>
          
          {/* ========================================================================= */}
          {/* VIEW MODE 1: CLEAN PRINT-FRIENDLY BLACK & WHITE LAYOUT                   */}
          {/* ========================================================================= */}
          {isPrintFriendly ? (
            <div className="max-w-3xl mx-auto space-y-6 text-black">
              
              {/* Document Masthead */}
              <div className="border-b-2 border-black pb-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-black pb-1 mb-2 border-b border-stone-300">
                  <span>CrochetSimply Studio · Pattern & Craft Journal</span>
                  <span>Date: {currentDateStr}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-stone-600 mb-1">
                  <span className="uppercase font-bold text-black">Category: {article.category}</span>
                  <span>|</span>
                  <span className="uppercase font-bold text-black">Skill Level: {article.difficulty}</span>
                  <span>|</span>
                  <span>Est. Time: {article.readTime}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-black leading-tight mt-1">
                  {article.title}
                </h1>

                {article.subtitle && (
                  <p className="text-sm font-sans text-stone-700 mt-1 leading-relaxed">
                    {article.subtitle}
                  </p>
                )}

                <div className="mt-2 text-xs font-mono text-stone-600">
                  Designer & Author: <strong className="text-black">{article.author.name}</strong> ({article.author.role})
                </div>
              </div>

              {/* Optional Monochrome Photo if enabled by user */}
              {includePhotoInPrint && (
                <div className="print-avoid-break my-4 border border-black p-1 bg-white">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-72 object-cover filter grayscale contrast-125"
                  />
                  <div className="text-[10px] font-mono text-center text-stone-600 mt-1">
                    Visual Reference: {article.title}
                  </div>
                </div>
              )}

              {/* Pattern Overview / Introduction */}
              <div className="print-avoid-break text-sm font-sans leading-relaxed text-black border-l-2 border-black pl-3 py-1">
                <strong>Project Overview: </strong> {article.bodyIntro}
              </div>

              {/* Pull quote if present */}
              {article.pullQuote && (
                <blockquote className="print-avoid-break my-3 pl-4 border-l-2 border-black font-serif italic text-sm text-black">
                  "{article.pullQuote.quote}" — {article.pullQuote.attribution}
                </blockquote>
              )}

              {/* PRINTABLE MATERIALS CHECKLIST (With Physical Pen Checkboxes) */}
              <div className="print-avoid-break my-4 border border-black p-4">
                <div className="flex items-center justify-between border-b border-black pb-1.5 mb-3">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black">
                    Required Materials & Supplies
                  </h3>
                  <span className="text-[11px] font-mono text-stone-600">
                    [Check box as gathered]
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {article.materials.map((mat, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-0.5">
                      <span className="font-mono text-sm leading-none select-none text-black">
                        [  ]
                      </span>
                      <div>
                        <strong className="text-black">{mat.item}</strong>: <span className="text-stone-700">{mat.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRINTABLE STITCHES & ABBREVIATIONS TABLE */}
              <div className="print-avoid-break my-4 border border-black p-4">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1.5 mb-3">
                  Pattern Abbreviations & Terminology
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  {article.stitchesUsed.map((st, idx) => (
                    <div key={idx} className="border-b border-stone-200 pb-1.5">
                      <span className="font-mono font-bold text-black uppercase mr-1.5">{st.code}</span>
                      <span className="font-semibold text-stone-800">({st.name})</span>:
                      <p className="text-stone-700 mt-0.5 leading-snug">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* GAUGE & SWATCH NOTE */}
              {article.gaugeNotes && (
                <div className="print-avoid-break my-3 border border-black p-3 text-xs font-sans">
                  <strong className="font-mono uppercase font-bold text-black block mb-0.5">
                    Gauge & Swatch Specifications:
                  </strong>
                  <p className="text-stone-800">{article.gaugeNotes}</p>
                </div>
              )}

              {/* STEP-BY-STEP PATTERN INSTRUCTIONS WITH PHYSICAL CHECKBOXES */}
              <div className="my-6 space-y-4">
                <div className="border-b-2 border-black pb-1 flex items-baseline justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-mono text-base font-bold uppercase tracking-wider text-black">
                      Step-by-Step Round Instructions
                    </h3>
                    <span className="text-xs font-mono text-stone-600">
                      Follow consecutively; mark box upon completing each round/step
                    </span>
                  </div>
                  {totalSteps > 0 && (
                    <span className="font-mono text-xs font-bold text-black border border-black px-2 py-0.5">
                      Progress: {completedStepsCount}/{totalSteps} ({progressPercent}%)
                    </span>
                  )}
                </div>

                {article.steps.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <div key={idx} className="print-avoid-break border border-black p-3.5 space-y-1.5">
                      <div className="flex items-baseline justify-between border-b border-stone-300 pb-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleStepCompleted(idx)}
                            className="font-mono text-sm font-bold select-none text-black hover:text-amber-800 cursor-pointer print:cursor-default"
                            title="Click to check or uncheck step"
                          >
                            {isDone ? '[X]' : '[  ]'}
                          </button>
                          <h4 className={`font-sans font-bold text-sm text-black ${isDone ? 'line-through text-stone-600' : ''}`}>
                            {step.title}
                          </h4>
                          {isDone && (
                            <span className="text-[10px] font-mono uppercase font-bold text-black print:hidden">
                              (Completed)
                            </span>
                          )}
                        </div>
                        {step.stitchesCount && (
                          <span className="text-xs font-mono font-bold text-black border border-black px-1.5 py-0.2">
                            {step.stitchesCount}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-sans text-black leading-relaxed">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-1 text-xs font-mono text-stone-800 border-l border-black pl-2">
                          <strong>Technique Note:</strong> {step.tip}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FINISHING & CARE ADVICE */}
              {article.finishingTips && article.finishingTips.length > 0 && (
                <div className="print-avoid-break my-4 border border-black p-4">
                  <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-2">
                    Finishing, Blocking & Care Guidelines
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs font-sans text-stone-800">
                    {article.finishingTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* DOCUMENT PRINT FOOTER */}
              <div className="pt-6 border-t-2 border-black text-center text-xs font-mono text-stone-600">
                <p>CrochetSimply · Free Artisan Pattern & Workshop Journal · crochetsimply.online</p>
                <p className="mt-0.5 text-[10px]">Document generated for physical crafting & home print · Keep stitches even and tension relaxed.</p>
              </div>

              {/* SCREEN-ONLY BOTTOM RETURN BUTTON */}
              <div className="print:hidden pt-4 flex items-center justify-between">
                <button
                  onClick={handleTogglePrintFriendly}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-black text-xs font-bold text-black hover:bg-stone-100 rounded cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Full Magazine View</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-black text-white text-xs font-bold rounded hover:bg-stone-800 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document Now</span>
                </button>
              </div>

            </div>
          ) : (

            /* ========================================================================= */
            /* VIEW MODE 2: EDITORIAL MAGAZINE RICH VIEW (NORMAL)                       */
            /* ========================================================================= */
            <>
              {/* Article Header */}
              <div className="max-w-2xl mx-auto text-center">
                {/* Metadata */}
                <div className="flex items-center justify-center gap-2 text-xs text-stone-500 font-sans mb-3 flex-wrap">
                  <span className="font-semibold text-amber-900 uppercase tracking-widest">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Level: {article.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {article.readTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 leading-tight tracking-tight text-balance">
                  {article.title}
                </h1>

                <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans leading-relaxed text-balance">
                  {article.subtitle}
                </p>

                {/* Author Byline */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-xs font-serif font-bold text-stone-700">
                    {article.author.avatarInitials}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-stone-900">{article.author.name}</div>
                    <div className="text-[11px] text-stone-500 font-sans">{article.author.role}</div>
                  </div>
                </div>
              </div>

              {/* Featured Cover Photo */}
              <div className="max-w-3xl mx-auto rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 aspect-[16/9]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Reading Column */}
              <div className="max-w-2xl mx-auto font-sans text-stone-800 leading-relaxed space-y-6">
                
                {/* Opening with Drop Cap */}
                <p className="text-base sm:text-lg leading-relaxed text-stone-700 first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-950">
                  {article.dropCapInitial}{article.bodyIntro.slice(1)}
                </p>

                {/* Pull Quote */}
                {article.pullQuote && (
                  <figure className="my-8 py-4 pl-6 border-l-2 border-amber-800/60 bg-amber-50/40 rounded-r-xl">
                    <blockquote className="font-serif italic text-lg sm:text-xl text-stone-900 leading-snug">
                      "{article.pullQuote.quote}"
                    </blockquote>
                    <figcaption className="text-xs text-stone-500 uppercase tracking-wider font-sans mt-2">
                      — {article.pullQuote.attribution}
                    </figcaption>
                  </figure>
                )}

                {/* Interactive Materials Checklist */}
                <div className="my-8 p-5 sm:p-6 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                    <h3 className="font-serif text-xl font-medium text-stone-900">
                      Required Materials Checklist
                    </h3>
                    <span className="text-xs text-stone-400 font-sans">
                      Click to check off supplies you have
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {article.materials.map((mat, idx) => {
                      const isChecked = !!checkedMaterials[idx];
                      return (
                        <li
                          key={idx}
                          onClick={() => toggleMaterial(idx)}
                          className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                            isChecked ? 'bg-stone-50 text-stone-400' : 'hover:bg-amber-50/50 text-stone-800'
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div className="text-xs sm:text-sm">
                            <span className={`font-semibold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                              {mat.item}
                            </span>
                            <span className="text-stone-500 block text-xs mt-0.5">
                              {mat.detail}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Stitches Reference Box */}
                <div className="my-8 p-5 bg-stone-100/70 border border-stone-200 rounded-xl">
                  <h4 className="font-serif text-lg font-medium text-stone-900 mb-2">
                    Abbreviations & Stitches Used
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {article.stitchesUsed.map((st, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-stone-200/80">
                        <div className="flex items-baseline gap-1.5 mb-1">
                          <span className="font-mono font-bold text-amber-900">{st.code}</span>
                          <span className="font-semibold text-stone-800">({st.name})</span>
                        </div>
                        <p className="text-stone-500 leading-snug">{st.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gauge & Tension note */}
                {article.gaugeNotes && (
                  <div className="p-4 bg-stone-50 border-l-4 border-stone-400 rounded-r-lg text-xs text-stone-700">
                    <strong className="font-semibold text-stone-900 block mb-0.5">Gauge & Tension Swatch:</strong>
                    {article.gaugeNotes}
                  </div>
                )}

                {/* Interactive Row Counter Widget Embedded for the Pattern */}
                <div className="my-8 p-5 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-amber-800" />
                      <h4 className="font-serif text-base font-semibold text-stone-900">
                        Active Pattern Assistant: Row & Step Counter
                      </h4>
                    </div>
                    <span className="text-xs text-amber-900/80 font-sans">
                      Keeps track of where you are in this guide
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-200">
                    <div className="text-xs">
                      <span className="text-stone-500">Current Pattern Step:</span>
                      <div className="font-mono text-xl font-bold text-stone-900">
                        Step {activeRound} <span className="text-xs font-normal text-stone-400">/ {totalSteps}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveRound(r => Math.max(1, r - 1))}
                        disabled={activeRound <= 1}
                        className="p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-40 cursor-pointer"
                        title="Previous step"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveRound(r => Math.min(totalSteps, r + 1))}
                        disabled={activeRound >= totalSteps}
                        className="p-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white disabled:opacity-40 cursor-pointer"
                        title="Next step"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveRound(1)}
                        className="p-2 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                        title="Reset to step 1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* PROJECT PROGRESS VISUAL INDICATOR                          */}
                {/* ========================================================== */}
                {totalSteps > 0 && (
                  <div className="my-6 p-5 sm:p-6 bg-stone-900 text-white rounded-2xl shadow-md border border-stone-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isAllCompleted ? 'bg-emerald-500 text-stone-950 shadow-md' : 'bg-stone-800 text-amber-400'
                        }`}>
                          {isAllCompleted ? <Award className="w-5 h-5 stroke-[2.5]" /> : <ListChecks className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
                              Project Progress
                            </h3>
                            {isAllCompleted && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full uppercase tracking-wider">
                                <Sparkles className="w-3 h-3" />
                                100% Completed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-400 font-sans mt-0.5">
                            Mark off individual completed rows or steps as you stitch
                          </p>
                        </div>
                      </div>

                      {/* Percentage & Quick Actions */}
                      <div className="flex items-center gap-4 self-start sm:self-auto shrink-0">
                        <div className="text-right">
                          <div className="font-mono text-2xl font-bold text-white leading-none">
                            {progressPercent}%
                          </div>
                          <div className="text-[11px] font-sans text-stone-400 mt-1">
                            {completedStepsCount} of {totalSteps} steps
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 border-l border-stone-800 pl-3">
                          {completedStepsCount > 0 && (
                            <button
                              type="button"
                              onClick={resetAllSteps}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 text-xs transition-colors cursor-pointer"
                              title="Reset all marked steps"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {completedStepsCount < totalSteps && (
                            <button
                              type="button"
                              onClick={markAllStepsCompleted}
                              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-sans font-medium transition-colors cursor-pointer border border-stone-700/60"
                              title="Mark all steps as completed"
                            >
                              Mark all done
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden p-0.5">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isAllCompleted 
                              ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]' 
                              : 'bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-400'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Step-by-Step Interactive Quick Track Pips */}
                    <div className="mt-4 pt-3 border-t border-stone-800/80">
                      <div className="text-[11px] font-sans font-medium text-stone-400 mb-2 flex items-center justify-between">
                        <span>Quick Row Tracker:</span>
                        <span className="text-[10px] text-stone-500">Click to toggle round completion</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {article.steps.map((step, idx) => {
                          const isDone = !!completedSteps[idx];
                          const isCurrent = activeRound === idx + 1;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleStepCompleted(idx)}
                              className={`group relative flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900'
                                  : isCurrent
                                    ? 'bg-amber-900/60 text-amber-200 border border-amber-500/50 hover:bg-amber-800'
                                    : 'bg-stone-800 text-stone-400 border border-stone-700/60 hover:bg-stone-700 hover:text-stone-200'
                              }`}
                              title={`Step ${idx + 1}: ${step.title} (${isDone ? 'Completed' : 'Click to mark done'})`}
                            >
                              {isDone ? (
                                <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-500 group-hover:bg-amber-400" />
                              )}
                              <span>R{idx + 1}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Celebration Banner when 100% completed */}
                    {isAllCompleted && (
                      <div className="mt-4 p-3 bg-emerald-900/40 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-emerald-200 text-xs font-sans animate-in fade-in slide-in-from-top-2 duration-300">
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          <strong>Project complete! 🎉</strong> You've successfully marked off all {totalSteps} rounds of this pattern. Outstanding artisan work!
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Pattern Step-by-Step Instructions */}
                <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <h3 className="font-serif text-2xl font-medium text-stone-900">
                      Round-by-Round Pattern Instructions
                    </h3>
                    <span className="text-xs text-stone-500 font-sans">
                      Check box on each card to mark row completed
                    </span>
                  </div>

                  {article.steps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isCurrent = activeRound === stepNum;
                    const isDone = !!completedSteps[idx];
                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-emerald-50/30 border-emerald-300/80 shadow-2xs'
                            : isCurrent 
                              ? 'bg-amber-50/40 border-amber-300 shadow-xs' 
                              : 'bg-white border-stone-200/90'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-start gap-3">
                            {/* Interactive Step Checkbox */}
                            <button
                              type="button"
                              onClick={() => toggleStepCompleted(idx)}
                              className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                isDone
                                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                  : 'bg-white border-stone-300 text-transparent hover:border-amber-600 hover:text-stone-300'
                              }`}
                              title={isDone ? 'Mark as incomplete' : 'Mark row as completed'}
                            >
                              <Check className={`w-3.5 h-3.5 stroke-[3] transition-transform ${isDone ? 'scale-100' : 'scale-75'}`} />
                            </button>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className={`font-serif text-lg font-medium transition-colors ${
                                  isDone ? 'text-stone-900' : 'text-stone-900'
                                }`}>
                                  {step.title}
                                </h4>
                                {isDone && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    Completed
                                  </span>
                                )}
                              </div>
                              {step.stitchesCount && (
                                <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded mt-1 inline-block">
                                  {step.stitchesCount}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick button to set as current active step */}
                          <button
                            type="button"
                            onClick={() => setActiveRound(stepNum)}
                            className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer shrink-0 ${
                              isCurrent
                                ? 'bg-amber-800 text-white border-amber-800 font-semibold'
                                : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                            }`}
                            title="Set as active round for counter"
                          >
                            {isCurrent ? '● Active Round' : `Set Round ${stepNum}`}
                          </button>
                        </div>

                        <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                          isDone ? 'text-stone-700' : 'text-stone-700'
                        }`}>
                          {step.instruction}
                        </p>

                        {step.tip && (
                          <div className="mt-3 text-xs bg-stone-50 border-l-2 border-amber-600 p-2.5 rounded-r text-stone-600 font-sans">
                            <strong className="text-amber-900 font-semibold">Studio Tip:</strong> {step.tip}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Finishing & Blocking Advice */}
                {article.finishingTips && article.finishingTips.length > 0 && (
                  <div className="mt-8 p-5 bg-stone-100/80 rounded-xl border border-stone-200">
                    <h4 className="font-serif text-lg font-medium text-stone-900 mb-2">
                      Finishing, Blocking & Care Advice
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-600">
                      {article.finishingTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="pt-8 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleSave(article.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-amber-100/90 border-amber-300 text-amber-900'
                          : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-900' : ''}`} />
                      <span>{isSaved ? 'Saved in Your Library' : 'Save to Favorites'}</span>
                    </button>

                    <button
                      onClick={handleTogglePrintFriendly}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-800 text-xs font-medium rounded-lg hover:bg-stone-100 transition-colors cursor-pointer shadow-2xs"
                      title="Switch to black and white printable view"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Friendly</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-700 text-xs font-medium rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Back to Magazine
                  </button>
                </div>

              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
