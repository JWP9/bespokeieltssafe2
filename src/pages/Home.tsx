import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Users, TrendingUp, Layers, XCircle, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);

  useEffect(() => {
    supabase.rpc('get_early_bird_spots_remaining').then(({ data }) => {
      if (data !== null) setSpotsRemaining(data);
    });
  }, []);

  const testimonials = [
    {
      name: 'Leah',
      score: 'PhD Candidate',
      text: 'Bespoke IELTS provided me with professional support on a tight schedule, which helped me achieve the ideal grade to apply for a PhD in the UK.',
      country: 'December 2024',
    },
    {
      name: 'Cynthia',
      score: 'Band 7.5',
      text: 'Excellent guidance that helped me achieve Band 7.5! The detailed and structured teaching made a big difference in my learning journey.',
      country: 'Singapore, 2025',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Resources',
      description: 'Access full practice tests, AI feedback, and guides for all four IELTS skills.',
      href: '/practice',
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Learn from teachers with extensive marking experience across high-stakes English tests.',
      href: '/practice',
    },
    {
      icon: TrendingUp,
      title: 'Personalized Progress Tracking',
      description: 'Monitor your band improvement across every practice test with detailed analytics.',
      href: '/practice',
    },
    {
      icon: Layers,
      title: 'Proven Two-Stage Method',
      description: 'Remove bad habits to reach Band 6.0, then build real collocations and development for 7.0+.',
      href: '/signup?trial=7day',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Diagnose Your Weaknesses',
      description: 'Take a diagnostic test across all four skills. We identify the exact patterns dragging your score down.',
    },
    {
      number: '02',
      title: 'Remove Bad Habits',
      description: 'Stage One targets fossilised errors in grammar, vocabulary, and task response that cap most students at Band 6.',
    },
    {
      number: '03',
      title: 'Build Exam-Ready Skills',
      description: 'Stage Two replaces those habits with collocations, coherent structure, and fluency that examiners reward.',
    },
    {
      number: '04',
      title: 'Track and Score',
      description: 'Mock tests with expert marking confirm your band improvement before exam day.',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
              Go from Band 5.5 to 7.0+ with a Method Built Around Your Weaknesses
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100">
              Most test-takers study harder without improving. Bespoke IELTS targets the exact habits and gaps holding your score back.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a href="/signup?trial=7day" className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                Start 7-Day Free Trial — Lock in $8/mo Early Bird
              </a>
              <p className="text-sm text-blue-100 opacity-90">
                No card required &bull; First 100 users get $8/mo forever
              </p>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium">
                <Zap className="w-4 h-4 text-yellow-300 shrink-0" />
                <span>Early Bird spots remaining: <strong>{spotsRemaining !== null ? spotsRemaining : '...'}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
            <div className="flex-1 border-2 border-red-100 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-red-700 dark:text-red-400">The usual approach</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Repeat the same practice tests over and over</li>
                <li>Memorise vocabulary lists that don't appear on the exam</li>
                <li>Receive generic feedback that doesn't explain why</li>
                <li>Score stays stuck between 5.5 and 6.5</li>
              </ul>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            </div>
            <div className="flex-1 border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-teal-700 dark:text-teal-400">The Bespoke IELTS method</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Diagnose the specific errors capping your band score</li>
                <li>Remove fossilised habits before building new ones</li>
                <li>Receive structured, examiner-level feedback every time</li>
                <li>Clear progression from Band 6 to 7.0+</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">How It Works</h2>
            <p className="text-gray-500 dark:text-gray-400">A clear four-step path to your target band score</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-4xl font-black text-teal-100 dark:text-teal-900 mb-3 leading-none">{step.number}</div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <a
                key={index}
                href={feature.href}
                className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(13,148,136,0.25)] cursor-pointer block"
              >
                <feature.icon className="w-11 h-11 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 leading-snug">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Success Stories</h2>
            <p className="text-gray-600 dark:text-gray-400">Hear from students who achieved their IELTS goals</p>
          </div>

          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-teal-600 dark:text-teal-400 font-semibold text-lg">
                {testimonials[currentTestimonial].score}
              </p>
              <p className="text-gray-500 dark:text-gray-400">{testimonials[currentTestimonial].country}</p>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-teal-600 w-8' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-teal-600 to-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to break through your score plateau?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join students who stopped guessing and started improving with a method that works.</p>
          <a href="/signup?trial=7day" className="inline-block px-10 py-4 bg-white text-teal-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
            Start 7-Day Free Trial — Lock in $8/mo Early Bird
          </a>
          <p className="mt-3 text-sm text-blue-200 opacity-90">No card required &bull; First 100 users get $8/mo forever</p>
        </div>
      </section>
    </div>
  );
}
