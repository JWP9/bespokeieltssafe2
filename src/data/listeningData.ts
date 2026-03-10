// 100% ORIGINAL LISTENING PRACTICE - EXAM-STYLE, NEVER COPIED
// All scripts hand-crafted for Bespoke IELTS

export interface ListeningSection {
  id: number;
  section: 1 | 2 | 3 | 4;
  title: string;
  context: string;
  questionType: 'gap-fill' | 'mcq' | 'matching' | 'notes';
  questions: ListeningQuestion[];
  transcript: string;
  audioUrl: string; // Placeholder for original audio
}

export interface ListeningQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  options?: string[]; // For MCQ
}

export const listeningSections: ListeningSection[] = [
  {
    id: 1,
    section: 1,
    title: 'Booking a Hotel Room',
    context: 'You will hear a conversation between a customer and a hotel receptionist about booking accommodation.',
    questionType: 'gap-fill',
    questions: [
      { id: 1, question: 'Name: Sarah ___', correctAnswer: 'Mitchell' },
      { id: 2, question: 'Check-in date: ___ July', correctAnswer: '15' },
      { id: 3, question: 'Number of nights: ___', correctAnswer: '3' },
      { id: 4, question: 'Room type: ___ suite', correctAnswer: 'deluxe' },
      { id: 5, question: 'Special request: Room with ___ view', correctAnswer: 'ocean' },
      { id: 6, question: 'Total cost: £___ per night', correctAnswer: '245' },
      { id: 7, question: 'Breakfast included: Yes/___', correctAnswer: 'No' },
      { id: 8, question: 'Payment method: Credit ___', correctAnswer: 'card' },
      { id: 9, question: 'Confirmation sent to: sarah.mitchell@___', correctAnswer: 'email.com' },
      { id: 10, question: 'Cancellation policy: ___ hours notice', correctAnswer: '48' }
    ],
    transcript: `Receptionist: Good morning, Oceanview Hotel. How may I assist you?

Customer: Hi, I'd like to book a room for mid-July please.

Receptionist: Certainly! May I have your name?

Customer: Yes, it's Sarah Mitchell. That's M-I-T-C-H-E-LL.

Receptionist: Thank you, Ms. Mitchell. When would you like to check in?

Customer: July 15th, and I'll need the room for three nights.

Receptionist: Perfect. We have several room types available. Are you interested in a standard room, superior, or deluxe suite?

Customer: What's the difference between the superior and deluxe?

Receptionist: The deluxe suite is larger with a separate living area and offers ocean views, while the superior room faces the garden. The deluxe is £245 per night, and the superior is £180.

Customer: I'll take the deluxe suite, please. The ocean view sounds lovely.

Receptionist: Excellent choice! Would you like breakfast included? That's an additional £25 per person per day.

Customer: No, thank you. We'll explore local cafes for breakfast.

Receptionist: No problem. How would you like to pay? We accept all major credit cards or bank transfer.

Customer: I'll use my credit card.

Receptionist: Wonderful. I'll need your card details to secure the booking. Once complete, I'll send a confirmation email. What's your email address?

Customer: It's sarah.mitchell@email.com.

Receptionist: Got it. Just so you're aware, our cancellation policy requires 48 hours notice for a full refund.

Customer: That's perfectly fine. Thank you for your help!`,
    audioUrl: 'ielts_hotel_call_mixdown_1.mp3'
  },
  {
    id: 2,
    section: 2,
    title: 'Museum Tour Guide',
    context: 'You will hear a tour guide describing exhibits at a natural history museum.',
    questionType: 'mcq',
    questions: [
      {
        id: 11,
        question: 'What is the main theme of the dinosaur exhibition?',
        options: ['Evolution of species', 'Climate change impacts', 'Discovery methods', 'Daily life of dinosaurs'],
        correctAnswer: 'Daily life of dinosaurs'
      },
      {
        id: 12,
        question: 'The Tyrannosaurus Rex fossil was discovered in which country?',
        options: ['United States', 'Canada', 'Argentina', 'Mongolia'],
        correctAnswer: 'Canada'
      },
      {
        id: 13,
        question: 'How old is the oldest fossil in the collection?',
        options: ['45 million years', '65 million years', '150 million years', '200 million years'],
        correctAnswer: '150 million years'
      },
      {
        id: 14,
        question: 'What makes the pterodactyl exhibit special?',
        options: ['Largest wingspan', 'Complete skeleton', 'Preserved skin', 'Multiple specimens'],
        correctAnswer: 'Preserved skin'
      },
      {
        id: 15,
        question: 'According to the guide, what caused dinosaur extinction?',
        options: ['Volcanic eruptions', 'Asteroid impact', 'Ice age', 'Disease'],
        correctAnswer: 'Asteroid impact'
      },
      {
        id: 16,
        question: 'The interactive display allows visitors to:',
        options: ['Touch real fossils', 'Dig for replicas', 'Watch 3D films', 'Create drawings'],
        correctAnswer: 'Dig for replicas'
      },
      {
        id: 17,
        question: 'When does the special night tour take place?',
        options: ['First Friday monthly', 'Every Saturday', 'Last Sunday monthly', 'Weekday evenings'],
        correctAnswer: 'Last Sunday monthly'
      },
      {
        id: 18,
        question: 'What should visitors bring to the workshop?',
        options: ['Notebook', 'Camera', 'Nothing', 'Lunch'],
        correctAnswer: 'Nothing'
      },
      {
        id: 19,
        question: 'The museum cafe specializes in:',
        options: ['Fast food', 'Organic meals', 'International cuisine', 'Dinosaur-themed items'],
        correctAnswer: 'Dinosaur-themed items'
      },
      {
        id: 20,
        question: 'How long does the complete tour last?',
        options: ['45 minutes', '90 minutes', '2 hours', '3 hours'],
        correctAnswer: '90 minutes'
      }
    ],
    transcript: `Good afternoon everyone, and welcome to the Natural History Museum. I'm James, and I'll be your guide today for our dinosaur exhibition tour, which focuses on the daily life of these magnificent creatures that roamed Earth millions of years ago.

Let's begin with our star attraction - this incredible Tyrannosaurus Rex skeleton. This specimen was discovered in Canada in 2019 and is one of the most complete T-Rex fossils ever found. Standing at 12 feet tall, it gives us remarkable insight into how these predators lived and hunted.

Moving along, you'll notice our collection spans various time periods. The oldest fossil here is approximately 150 million years old, dating back to the Jurassic period. Over here, we have something truly unique - a pterodactyl exhibit featuring preserved skin impressions, which is extraordinarily rare. Most fossils only preserve bones.

Many people ask what caused these incredible animals to disappear. Current scientific evidence strongly suggests an asteroid impact approximately 66 million years ago created catastrophic environmental changes that dinosaurs couldn't survive.

For our younger visitors, we have an interactive display where you can dig for replica fossils. It's a hands-on way to understand how paleontologists work. We also offer special night tours on the last Sunday of each month - quite magical with special lighting!

Later this afternoon, there's a fossil preparation workshop. No need to bring anything - we provide all materials. And before you leave, do visit our cafe, which serves dinosaur-themed treats that kids absolutely love.

The complete tour takes about 90 minutes, but feel free to explore at your own pace afterward. Any questions before we continue?`,
    audioUrl: 'IELTS_Tour_Guide.mp3'
  },
  {
    id: 3,
    section: 3,
    title: 'University Tutorial Discussion',
    context: 'You will hear a discussion between a student and tutor about a research project.',
    questionType: 'matching',
    questions: [
      {
        id: 21,
        question: 'What is the main focus of Emily\'s research?',
        options: ['A. Social media impact', 'B. Climate change effects', 'C. Urban planning', 'D. Educational technology'],
        correctAnswer: 'A. Social media impact'
      },
      {
        id: 22,
        question: 'Match the research method with its purpose:\nSurveys',
        options: ['Gather quantitative data', 'Explore personal experiences', 'Analyze existing studies', 'Test hypotheses'],
        correctAnswer: 'Gather quantitative data'
      },
      {
        id: 23,
        question: 'Match the research method with its purpose:\nInterviews',
        options: ['Gather quantitative data', 'Explore personal experiences', 'Analyze existing studies', 'Test hypotheses'],
        correctAnswer: 'Explore personal experiences'
      },
      {
        id: 24,
        question: 'Match the research method with its purpose:\nLiterature review',
        options: ['Gather quantitative data', 'Explore personal experiences', 'Analyze existing studies', 'Test hypotheses'],
        correctAnswer: 'Analyze existing studies'
      },
      {
        id: 25,
        question: 'The tutor suggests Emily should:',
        options: ['Narrow her scope', 'Expand her sample', 'Change her topic', 'Find a partner'],
        correctAnswer: 'Narrow her scope'
      },
      {
        id: 26,
        question: 'What is Emily\'s main challenge?',
        options: ['Time management', 'Finding participants', 'Data analysis', 'Writing skills'],
        correctAnswer: 'Finding participants'
      },
      {
        id: 27,
        question: 'The deadline for the first draft is:',
        options: ['Next week', 'End of month', 'Six weeks', 'Semester end'],
        correctAnswer: 'Six weeks'
      },
      {
        id: 28,
        question: 'Professor Martinez specializes in:',
        options: ['Research methods', 'Statistical analysis', 'Social psychology', 'Academic writing'],
        correctAnswer: 'Statistical analysis'
      },
      {
        id: 29,
        question: 'Emily plans to survey students from:',
        options: ['One university', 'Three universities', 'Online forums', 'High schools'],
        correctAnswer: 'Three universities'
      },
      {
        id: 30,
        question: 'The tutor recommends Emily read articles from:',
        options: ['2020-2024', '2015-2020', '2010-2015', 'Any period'],
        correctAnswer: '2020-2024'
      }
    ],
    transcript: `Tutor: Come in, Emily. Have a seat. So, let's discuss your research project proposal. I've read through your outline on social media's impact on university students' mental health.

Emily: Thank you for reviewing it, Dr. Roberts. I'm quite excited about this topic.

Tutor: It's certainly timely and relevant. I see you're planning to use multiple research methods - surveys, interviews, and literature review. Can you explain your rationale?

Emily: Well, surveys will help me gather quantitative data from a large sample, showing trends and patterns. Interviews will allow me to explore personal experiences more deeply, and the literature review will help me analyze what existing studies have found.

Tutor: Excellent reasoning. However, I'm concerned your scope might be too broad. You're proposing to study students from three different universities. Given your six-week timeframe for the first draft, you might want to narrow that.

Emily: I see your point. My main challenge has actually been finding enough participants willing to be interviewed.

Tutor: That's common. Here's what I suggest - focus on our university initially. You could expand later if time permits. Also, for your literature review, concentrate on recent articles from 2020 to 2024, as social media platforms have changed significantly.

Emily: That makes sense. Should I include statistical analysis? I'm not very confident with that yet.

Tutor: Professor Martinez in the psychology department runs workshops on statistical analysis. I'd highly recommend attending one before you start analyzing your survey data.

Emily: I'll sign up this week. When should I schedule our next meeting?

Tutor: Let's meet again in two weeks once you've refined your approach. Bring your revised proposal and any preliminary findings.`,
    audioUrl: 'section3-cafe-discussion.mp3'
  },
  {
    id: 4,
    section: 4,
    title: 'Climate Change Lecture',
    context: 'You will hear an academic lecture about climate change impacts on agriculture.',
    questionType: 'notes',
    questions: [
      { id: 31, question: 'Main topic: Impact of climate change on ___', correctAnswer: 'agriculture' },
      { id: 32, question: 'Global temperature increase: ___ degrees since 1900', correctAnswer: '1.2' },
      { id: 33, question: 'Most affected crop: ___', correctAnswer: 'wheat' },
      { id: 34, question: 'Yield reduction in wheat: ___ percent by 2050', correctAnswer: '25' },
      { id: 35, question: 'Drought frequency: ___ times more common', correctAnswer: 'three' },
      { id: 36, question: 'Solution 1: Drought-___ crop varieties', correctAnswer: 'resistant' },
      { id: 37, question: 'Solution 2: Precision ___ technology', correctAnswer: 'irrigation' },
      { id: 38, question: 'Solution 3: ___ farming methods', correctAnswer: 'vertical' },
      { id: 39, question: 'Case study country: ___', correctAnswer: 'Kenya' },
      { id: 40, question: 'Crop diversification increased yields by ___ percent', correctAnswer: '40' }
    ],
    transcript: `Good morning, everyone. Today's lecture focuses on the impact of climate change on agriculture, a topic of critical importance for global food security.

Let's begin with some context. Since 1900, global average temperatures have increased by approximately 1.2 degrees Celsius. While this might seem modest, the effects on agricultural systems have been profound and far-reaching.

Research indicates that wheat, one of the world's most important staple crops, has been particularly affected. Current projections suggest wheat yields could decline by up to 25 percent by 2050 if current trends continue. This is deeply concerning given that wheat feeds billions of people globally.

The primary challenge is changing precipitation patterns. Droughts have become three times more common in key agricultural regions over the past 30 years, while some areas experience flooding with unprecedented frequency. Both extremes damage crops and reduce productivity.

However, solutions exist. First, agricultural scientists are developing drought-resistant crop varieties through selective breeding and genetic research. These new cultivars can maintain productivity with significantly less water. Second, precision irrigation technology allows farmers to deliver water exactly where and when needed, reducing waste while maintaining yields. Third, vertical farming methods, which grow crops in controlled indoor environments, eliminate weather-related risks entirely, though they require substantial energy investments.

Let me share a successful case study from Kenya, where farmers adopted crop diversification strategies, growing multiple varieties rather than single crops. This approach increased overall yields by 40 percent while reducing vulnerability to climate variations. Similar programs are now being implemented across sub-Saharan Africa with promising results.

In conclusion, while climate change poses serious threats to agriculture, human innovation and adaptive strategies offer hope for maintaining food security. However, success requires immediate action and substantial investment in agricultural research and infrastructure.`,
    audioUrl: 'placeholder-section4.mp3'
  }
];
