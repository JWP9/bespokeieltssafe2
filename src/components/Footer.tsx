import { useEffect, useState } from 'react';
import { Instagram, Zap } from 'lucide-react';
import BespokeLogo from './BespokeLogo';
import { supabase } from '../lib/supabase';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);

  useEffect(() => {
    supabase.rpc('get_early_bird_spots_remaining').then(({ data }) => {
      if (data !== null) setSpotsRemaining(data);
    });
  }, []);

  const practiceLinks = [
    { label: 'Reading', page: 'reading' },
    { label: 'Writing', page: 'writing' },
    { label: 'Listening', page: 'listening' },
    { label: 'Speaking', page: 'speaking' },
  ];

  const companyLinks = [
    { label: 'About Us', page: 'about' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Blog', page: 'blog' },
    { label: 'Community', page: 'community' },
    { label: 'Resources', page: 'resources' },
    { label: 'Contact', page: 'contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' },
  ];

  const handleNav = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 mt-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <BespokeLogo variant="mono-dark" size="sm" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              A structured, examiner-led method to take you from your current band score to 7.0 and beyond.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://www.instagram.com/bespoke_ielts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Bespoke IELTS on Instagram"
                className="text-gray-400 hover:text-teal-400 transition-all duration-200 hover:scale-110 inline-flex"
              >
                <Instagram size={22} />
              </a>
            </div>
            <div className="flex items-center gap-2 bg-teal-900/60 border border-teal-700/50 rounded-lg px-3 py-2 mb-4">
              <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <p className="text-xs text-teal-300 font-medium">
                Early Bird spots remaining: <span className="text-white font-bold">{spotsRemaining !== null ? spotsRemaining : '...'}</span>
              </p>
            </div>
            <a
              href="/signup?trial=7day"
              className="inline-block px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Get Early Bird — $8/mo
            </a>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Practice</h4>
            <ul className="space-y-2">
              {practiceLinks.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">Contact</h4>
              <a
                href="mailto:consultation@bespokeielts.com"
                className="text-sm text-gray-400 hover:text-teal-400 transition-colors break-all"
              >
                consultation@bespokeielts.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 Bespoke IELTS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
