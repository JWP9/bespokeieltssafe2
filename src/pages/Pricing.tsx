import { useState, useEffect } from 'react';
import { Check, Zap, Shield, Clock, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PricingProps {
  onNavigate: (page: string) => void;
}

export default function Pricing({ onNavigate: _onNavigate }: PricingProps) {
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);

  useEffect(() => {
    supabase.rpc('get_early_bird_spots_remaining').then(({ data }) => {
      if (data !== null) setSpotsRemaining(data);
    });
  }, []);

  const earlyBirdFeatures = [
    'Unlimited mock tests across all 4 skills',
    'AI-powered feedback on every submission',
    'Progress tracking & band score analytics',
    'Full access to all practice materials',
    'Community forum access',
    'Price locked forever — never increases',
  ];

  const standardFeatures = [
    'Unlimited mock tests across all 4 skills',
    'AI-powered feedback on every submission',
    'Progress tracking & band score analytics',
    'Full access to all practice materials',
    'Community forum access',
  ];

  const spotsDisplay = spotsRemaining !== null ? spotsRemaining : 100;
  const spotsPercentage = 100 - spotsDisplay;
  const isNearlyFull = spotsDisplay <= 20;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 text-yellow-300" />
            Limited Early Bird Offer — First 100 Users Only
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Simple, Honest Pricing
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Start free for 7 days, then choose your plan. Early Bird members lock in $8/mo forever.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-teal-500 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center py-3 text-sm font-bold uppercase tracking-widest">
                Early Bird — Limited
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Early Bird</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">First 100 users only</p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
                    <Zap className="w-3 h-3" />
                    FOREVER
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-5xl font-black text-gray-900 dark:text-white">$8</span>
                  <span className="text-gray-500 dark:text-gray-400 text-lg">/month</span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {spotsDisplay} spot{spotsDisplay !== 1 ? 's' : ''} remaining
                    </span>
                    <span className={`font-bold ${isNearlyFull ? 'text-red-600' : 'text-teal-600'}`}>
                      {spotsPercentage}% claimed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${isNearlyFull ? 'bg-red-500' : 'bg-gradient-to-r from-teal-500 to-blue-500'}`}
                      style={{ width: `${Math.max(spotsPercentage, 2)}%` }}
                    />
                  </div>
                </div>

                <a
                  href="/signup?trial=7day"
                  className="block w-full text-center py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Start 7-Day Free Trial — Lock in $8/mo
                </a>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  No card required during trial
                </p>

                <ul className="space-y-3 mt-8">
                  {earlyBirdFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-center py-3 text-sm font-bold uppercase tracking-widest">
                Standard
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Standard</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">After Early Bird closes</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-5xl font-black text-gray-900 dark:text-white">$15</span>
                  <span className="text-gray-500 dark:text-gray-400 text-lg">/month</span>
                </div>

                <div className="mb-6 h-[52px]" />

                <a
                  href="/signup?trial=7day"
                  className="block w-full text-center py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700 dark:hover:bg-gray-600 hover:shadow-lg transition-all"
                >
                  Start 7-Day Free Trial
                </a>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  No card required during trial
                </p>

                <ul className="space-y-3 mt-8">
                  {standardFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 opacity-50">
                    <Shield className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm line-through">Price locked forever</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-teal-600" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">No card during trial</p>
                <p className="text-xs text-gray-500">7 days completely free</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-6 h-6 text-teal-600" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Cancel anytime</p>
                <p className="text-xs text-gray-500">No lock-in contracts</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Users className="w-6 h-6 text-teal-600" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Early Bird price is locked</p>
                <p className="text-xs text-gray-500">$8/mo never increases</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gradient-to-br from-teal-600 to-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Only {spotsDisplay} Early Bird spots left</h2>
          <p className="text-blue-100 mb-6">
            Lock in $8/mo forever — before this offer closes for good.
          </p>
          <a
            href="/signup?trial=7day"
            className="inline-block px-10 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start 7-Day Free Trial — Lock in $8/mo
          </a>
          <p className="mt-3 text-sm text-blue-200 opacity-90">No card required &bull; Cancel anytime</p>
        </div>
      </section>
    </div>
  );
}
