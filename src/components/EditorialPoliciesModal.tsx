import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Mail, CheckCircle2, Lock } from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'editorial' | 'adsense';

interface EditorialPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const EditorialPoliciesModal: React.FC<EditorialPoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#FAF8F5] border border-stone-300 rounded-2xl max-w-3xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl flex flex-col gap-6 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900 font-semibold">
                CrochetSimply Publishing Standards & Legal Compliance
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
              Publisher Disclosures & Policies
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              crochetsimply.online · Compliant with Google AdSense Publisher Policies & GDPR/CCPA
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-xl transition-colors cursor-pointer"
            aria-label="Close policies modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl text-xs font-sans overflow-x-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy' 
                ? 'bg-white text-stone-900 font-semibold shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Privacy & Cookie Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'terms' 
                ? 'bg-white text-stone-900 font-semibold shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Terms & Craft Copyright
          </button>
          <button
            onClick={() => setActiveTab('editorial')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'editorial' 
                ? 'bg-white text-stone-900 font-semibold shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Editorial Desk & E-E-A-T
          </button>
          <button
            onClick={() => setActiveTab('adsense')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'adsense' 
                ? 'bg-white text-stone-900 font-semibold shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Advertising Disclosure
          </button>
        </div>

        {/* Tab 1: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            <h3 className="font-serif text-lg font-medium text-stone-900">
              1. Privacy Policy & Cookie Disclosures
            </h3>
            <p>
              Last Updated: <strong>September 26, 2026</strong>. At <em>CrochetSimply</em> (accessible at crochetsimply.online), the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of information collected and recorded by CrochetSimply and how we use it.
            </p>

            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mt-4">
              Google AdSense & DoubleClick DART Cookies
            </h4>
            <p>
              Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to crochetsimply.online and other sites on the internet. Users may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-amber-900 underline font-medium">https://policies.google.com/technologies/ads</a>.
            </p>

            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mt-4">
              Log Files & Web Analytics
            </h4>
            <p>
              CrochetSimply follows a standard procedure of using log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable. The purpose of this information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>

            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mt-4">
              GDPR & CCPA Rights
            </h4>
            <p>
              Under California Consumer Privacy Act (CCPA) and European General Data Protection Regulation (GDPR), users have the right to request access to their personal data, rectify inaccuracies, request data erasure, and opt out of the sale or sharing of personal information. CrochetSimply does not sell personal data.
            </p>
          </div>
        )}

        {/* Tab 2: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            <h3 className="font-serif text-lg font-medium text-stone-900">
              2. Terms of Craft & Pattern Licensing
            </h3>
            <p>
              All crochet patterns, stitch schematics, photography, and instructional text published on <em>CrochetSimply</em> are the intellectual property of <strong>CrochetSimply Studio</strong>, protected under international copyright law.
            </p>

            <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 space-y-2">
              <span className="font-medium text-amber-950 block">Artisan Maker Permitted Use:</span>
              <ul className="space-y-1.5 text-xs text-amber-900">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span><strong>Personal Use:</strong> You may print and use our patterns for unlimited personal projects and charitable gifts.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span><strong>Small-Scale Sales:</strong> You are 100% permitted to sell physical items handmade by you using CrochetSimply patterns. We kindly request pattern attribution to <em>CrochetSimply</em>.</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                  <span><strong>Restrictions:</strong> You may not redistribute, resell, rewrite, copy-paste, or claim our written instructions or photography as your own.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Editorial Standards */}
        {activeTab === 'editorial' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            <h3 className="font-serif text-lg font-medium text-stone-900">
              3. Editorial Standards & E-E-A-T Guarantee
            </h3>
            <p>
              Google AdSense and search quality raters evaluate content based on <strong>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T)</strong>. At CrochetSimply:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white border border-stone-200 rounded-xl p-3.5">
                <span className="font-semibold text-stone-900 block text-xs mb-1">
                  100% Physical Gauge Testing
                </span>
                <p className="text-xs text-stone-500">
                  Every pattern published in our journal is physically swatched, stress-tested, and verified with genuine yarn samples before release.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-3.5">
                <span className="font-semibold text-stone-900 block text-xs mb-1">
                  Zero Synthetic AI Shortcuts
                </span>
                <p className="text-xs text-stone-500">
                  All patterns, stitch step instructions, and yarn yardage multipliers are calculated according to Craft Yarn Council (CYC) standards.
                </p>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-3">
              <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-1">
                Editorial Contact & Pattern Inquiries
              </h4>
              <p className="text-xs text-stone-600">
                Found a typo, have a stitch question, or need pattern assistance? Contact our studio desk at <strong className="text-stone-900">editor@crochetsimply.online</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: AdSense Disclosure */}
        {activeTab === 'adsense' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            <h3 className="font-serif text-lg font-medium text-stone-900">
              4. Advertising & Affiliate Transparency Disclosure
            </h3>
            <p>
              In compliance with Federal Trade Commission (FTC) guidelines and Google Publisher policies:
            </p>
            <p>
              <em>CrochetSimply</em> is an independent, ad-supported publication. We may display advertisements provided by Google AdSense and authorized ad networks. These advertisements help us keep our entire library of 26+ patterns, calculators, and stitch demonstrators 100% free for crafters worldwide.
            </p>
            <p>
              Third-party ad networks automatically receive your IP address when ad impressions occur. We do not have access to or control over cookies used by third-party advertisers. All recommendations for yarn brands, hooks, and blocking accessories reflect our honest editorial testing.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200">
          <span className="text-[11px] text-stone-400 font-mono">
            CrochetSimply · Verified Craft Standards CYC 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
