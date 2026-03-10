import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExamGuide from './pages/ExamGuide';
import Resources from './pages/Resources';
import Practice from './pages/Practice';
import Blog from './pages/Blog';
import Community from './pages/Community';
import Speaking from './pages/Speaking';
import Writing from './pages/Writing';
import Listening from './pages/Listening';
import Reading from './pages/Reading';
import About from './pages/About';
import AdminAnswers from './pages/AdminAnswers';
import AdminLeads from './pages/AdminLeads';
import AudioUpload from './pages/AudioUpload';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AuthModal from './components/AuthModal';
import LogoShowcase from './pages/LogoShowcase';
import IconExport from './pages/IconExport';
import HomeZh from './pages/HomeZh';
import TrialBanner from './components/TrialBanner';
import ResetPassword from './pages/ResetPassword';
import Pricing from './pages/Pricing';
import ProtectedPage from './components/ProtectedPage';
import { PageId, getPageAccessLevel } from './config/pageAccess';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [showSignup, setShowSignup] = useState(false);
  const [isTrial, setIsTrial] = useState(false);
  const [pendingPage, setPendingPage] = useState<PageId | null>(null);

  const resetEnglishMetaTags = () => {
    document.title = 'Bespoke IELTS — Expert Coaching for Band 7+';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Personalised IELTS preparation with expert coaching. Achieve the band score you need with Bespoke IELTS.');
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Bespoke IELTS — Expert Coaching for Band 7+');
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', 'Personalised IELTS preparation with expert coaching. Achieve the band score you need.');
    }
    document.documentElement.lang = 'en';
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;

    if (path === '/signup' || urlParams.get('trial') === '7day') {
      setShowSignup(true);
      setIsTrial(urlParams.get('trial') === '7day');
    }

    if (path === '/reset-password') {
      setCurrentPage('reset-password');
    } else if (!path || path === '/') {
      resetEnglishMetaTags();
    }

    if (path === '/zh') {
      setCurrentPage('home-zh');
      const zhTitle = '雅思冲刺7分+ | Bespoke IELTS个性化备考 – 雅思培训 & 高分技巧';
      const zhDesc = '雅思备考从5.0到7.0+，去除坏习惯再练真实表达。7天免费试用，AI批改反馈+专家指导。适合中国学生雅思7分冲刺、雅思写作Task 2高分技巧、雅思口语Part 2模板。';
      document.title = zhTitle;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', zhDesc);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', zhTitle);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', zhDesc);
      }

      document.documentElement.lang = 'zh-Hans';
    }

    if (path === '/official-resources') {
      setCurrentPage('official-resources');
    }

    if (path === '/pricing') {
      setCurrentPage('pricing');
    }
  }, []);

  const handleNavigate = (page: string) => {
    const pageId = page as PageId;
    const accessLevel = getPageAccessLevel(pageId);
    if (accessLevel === 'authenticated' && !user) {
      setPendingPage(pageId);
      setShowSignup(true);
      setIsTrial(true);
    } else {
      setCurrentPage(pageId);
    }
  };

  const handleAuthClose = () => {
    setShowSignup(false);
    if (pendingPage) {
      setCurrentPage(pendingPage);
      setPendingPage(null);
    }
    window.history.pushState({}, '', '/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'home-zh':
        return <HomeZh />;
      case 'exam-guide':
        return <ExamGuide />;
      case 'resources':
        return <Resources onNavigate={handleNavigate} />;
      case 'official-resources':
        return <Resources onNavigate={handleNavigate} />;
      case 'practice':
        return <ProtectedPage pageId="practice" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <Practice />
        </ProtectedPage>;
      case 'speaking':
        return <ProtectedPage pageId="speaking" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <Speaking />
        </ProtectedPage>;
      case 'writing':
        return <ProtectedPage pageId="writing" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <Writing />
        </ProtectedPage>;
      case 'listening':
        return <ProtectedPage pageId="listening" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <Listening />
        </ProtectedPage>;
      case 'reading':
        return <ProtectedPage pageId="reading" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <Reading />
        </ProtectedPage>;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'admin-answers':
        return <AdminAnswers />;
      case 'admin-leads':
        return <AdminLeads />;
      case 'audio-upload':
        return <ProtectedPage pageId="audio-upload" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <AudioUpload />
        </ProtectedPage>;
      case 'blog':
        return <ProtectedPage pageId="blog" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <Blog />
        </ProtectedPage>;
      case 'community':
        return <ProtectedPage pageId="community" onShowAuthModal={() => { setShowSignup(true); setIsTrial(true); }}>
          <Community />
        </ProtectedPage>;
      case 'privacy':
        return <Privacy />;
      case 'terms':
        return <Terms />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'logo-showcase':
        return <LogoShowcase onNavigate={handleNavigate} />;
      case 'icon-export':
        return <IconExport />;
      case 'reset-password':
        return <ResetPassword onNavigate={handleNavigate} />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigate} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-base-light dark:bg-primary-dark">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <TrialBanner onNavigate={handleNavigate} />
      <main className="pt-16">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      {showSignup && (
        <AuthModal
          onClose={handleAuthClose}
          isTrial={isTrial}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
