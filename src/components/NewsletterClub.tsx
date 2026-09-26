import React, { useState } from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';

export const NewsletterClub: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <section id="community" className="py-14 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-xs uppercase tracking-widest text-amber-300 font-sans font-semibold block mb-2">
          Editorial Community
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
          Join the CrochetSimply Pattern & Reader Club
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-300 font-sans max-w-xl mx-auto leading-relaxed">
          Receive a complimentary monthly digital pattern with high-resolution studio photography, yarn substitution charts, and artisan workshop tips delivered to your inbox.
        </p>

        {isSubscribed ? (
          <div className="mt-8 p-4 bg-stone-800/80 border border-stone-700 rounded-xl max-w-md mx-auto flex items-center gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs text-stone-200">
              <strong className="block text-white">Welcome to the CrochetSimply Club!</strong>
              We have dispatched your complimentary PDF guide: <em>"10 Architectural Relief Stitches & Edge Finishes"</em> to your inbox.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-200 hover:bg-amber-100 text-stone-950 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
            >
              <span>Subscribe Free</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-stone-400 font-sans">
          Zero marketing spam. Unsubscribe with a single click at any time.
        </p>

      </div>
    </section>
  );
};
