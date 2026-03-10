import { useState } from 'react';
import { Menu, X, User, ChevronDown, Phone, Globe } from 'lucide-react';
import BespokeLogo from './BespokeLogo';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import ContactForm from './ContactForm';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const isChinesePage = currentPage === 'home-zh';

  const handleLanguageSwitch = (lang: 'en' | 'zh') => {
    setShowLanguageMenu(false);
    if (lang === 'zh') {
      window.location.href = '/zh';
    } else {
      window.location.href = '/';
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Exam Guide', id: 'exam-guide' },
    { name: 'Resources', id: 'resources' },
    { name: 'Blog', id: 'blog' },
    { name: 'Community', id: 'community' },
    { name: 'Pricing', id: 'pricing' },
  ];

  const practiceItems = [
    { name: 'Reading', id: 'reading' },
    { name: 'Writing', id: 'writing' },
    { name: 'Listening', id: 'listening' },
    { name: 'Speaking', id: 'speaking' },
  ];

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-2">
            <div className="flex items-center shrink-0">
              <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
                <BespokeLogo variant="wordmark" size="sm" />
              </div>
            </div>

            <div className="hidden md:flex flex-1 items-center justify-end gap-1 lg:gap-2">
              <div className="flex items-center gap-2">
                {navItems.map((item) => {
                  const isHiddenOnMd = ['resources', 'blog', 'community'].includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`transition-colors text-xs lg:text-sm whitespace-nowrap px-0.5 lg:px-1 ${
                        isHiddenOnMd ? 'hidden lg:inline-block' : ''
                      } ${
                        currentPage === item.id
                          ? 'text-teal-600 font-semibold'
                          : 'text-gray-700 hover:text-teal-600'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
                <div className="relative">
                  <button
                    onClick={() => setShowPracticeDropdown(!showPracticeDropdown)}
                    className={`flex items-center space-x-1 transition-all rounded-full px-2 lg:px-3 py-1 font-bold text-xs lg:text-sm whitespace-nowrap ${
                      ['speaking', 'writing', 'listening', 'reading'].includes(currentPage)
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                    }`}
                  >
                    <span>Practice</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showPracticeDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowPracticeDropdown(false)}
                      />
                      <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[150px] z-50 border border-gray-200">
                        {practiceItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              onNavigate(item.id);
                              setShowPracticeDropdown(false);
                            }}
                            className={`block w-full text-left px-4 py-2 transition-colors ${
                              currentPage === item.id
                                ? 'bg-teal-50 text-teal-600 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className={`flex items-center gap-1 px-3 lg:px-3.5 py-1.5 rounded-md font-medium text-xs lg:text-sm transition-all whitespace-nowrap ${
                      isChinesePage
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                    title="Switch language - 切换语言"
                    aria-label="Language selector"
                    aria-expanded={showLanguageMenu}
                  >
                    <Globe className="w-5 h-5" />
                    <span className="hidden sm:inline">{isChinesePage ? '中文' : 'EN'}</span>
                  </button>
                  {showLanguageMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowLanguageMenu(false)}
                      />
                      <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[140px] z-50 border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => handleLanguageSwitch('en')}
                          className={`block w-full text-left px-4 py-2.5 transition-colors text-sm font-medium ${
                            !isChinesePage
                              ? 'bg-teal-50 text-teal-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          aria-current={!isChinesePage ? 'true' : 'false'}
                        >
                          English
                        </button>
                        <button
                          onClick={() => handleLanguageSwitch('zh')}
                          className={`block w-full text-left px-4 py-2.5 transition-colors text-sm font-medium ${
                            isChinesePage
                              ? 'bg-teal-50 text-teal-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          aria-current={isChinesePage ? 'true' : 'false'}
                        >
                          中文
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {user ? (
                <div className="flex items-center shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-lg transition-all whitespace-nowrap font-semibold text-xs md:text-sm"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      Fix My IELTS Now
                    </button>
                    {isAdmin && (
                      <div className="absolute inset-0 flex items-center justify-center gap-1 rounded-lg bg-black/40 pointer-events-none">
                        <button
                          onClick={() => onNavigate('admin-answers')}
                          className="text-[10px] text-white/80 hover:text-white px-1 py-0.5 rounded hover:bg-white/20 transition-all pointer-events-auto"
                          title="Admin Dashboard"
                        >
                          admin
                        </button>
                        <button
                          onClick={() => onNavigate('audio-upload')}
                          className="text-[10px] text-white/80 hover:text-white px-1 py-0.5 rounded hover:bg-white/20 transition-all pointer-events-auto"
                          title="Audio Upload"
                        >
                          upload
                        </button>
                        <button
                          onClick={() => onNavigate('admin-leads')}
                          className="text-[10px] text-white/80 hover:text-white px-1 py-0.5 rounded hover:bg-white/20 transition-all pointer-events-auto"
                          title="Admin Leads"
                        >
                          leads
                        </button>
                        <button
                          onClick={() => onNavigate('logo-showcase')}
                          className="text-[10px] text-white/80 hover:text-white px-1 py-0.5 rounded hover:bg-white/20 transition-all pointer-events-auto"
                          title="Logo Suite"
                        >
                          logos
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center shrink-0">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-lg transition-all whitespace-nowrap font-semibold text-xs md:text-sm"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    Fix My IELTS Now
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2 ml-auto">
              <button
                onClick={() => handleLanguageSwitch(isChinesePage ? 'en' : 'zh')}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isChinesePage
                    ? 'bg-teal-50 text-teal-700'
                    : 'bg-teal-50 text-teal-700'
                }`}
                title={isChinesePage ? 'Switch to English' : 'Switch to Chinese - 切换到中文'}
                aria-label={isChinesePage ? 'English' : 'Chinese'}
              >
                {isChinesePage ? 'EN' : '中文'}
              </button>
              <button
                className=""
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fade-in">
            <div className="px-4 py-3 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-teal-50 text-teal-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="space-y-1">
                <div className="px-4 py-2 text-gray-700 font-medium">Practice</div>
                {practiceItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-8 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-teal-50 text-teal-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="space-y-2 pt-3 border-t">
                <div className="px-4 py-2 text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Language
                </div>
                <button
                  onClick={() => {
                    handleLanguageSwitch('en');
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                    !isChinesePage
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    handleLanguageSwitch('zh');
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                    isChinesePage
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  中文
                </button>
              </div>
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowContactForm(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
                  >
                    <Phone className="w-4 h-4" />
                    Fix My IELTS Now
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowContactForm(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
                  >
                    <Phone className="w-4 h-4" />
                    Fix My IELTS Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showContactForm && <ContactForm isModal onClose={() => setShowContactForm(false)} onNavigate={onNavigate} />}

      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Private IELTS Consultation</h2>
              <p className="text-lg text-gray-600">
                Get personalized 1-on-1 guidance from an expert IELTS instructor
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700">Personalized study plan based on your current level</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700">Detailed feedback on your Speaking & Writing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700">Strategies to improve weak areas quickly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700">Mock test with professional scoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700">Direct access to instructor via email</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Investment</h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600">€60</div>
                    <div className="text-sm text-gray-600">per session (60 min)</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Limited availability. Sessions are conducted via Zoom.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Book Your Consultation</h3>
                <p className="text-gray-700 mb-4">
                  Email us to schedule your private consultation:
                </p>
                <a
                  href="mailto:consultation@bespokeielts.com?subject=Private IELTS Consultation Request"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-center"
                >
                  consultation@bespokeielts.com
                </a>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  We'll respond within 24 hours to schedule your session
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConsultationModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
