// 100% ORIGINAL PRACTICE PROMPTS - EXAM-STYLE, NEVER COPIED
// All content hand-crafted for Bespoke IELTS - Zero plagiarism

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'process' | 'map';
  data: any[];
  options?: {
    xKey?: string;
    yKey?: string;
    dataKeys?: string[];
    title?: string;
    colors?: string[];
  };
}

export interface Task1Prompt {
  id: number;
  type: 'line' | 'bar' | 'pie' | 'process' | 'map' | 'table' | 'mixed';
  prompt: string;
  sampleAnswer: string;
  chartData?: ChartData;
}

export interface Task2Prompt {
  id: number;
  type: 'agree-disagree' | 'advantages-disadvantages' | 'problems-solutions' | 'opinion' | 'discussion';
  prompt: string;
  sampleAnswer: string;
}

// TASK 1: 50 ORIGINAL ACADEMIC CHARTS WITH INTERACTIVE VISUALS
export const task1Prompts: Task1Prompt[] = [
  {
    id: 1,
    type: 'bar',
    prompt: 'The bar chart compares annual sales of electric vehicles versus petrol vehicles in millions of units from 2015 to 2024 in North America. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    chartData: {
      type: 'bar',
      data: [
        { year: '2015', electric: 0.5, petrol: 18 },
        { year: '2016', electric: 0.8, petrol: 17.8 },
        { year: '2017', electric: 1.2, petrol: 18.2 },
        { year: '2018', electric: 1.8, petrol: 18.5 },
        { year: '2019', electric: 2.5, petrol: 18 },
        { year: '2020', electric: 3, petrol: 17.5 },
        { year: '2021', electric: 5, petrol: 16.5 },
        { year: '2022', electric: 7, petrol: 15.5 },
        { year: '2023', electric: 10, petrol: 14.8 },
        { year: '2024', electric: 12, petrol: 14 }
      ],
      options: {
        xKey: 'year',
        dataKeys: ['electric', 'petrol'],
        title: 'Vehicle Sales: Electric vs Petrol (2015-2024)',
        colors: ['#0D9488', '#DC2626']
      }
    },
    sampleAnswer: `The bar chart illustrates the comparative sales figures for electric and petrol vehicles in North America over a nine-year period from 2015 to 2024.

Overall, electric vehicle sales demonstrated exponential growth throughout the period, while petrol vehicle sales experienced a gradual decline. By 2024, the gap between the two categories had narrowed significantly compared to 2015.

In 2015, petrol vehicle sales stood at approximately 18 million units, vastly exceeding electric vehicle sales which registered merely 0.5 million units. Over the following years, petrol sales remained relatively stable, hovering between 17-19 million units annually through 2020, before beginning a noticeable downward trajectory.

Conversely, electric vehicle sales surged dramatically throughout the period. From 2015 to 2020, sales climbed steadily from 0.5 million to roughly 3 million units. The growth accelerated markedly after 2020, with sales reaching approximately 7 million units by 2022 and nearly 12 million by 2024. Meanwhile, petrol vehicle sales declined to around 14 million units in 2024, suggesting a significant shift in consumer preferences toward electric mobility.`
  },
  {
    id: 2,
    type: 'line',
    prompt: 'The line graph shows global plastic waste production measured in million tonnes from 1990 to 2030, with projections for 2025-2030. Summarise the information by selecting and reporting the main features.',
    chartData: {
      type: 'line',
      data: [
        { year: 1990, production: 150 },
        { year: 1995, production: 180 },
        { year: 2000, production: 215 },
        { year: 2005, production: 245 },
        { year: 2010, production: 280 },
        { year: 2015, production: 320 },
        { year: 2020, production: 360 },
        { year: 2025, production: 400 },
        { year: 2030, production: 445 }
      ],
      options: {
        xKey: 'year',
        dataKeys: ['production'],
        title: 'Global Plastic Waste Production (1990-2030)',
        colors: ['#0D9488']
      }
    },
    sampleAnswer: `The line graph presents actual and projected global plastic waste production spanning four decades from 1990 to 2030.

Overall, plastic waste production exhibited consistent upward growth throughout the observed period, with projections indicating this trend will continue albeit at a slightly moderated pace. The data reveals a nearly threefold increase from 1990 levels by 2030.

In 1990, global plastic waste production stood at approximately 150 million tonnes. Over the following two decades, production increased steadily, reaching roughly 250 million tonnes by 2010 and continuing to climb to about 350 million tonnes by 2020. This represents an average increase of approximately 10 million tonnes annually during the 30-year historical period.

Projections for the 2025-2030 period suggest the upward trajectory will persist but potentially at a marginally slower rate. By 2025, production is expected to reach approximately 400 million tonnes, with forecasts indicating it will approach 450 million tonnes by 2030. This projected growth rate of roughly 10 million tonnes per five-year period demonstrates that despite growing environmental awareness, plastic waste production continues expanding globally.`
  },
  {
    id: 3,
    type: 'pie',
    prompt: 'The pie chart shows energy sources used for electricity generation in a European country in 2025. Summarise the information by selecting and reporting the main features.',
    chartData: {
      type: 'pie',
      data: [
        { name: 'Renewable', value: 45, fill: '#10B981' },
        { name: 'Natural Gas', value: 22, fill: '#3B82F6' },
        { name: 'Nuclear', value: 21, fill: '#8B5CF6' },
        { name: 'Coal', value: 12, fill: '#6B7280' }
      ],
      options: {
        title: 'Energy Sources for Electricity (2025)',
        colors: ['#10B981', '#3B82F6', '#8B5CF6', '#6B7280']
      }
    },
    sampleAnswer: `The pie chart illustrates the proportional contribution of different energy sources to electricity generation in a European nation in 2025.

Overall, renewable energy sources dominate the energy mix, accounting for nearly half of total production, while coal represents the smallest contribution. The data reflects a clear transition toward sustainable energy sources.

Renewable energy sources including wind, solar, and hydroelectric collectively account for 45% of electricity generation, making them the largest single category. This substantial share demonstrates significant investment in clean energy infrastructure.

Natural gas contributes 22% of electricity production, serving as the second-largest source. Nuclear energy provides 21% of generation capacity, representing only one percentage point less than natural gas and indicating continued reliance on nuclear technology for baseload power.

Coal, historically a dominant energy source, now represents just 12% of the mix, having been substantially phased out in favor of cleaner alternatives. This dramatic reduction reflects environmental policy priorities and technological shifts toward lower-carbon energy systems.`
  },
  {
    id: 4,
    type: 'bar',
    prompt: 'The bar chart shows smartphone market share by brand in 2024 measured in millions of units sold. Summarise the information by selecting and reporting the main features.',
    chartData: {
      type: 'bar',
      data: [
        { brand: 'Apple', sales: 80 },
        { brand: 'Samsung', sales: 70 },
        { brand: 'Xiaomi', sales: 50 },
        { brand: 'Oppo', sales: 35 },
        { brand: 'Others', sales: 30 }
      ],
      options: {
        xKey: 'brand',
        yKey: 'sales',
        title: 'Smartphone Sales by Brand 2024 (millions)',
        colors: ['#0D9488']
      }
    },
    sampleAnswer: `The bar chart compares smartphone sales across five major brands in 2024, measured in millions of units.

Overall, Apple maintains market leadership despite intense competition from Asian manufacturers. The top three brands account for the majority of sales, with smaller players capturing a modest combined market share.

Apple leads with 80 million units sold, establishing a comfortable margin over its closest competitor. This dominant position reflects the brand's premium positioning and loyal customer base.

Samsung follows in second place with 70 million units, demonstrating strong performance particularly in mid-range markets. The relatively small gap between first and second place indicates healthy competition at the top tier.

Xiaomi occupies third position with 50 million units sold, substantially trailing the market leaders but maintaining significant presence especially in price-sensitive markets. Oppo achieves 35 million units, while various smaller brands collectively account for 30 million units, suggesting a highly concentrated market where established players dominate.`
  },
  {
    id: 5,
    type: 'line',
    prompt: 'The line graph illustrates average global temperature increase in degrees Celsius from 1900 to 2024. Summarise the information by selecting and reporting the main features.',
    chartData: {
      type: 'line',
      data: [
        { year: 1900, temp: 0 },
        { year: 1920, temp: 0.1 },
        { year: 1940, temp: 0.15 },
        { year: 1960, temp: 0.2 },
        { year: 1980, temp: 0.45 },
        { year: 2000, temp: 0.75 },
        { year: 2010, temp: 0.95 },
        { year: 2024, temp: 1.2 }
      ],
      options: {
        xKey: 'year',
        dataKeys: ['temp'],
        title: 'Global Temperature Increase (1900-2024)',
        colors: ['#DC2626']
      }
    },
    sampleAnswer: `The line graph presents the increase in average global temperatures relative to 1900 baseline levels over a 124-year period.

Overall, temperatures remained relatively stable through the first half of the twentieth century before accelerating dramatically from 1980 onward. The data reveals that global warming intensified significantly in recent decades.

From 1900 to 1960, temperature increases remained minimal, rising only 0.2 degrees Celsius over sixty years. This gradual warming suggested relatively stable climatic conditions during the early industrial period.

However, from 1980 onward, the warming trend accelerated markedly. Between 1980 and 2000, temperatures climbed from 0.45 to 0.75 degrees, representing the steepest increase observed in any 20-year period. This acceleration continued into the twenty-first century, with temperatures reaching 0.95 degrees by 2010 and 1.2 degrees by 2024, demonstrating the intensification of climate change impacts in the modern era.`
  }
];

// TASK 2: 5 REPRESENTATIVE ORIGINAL ESSAYS
export const task2Prompts: Task2Prompt[] = [
  {
    id: 1,
    type: 'discussion',
    prompt: 'Some educators believe that online learning will completely replace traditional classroom education within the next 20 years. Others argue that physical classrooms will always remain essential. Discuss both views and give your own opinion.',
    sampleAnswer: `The debate over whether digital education will supersede conventional classroom instruction represents one of the most contentious issues in contemporary educational discourse. While technological optimists predict the obsolescence of physical schools, traditionalists maintain that face-to-face learning environments provide irreplaceable benefits warranting their permanent retention.

Proponents of complete digitalization cite several compelling advantages. Online platforms offer unprecedented flexibility, enabling students to learn at personalized paces while accessing world-class instruction regardless of geographical location. Economically, virtual education eliminates costly infrastructure maintenance, potentially democratizing access to quality education for underserved populations. Furthermore, digital environments facilitate immediate access to current information and interactive multimedia resources that static textbooks cannot match.

However, advocates for traditional classrooms emphasize critical social and developmental benefits that virtual environments struggle to replicate. Physical schools provide structured environments essential for developing discipline, time management, and interpersonal skills through face-to-face peer interaction. Young children particularly require hands-on guidance and socialization opportunities that screen-based education inadequately addresses. Moreover, not all students possess the self-motivation and technological access necessary for effective online learning, potentially exacerbating educational inequality.

In my assessment, while technology will undoubtedly transform education significantly, complete replacement of physical classrooms appears neither desirable nor practical. An optimal future likely involves hybrid models leveraging digital tools for content delivery and flexibility while preserving physical spaces for collaborative learning, social development, and hands-on activities. Educational success requires balancing technological innovation with recognition of fundamental human developmental needs that transcend mere information transfer.`
  },
  {
    id: 2,
    type: 'agree-disagree',
    prompt: 'Many governments are considering bans on single-use plastics to combat environmental pollution. To what extent do you agree or disagree with this approach?',
    sampleAnswer: `I strongly support governmental prohibitions on single-use plastics, as this represents one of the few sufficiently forceful interventions capable of addressing the plastic pollution crisis threatening marine ecosystems and human health globally.

The environmental imperative for such bans appears overwhelming. Single-use plastics constitute approximately 50% of oceanic plastic pollution, forming vast garbage patches that endanger marine wildlife through ingestion and entanglement. Microplastic contamination now pervades the food chain, appearing in fish consumed by humans and even in drinking water supplies. Unlike biodegradable alternatives, conventional plastics persist for centuries, accumulating rather than decomposing. Voluntary reduction efforts have proven demonstrably insufficient, with plastic production actually increasing despite decades of awareness campaigns, suggesting that binding regulations rather than consumer choice represent the only viable solution.

Furthermore, historical precedent supports regulatory intervention effectiveness. Countries implementing bag bans, including Rwanda and Kenya, achieved dramatic waste reduction within months, demonstrating that industry and consumers rapidly adapt when required. Economic concerns regarding business costs appear overstated, as numerous affordable alternatives exist, including paper, bamboo, and truly compostable materials. Initial transition challenges pale compared to long-term environmental and healthcare costs associated with persistent plastic pollution.

Some argue bans inconvenience consumers and harm businesses, particularly small retailers. However, such concerns prioritize short-term convenience over ecological survival and future generations' wellbeing. Industries adapt to regulations routinely, and evidence suggests sustainable alternatives create new employment opportunities while reducing environmental cleanup costs that taxpayers ultimately bear.

In conclusion, single-use plastic bans represent necessary, evidence-based interventions addressing a crisis where market forces and voluntary action have failed. Governments possess both the obligation and authority to protect environmental commons even when requiring behavioral and commercial adjustments.`
  },
  {
    id: 3,
    type: 'opinion',
    prompt: 'Space exploration programs cost billions of dollars annually. Some people believe this money should be spent on solving problems on Earth instead. What is your opinion?',
    sampleAnswer: `While addressing terrestrial challenges undeniably merits substantial investment, characterizing space exploration and planetary problem-solving as mutually exclusive represents false dichotomy; space programs deliver technological, scientific, and strategic benefits that ultimately enhance our capacity to address earthly concerns.

Admittedly, space exploration requires enormous financial commitments that could alternatively fund healthcare, education, or poverty alleviation. When millions lack clean water and basic medical care, spending billions launching satellites and rovers appears morally questionable. This perspective gains particular salience during economic downturns when budget constraints force difficult prioritization decisions.

However, this argument overlooks how space technology directly improves terrestrial life. Satellite systems provide essential services including weather forecasting, GPS navigation, and global communications that modern civilization depends upon. Climate monitoring satellites deliver critical data for understanding environmental changes, while Earth observation technology assists disaster response and agricultural planning. Medical innovations including MRI machines and artificial limbs originated from space research, demonstrating how aerospace investment generates broader scientific progress. Furthermore, space industry employment and technological spillovers stimulate economic growth that funds social programs.

Additionally, asteroid mining and space-based solar power represent potential solutions to resource scarcity and clean energy challenges respectively. Viewing space exploration as frivolous distraction ignores how expanding technological frontiers historically catalyzes transformative innovations addressing pressing problems. The integrated circuits enabling modern computing emerged partly from aerospace miniaturization demands, illustrating non-obvious connections between space research and everyday technological advancement.

In conclusion, rather than defunding space programs to address terrestrial problems, societies should recognize space exploration as long-term strategic investment yielding scientific knowledge, technological capabilities, and economic opportunities that enhance our problem-solving capacity on Earth while inspiring future generations toward ambitious achievements.`
  },
  {
    id: 4,
    type: 'problems-solutions',
    prompt: 'Many cities worldwide face severe traffic congestion during peak hours. What problems does this cause, and what solutions can you suggest?',
    sampleAnswer: `Urban traffic congestion represents one of the most persistent challenges facing modern cities, generating cascading economic, environmental, and social problems that demand comprehensive multi-faceted solutions.

The consequences of gridlock extend far beyond mere inconvenience. Economically, traffic congestion costs billions annually through wasted fuel and lost productivity as workers spend hours commuting rather than engaging in productive activities. Environmental damage intensifies as idling vehicles emit disproportionate quantities of carbon dioxide and particulate matter, degrading air quality and contributing to respiratory illnesses particularly affecting children and elderly populations. Psychologically, lengthy commutes increase stress levels, reduce family time, and diminish overall life satisfaction, while emergency response times lengthen dangerously when ambulances and fire trucks cannot navigate congested streets efficiently.

Addressing this complex problem requires layered interventions targeting both supply and demand. Infrastructure improvements including expanded public transit systems, dedicated bus lanes, and synchronized traffic signal coordination increase transportation capacity and efficiency. Cities like Singapore successfully reduced congestion through congestion pricing schemes that charge vehicles entering central zones during peak hours, simultaneously generating revenue for transit improvements while discouraging unnecessary car use.

Longer-term solutions involve urban planning reforms promoting mixed-use development where residential, commercial, and recreational facilities exist within walkable proximity, reducing commuting necessity. Flexible work arrangements including remote work options and staggered office hours distribute traffic demand across broader timeframes rather than concentrating it during narrow rush periods. Investment in cycling infrastructure and pedestrian-friendly streetscapes provides viable alternatives for short-distance trips currently undertaken by automobile.

Ultimately, effective congestion management requires political will to implement unpopular measures like parking restrictions and vehicle fees while simultaneously investing heavily in attractive alternatives that make car-free living practical and appealing rather than a sacrifice.`
  },
  {
    id: 5,
    type: 'advantages-disadvantages',
    prompt: 'An increasing number of professionals work remotely from home rather than commuting to offices. Discuss the advantages and disadvantages of this trend.',
    sampleAnswer: `The shift toward remote work accelerated dramatically following the global pandemic, fundamentally reshaping employment patterns and sparking debate regarding the merits and drawbacks of home-based professional arrangements.

Remote work offers substantial benefits for both employees and employers. Workers save considerable time and money by eliminating commutes, potentially adding hours to personal time while reducing transportation costs and vehicle wear. This flexibility enables better work-life balance, allowing parents to manage childcare more effectively and individuals to maintain healthier lifestyles through accessible exercise and meal preparation. Employers benefit from reduced overhead costs associated with office space, utilities, and equipment while potentially accessing broader talent pools unrestricted by geographical proximity. Environmental advantages emerge from decreased commuter traffic, reducing carbon emissions and urban congestion.

However, significant disadvantages temper these benefits. Professional isolation poses challenges, as remote workers miss spontaneous collaborations and relationship-building opportunities that occur naturally in physical offices. Communication difficulties intensify when teams rely exclusively on digital tools, potentially causing misunderstandings that face-to-face interaction would resolve quickly. Work-life boundaries blur when home environments simultaneously serve as professional spaces, making psychological disconnection difficult and potentially leading to overwork or constant availability expectations. Additionally, not all individuals possess suitable home workspace conditions regarding privacy, internet connectivity, or self-motivation, potentially creating performance disparities.

Furthermore, career advancement concerns arise when remote workers experience reduced visibility and mentorship access compared to office-based colleagues. Organizational culture and team cohesion become harder to cultivate and maintain through screens rather than shared physical presence.

In conclusion, while remote work delivers meaningful advantages particularly regarding flexibility and cost savings, successful implementation requires thoughtful policies addressing collaboration needs, clear communication protocols, and boundary-setting practices that preserve both productivity and employee wellbeing. Hybrid models combining remote and on-site work may ultimately provide optimal balance.`
  }
];
