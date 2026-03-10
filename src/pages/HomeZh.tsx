import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Users, TrendingUp, Layers, XCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function HomeZh() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const testimonials = [
    {
      name: 'Leah',
      score: '博士候选人',
      text: 'Bespoke IELTS在紧迫的时间表内为我提供了专业支持，帮助我获得了申请英国博士的理想成绩。',
      country: '2024年12月',
    },
    {
      name: 'Cynthia',
      score: '雅思7.5分',
      text: '专业的指导帮助我达到了7.5分！结构清晰、体系完整的教学方式对我的雅思备考之路影响深远。',
      country: '新加坡，2025年',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: '全面资源',
      description: '包含雅思四项技能的完整练习、AI批改反馈和专项指导，适合雅思备考全阶段使用。',
      href: '/practice',
    },
    {
      icon: Users,
      title: '专家指导',
      description: '来自高风险英语考试阅卷经验丰富的教师，深入了解雅思评分标准，助你精准提分。',
      href: '/practice',
    },
    {
      icon: TrendingUp,
      title: '个性化进度跟踪',
      description: '每一次练习都能看到清晰的雅思分数提升轨迹，数据驱动，掌握雅思冲刺节奏。',
      href: '/practice',
    },
    {
      icon: Layers,
      title: '验证有效的两阶段方法',
      description: '先去除坏习惯达到6.0，再用真实搭配和话题展开冲刺7.0+，是雅思从6.0到7.0的核心方法。',
      href: '/signup?trial=7day',
    },
  ];

  const steps = [
    {
      number: '01',
      title: '诊断薄弱项',
      description: '通过四项技能诊断测试，精准找出拖低你雅思分数的具体问题和语言习惯。',
    },
    {
      number: '02',
      title: '去除坏习惯',
      description: '第一阶段专项攻克语法、词汇和任务完成度中的固化错误——这些是大多数学生卡在6分的根本原因。',
    },
    {
      number: '03',
      title: '建立应试实力',
      description: '第二阶段用真实搭配、连贯结构和语言流利度替代坏习惯，积累雅思高分考官青睐的表达方式。',
    },
    {
      number: '04',
      title: '模考评分确认',
      description: '考前模拟测试配合专家批改，确认雅思分数切实提升，信心满满迎接正式考试。',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('请输入邮箱地址');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase.rpc('submit_lead', {
        p_email: email.trim(),
        p_consented: true,
      });

      if (dbError) {
        if (dbError.message.includes('duplicate')) {
          setError('该邮箱已订阅');
        } else {
          console.error('[HomeZh] subscribe error:', dbError);
          setError('订阅失败，请重试');
        }
      } else {
        setSubscribed(true);
        setEmail('');
      }
    } catch (err) {
      console.error('[HomeZh] subscribe exception:', err);
      setError('发生错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" lang="zh-Hans">
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-blue-100 backdrop-blur-sm">
              雅思备考中文版 – Personalized IELTS Prep in Chinese
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              雅思冲刺7分+ – Bespoke IELTS个性化备考
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 leading-relaxed">
              先去除坏习惯达到6.0，再用真实搭配和话题展开冲刺7.0+。
            </p>
            <p className="text-lg mb-10 text-blue-200">
              7天免费试用，无需信用卡。雅思高分从这里开始。
            </p>
            <div className="flex flex-col items-center gap-3">
              <a
                href="/signup?trial=7day"
                className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                立即开始7天免费试用 – 完整访问权限
              </a>
              <p className="text-sm text-blue-100 opacity-90">
                无需信用卡 &bull; 随时取消
              </p>
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
                <span className="font-semibold text-red-700 dark:text-red-400">普通备考方式</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>反复刷同一套练习题</li>
                <li>死记硬背考试中鲜少出现的词汇表</li>
                <li>收到无法解释扣分原因的笼统反馈</li>
                <li>分数长期停留在5.5到6.5之间</li>
              </ul>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            </div>
            <div className="flex-1 border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-teal-700 dark:text-teal-400">Bespoke IELTS方法</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>精准诊断拖低你分数的具体错误</li>
                <li>先清除固化坏习惯，再建立正确语言模式</li>
                <li>每次练习都获得考官级别的结构化反馈</li>
                <li>清晰可见的雅思从6分到7分+的提升路径</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">备考流程</h2>
            <p className="text-gray-500 dark:text-gray-400">四步清晰路径，直达目标雅思分数</p>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">核心优势</h2>
            <p className="text-gray-500 dark:text-gray-400">雅思AI批改反馈与专家指导，覆盖听说读写全四项</p>
          </div>
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
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">学员好评</h2>
            <p className="text-gray-600 dark:text-gray-400">听听成功达到雅思目标分数的学员怎么说</p>
          </div>

          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic leading-relaxed">
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
          <h2 className="text-3xl font-bold mb-4">准备好突破分数瓶颈了吗？</h2>
          <p className="text-blue-100 mb-8 text-lg">
            加入众多停止盲目刷题、开始用有效方法提升雅思成绩的学员。雅思冲刺从现在开始。
          </p>
          <a
            href="/signup?trial=7day"
            className="inline-block px-10 py-4 bg-white text-teal-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            立即开始7天免费试用 – 完整访问权限
          </a>
          <p className="mt-3 text-sm text-blue-200 opacity-90">无需信用卡 &bull; 随时取消</p>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="text-white font-bold text-xl mb-3">Bespoke IELTS</div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                结构化、考官主导的个性化雅思备考方法，助你从当前分数稳步提升至7.0分及以上。
              </p>
              <a
                href="/signup?trial=7day"
                className="inline-block px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                开始免费试用
              </a>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">快速导航</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">关于我们</a></li>
                <li><a href="/contact" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">联系我们</a></li>
                <li><a href="/privacy" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">隐私政策</a></li>
                <li><a href="/terms" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">服务条款</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">获取最新雅思备考技巧和资源</h4>
              {subscribed ? (
                <p className="text-teal-400 text-sm font-medium">订阅成功！我们会及时发送最新备考资源。</p>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="输入您的邮箱地址"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    {isLoading ? '订阅中...' : '订阅'}
                  </button>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                </form>
              )}
              <div className="mt-5">
                <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">联系我们</h4>
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
              &copy; 2025 Bespoke IELTS. 版权所有。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
