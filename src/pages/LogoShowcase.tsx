import { useState } from 'react';
import { Download, ExternalLink, Users, Eye, EyeOff, AlertCircle } from 'lucide-react';
import BespokeLogo from '../components/BespokeLogo';
import { useAuth } from '../contexts/AuthContext';

interface ShowcaseCardProps {
  title: string;
  bg: string;
  children: React.ReactNode;
}

function ShowcaseCard({ title, bg, children }: ShowcaseCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <div className={`${bg} flex items-center justify-center min-h-[140px] p-8`}>
        {children}
      </div>
      <div className="bg-white px-5 py-3 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</p>
      </div>
    </div>
  );
}

interface LogoShowcaseProps {
  onNavigate?: (page: string) => void;
}

const ADMIN_PASSWORD = 'g&6zcCk$yN2$vR';

export default function LogoShowcase({ onNavigate }: LogoShowcaseProps) {
  const { isAdmin } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <BespokeLogo variant="icon-only" size="lg" />
              <h1 className="text-2xl font-bold text-gray-900 mt-4">Logo Suite</h1>
              <p className="text-sm text-gray-500 mt-2">Admin access required</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Admin Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Unlock
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Bespoke IELTS — Logo Suite</h1>
          <p className="text-gray-500 mb-5">All approved logo variants, sizes, and usage contexts</p>
          {onNavigate && (
            <button
              onClick={() => onNavigate('icon-export')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download size={15} />
              Download Assets
            </button>
          )}
        </div>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
            Variants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ShowcaseCard title="Default — gradient single-colour wordmark" bg="bg-white">
              <BespokeLogo variant="default" size="lg" />
            </ShowcaseCard>

            <ShowcaseCard title="Wordmark — two-tone text" bg="bg-white">
              <BespokeLogo variant="wordmark" size="lg" />
            </ShowcaseCard>

            <ShowcaseCard title="Icon Only" bg="bg-white">
              <BespokeLogo variant="icon-only" size="xl" />
            </ShowcaseCard>

            <ShowcaseCard title="Stacked — with tagline" bg="bg-gray-50">
              <BespokeLogo variant="stacked" size="lg" />
            </ShowcaseCard>

            <ShowcaseCard title="Mono Light — on light backgrounds" bg="bg-slate-100">
              <BespokeLogo variant="mono-light" size="lg" />
            </ShowcaseCard>

            <ShowcaseCard title="Mono Dark — on dark backgrounds" bg="bg-slate-900">
              <BespokeLogo variant="mono-dark" size="lg" />
            </ShowcaseCard>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
            Sizes — Default Variant
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
            {(['xl', 'lg', 'md', 'sm'] as const).map((s) => (
              <div key={s} className="flex items-center gap-6 px-8 py-6">
                <span className="w-8 text-xs font-mono text-gray-400">{s}</span>
                <BespokeLogo variant="default" size={s} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
            Contextual Usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ShowcaseCard title="Navigation bar (light)" bg="bg-white border-b border-gray-200">
              <div className="w-full flex items-center justify-between px-2">
                <BespokeLogo variant="default" size="md" />
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>About</span>
                  <span>Practice</span>
                  <span>Blog</span>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Hero banner (dark gradient)" bg="bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700">
              <BespokeLogo variant="mono-dark" size="lg" />
            </ShowcaseCard>

            <ShowcaseCard title="Footer (dark)" bg="bg-slate-900">
              <BespokeLogo variant="stacked" size="md" className="[&_span]:text-white [&_.text-gray-800]:text-white [&_.text-gray-500]:text-slate-400" />
            </ShowcaseCard>

            <ShowcaseCard title="Favicon / App icon" bg="bg-gray-100">
              <div className="flex items-end gap-6">
                <BespokeLogo variant="icon-only" size="xl" />
                <BespokeLogo variant="icon-only" size="lg" />
                <BespokeLogo variant="icon-only" size="md" />
                <BespokeLogo variant="icon-only" size="sm" />
              </div>
            </ShowcaseCard>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Teal 600', hex: '#0d9488', bg: 'bg-teal-600' },
              { name: 'Blue 600', hex: '#2563eb', bg: 'bg-blue-600' },
              { name: 'Slate 900', hex: '#0f172a', bg: 'bg-slate-900' },
              { name: 'Slate 100', hex: '#f1f5f9', bg: 'bg-slate-100 border border-gray-200' },
            ].map((c) => (
              <div key={c.name} className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <div className={`${c.bg} h-16`} />
                <div className="bg-white px-4 py-3">
                  <p className="text-xs font-semibold text-gray-700">{c.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
            Live Pages
          </h2>
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-800">雅思备考中文版</p>
                <p className="text-xs text-gray-400 mt-0.5">Chinese-language landing page</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('home-zh')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
              >
                <ExternalLink size={14} />
                View Page
              </button>
            </div>
            {isAdmin && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Consultation Leads</p>
                  <p className="text-xs text-gray-400 mt-0.5">View and manage contact form submissions</p>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('admin-leads')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                >
                  <Users size={14} />
                  View Leads
                </button>
              </div>
            )}
          </div>
        </section>

        {onNavigate && (
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
              Download Assets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">App Icon</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">512 × 512 px</p>
                  </div>
                  <span className="text-xs font-medium bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">PNG + SVG</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Square badge icon for app stores, favicons, and platform avatars.</p>
                <button
                  onClick={() => onNavigate('icon-export')}
                  className="mt-auto inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors w-fit"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Social Share Banner</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">1200 × 630 px</p>
                  </div>
                  <span className="text-xs font-medium bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">PNG + SVG</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Open Graph image for social sharing, blog posts, and link previews.</p>
                <button
                  onClick={() => onNavigate('icon-export')}
                  className="mt-auto inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors w-fit"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
