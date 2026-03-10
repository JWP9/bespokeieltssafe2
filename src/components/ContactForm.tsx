import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import ConsentCheckboxes from './ConsentCheckboxes';

const SKILLS_OPTIONS = ['Reading', 'Writing', 'Speaking', 'Listening', 'All Skills'];

interface ContactFormProps {
  onClose?: () => void;
  isModal?: boolean;
  onNavigate?: (page: string) => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  challenges: string;
  details: string;
  consented: boolean;
  wantsEbook: boolean;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  skills: [],
  challenges: '',
  details: '',
  consented: false,
  wantsEbook: false,
};

export default function ContactForm({ onClose, isModal = false, onNavigate }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [skillsOpen, setSkillsOpen] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.challenges.trim()) newErrors.challenges = 'Please describe your IELTS challenges.';
    if (!form.consented) newErrors.consented = 'You must consent to submit this form.';
    return newErrors;
  };

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('loading');

    if (!isSupabaseConfigured) {
      console.error('[ContactForm] Supabase is not configured - check environment variables');
      setStatus('error');
      return;
    }

    const rpcData = {
      p_name: form.name.trim(),
      p_email: form.email.trim(),
      p_phone: form.phone.trim() || null,
      p_skills: form.skills.length > 0 ? form.skills : null,
      p_challenges: form.challenges.trim(),
      p_details: form.details.trim() || null,
      p_consented: true,
      p_wants_ebook: form.wantsEbook,
    };

    console.log('[ContactForm] Submitting lead via RPC:', rpcData);

    const { data, error } = await supabase.rpc('submit_lead', rpcData);

    console.log('[ContactForm] RPC result - data:', data, 'error:', error);

    if (error) {
      console.error('[ContactForm] submit_lead error:', error.message, 'code:', error.code, 'details:', error.details);
      setStatus('error');
    } else {
      console.log('[ContactForm] Lead submitted successfully with ID:', data, '- calling notify function');
      const { error: fnError, data: fnData } = await supabase.functions.invoke('notify-new-lead', {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          skills: form.skills.length > 0 ? form.skills : null,
          challenges: form.challenges.trim(),
          details: form.details.trim() || null,
          sendConfirmation: true,
        },
      });
      if (fnError) {
        console.error('[ContactForm] notify-new-lead error:', fnError, 'data:', fnData);
      } else {
        console.log('[ContactForm] Email notification sent successfully');
      }
      setStatus('success');
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-lg border text-gray-800 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
      errors[field]
        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
    }`;

  const wrapper = isModal
    ? 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'
    : 'min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4';

  const card = isModal
    ? 'bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto relative'
    : 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl mx-auto';

  return (
    <div className={wrapper} onClick={isModal && onClose ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}>
      <div className={card}>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        <div className="bg-gradient-to-br from-[#1E3A8A] to-teal-600 text-white px-8 py-10 rounded-t-2xl">
          <h2 className="text-3xl font-bold mb-3">Get Personalized IELTS Help</h2>
          <p className="text-blue-100 leading-relaxed">
            Tell us about your IELTS challenges and we'll create a tailored plan for you. Leave your email to stay updated with the latest tips (GDPR compliant, unsubscribe anytime).
          </p>
        </div>

        {status === 'success' ? (
          <div className="px-8 py-16 text-center">
            <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Message Received!</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              Thank you! We'll review your details and get back to you soon.
            </p>
            {onClose && (
              <button
                onClick={onClose}
                className="px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-8 py-8 space-y-6">
            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className={inputClass('name')}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className={inputClass('email')}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Phone Number <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="+1 234 567 8900"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                className={inputClass('phone')}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Selected Skills <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSkillsOpen(p => !p)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-left text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                >
                  {form.skills.length === 0
                    ? <span className="text-gray-400 dark:text-gray-500">Select skills...</span>
                    : <span>{form.skills.join(', ')}</span>}
                </button>
                {skillsOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSkillsOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 overflow-hidden">
                      {SKILLS_OPTIONS.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            form.skills.includes(skill)
                              ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                            form.skills.includes(skill) ? 'bg-teal-600 border-teal-600' : 'border-gray-400'
                          }`}>
                            {form.skills.includes(skill) && (
                              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {skill}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                IELTS Challenges <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe the aspects of IELTS you're struggling with (e.g., vocabulary in Writing Task 2, accents in Listening, etc.)"
                value={form.challenges}
                onChange={e => setForm(p => ({ ...p, challenges: e.target.value }))}
                className={`${inputClass('challenges')} resize-none`}
              />
              {errors.challenges && <p className="mt-1 text-xs text-red-500">{errors.challenges}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Additional Details <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Timeline (e.g., test in 2 months), budget, specific requirements, or other notes."
                value={form.details}
                onChange={e => setForm(p => ({ ...p, details: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors resize-none"
              />
            </div>

            <ConsentCheckboxes
              consented={form.consented}
              onConsentChange={(value) => setForm(p => ({ ...p, consented: value }))}
              wantsEbook={form.wantsEbook}
              onEbookChange={(value) => setForm(p => ({ ...p, wantsEbook: value }))}
              consentError={errors.consented}
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold text-lg rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              Send My Details
            </button>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              Your data is stored securely and never shared with third parties.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
