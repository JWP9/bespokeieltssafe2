// 100% ORIGINAL READING PASSAGES - ZERO PLAGIARISM
// All content hand-crafted for Bespoke IELTS - Official format, original topics

export type QuestionType =
  | 'multiple-choice-single'
  | 'multiple-choice-multiple'
  | 'true-false-not-given'
  | 'yes-no-not-given'
  | 'matching-information'
  | 'matching-headings'
  | 'matching-features'
  | 'matching-sentence-endings'
  | 'sentence-completion'
  | 'summary-completion-wordbank'
  | 'summary-completion-passage'
  | 'diagram-label'
  | 'short-answer'
  | 'classification';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  paragraph?: string;
  explanation?: string;
}

export interface Passage {
  id: number;
  title: string;
  category: 'academic' | 'general';
  topic: string;
  paragraphs: { id: string; text: string }[];
  questions: Question[];
  timeLimit: number;
}

export const readingPassages: Passage[] = [
  {
    id: 1,
    title: 'Artificial Intelligence in Healthcare Diagnostics',
    category: 'academic',
    topic: 'Technology & Medicine',
    timeLimit: 20,
    paragraphs: [
      {
        id: 'A',
        text: 'The integration of artificial intelligence into medical diagnostics represents one of the most transformative developments in modern healthcare. Machine learning algorithms, trained on vast datasets of medical images and patient records, can now identify patterns and anomalies that might escape even experienced clinicians. These systems analyse X-rays, CT scans, and MRI images with remarkable precision, detecting early signs of diseases such as cancer, cardiovascular conditions, and neurological disorders. The technology does not replace human doctors but rather augments their capabilities, providing a powerful second opinion and reducing diagnostic errors.'
      },
      {
        id: 'B',
        text: 'Despite the promising potential, several challenges complicate the widespread adoption of AI diagnostic tools. Data privacy concerns remain paramount, as medical records contain highly sensitive personal information. Additionally, algorithms trained predominantly on data from certain demographic groups may exhibit biases, potentially leading to less accurate diagnoses for underrepresented populations. The "black box" nature of many AI systems also poses difficulties; clinicians and patients alike struggle to understand how algorithms arrive at specific conclusions, which can erode trust in automated recommendations.'
      },
      {
        id: 'C',
        text: 'Regulatory frameworks worldwide are racing to keep pace with technological advancement. The European Union has proposed comprehensive regulations requiring AI systems used in healthcare to meet stringent transparency and accountability standards. Meanwhile, the United States Food and Drug Administration has established pathways for approving AI-based diagnostic devices, though the process remains complex and time-consuming. These regulatory efforts aim to balance innovation with patient safety, ensuring that AI tools undergo rigorous testing before clinical deployment.'
      },
      {
        id: 'D',
        text: 'Looking forward, the convergence of AI with other emerging technologies promises even greater capabilities. Integration with wearable devices and continuous monitoring systems could enable real-time health tracking, alerting both patients and physicians to concerning changes before symptoms become severe. Researchers are also exploring AI applications in drug discovery, treatment planning, and predicting patient outcomes. However, realizing this potential will require substantial investment in infrastructure, training healthcare professionals to work effectively alongside AI systems, and addressing the ethical considerations that accompany such powerful technology.'
      }
    ],
    questions: [
      {
        id: 1,
        type: 'multiple-choice-single',
        question: 'What is the main purpose of AI in medical diagnostics according to paragraph A?',
        options: [
          'To replace human doctors entirely',
          'To reduce healthcare costs',
          'To enhance doctors\' abilities and reduce errors',
          'To process medical records faster'
        ],
        correctAnswer: 'To enhance doctors\' abilities and reduce errors',
        paragraph: 'A',
        explanation: 'The passage states AI "augments their capabilities" and provides "a powerful second opinion" while reducing diagnostic errors.'
      },
      {
        id: 2,
        type: 'true-false-not-given',
        question: 'AI diagnostic systems can detect all types of diseases with perfect accuracy.',
        correctAnswer: 'FALSE',
        paragraph: 'A',
        explanation: 'The passage says AI identifies patterns "with remarkable precision" but mentions only specific disease types, not all diseases with perfect accuracy.'
      },
      {
        id: 3,
        type: 'true-false-not-given',
        question: 'Medical AI algorithms may be less accurate for certain demographic groups.',
        correctAnswer: 'TRUE',
        paragraph: 'B',
        explanation: 'Paragraph B explicitly states algorithms trained on certain demographic data "may exhibit biases, potentially leading to less accurate diagnoses for underrepresented populations."'
      },
      {
        id: 4,
        type: 'matching-information',
        question: 'Which paragraph mentions regulations requiring transparency in AI systems?',
        options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'],
        correctAnswer: 'Paragraph C',
        paragraph: 'C',
        explanation: 'Paragraph C discusses EU regulations requiring "stringent transparency and accountability standards."'
      },
      {
        id: 5,
        type: 'sentence-completion',
        question: 'The "black box" nature of AI systems makes it difficult for clinicians and patients to understand how algorithms _______.',
        correctAnswer: 'arrive at specific conclusions',
        paragraph: 'B',
        explanation: 'This phrase directly completes the sentence from paragraph B.'
      },
      {
        id: 6,
        type: 'matching-sentence-endings',
        question: 'Integration with wearable devices could enable',
        options: [
          'drug discovery processes',
          'real-time health tracking',
          'faster regulatory approval',
          'reduced training requirements'
        ],
        correctAnswer: 'real-time health tracking',
        paragraph: 'D',
        explanation: 'Paragraph D states integration with wearables "could enable real-time health tracking."'
      },
      {
        id: 7,
        type: 'yes-no-not-given',
        question: 'Does the writer suggest that AI will completely transform healthcare within the next decade?',
        correctAnswer: 'NOT GIVEN',
        paragraph: 'D',
        explanation: 'The writer discusses future potential but does not specify a timeframe for complete transformation.'
      },
      {
        id: 8,
        type: 'short-answer',
        question: 'What two main concerns are mentioned regarding AI diagnostic tools in paragraph B? (Give TWO answers)',
        correctAnswer: 'data privacy, algorithmic bias',
        paragraph: 'B',
        explanation: 'Paragraph B identifies "data privacy concerns" and "biases" as major challenges.'
      },
      {
        id: 9,
        type: 'summary-completion-wordbank',
        question: 'AI systems analyze medical images with great _______ (1), but face challenges including _______ (2) concerns and potential diagnostic _______ (3) for certain groups.',
        options: ['precision', 'speed', 'privacy', 'cost', 'bias', 'errors', 'inaccuracies'],
        correctAnswer: ['precision', 'privacy', 'inaccuracies'],
        explanation: 'These words accurately summarize key points from paragraphs A and B.'
      },
      {
        id: 10,
        type: 'multiple-choice-multiple',
        question: 'Which THREE of the following are mentioned as future applications of AI in healthcare?',
        options: [
          'Drug discovery',
          'Treatment planning',
          'Predicting patient outcomes',
          'Robotic surgery',
          'Genetic engineering',
          'Hospital management'
        ],
        correctAnswer: ['Drug discovery', 'Treatment planning', 'Predicting patient outcomes'],
        paragraph: 'D',
        explanation: 'Paragraph D explicitly mentions these three applications as areas researchers are exploring.'
      }
    ]
  },
  {
    id: 2,
    title: 'Ocean Plastic: From Crisis to Circular Economy',
    category: 'academic',
    topic: 'Environment & Sustainability',
    timeLimit: 20,
    paragraphs: [
      {
        id: 'A',
        text: 'Marine plastic pollution has emerged as one of the defining environmental challenges of the twenty-first century. An estimated eight million tonnes of plastic waste enter the oceans annually, accumulating in vast garbage patches and infiltrating even the most remote marine ecosystems. Microplastics, particles smaller than five millimeters, have been detected in seafood consumed by humans, in Arctic ice cores, and at the deepest oceanic trenches. This pervasive contamination threatens marine biodiversity, disrupts food chains, and poses potential risks to human health through bioaccumulation in the food supply.'
      },
      {
        id: 'B',
        text: 'Traditional approaches to marine plastic pollution have focused primarily on cleanup efforts and improved waste management. Organizations have deployed collection vessels to remove floating debris from ocean surfaces, while coastal communities organize regular beach cleanups. However, these reactive measures address symptoms rather than root causes. The sheer volume of plastic entering marine environments far exceeds current removal capabilities, rendering cleanup efforts insufficient without fundamental changes to production and consumption patterns. Moreover, retrieving microplastics once dispersed throughout ocean waters remains technologically unfeasible.'
      },
      {
        id: 'C',
        text: 'Increasingly, attention has shifted toward circular economy models that fundamentally reimagine plastic lifecycles. Rather than following a linear "produce-use-dispose" trajectory, circular systems prioritize durability, reusability, and recyclability. This paradigm encompasses designing products for disassembly and material recovery, establishing comprehensive collection and sorting infrastructure, and developing advanced recycling technologies capable of processing contaminated or mixed plastic waste. Chemical recycling, which breaks plastics down to molecular components for reconstruction, shows particular promise for materials traditionally considered non-recyclable.'
      },
      {
        id: 'D',
        text: 'Policy interventions at multiple scales complement technological innovation. More than sixty countries have implemented bans or restrictions on single-use plastics, while extended producer responsibility schemes require manufacturers to fund collection and recycling programs. International agreements, including the recent United Nations treaty negotiations, aim to establish binding commitments for plastic reduction and improved waste management. Corporate pledges to use recycled content and eliminate unnecessary packaging demonstrate growing private sector engagement, though environmental advocates emphasize the need for accountability mechanisms to ensure these commitments translate into measurable action.'
      },
      {
        id: 'E',
        text: 'Behavioral change represents the final critical component of comprehensive solutions. Public awareness campaigns highlighting plastic pollution impacts have shifted consumer preferences toward sustainable alternatives. Refill stations, package-free stores, and deposit return schemes make plastic reduction more convenient and economically attractive. Educational initiatives in schools cultivate environmental consciousness among younger generations who will shape future consumption patterns. However, critics note that emphasizing individual responsibility can deflect attention from the systemic changes required across production, distribution, and disposal systems that ultimately determine whether circular economy visions become reality.'
      }
    ],
    questions: [
      {
        id: 11,
        type: 'matching-headings',
        question: 'Choose the correct heading for paragraph B.',
        options: [
          'The limitations of current cleanup strategies',
          'New technologies for plastic removal',
          'Government regulations on plastic use',
          'The economic impact of plastic pollution'
        ],
        correctAnswer: 'The limitations of current cleanup strategies',
        paragraph: 'B',
        explanation: 'Paragraph B discusses how traditional cleanup efforts address symptoms but are insufficient, making this the most appropriate heading.'
      },
      {
        id: 12,
        type: 'true-false-not-given',
        question: 'Microplastics have been found in human blood samples.',
        correctAnswer: 'NOT GIVEN',
        paragraph: 'A',
        explanation: 'The passage mentions microplastics in seafood consumed by humans but does not specifically mention human blood samples.'
      },
      {
        id: 13,
        type: 'classification',
        question: 'Classify the following as addressing (A) symptoms or (B) root causes: Beach cleanup programs',
        options: ['A - Symptoms', 'B - Root causes'],
        correctAnswer: 'A - Symptoms',
        paragraph: 'B',
        explanation: 'Paragraph B explicitly states cleanup efforts "address symptoms rather than root causes."'
      },
      {
        id: 14,
        type: 'matching-features',
        question: 'Match the approach to its description: Chemical recycling',
        options: [
          'Removes floating debris from ocean surfaces',
          'Breaks plastics down to molecular components',
          'Requires manufacturers to fund recycling programs',
          'Provides refill stations for consumers'
        ],
        correctAnswer: 'Breaks plastics down to molecular components',
        paragraph: 'C',
        explanation: 'Paragraph C defines chemical recycling as breaking "plastics down to molecular components for reconstruction."'
      },
      {
        id: 15,
        type: 'sentence-completion',
        question: 'Circular economy models prioritize three key principles: durability, _______, and recyclability.',
        correctAnswer: 'reusability',
        paragraph: 'C',
        explanation: 'Paragraph C lists these three principles explicitly.'
      },
      {
        id: 16,
        type: 'multiple-choice-single',
        question: 'According to paragraph D, what is the purpose of extended producer responsibility schemes?',
        options: [
          'To ban all single-use plastics',
          'To educate consumers about recycling',
          'To make manufacturers pay for collection and recycling',
          'To develop new recycling technologies'
        ],
        correctAnswer: 'To make manufacturers pay for collection and recycling',
        paragraph: 'D',
        explanation: 'Paragraph D states these schemes "require manufacturers to fund collection and recycling programs."'
      },
      {
        id: 17,
        type: 'yes-no-not-given',
        question: 'Does the writer believe individual behavioral change alone is sufficient to solve plastic pollution?',
        correctAnswer: 'NO',
        paragraph: 'E',
        explanation: 'The writer notes critics emphasize "systemic changes required" beyond individual responsibility, indicating behavioral change alone is insufficient.'
      },
      {
        id: 18,
        type: 'short-answer',
        question: 'How many tonnes of plastic waste enter oceans each year according to the passage?',
        correctAnswer: 'eight million',
        paragraph: 'A',
        explanation: 'Paragraph A states "eight million tonnes of plastic waste enter the oceans annually."'
      },
      {
        id: 19,
        type: 'summary-completion-passage',
        question: 'More than _______ countries have implemented restrictions on single-use plastics.',
        correctAnswer: 'sixty',
        paragraph: 'D',
        explanation: 'This number is directly stated in paragraph D.'
      },
      {
        id: 20,
        type: 'matching-information',
        question: 'Which paragraph discusses the role of education in changing future consumption patterns?',
        options: ['Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E'],
        correctAnswer: 'Paragraph E',
        paragraph: 'E',
        explanation: 'Paragraph E mentions "educational initiatives in schools" that shape future consumption patterns.'
      }
    ]
  },
  {
    id: 3,
    title: 'The Rise of Vertical Farming in Urban Centers',
    category: 'academic',
    topic: 'Agriculture & Urban Development',
    timeLimit: 20,
    paragraphs: [
      {
        id: 'A',
        text: 'Vertical farming, the practice of growing crops in vertically stacked layers within controlled indoor environments, has emerged as a promising solution to urban food security challenges. Unlike traditional agriculture, which requires vast horizontal expanses of arable land, vertical farms utilize warehouse spaces, abandoned buildings, and purpose-built structures in city centers. These facilities employ hydroponic, aeroponic, or aquaponic systems that deliver nutrients directly to plant roots without soil, while LED lighting replicates optimal sunlight conditions year-round. Proponents argue that this approach can produce significantly higher yields per square meter compared to conventional farming methods.'
      },
      {
        id: 'B',
        text: 'The environmental benefits of vertical farming appear substantial on multiple fronts. Water consumption drops dramatically—up to 95% less than traditional agriculture—because closed-loop systems recycle and reuse water continuously. Eliminating the need for pesticides and herbicides addresses concerns about chemical runoff contaminating waterways and harming ecosystems. Transportation emissions diminish considerably when food production occurs within the communities that consume it, reducing the distance fresh produce travels from farm to table. Moreover, vertical farms operate independently of weather patterns and seasonal limitations, ensuring consistent harvests regardless of external climate conditions.'
      },
      {
        id: 'C',
        text: 'However, significant obstacles complicate the widespread adoption of vertical farming technology. Energy consumption represents the most pressing challenge; LED lighting and climate control systems require substantial electricity, often generated from fossil fuels, potentially offsetting environmental advantages. Initial capital investment costs prove prohibitive for many potential operators, with sophisticated facilities demanding millions in startup funding. The range of crops suitable for vertical cultivation remains limited—leafy greens and herbs thrive in these conditions, but staple crops like wheat, rice, and corn remain economically unviable due to space and energy requirements relative to their market value.'
      },
      {
        id: 'D',
        text: 'Economic viability continues to evolve as technology advances and operational efficiency improves. Some vertical farming companies have achieved profitability by focusing on premium markets willing to pay higher prices for ultra-fresh, locally-grown produce. Partnerships with restaurants and grocery chains provide stable demand and distribution channels. As LED technology becomes more energy-efficient and renewable energy costs decline, the economic equation shifts favorably. Automation and artificial intelligence systems that optimize growing conditions and reduce labor costs further enhance competitiveness against traditional agriculture.'
      }
    ],
    questions: [
      {
        id: 21,
        type: 'diagram-label',
        question: 'Vertical farms use three main soilless systems. Complete the list: hydroponic, aeroponic, and _______.',
        correctAnswer: 'aquaponic',
        paragraph: 'A',
        explanation: 'Paragraph A lists all three systems used in vertical farming.'
      },
      {
        id: 22,
        type: 'multiple-choice-single',
        question: 'What percentage less water does vertical farming use compared to traditional methods?',
        options: ['Up to 75%', 'Up to 85%', 'Up to 95%', 'Up to 100%'],
        correctAnswer: 'Up to 95%',
        paragraph: 'B',
        explanation: 'Paragraph B states "Water consumption drops dramatically—up to 95% less than traditional agriculture."'
      },
      {
        id: 23,
        type: 'true-false-not-given',
        question: 'Vertical farms can grow all types of crops successfully.',
        correctAnswer: 'FALSE',
        paragraph: 'C',
        explanation: 'Paragraph C states the range of suitable crops "remains limited" and staple crops are "economically unviable."'
      },
      {
        id: 24,
        type: 'matching-sentence-endings',
        question: 'LED lighting and climate control systems',
        options: [
          'reduce transportation emissions significantly',
          'require substantial electricity consumption',
          'eliminate the need for pesticides',
          'provide stable distribution channels'
        ],
        correctAnswer: 'require substantial electricity consumption',
        paragraph: 'C',
        explanation: 'Paragraph C identifies energy consumption as a major challenge, noting these systems "require substantial electricity."'
      },
      {
        id: 25,
        type: 'classification',
        question: 'Classify as (A) Advantage or (B) Disadvantage: Chemical-free growing environment',
        options: ['A - Advantage', 'B - Disadvantage'],
        correctAnswer: 'A - Advantage',
        paragraph: 'B',
        explanation: 'Paragraph B lists eliminating pesticides and herbicides as an environmental benefit.'
      }
    ]
  },
  {
    id: 4,
    title: 'Ancient Silk Road Trade Networks',
    category: 'academic',
    topic: 'History & Economics',
    timeLimit: 20,
    paragraphs: [
      {
        id: 'A',
        text: 'The Silk Road, despite its singular name, comprised an extensive network of trade routes connecting East Asia with the Mediterranean world from approximately 130 BCE to 1453 CE. Merchants transported far more than silk along these paths; spices, precious metals, glassware, paper, gunpowder, and religious texts traversed thousands of kilometers across diverse terrains. Caravans faced formidable challenges including desert crossings, mountain passes, and threats from bandits, yet the lucrative nature of long-distance trade justified these risks. Cities positioned at strategic junctions—such as Samarkand, Bukhara, and Kashgar—flourished as commercial hubs where goods exchanged hands multiple times before reaching final destinations.'
      },
      {
        id: 'B',
        text: 'Cultural and intellectual exchange proved equally significant to the material commerce flowing along Silk Road routes. Buddhism spread from India to Central Asia, China, and eventually Japan, carried by monks and merchants who established monasteries at key stopping points. Islamic scholarship reached Chinese courts, while Chinese innovations like papermaking and printing technology traveled westward, revolutionizing information dissemination in the medieval world. Artistic styles merged and evolved; Persian miniature painting techniques influenced Mughal art, while Chinese porcelain designs incorporated Middle Eastern motifs. This cross-pollination of ideas and aesthetics shaped civilizations across three continents.'
      },
      {
        id: 'C',
        text: 'The decline of Silk Road trade stemmed from multiple interconnected factors rather than a single catastrophic event. The Mongol Empire\'s fragmentation in the late 14th century removed the political stability that had facilitated safe passage across vast territories. The bubonic plague, which spread along trade routes in the 1340s, devastated populations and disrupted commercial networks for generations. Simultaneously, maritime technology advances made sea routes increasingly viable alternatives; European nations developed oceangoing vessels capable of carrying larger cargo volumes at lower costs compared to overland caravans. The Ottoman Empire\'s 1453 conquest of Constantinople created additional barriers for European merchants seeking Asian goods, accelerating the search for maritime alternatives that ultimately led to the Age of Exploration.'
      }
    ],
    questions: [
      {
        id: 26,
        type: 'short-answer',
        question: 'Name TWO Chinese innovations that traveled westward along the Silk Road. (Write TWO words)',
        correctAnswer: 'papermaking, printing',
        paragraph: 'B',
        explanation: 'Paragraph B explicitly mentions "papermaking and printing technology traveled westward."'
      },
      {
        id: 27,
        type: 'matching-information',
        question: 'Which paragraph describes the end of the Silk Road?',
        options: ['Paragraph A', 'Paragraph B', 'Paragraph C'],
        correctAnswer: 'Paragraph C',
        paragraph: 'C',
        explanation: 'Paragraph C discusses "The decline of Silk Road trade" and its various causes.'
      },
      {
        id: 28,
        type: 'yes-no-not-given',
        question: 'Does the writer suggest that maritime routes were superior to land routes?',
        correctAnswer: 'YES',
        paragraph: 'C',
        explanation: 'The writer notes ships could carry "larger cargo volumes at lower costs," indicating superiority.'
      },
      {
        id: 29,
        type: 'matching-features',
        question: 'Match the city: Samarkand',
        options: [
          'A city devastated by plague',
          'A strategic commercial hub',
          'The starting point of silk production',
          'A maritime trading port'
        ],
        correctAnswer: 'A strategic commercial hub',
        paragraph: 'A',
        explanation: 'Paragraph A identifies Samarkand as one of the cities that "flourished as commercial hubs."'
      },
      {
        id: 30,
        type: 'sentence-completion',
        question: 'The Mongol Empire\'s fragmentation removed the _______ that had enabled safe passage.',
        correctAnswer: 'political stability',
        paragraph: 'C',
        explanation: 'This phrase directly completes the sentence from paragraph C.'
      }
    ]
  },
  {
    id: 5,
    title: 'Coral Reef Restoration Technologies',
    category: 'academic',
    topic: 'Marine Biology & Conservation',
    timeLimit: 20,
    paragraphs: [
      {
        id: 'A',
        text: 'Coral reefs, often called the rainforests of the sea, support approximately 25% of all marine species despite occupying less than 1% of the ocean floor. These vibrant ecosystems provide critical services including coastal protection, fisheries support, and tourism revenue estimated at billions of dollars annually. However, coral reefs face unprecedented threats from climate change, ocean acidification, pollution, and destructive fishing practices. Scientists estimate that 50% of coral reefs have died in the past thirty years, with projections suggesting most remaining reefs could disappear by 2050 without intervention. This alarming trajectory has sparked innovation in coral restoration techniques.'
      },
      {
        id: 'B',
        text: 'Traditional coral restoration involved coral gardening—cultivating coral fragments in underwater nurseries before transplanting them to degraded reef sites. This labor-intensive process yields modest results, with survival rates varying widely depending on species, location, and environmental conditions. Recent advances have introduced more sophisticated approaches. Microfragmentation, developed by Dr. David Vaughan, involves breaking corals into tiny pieces that grow 25 to 50 times faster than normal, reaching sexual maturity in years rather than decades. Researchers are also experimenting with coral probiotics—beneficial bacteria that enhance coral resilience to heat stress and disease.'
      },
      {
        id: 'C',
        text: 'Artificial reef structures provide frameworks for coral colonization while addressing specific restoration goals. Materials range from purpose-designed ceramic structures to repurposed objects like decommissioned ships and subway cars. These substrates offer immediate benefits by creating habitat complexity that attracts fish and other marine organisms, jumpstarting ecosystem recovery even before coral establishes. Some projects employ biorock technology, which uses low-voltage electrical currents to accelerate mineral deposition, creating conditions that promote rapid coral growth. Critics note that artificial structures cannot replicate the intricate architecture and biodiversity of natural reefs, serving at best as interim solutions while addressing root causes of reef degradation.'
      },
      {
        id: 'D',
        text: 'Genetic approaches represent the frontier of coral restoration science. Researchers identify coral individuals demonstrating exceptional heat tolerance, then propagate these resilient strains through selective breeding programs. Genetic engineering techniques could potentially enhance specific traits like temperature tolerance or disease resistance, though ethical considerations and ecological risks require careful evaluation. Some scientists advocate for assisted evolution—accelerating natural selection processes by cultivating and transplanting corals already adapted to warmer or more acidic conditions. These interventions raise philosophical questions about human manipulation of natural systems, even when motivated by conservation goals.'
      }
    ],
    questions: [
      {
        id: 31,
        type: 'multiple-choice-multiple',
        question: 'Which THREE materials are mentioned as being used for artificial reef structures?',
        options: [
          'Ceramic structures',
          'Decommissioned ships',
          'Subway cars',
          'Plastic bottles',
          'Concrete blocks',
          'Metal scaffolding'
        ],
        correctAnswer: ['Ceramic structures', 'Decommissioned ships', 'Subway cars'],
        paragraph: 'C',
        explanation: 'Paragraph C specifically lists these three materials used for artificial reefs.'
      },
      {
        id: 32,
        type: 'true-false-not-given',
        question: 'Coral reefs generate billions of dollars in tourism revenue each year.',
        correctAnswer: 'TRUE',
        paragraph: 'A',
        explanation: 'Paragraph A states reefs provide "tourism revenue estimated at billions of dollars annually."'
      },
      {
        id: 33,
        type: 'matching-headings',
        question: 'Choose the correct heading for paragraph B.',
        options: [
          'Traditional and modern restoration methods',
          'The economic value of coral reefs',
          'Genetic modification of coral species',
          'Artificial structures in reef restoration'
        ],
        correctAnswer: 'Traditional and modern restoration methods',
        paragraph: 'B',
        explanation: 'Paragraph B discusses both traditional coral gardening and recent advances like microfragmentation.'
      },
      {
        id: 34,
        type: 'summary-completion-wordbank',
        question: 'Complete the summary: Microfragmentation allows coral to grow _______ (1) times faster and reach _______ (2) in years instead of decades.',
        options: ['25 to 50', '10 to 20', 'sexual maturity', 'full size', 'maximum height', '50 to 100'],
        correctAnswer: ['25 to 50', 'sexual maturity'],
        paragraph: 'B',
        explanation: 'Paragraph B provides these exact details about microfragmentation.'
      },
      {
        id: 35,
        type: 'matching-features',
        question: 'Match the technique: Biorock technology',
        options: [
          'Uses electrical currents to promote coral growth',
          'Cultivates coral fragments in nurseries',
          'Selectively breeds heat-tolerant corals',
          'Applies beneficial bacteria to corals'
        ],
        correctAnswer: 'Uses electrical currents to promote coral growth',
        paragraph: 'C',
        explanation: 'Paragraph C describes biorock as using "low-voltage electrical currents" for mineral deposition.'
      }
    ]
  }
];

// Band score conversion table (Academic Reading)
export const bandScoreConversion: { [key: number]: number } = {
  40: 9.0, 39: 9.0,
  38: 8.5, 37: 8.5,
  36: 8.0, 35: 8.0,
  34: 7.5, 33: 7.5,
  32: 7.0, 31: 7.0, 30: 7.0,
  29: 6.5, 28: 6.5, 27: 6.5,
  26: 6.0, 25: 6.0, 24: 6.0, 23: 6.0,
  22: 5.5, 21: 5.5, 20: 5.5, 19: 5.5,
  18: 5.0, 17: 5.0, 16: 5.0, 15: 5.0,
  14: 4.5, 13: 4.5, 12: 4.5,
  11: 4.0, 10: 4.0, 9: 4.0,
  8: 3.5, 7: 3.5, 6: 3.5,
  5: 3.0, 4: 3.0,
  3: 2.5, 2: 2.5,
  1: 2.0, 0: 1.0
};

export function calculateBandScore(correctAnswers: number): number {
  return bandScoreConversion[correctAnswers] || 1.0;
}
