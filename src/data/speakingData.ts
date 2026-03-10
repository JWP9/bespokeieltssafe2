export interface SpeakingQuestion {
  part: number;
  topic: string;
  questions?: string[];
  answers?: string[];
  cue?: string;
  sample?: string;
}

export const speakingData: SpeakingQuestion[] = [
  {
    "part": 1,
    "topic": "Hometown",
    "questions": [
      "Where is your hometown?",
      "What do you like most about it?",
      "What kind of place is it?",
      "Has your hometown changed in recent years?",
      "Would you recommend it to visitors?",
      "What's the weather like there?"
    ],
    "answers": [
      "My hometown, a small coastal city in the south, has always been a peaceful place where nature and community thrive together.",
      "What I love most is the morning seafood market, where fishermen sell their catch directly from boats, creating a lively tradition that unites everyone.",
      "Although it's a medium-sized city with a historic center full of stone buildings, the modern suburbs offer shopping malls and fast internet.",
      "In recent years, a new train station has opened, which has made travel much easier and attracted more tourists.",
      "I'd definitely recommend it to visitors, especially those who enjoy fresh food and quiet beaches, as long as they avoid peak summer crowds.",
      "Since the sea breeze keeps temperatures mild year-round, the weather is ideal for outdoor activities, even in winter."
    ]
  },
  {
    "part": 1,
    "topic": "Studies",
    "questions": [
      "What are you studying?",
      "Why did you choose this subject?",
      "Do you enjoy your classes?",
      "What's your favorite part of studying?",
      "Do you study with friends or alone?",
      "What do you want to do after you graduate?"
    ],
    "answers": [
      "I'm studying environmental science, a field that combines climate research and conservation, which deeply aligns with my values.",
      "After volunteering at a beach cleanup and seeing the impact of plastic waste, I chose this subject because I wanted to contribute to real solutions.",
      "I enjoy classes, particularly the field trips where we visit renewable energy sites, which make abstract concepts feel tangible.",
      "My favorite part is designing research projects, such as urban green spaces, which allow creativity while addressing real-world problems.",
      "While I usually study alone in the library for focus, I join group discussions for complex assignments, gaining diverse perspectives.",
      "After graduating, I hope to work for an environmental NGO, leading projects that help cities reduce waste and promote sustainability."
    ]
  },
  {
    "part": 1,
    "topic": "Work",
    "questions": [
      "Do you have a job?",
      "What do you do?",
      "How did you get this job?",
      "Do you enjoy your work?",
      "What's the best part of your job?",
      "Would you change anything about it?"
    ],
    "answers": [
      "Yes, I work part-time as a barista, a role that helps fund my studies while keeping me socially engaged.",
      "I make coffee, serve customers, and design the daily specials board, which lets me express creativity even in a fast-paced environment.",
      "A friend who worked there recommended me, and after a successful trial shift, I was hired immediately.",
      "I enjoy the work, especially interacting with regulars who become familiar faces, although busy mornings can be intense.",
      "The best part is the morning rush, when I serve dozens of customers efficiently, which keeps me alert and energized.",
      "I'd prefer more flexible hours during exam periods, but since the current schedule is fixed, I manage by planning ahead."
    ]
  },
  {
    "part": 1,
    "topic": "Hobbies",
    "questions": [
      "Do you have any hobbies?",
      "How often do you do them?",
      "When did you start this hobby?",
      "Do you do it alone or with others?",
      "Why do you enjoy it?",
      "Would you recommend it?"
    ],
    "answers": [
      "I'm passionate about photography, capturing moments in nature and urban life, which has become my primary creative outlet.",
      "I go out with my camera at least twice a week, especially on weekends when the light is ideal for shooting.",
      "I started three years ago after receiving a second-hand camera as a gift, which sparked my interest in visual storytelling.",
      "While I usually photograph alone to maintain focus, I attend a monthly club where members critique each other's work.",
      "I enjoy it because it trains me to notice subtle details—like light and shadow—that I'd otherwise overlook in daily life.",
      "I'd recommend it to anyone, since even a smartphone can produce stunning images, as long as you're observant and patient."
    ]
  },
  {
    "part": 1,
    "topic": "Family",
    "questions": [
      "How many people are in your family?",
      "Do you live with your family?",
      "What do you do together?",
      "Are you close to your relatives?",
      "Who are you most similar to?",
      "How often do you see extended family?"
    ],
    "answers": [
      "There are four of us—my parents, my sister, and me—a small unit that functions smoothly because everyone contributes.",
      "I live with them in a three-bedroom apartment, which saves money and keeps me connected to home-cooked meals.",
      "We share dinner every night and play board games on Sundays, a routine that strengthens our bond despite busy schedules.",
      "We're very close, sharing everything from daily updates to major decisions, which provides a strong support system.",
      "I'm most like my father, who taught me organization and budgeting, skills that help me manage university life.",
      "We see grandparents and cousins monthly for large family lunches, gatherings filled with food, laughter, and storytelling."
    ]
  },
  {
    "part": 1,
    "topic": "Friends",
    "questions": [
      "How many close friends do you have?",
      "How did you meet your best friend?",
      "What do you do together?",
      "Do you prefer small or large groups?",
      "How often do you meet?",
      "Has friendship changed for you over time?"
    ],
    "answers": [
      "I have three close friends from high school, relationships built on years of shared experiences that go beyond surface level.",
      "I met my best friend Maya in art class, where we bonded over our mutual dislike of the teacher but love for drawing.",
      "We meet for coffee, watch films, or bake together, activities that always lead to laughter and deep conversations.",
      "I prefer small groups of three or four, where meaningful dialogue is possible, unlike larger gatherings that feel chaotic.",
      "We meet weekly, usually on Fridays, a habit that keeps our friendship strong despite busy schedules.",
      "Friendship has evolved—while childhood was about play, adulthood focuses on emotional support and shared goals."
    ]
  },
  {
    "part": 1,
    "topic": "Daily Routine",
    "questions": [
      "What time do you usually wake up?",
      "What do you do first in the morning?",
      "How do you get to school or work?",
      "What's your evening routine?",
      "Do you have a fixed schedule?",
      "Would you change your routine?"
    ],
    "answers": [
      "I wake up at 6:30 a.m. on weekdays, a time that allows me to start the day calmly rather than rushing.",
      "First, I drink water and stretch for five minutes, a habit that energizes me more effectively than coffee ever could.",
      "I take the bus to university, a 20-minute ride that gives me time to read or review notes before class.",
      "My evening includes dinner at 7, studying until 9, and relaxing with a book, ensuring I'm in bed by 11.",
      "Yes, I follow a fixed schedule, which keeps me productive and prevents procrastination during busy weeks.",
      "I'd love to add a morning walk, but since time is limited, I prioritize sleep and efficiency instead."
    ]
  },
  {
    "part": 1,
    "topic": "Transport",
    "questions": [
      "How do you usually travel around your city?",
      "Do you prefer public or private transport?",
      "Have you ever been stuck in traffic?",
      "What's the public transport like where you live?",
      "Do you think cars will change in the future?",
      "Would you like to own a car?"
    ],
    "answers": [
      "I rely on the metro and buses, systems that are both affordable and efficient for daily commuting.",
      "I prefer public transport because it eliminates parking stress, allowing me to read or relax during the journey.",
      "Yes, I was once stuck for two hours during a festival, which taught me to avoid peak travel times.",
      "The metro is clean, frequent, and well-connected, while buses, though older, still run on schedule.",
      "Cars will likely become electric and autonomous, reducing emissions and improving traffic flow in urban areas.",
      "I'd eventually like to own a car for road trips, but for now, public transport meets all my city needs."
    ]
  },
  {
    "part": 1,
    "topic": "Weather",
    "questions": [
      "What's the weather like in your country?",
      "Do you have four seasons?",
      "What's your favorite season?",
      "How does weather affect your mood?",
      "Do you check the forecast daily?",
      "Has the climate changed where you live?"
    ],
    "answers": [
      "We experience a temperate climate with warm summers and cold winters, offering variety throughout the year.",
      "Yes, all four seasons are distinct, and autumn, with its colorful leaves, is especially beautiful.",
      "Spring is my favorite because flowers bloom and the air feels fresh, lifting my energy for outdoor activities.",
      "Sunny weather boosts my mood, while rain, though cozy, can make me feel sleepy if it lasts too long.",
      "I check the forecast every morning, a habit that helps me dress appropriately and plan my day.",
      "Summers have grown hotter and wetter, a change I attribute to climate shifts observed over the past decade."
    ]
  },
  {
    "part": 1,
    "topic": "Shopping",
    "questions": [
      "Do you enjoy shopping?",
      "Where do you usually shop?",
      "Do you prefer online or in-store?",
      "What was your last purchase?",
      "Do you follow sales or discounts?",
      "Has shopping changed for you over time?"
    ],
    "answers": [
      "I enjoy shopping occasionally, especially when I find good deals, though I avoid impulse buying.",
      "I visit the local mall or small boutiques, which offer unique items not found in large chains.",
      "I prefer online shopping for convenience and easy returns, but I go in-store when trying on clothes.",
      "My last purchase was a waterproof backpack, essential for carrying books during rainy commutes.",
      "I always wait for sales, having once saved 50% on shoes, a strategy that feels both smart and satisfying.",
      "As a teenager, I loved mall trips, but now I shop with purpose and a budget, prioritizing quality over quantity."
    ]
  },
  {
    "part": 1,
    "topic": "Home",
    "questions": [
      "Do you live in a house or apartment?",
      "What's your favorite room?",
      "How is your home decorated?",
      "Would you change anything about it?",
      "Do you prefer city or countryside living?",
      "What makes a good home?"
    ],
    "answers": [
      "I live in a two-bedroom apartment on the third floor, a modern space with large windows that flood the rooms with natural light.",
      "My favorite room is the living room, where I read and relax every evening, enjoying the bright atmosphere and comfortable furniture.",
      "It's decorated in neutral tones with wooden furniture and plants, a minimalist approach that creates a peaceful environment.",
      "I'd love to add a small balcony for morning coffee outdoors, though the current layout doesn't allow for that feature.",
      "I prefer city living for its convenience, since shops and transport are nearby, although I appreciate the tranquility of the countryside.",
      "A good home needs comfort, natural light, and personal touches like family photos, which make a space feel truly lived-in."
    ]
  },
  {
    "part": 1,
    "topic": "Food",
    "questions": [
      "What's your favorite type of food?",
      "Do you cook often?",
      "Have you tried food from other countries?",
      "What food is popular where you live?",
      "Do you have a healthy diet?",
      "Would you like to learn more cooking skills?"
    ],
    "answers": [
      "I love Mediterranean food, which features fresh vegetables, olive oil, and grilled fish, ingredients that are both healthy and flavorful.",
      "Yes, I cook dinner most nights because it's cheaper and healthier than eating out, and I enjoy experimenting with new recipes.",
      "I've tried cuisines from Thailand, Mexico, and India, each offering unique spices and flavors that expand my palate.",
      "Street food like dumplings and noodles is extremely popular here, with vendors on every corner selling delicious, affordable meals.",
      "I try to maintain a healthy diet by eating lots of vegetables and limiting sugar, though I treat myself to dessert on weekends.",
      "I'd love to learn pastry-making, since baking bread and cakes seems rewarding, and I'd enjoy mastering those techniques."
    ]
  },
  {
    "part": 1,
    "topic": "Colors",
    "questions": [
      "What's your favorite color?",
      "Do colors affect your mood?",
      "What color is your bedroom?",
      "Are certain colors popular in your country?",
      "Do you wear bright or dark colors?",
      "Would you paint your walls a bold color?"
    ],
    "answers": [
      "My favorite color is deep blue, which I find calming and sophisticated, so I incorporate it into my wardrobe and home decor.",
      "Yes, warm colors like yellow energize me, while cool tones help me relax, making color choice significant for my focus.",
      "My bedroom is light gray with white furniture, a combination that feels clean and peaceful, helping me sleep better.",
      "Earth tones like beige, brown, and green are popular here, reflecting our cultural appreciation for nature and wooden accents.",
      "I wear mostly dark colors such as black, navy, and gray because they're versatile and professional, though I'll choose brighter shades for special occasions.",
      "No, I prefer neutral walls since bold colors would tire me quickly, and I'd rather add pops of color through cushions and artwork."
    ]
  },
  {
    "part": 1,
    "topic": "Sports",
    "questions": [
      "Do you play any sports?",
      "What sports are popular in your country?",
      "Did you play sports as a child?",
      "Do you watch sports on TV?",
      "Is exercise important to you?",
      "Would you like to try a new sport?"
    ],
    "answers": [
      "I play badminton twice a week at a local club, a fast-paced sport that keeps me fit and has helped me make great friends.",
      "Football is incredibly popular here, with nearly everyone watching and playing it, though basketball is growing in popularity too.",
      "Yes, I played basketball in school, and while I wasn't particularly talented, I enjoyed the team spirit and competition.",
      "I occasionally watch tennis during major tournaments because I find the strategy more engaging than football, which I rarely follow.",
      "Exercise is very important to me since it keeps me healthy and reduces stress, so I aim for at least 30 minutes daily.",
      "I'd love to try rock climbing because it looks both challenging and fun, and I plan to join a climbing gym in the future."
    ]
  },
  {
    "part": 1,
    "topic": "Music",
    "questions": [
      "What kind of music do you like?",
      "Do you play any instruments?",
      "How often do you listen to music?",
      "Do you go to concerts?",
      "Has your taste in music changed?",
      "Is music important in your culture?"
    ],
    "answers": [
      "I love indie folk and acoustic music because it's mellow and thoughtful, with storytelling that draws me in emotionally.",
      "I play guitar, having taught myself three years ago through online tutorials, and I practice several times a week to improve.",
      "I listen to music every day while commuting and studying, since it helps me focus and has become an essential part of my routine.",
      "Yes, I attend concerts a few times a year because live music has an energy and connection that recordings can't replicate.",
      "My taste has definitely evolved—while I liked mainstream pop as a teenager, I now prefer acoustic and indie genres that feel more mature.",
      "Music is extremely important in our culture, with folk traditions woven into festivals and celebrations, and each region having unique styles."
    ]
  },
  {
    "part": 1,
    "topic": "Technology",
    "questions": [
      "Do you use technology every day?",
      "What device do you use most?",
      "How has technology changed your life?",
      "Are you good with computers?",
      "Do you think technology improves education?",
      "Would you reduce your screen time?"
    ],
    "answers": [
      "Yes, I use technology constantly for work, study, and communication, and I honestly can't imagine a day without it.",
      "My laptop is my primary device since I use it for research, writing, and video calls, though my phone is essential for staying connected.",
      "Technology has made information instant and global, allowing me to learn anything online, which has truly democratized education.",
      "I'm fairly good with computers and can troubleshoot basic issues, though I'm not a coder and only know enough to manage daily tasks.",
      "Yes, technology improves education by providing online courses and resources that help students everywhere, especially in remote areas where access was previously limited.",
      "I'd definitely like to reduce my screen time since I spend too long scrolling, and in the future, I'll set stricter daily limits."
    ]
  },
  {
    "part": 1,
    "topic": "Holidays",
    "questions": [
      "Do you like going on holiday?",
      "Where did you last go?",
      "Do you prefer beach or city holidays?",
      "How do you plan your trips?",
      "Do you travel alone or with others?",
      "What's your dream holiday destination?"
    ],
    "answers": [
      "I love holidays because they provide a much-needed break from routine, and I try to travel at least once a year to recharge.",
      "I last went to the mountains for a weekend, where we hiked and stayed in a cabin, enjoying the fresh air and stunning views.",
      "I prefer beach holidays for relaxation since lying by the sea clears my mind, though city trips offer excitement and cultural experiences.",
      "I research online by reading reviews, planning itineraries, and finding local tips, then book accommodation early to ensure smooth travel.",
      "I travel with friends or family because shared experiences are more enjoyable, though solo travel appeals to me and I might try it someday.",
      "My dream destination is Japan, where I'm fascinated by the culture, food, and temples, especially during cherry blossom season."
    ]
  },
  {
    "part": 1,
    "topic": "Reading",
    "questions": [
      "Do you enjoy reading?",
      "What kind of books do you read?",
      "How often do you read?",
      "Do you prefer physical or digital books?",
      "Did you read a lot as a child?",
      "Would you join a book club?"
    ],
    "answers": [
      "Yes, reading is one of my favorite ways to unwind because it transports me to different worlds and helps me relax after busy days.",
      "I read fiction, mostly contemporary novels and thrillers, with occasional self-help books thrown in for variety.",
      "I read before bed every night for at least 30 minutes, and on weekends I can spend hours absorbed in a good story.",
      "I prefer physical books because I love the feel and smell of paper, though e-books are undeniably convenient for travel.",
      "Yes, I devoured fantasy series as a child, and my parents had to limit my reading at dinner since I couldn't put books down.",
      "I might join a book club since discussing books sounds fun, but I like reading at my own pace, so flexibility would be important."
    ]
  },
  {
    "part": 1,
    "topic": "Television",
    "questions": [
      "Do you watch TV often?",
      "What programs do you like?",
      "Do you watch TV or streaming services?",
      "Did you watch a lot of TV as a child?",
      "Do you think TV is educational?",
      "Would you rather watch alone or with others?"
    ],
    "answers": [
      "Not often—I watch only a few hours a week because I prefer reading or being active, finding too much TV unproductive.",
      "I like documentaries about nature and science, along with crime dramas that offer engaging plots and complex characters.",
      "I use streaming services almost exclusively since I can choose what and when to watch, avoiding the constant ads on traditional TV.",
      "Yes, Saturday morning cartoons were a ritual, and my sister and I would watch together, creating memories I still cherish today.",
      "TV can be educational through documentaries and news programs, though entertainment shows don't teach much, so balance is key.",
      "It depends on the content—comedies are better with friends for shared laughter, while serious dramas I prefer watching alone for focus."
    ]
  },
  {
    "part": 1,
    "topic": "Internet",
    "questions": [
      "How often do you use the internet?",
      "What do you use it for?",
      "Do you shop online?",
      "Is the internet connection good where you live?",
      "Has the internet changed society?",
      "Would you reduce your internet use?"
    ],
    "answers": [
      "I use the internet every day, all day for studying, socializing, and entertainment, making it absolutely essential to my life.",
      "I use it for research, emails, social media, and streaming, though I also take online courses to expand my skills productively.",
      "Yes, I frequently shop online for clothes, books, and electronics because it's convenient, affordable, and offers better selection than local stores.",
      "Yes, the internet connection here is fast and reliable, allowing smooth streaming and downloads, which I'm fortunate to have.",
      "The internet has changed society enormously by connecting the world and democratizing information, making it arguably the biggest shift in human history.",
      "Yes, I spend too much time scrolling mindlessly, so I'd like to be more intentional and will set daily limits in the future."
    ]
  },
  {
    "part": 1,
    "topic": "Languages",
    "questions": [
      "How many languages do you speak?",
      "Why did you learn them?",
      "Is it difficult to learn languages?",
      "Do you want to learn another language?",
      "How important are languages for careers?",
      "What's the best way to learn a language?"
    ],
    "answers": [
      "I speak two languages—my native language and English—and I'm currently learning Spanish because I want to become multilingual.",
      "I learned English in school and through media, while Spanish is for travel and career opportunities, since languages genuinely open doors.",
      "Yes, grammar and pronunciation can be challenging, but consistent practice helps me improve steadily each week.",
      "I'd love to learn French or Mandarin because both are useful globally, and I plan to take formal classes in the future.",
      "Languages are extremely important for careers since multilingual employees access bigger markets and enjoy a competitive advantage in hiring.",
      "Immersion is the best method because living in a country forces daily practice, though apps and courses help when immersion isn't possible."
    ]
  },

  {
    "part": 2,
    "topic": "Describe a book that made an impression",
    "cue": "You should say:\n- What the book is called\n- When you read it\n- What happens in the story\n- Why it stayed with you",
    "sample": "I read *The Alchemist* by Paulo Coelho during an eight-hour train journey last summer, a trip from my hometown to the capital that gave me uninterrupted time to reflect on my life and future. The story follows Santiago, a young shepherd who abandons his familiar life in Spain to chase a recurring dream of treasure in Egypt, encountering an alchemist, surviving bandits, and crossing vast deserts along the way. What struck me most was the central message that the universe supports those who pursue their true calling, an idea that arrived at exactly the right moment since I was debating whether to switch from engineering to digital marketing. That single book gave me the courage to trust my instincts and make the change, a decision I've never once regretted because it aligned my studies with my passions. Even now, when I face uncertainty or self-doubt, I recall the line: 'When you want something, all the universe conspires to help you.' Reading it on that train wasn't just entertainment—it was a genuine turning point that shaped the direction of my life and reminded me to follow my heart rather than external expectations."
  },
  {
    "part": 2,
    "topic": "Describe a time you saw an interesting animal",
    "cue": "You should say:\n- What animal it was\n- Where and when it happened\n- What it was doing\n- How you reacted",
    "sample": "Last spring, I went hiking in the hills near my hometown with a group of friends, setting out at 5 a.m. to catch the sunrise while the air was still cool and misty. About halfway up the trail, we reached a clearing and spotted a magnificent red deer with full antlers standing in the middle of a meadow, grazing calmly as steam rose from its breath in the cold dawn air. The sun was just beginning to peek over the ridge, casting a golden glow on the deer's coat and creating an almost magical atmosphere that made time feel suspended. We all froze instantly, not daring to speak or move, and the deer looked up at us, staring for what felt like several minutes before slowly turning and leaping gracefully into the forest. I felt an overwhelming rush of awe and peace simultaneously, as though nature had paused just for us to witness something extraordinary and rare. I deliberately didn't take a photo because I wanted to remember the moment with my own eyes rather than through a screen, focusing on the raw experience. Later, we sat in silence eating breakfast, still processing the encounter and feeling grateful that we'd woken up early and stayed quiet enough to experience it fully."
  },
  {
    "part": 2,
    "topic": "Describe a class or lesson you remember clearly",
    "cue": "You should say:\n- What the lesson was about\n- When and where it took place\n- Who was teaching\n- Why it was memorable",
    "sample": "In high school, we had a geography lesson on ocean pollution that took place in a classroom overlooking the sea, a setting that made the topic feel particularly relevant and immediate. It was a sunny Friday afternoon, and our teacher, Mr. Chen, had arranged something special instead of the usual PowerPoint presentation—he showed a short video of a sea turtle with a plastic straw stuck in its nose, bleeding and struggling to breathe. The room went completely silent as we watched, and then Mr. Chen passed around real plastic waste—bottles, bags, and straws—that he'd collected from our local beach the week before, asking us to imagine that the turtle we'd seen was from our own coastline. I remember holding a cracked plastic cup and feeling an overwhelming sense of guilt mixed with determination to change my habits immediately. That very day, I went home and replaced all our plastic straws with metal ones, and I even started a small campaign at school to ban single-use plastics in the canteen. Years later, I still avoid plastic whenever possible and make conscious choices about what I buy and use. That lesson was memorable not because of lectures or data, but because Mr. Chen made the issue tangible and local, showing me how education can spark genuine action when it connects emotionally with students."
  },
  {
    "part": 2,
    "topic": "Describe a place you like to eat or drink",
    "cue": "You should say:\n- Where the place is\n- Why you go there\n- What you usually have\n- What you enjoy or don't enjoy",
    "sample": "There's a rooftop café called Skyview in the heart of downtown, located on the 12th floor of an old building with fairy lights strung across wooden beams and potted plants everywhere. I go there at least once a week to unwind after work or study, and it's become my favorite thinking spot where I can watch the city skyline while planning my week. I always order an iced matcha latte with oat milk and their signature lemon drizzle cake, which is perfectly balanced—light, zesty, and not too sweet—and pairs beautifully with the soft jazz playlist. The atmosphere is incredibly calming, with a gentle breeze flowing through the open sides and comfortable seating that invites you to stay for hours, though the only downside is that it gets packed on weekends, forcing me to wait 20 minutes for a table. Despite the crowds, the vibe is always worth the wait because I've had some of my best ideas there, including one memorable evening when I outlined an entire project while watching the sunset paint the sky. It's more than just a café—it's my creative recharge station where I can escape the noise of daily life and reconnect with my thoughts and goals."
  },
  {
    "part": 2,
    "topic": "Describe a time you helped someone",
    "cue": "You should say:\n- Who you helped\n- What the situation was\n- How you helped\n- How you both felt afterward",
    "sample": "Last month, my elderly neighbor Mrs. Lee locked herself out of her apartment at 11 p.m., and I heard her knocking frantically while she stood in the hallway wearing only her nightgown and looking visibly distressed. She didn't have her phone with her, and since the building was quiet at that hour, I immediately lent her mine to call a locksmith, though the earliest arrival time was 40 minutes away. To make her more comfortable, I brought her a warm blanket from my apartment, made her a cup of chamomile tea, and sat with her in the hallway while we talked about her grandchildren and my studies, which helped calm her nerves considerably. When the locksmith finally arrived and opened her door, she hugged me tightly with tears in her eyes, expressing gratitude that felt deeply genuine and heartfelt. The next day, she surprised me by baking a batch of chocolate chip cookies and leaving them at my door with a thank-you note that I've kept as a reminder of the power of small kindnesses. I felt proud that I'd turned what could have been a terrifying night for her into something manageable, and the experience showed me how much community matters in a big building where people can easily become isolated."
  },
  {
    "part": 2,
    "topic": "Describe a useful app on your phone",
    "cue": "You should say:\n- What the app is\n- How you found it\n- What it does\n- Why it's helpful",
    "sample": "I use an app called Loop for habit tracking, and it's become essential to my daily routine after I discovered it on a productivity blog last year when I was struggling to stay consistent with exercise and reading. The app is beautifully simple—you set daily goals like 'drink 2 liters of water' or 'read 20 pages,' and it sends gentle reminders at your chosen times while tracking your progress with colorful streaks and charts. Thanks to Loop, I've exercised four times a week for 120 days straight and finished 15 books this year, achievements I'm genuinely proud of since I used to struggle with consistency before using the app. What I love most is the satisfaction of tapping 'done' and watching my streak grow, a small reward that keeps me motivated and accountable when I might otherwise skip a day due to laziness or stress. I've even expanded beyond my original goals to track sleep patterns and screen time, using the insights to make healthier choices and optimize my daily schedule. Without Loop, my goals would remain vague intentions on a to-do list rather than concrete achievements, so it's truly transformed how I approach personal development and self-improvement."
  },
  {
    "part": 2,
    "topic": "Describe a festival or celebration in your country",
    "cue": "You should say:\n- What the event is\n- When it happens\n- What people do\n- Why you like it",
    "sample": "We have a lantern festival every autumn to celebrate the harvest moon, usually in late September, when families gather by the river at dusk to release glowing paper lanterns into the water. The festival involves writing personal wishes on the lanterns before releasing them, and the sight of hundreds of lights drifting downstream is absolutely magical, with the reflections shimmering on the water like floating stars. There are food stalls everywhere selling traditional treats like grilled squid, sweet rice cakes, and hot chestnuts, while live bands play folk music that echoes across the riverbank, building to a spectacular fireworks display at midnight. Last year, I went with my cousins, and we wrote wishes for health and career success, taking time to reflect on the past year while enjoying the festive atmosphere and delicious food. What I love most is how the festival brings the entire community together regardless of age or background, creating a shared moment of hope and connection that feels increasingly rare in our busy modern lives. It's not just entertainment—it's a tradition that links us to previous generations who celebrated the same way, and losing it would mean losing a beautiful way to connect across time and community."
  },
  {
    "part": 2,
    "topic": "Describe a piece of clothing you like wearing",
    "cue": "You should say:\n- What it is\n- When you got it\n- When you wear it\n- Why it's special",
    "sample": "I have a soft gray hoodie that I bought on my first university trip to the mountains three years ago, a weekend getaway with classmates where we hiked, played cards, and sat around a campfire under the stars. I wear it on lazy weekends, long flights, or whenever I need comfort after a tough day, and it's become my go-to piece for relaxation and warmth. The hoodie is oversized and incredibly cozy, with a tiny burn hole from a campfire spark that serves as a little badge of honor, reminding me of that carefree weekend and the friendships I formed. The fabric has worn in beautifully over time and still carries a faint scent of pine from that mountain trip, even after countless washes, which immediately transports me back to those happy memories whenever I wear it. If I ever lost it, I'd feel like I'd lost a tangible piece of that memory and the sense of freedom and friendship that defined that period of my life. It's not just clothing—it's a wearable reminder that some moments are worth holding onto, and it represents a time when life felt simple, adventurous, and full of possibility."
  },
  {
    "part": 2,
    "topic": "Describe a time you were proud of a friend",
    "cue": "You should say:\n- Who your friend is\n- What they did\n- Why it was impressive\n- How you reacted",
    "sample": "My best friend Alex ran a full marathon to raise money for cancer research after his mother was diagnosed last year, a commitment that required incredible dedication since he'd never run more than 5K before. He trained for six months while working full-time, waking up at 5 a.m. every morning to run before work and following a strict diet that most people would find impossible to maintain. On race day, I waited at the 30K mark with a sign that said 'You've got this, Alex!' and when he passed by, exhausted but smiling, I felt overwhelming pride watching him push through the pain and fatigue. He crossed the finish line in under four hours, having raised over £5,000 for the cause, an achievement that demonstrated both physical endurance and deep selflessness. I cheered so loudly that I completely lost my voice for two days afterward, but it was worth it to show my support for someone who'd transformed personal tragedy into positive action. That day showed me what real strength looks like—not just physical stamina, but the mental determination to commit to something bigger than yourself and follow through despite obstacles and doubts."
  },
  {
    "part": 2,
    "topic": "Describe a skill you learned recently",
    "cue": "You should say:\n- What the skill is\n- How you learned it\n- How long it took\n- Why you wanted to learn it",
    "sample": "I taught myself basic video editing using free apps on my phone over the past month, motivated by a desire to create better travel vlogs that I could share with family and friends. I started by watching YouTube tutorials every evening after dinner, dedicating at least 30 minutes to learning new techniques, though the first week was incredibly frustrating as I kept accidentally deleting clips or losing my progress. By week three, I'd mastered the fundamentals and could cut footage, add smooth transitions, insert background music, and export in high definition, skills that transformed my raw footage into polished stories. I recently used these skills on a beach trip, creating a three-minute video with slow-motion waves and my own voiceover narration, and my parents said watching it felt like being there themselves. Learning this skill has completely changed how I preserve memories because instead of just static photos, I now create moving, emotional, shareable content that captures the atmosphere and feeling of a place. It's opened an entirely new creative outlet for me, one that combines storytelling, music selection, and visual composition in ways I find deeply satisfying and expressive."
  },
  {
    "part": 2,
    "topic": "Describe a place you want to visit again",
    "cue": "You should say:\n- Where it is\n- When you went\n- What you did there\n- Why you want to return",
    "sample": "I visited a quiet mountain village three years ago during a summer break, spending a week hiking through pine forests, eating freshly baked bread from a local bakery, and stargazing at night without any light pollution. The peace and simplicity of that place were unforgettable, offering a complete contrast to city life and allowing me to disconnect from screens and social media entirely. I want to return because I've been feeling increasingly overwhelmed by modern life's constant connectivity, and I know that village would provide the mental reset I desperately need right now."
  },
  {
    "part": 2,
    "topic": "Describe a time you lost something important",
    "cue": "You should say:\n- What you lost\n- Where and when it happened\n- What you did\n- How it ended",
    "sample": "I lost my passport the day before an international flight, discovering it was missing while packing my bag and immediately panicking about missing my trip. I frantically retraced my steps, checking every bag, pocket, and drawer in my apartment, even calling places I'd visited that week to ask if anyone had found it. Luckily, the hotel where I'd had lunch called to say they'd found it at the reception desk, and I rushed over to collect it with immense relief. Since then, I've triple-checked my pockets and bags before leaving anywhere, a habit born from that stressful experience."
  },
  {
    "part": 2,
    "topic": "Describe a person who influenced your career choice",
    "cue": "You should say:\n- Who the person is\n- How you know them\n- What they do\n- How they inspired you",
    "sample": "My aunt runs a small graphic design studio, and I used to visit her workspace as a child, watching in fascination as she sketched logos and created brand identities for local businesses. Her passion for transforming abstract ideas into compelling visuals was infectious, and she always explained her creative process in ways that made design feel accessible and exciting. Seeing her genuine joy in her work made me realize that a career could be more than just earning money—it could be a source of daily fulfillment and creative expression, which ultimately led me to choose design as my field."
  },
  {
    "part": 2,
    "topic": "Describe a goal you are working toward",
    "cue": "You should say:\n- What the goal is\n- Why it matters to you\n- What you've done so far\n- How you feel about it",
    "sample": "I'm saving money to study abroad next year, a goal I've had since high school when I first learned about international exchange programs and the opportunities they provide. It matters to me because I believe experiencing a different educational system and culture will broaden my perspective and make me more adaptable and globally aware. So far, I've cut back on eating out, taken freelance graphic design gigs on weekends, and opened a dedicated savings account that I contribute to monthly without fail. Every small deposit feels like tangible progress toward my dream, and I'm excited about the journey even though the financial challenge is significant and requires constant discipline."
  },

  {
    "part": 3,
    "topic": "Advertising Influence",
    "questions": [
      "What forms of promotion dominate today's market?",
      "Which advertising medium appeals to you personally?",
      "To what extent does marketing shape consumer choices?",
      "What elements make promotional campaigns effective?",
      "Is advertising essential in competitive economies?",
      "How might ads targeting children raise ethical concerns?",
      "Could unregulated marketing harm young viewers?"
    ],
    "answers": [
      "Social media influencers and targeted online ads lead contemporary marketing, reaching audiences with personalized content that traditional television struggles to match in precision and engagement. This shift allows brands to interact directly with consumers through comments and messages, building loyalty through two-way conversations rather than one-directional broadcasts that dominated the advertising landscape for decades.",
      "I prefer short video ads on platforms like TikTok because they entertain while informing, blending humor with product demonstrations in formats that feel less intrusive than highway billboards or pop-up banners. They capture attention during brief scrolling sessions without disrupting the viewing experience, making them more tolerable than commercials that interrupt favorite shows at crucial moments.",
      "Marketing heavily influences purchasing decisions by creating perceived needs through emotional storytelling that resonates with viewers' aspirations and insecurities, a tactic that proves remarkably effective at driving sales. However, increasingly savvy consumers now research independent reviews before buying, balancing advertising claims with factual assessments from trusted sources rather than accepting promotional messages at face value.",
      "Successful campaigns focus on authenticity and relatability, using real customer stories that connect emotionally while highlighting tangible benefits rather than exaggerated promises that strain credibility. Clear calls to action ensure viewers understand next steps, whether visiting websites or scanning QR codes, converting interest into measurable engagement that justifies marketing investments.",
      "In saturated markets where countless brands compete for attention, strategic promotion differentiates products and educates consumers about innovations they might otherwise overlook. Without advertising, superior quality could go unnoticed beneath competitors' noise, potentially stifling economic growth by preventing good products from reaching their natural audiences despite merit.",
      "Ads for sugary snacks or expensive toys can pressure children into wanting items that harm health or strain family budgets, shaping consumption patterns before kids develop critical evaluation skills. Parents monitoring screen time and discussing advertising tactics help counter manipulation, promoting media literacy that protects children while respecting their developing autonomy and judgment.",
      "Unregulated advertising might promote unrealistic body images or dangerous behaviors, affecting self-esteem in impressionable children who lack context to interpret manipulated imagery critically. Stricter guidelines requiring age-appropriate content and disclaimers about digital alterations would protect vulnerable audiences without limiting creative expression that drives legitimate commerce and cultural innovation."
    ]
  },
  {
    "part": 3,
    "topic": "Art and Culture",
    "questions": [
      "How do communities typically view artistic expression?",
      "Does music overshadow visual arts in popularity?",
      "What traditional art forms define your cultural heritage?",
      "In what ways has creative output evolved recently?",
      "Should children explore art in educational settings?",
      "What benefits come from youth engaging with culture?",
      "How might governments fund artistic endeavors?",
      "What draws crowds to galleries and exhibitions?"
    ],
    "answers": [
      "Art is celebrated as a vital expression of cultural identity, with festivals and public installations showcasing local talent that preserves traditions while adapting to contemporary influences. Community events make culture accessible to all social classes, fostering collective pride and continuity that strengthens bonds across generations who might otherwise drift apart in fast-paced modern societies prioritizing economic productivity over cultural heritage.",
      "Music often dominates due to its immediate emotional impact and portability through streaming platforms, but visual arts offer deeper contemplation that appeals to different sensibilities and rewards patient observation. Live concerts create shared energy through collective experience, while paintings and sculptures invite personal reflection that unfolds over multiple viewings, suggesting these art forms serve complementary rather than competing roles in cultural life.",
      "Traditional forms like pottery, weaving, and calligraphy tell stories of ancestral wisdom, passed down through generations as living links to historical identities that resist homogenizing forces of globalization. Reviving these crafts in schools through hands-on workshops keeps cultural narratives alive, ensuring young people understand their roots even while embracing modern influences that inevitably shape evolving identities in multicultural contexts.",
      "Digital tools have transformed creative processes, enabling interactive installations that blend technology with emotion through augmented reality and projection mapping that reimagine public spaces. This evolution expands audiences by making art more inclusive and participatory, though some purists worry that technological spectacle might overshadow substance, reducing art to entertainment that prioritizes novelty over depth and meaningful cultural commentary.",
      "Art education sparks imagination in children by teaching visual problem-solving through colors, shapes, and composition principles that transfer to other academic domains like mathematics and science. Programs integrating drawing with subjects like geometry enhance overall learning by engaging multiple intelligences, while creative expression provides emotional outlets that support mental health during formative years when identity develops through experimentation and self-discovery.",
      "Exposure to diverse cultural expressions builds empathy by revealing how different societies interpret universal human experiences through varied artistic lenses. Museum visits with interactive exhibits make history engaging and memorable for children who might otherwise find the past remote and irrelevant, creating lifelong appreciation for cultural preservation that sustains civilizations beyond immediate economic utility.",
      "Government funding through grants and subsidies ensures arts remain accessible regardless of market pressures, enriching society culturally even when commercial viability seems doubtful. Subsidized theaters and galleries allow low-income families to experience performances and exhibitions that would otherwise exclude them through prohibitive pricing, promoting social cohesion through shared cultural participation that transcends economic divisions.",
      "Interactive exhibits and immersive experiences attract visitors seeking engagement beyond passive observation, transforming museums into dynamic spaces where learning feels active rather than dutiful. Social media campaigns teasing upcoming exhibitions create anticipation, while themed evenings combining art with music or food boost attendance by making cultural venues feel more like social destinations than intimidating institutions that historically catered mainly to educated elites."
    ]
  },
  {
    "part": 3,
    "topic": "Criminal Justice",
    "questions": [
      "What purposes should punishment serve?",
      "Are long prison sentences effective deterrents?",
      "Should young offenders be treated differently?",
      "How can societies reduce crime rates?",
      "What role does rehabilitation play in justice?",
      "Should some crimes carry mandatory sentences?"
    ],
    "answers": [
      "Punishment should aim at rehabilitation and public safety rather than mere retribution, preparing offenders for productive reintegration into society rather than simply inflicting suffering that satisfies visceral revenge desires. Education and vocational training during incarceration reduce recidivism by addressing root causes like lack of opportunities, demonstrating that effective justice systems invest in transformation rather than just containment that warehouses problems without solving them.",
      "Research suggests that certainty of punishment deters crime more effectively than severity, as extremely long sentences show diminishing deterrent effects while consuming resources better spent on prevention and rehabilitation. Harsh sentencing disproportionately affects marginalized communities without reducing crime rates substantially, suggesting that tough-on-crime approaches satisfy political pressures for visible action without addressing underlying social conditions like poverty and lack of education that correlate strongly with criminal behavior.",
      "Adolescent brains remain developing, particularly in areas governing impulse control and long-term thinking, justifying separate juvenile systems emphasizing rehabilitation over punishment. Young offenders show higher reform potential than adults, making investment in redirecting youth trajectories more cost-effective than imposing adult sentences that harden criminal identities, though serious violent crimes may still warrant strict consequences balancing rehabilitation possibilities with public safety concerns and victim justice needs.",
      "Addressing poverty, improving education, and creating employment opportunities reduces crime more effectively than increased policing, as desperation and lack of alternatives drive many offenses. Community programs providing youth activities and mental health services prevent problems before they require expensive criminal justice interventions, demonstrating that upstream social investment saves downstream costs, though politicians often prefer visible law enforcement spending over prevention programs showing benefits only after years.",
      "Rehabilitation transforms offenders into contributing citizens rather than warehousing them temporarily before release without addressing problems that led to criminal behavior originally. Drug treatment, anger management, and job training prepare inmates for lawful lives, reducing recidivism that perpetuates cycles of crime and incarceration costly to society, though rehabilitation requires resources and patience that punitive approaches avoid despite ultimately proving more expensive when measuring long-term social costs.",
      "Mandatory minimums remove judicial discretion in considering individual circumstances, potentially creating unjust outcomes when unusual situations warrant leniency that inflexible sentencing prevents. However, mandatory sentences ensure consistency across judges whose personal biases might otherwise produce disparate punishments for similar crimes, particularly regarding racial disparities documented in systems allowing broad discretion, suggesting that appropriate reforms balance flexibility with fairness rather than adopting absolute positions favoring either complete discretion or rigid rules."
    ]
  },
  {
    "part": 3,
    "topic": "Cultural Preservation",
    "questions": [
      "Why should societies preserve traditional customs?",
      "How does globalization threaten local cultures?",
      "What role do languages play in cultural identity?",
      "Should governments fund cultural preservation?",
      "How can tourism support rather than damage culture?",
      "What happens when indigenous knowledge disappears?"
    ],
    "answers": [
      "Traditional customs provide continuity linking present communities to ancestral wisdom, offering alternative perspectives on modern problems that societies benefit from maintaining alongside contemporary innovations. Cultural diversity enriches humanity collectively like biodiversity strengthens ecosystems, suggesting that preserving traditions serves universal interests rather than just nostalgic attachment to the past, especially when traditional ecological knowledge offers insights addressing environmental challenges.",
      "Globalization spreads dominant cultures through media and commerce, displacing local traditions that cannot compete with well-funded entertainment and marketing promoting homogenized lifestyles. Young people often abandon traditional practices they perceive as outdated, accelerating cultural erosion unless communities actively maintain heritage through festivals, language education, and storytelling that makes traditions relevant to contemporary circumstances rather than museum artifacts disconnected from daily life.",
      "Languages encode unique worldviews and knowledge systems that become inaccessible when linguistic diversity disappears through language death affecting small communities dominated by global languages. Bilingual education preserving minority languages while teaching dominant ones enables children to navigate both traditional and modern contexts, maintaining cultural connections while accessing opportunities requiring majority language fluency, though this dual identity can create tensions between competing loyalties and values.",
      "Government support through grants and cultural centers demonstrates public commitment to diversity, providing resources that volunteers alone cannot sustain for documenting oral histories and training new generations in traditional arts. Public funding ensures preservation serves communities rather than commercial interests that might commodify culture for profit while distorting authentic practices, though determining which traditions deserve support raises difficult questions about authenticity and who decides cultural priorities.",
      "Responsible tourism providing income that incentivizes cultural maintenance rather than exploitation requires community control over how traditions are presented and ensuring visitors understand cultural context rather than treating practices as exotic entertainment. Limiting tourist numbers prevents overcrowding that damages sacred sites while mandatory guides ensure respectful behavior, balancing economic benefits against cultural integrity concerns that arise when communities depend economically on performing traditions for outsider audiences.",
      "Losing indigenous knowledge means losing centuries of observation about sustainable resource management and medicinal plants that pharmaceuticals might someday rediscover, suggesting preservation serves practical purposes beyond cultural sentimentality. Traditional ecological knowledge accumulated through generations often proves more appropriate for local contexts than imported solutions, making its disappearance a genuine loss for humanity's capacity to solve environmental and health challenges through diverse approaches reflecting place-specific adaptations."
    ]
  },
  {
    "part": 3,
    "topic": "Education Systems",
    "questions": [
      "How should schools prepare students for future careers?",
      "What's more important: academic knowledge or practical skills?",
      "Should education focus on individual strengths or broad competence?",
      "How might technology transform classroom learning?",
      "What role do teachers play in the digital age?",
      "How can education systems become more equitable?",
      "Should students have more choice in curriculum?"
    ],
    "answers": [
      "Schools should emphasize adaptability and critical thinking rather than memorizing facts that become obsolete, since future jobs will demand continuous learning as technologies and industries evolve unpredictably. Project-based learning that simulates real workplace challenges develops problem-solving abilities transferable across careers, preparing students for employment landscapes where specific skills matter less than learning capacity and creative thinking that enables rapid adaptation to novel situations.",
      "Both matter, but their balance depends on educational stages—foundational academic knowledge provides frameworks for understanding specialized skills acquired later through vocational training or apprenticeships. Universities teach theory while internships apply concepts practically, suggesting education should integrate both approaches rather than forcing false choices between understanding principles and gaining hands-on experience that makes abstract knowledge tangible and immediately useful.",
      "Developing individual talents maximizes each student's unique potential, though some shared competencies like literacy and numeracy remain universally essential regardless of specialization. Modern systems can personalize learning through technology while maintaining core curricula that ensure citizens share common knowledge enabling civic participation and social cohesion across diverse abilities and interests that characterize pluralistic societies.",
      "AI tutors could provide personalized instruction at each student's pace, addressing individual learning gaps that teachers managing large classes struggle to identify and remediate individually. Virtual reality might enable immersive historical experiences or science simulations impossible in traditional classrooms, making abstract concepts visceral and memorable through embodied learning that engages multiple senses beyond textbook reading and lecture listening.",
      "Teachers remain crucial as mentors who inspire curiosity and model intellectual enthusiasm that algorithms cannot replicate despite technological sophistication in content delivery. Human educators provide emotional support and socialization that shapes character development, recognizing that education encompasses more than information transfer—it involves forming identities and values through relationships that machines cannot authentically provide regardless of programming sophistication.",
      "Increasing funding for underprivileged schools narrows resource gaps, while recruiting diverse teachers provides role models for students from marginalized backgrounds who rarely see themselves represented in educational authority positions. Free meals and school supplies remove barriers preventing low-income students from fully participating, recognizing that learning depends on meeting basic needs often taken for granted by advantaged students whose home environments support academic focus.",
      "Greater curricular choice motivates students by connecting learning to personal interests, though complete freedom might lead some to avoid challenging subjects essential for intellectual development and career options. Guided choice balancing student preferences with requirements ensuring broad literacy and numeracy skills seems optimal, respecting autonomy while preventing decisions that prematurely close future opportunities through insufficient foundational knowledge."
    ]
  },
  {
    "part": 3,
    "topic": "Environmental Sustainability",
    "questions": [
      "What actions can individuals take to protect the environment?",
      "How should governments incentivize green behavior?",
      "Is economic growth compatible with environmental protection?",
      "What role do corporations play in climate change?",
      "How might renewable energy transform societies?",
      "Should environmental education be mandatory in schools?",
      "What gives you hope about environmental futures?"
    ],
    "answers": [
      "Individuals can reduce consumption, choose sustainable transportation, and support eco-friendly businesses through purchasing decisions that collectively signal market demand for environmentally responsible practices. Small actions like reducing food waste and energy consumption seem insignificant individually but aggregate into meaningful impact when millions adopt similar habits, demonstrating how systemic change requires both policy reforms and personal responsibility rather than placing burden solely on individual choices.",
      "Tax incentives for solar panels and electric vehicles make sustainable choices economically attractive, while carbon taxes internalize environmental costs currently ignored in pricing that makes pollution artificially cheap. Subsidy shifts from fossil fuels to renewables accelerate transitions without forcing changes, harnessing market mechanisms to align self-interest with environmental goals more effectively than moral appeals alone, though regulations remain necessary for addressing problems markets won't solve voluntarily.",
      "Sustainable development separates growth from resource depletion through efficiency improvements and circular economies that recycle materials indefinitely, proving that prosperity needn't destroy ecosystems. Green technologies create employment while addressing climate change, demonstrating economic opportunity rather than sacrifice, though achieving this transition requires reconceiving progress beyond simplistic GDP measures toward wellbeing indicators valuing ecological health alongside material consumption.",
      "Corporations contribute massively to emissions through production and supply chains, making their cooperation essential for achieving climate targets that individual actions alone cannot reach. However, companies respond to consumer preferences and regulatory frameworks, suggesting that responsibility distributes across producers, consumers, and policymakers rather than residing solely with any single actor, complicating accountability while highlighting interconnections requiring coordinated action.",
      "Renewable energy decentralizes power production, potentially democratizing energy systems previously controlled by large utilities and fossil fuel companies that wielded disproportionate political influence. Widespread solar adoption could reduce geopolitical conflicts over oil while creating local jobs installing and maintaining distributed generation systems, transforming energy from a source of international tension into a catalyst for community self-sufficiency and energy independence.",
      "Environmental education develops ecological literacy and systems thinking essential for addressing interconnected challenges like climate change, biodiversity loss, and pollution that require understanding complex relationships between human activities and natural processes. Early exposure cultivates conservation ethics and hope through highlighting solutions rather than just problems, empowering children to envision sustainable futures while providing knowledge to realize those visions through careers and civic participation.",
      "Growing youth activism and rapid renewable energy cost declines suggest momentum toward necessary changes, while technological innovations offer practical solutions beyond wishful thinking. International cooperation through agreements like the Paris Accord demonstrates political will despite setbacks, and nature's resilience means ecosystems can recover if given opportunities through protection and restoration efforts that reverse decades of degradation."
    ]
  },
  {
    "part": 3,
    "topic": "Food and Nutrition",
    "questions": [
      "How have eating patterns changed in recent decades?",
      "What factors influence people's food choices?",
      "Should schools teach nutrition and cooking skills?",
      "How does globalization affect local cuisine?",
      "What role do restaurants play in social life?",
      "Could food waste be reduced in modern societies?",
      "How might eating habits evolve in coming years?"
    ],
    "answers": [
      "Diets have shifted toward convenience foods and restaurant meals as work schedules intensify, leaving less time for home cooking that characterized previous generations' daily routines. This trend contributes to rising obesity rates since processed foods often contain excessive sugar and fat designed to maximize flavor at the expense of nutritional balance, creating public health challenges that strain healthcare systems with preventable chronic diseases.",
      "Price, convenience, and cultural identity shape food selections, with busy professionals gravitating toward quick options while others prioritize organic or locally-sourced ingredients reflecting environmental values. Marketing also influences choices through advertising that associates products with lifestyles, making consumption decisions partially rational and partly emotional, responding to brand narratives that position foods within identity frameworks beyond mere sustenance or taste preferences.",
      "Teaching nutrition empowers children to make informed dietary choices throughout life, preventing health problems that develop from ignorance about balanced eating and portion control. Cooking classes provide practical skills that save money while building self-sufficiency, transforming students from passive consumers into capable individuals who understand food preparation as both science and creative expression rather than mysterious processes performed exclusively by parents or professionals.",
      "Globalization introduces diverse cuisines that enrich culinary landscapes, making international flavors accessible in most cities through immigrant-owned restaurants and fusion concepts blending traditions. However, this cosmopolitan availability sometimes threatens local specialties as younger generations prefer trendy foreign dishes over traditional recipes, potentially eroding culinary heritage unless communities actively preserve regional cooking through festivals and culinary education that celebrates unique cultural contributions.",
      "Restaurants serve as social hubs where people celebrate occasions, conduct business meetings, or simply enjoy company in neutral spaces removed from domestic routines and responsibilities. The dining experience provides more than sustenance—it offers ambiance, service, and cuisine variety that home cooking rarely matches, justifying higher costs through convenience and atmosphere that transforms eating into memorable social rituals marking important life moments and relationships.",
      "Waste reduction requires systemic changes including better date labeling that prevents premature disposal, restaurant portion control, and food recovery programs redirecting surplus to those experiencing hunger. Consumer education about meal planning and creative use of leftovers could significantly decrease household waste, while composting infrastructure would divert organic waste from landfills where decomposition produces methane, a potent greenhouse gas contributing to climate change.",
      "Future diets might emphasize plant-based proteins as environmental awareness grows regarding meat production's ecological footprint involving deforestation, water consumption, and greenhouse emissions. Cultured meat produced in laboratories could reduce these impacts while satisfying preferences for animal protein, though cultural acceptance remains uncertain since eating habits reflect deep-rooted traditions and identities that resist rapid technological disruption despite rational environmental arguments."
    ]
  },
  {
    "part": 3,
    "topic": "Healthcare Access",
    "questions": [
      "Should healthcare be free for everyone?",
      "How can preventive medicine reduce healthcare costs?",
      "What challenges do aging populations create?",
      "How might technology improve medical care?",
      "What role do traditional healing practices play today?",
      "How can rural areas access quality healthcare?"
    ],
    "answers": [
      "Universal healthcare ensures everyone receives necessary treatment regardless of income, preventing financial ruin from medical bills while promoting public health through early intervention that stops diseases from spreading or worsening. However, implementing free systems requires substantial taxation and managing demand to prevent overconsumption of services, suggesting that some cost-sharing mechanisms might encourage responsible usage while maintaining accessibility through subsidies for those unable to pay.",
      "Preventive care including screenings and lifestyle counseling identifies problems early when treatment proves cheaper and more effective than addressing advanced diseases requiring expensive interventions. Investing in prevention through subsidized gym memberships and nutrition programs reduces long-term costs substantially, demonstrating that spending money upstream saves more downstream while improving quality of life, though immediate expenses can deter short-sighted policymakers focused on current budgets.",
      "Aging populations strain healthcare systems and pension programs as proportionally fewer workers support growing numbers of retirees requiring expensive medical care for chronic conditions. This demographic shift necessitates raising retirement ages, increasing healthcare funding, or accepting reduced services, presenting difficult political choices that pit generations against each other unless societies find innovative solutions like preventive care and immigration addressing worker shortages.",
      "Telemedicine expands access to specialists for rural patients previously requiring long journeys for consultations, while AI diagnostics assist doctors in interpreting scans more accurately than human perception alone. Wearable devices monitoring vital signs enable early detection of problems, shifting healthcare from reactive treatment toward proactive management, though ensuring data privacy and maintaining human judgment in clinical decisions remain crucial for preventing overreliance on algorithmic recommendations.",
      "Traditional medicine provides culturally appropriate care that conventional systems sometimes overlook, particularly in indigenous communities where ancestral healing practices carry spiritual significance beyond physical treatment. Integrating traditional and modern approaches can improve patient compliance and outcomes by respecting cultural values, though ensuring safety requires evidence-based validation of traditional remedies that might interact dangerously with pharmaceutical treatments or prove ineffective for serious conditions.",
      "Mobile clinics and telehealth partially address rural healthcare deserts where low population densities make permanent facilities economically unviable, though these solutions cannot fully replace comprehensive hospitals for emergency care. Training local community health workers provides basic care locally while referring complex cases to distant specialists, balancing accessibility with expertise in resource-constrained environments where perfect solutions prove impossible given geographical and economic realities."
    ]
  },
  {
    "part": 3,
    "topic": "Nature & Wildlife",
    "questions": [
      "What challenges do animals face in urban areas?",
      "Are wildlife parks beneficial?",
      "How can we help protect rare species?",
      "How does global warming impact animals?",
      "Should nature be part of school curriculum?",
      "What will wildlife protection look like in 20 years?"
    ],
    "answers": [
      "Urban animals face multiple interconnected threats including traffic accidents, air and noise pollution, and habitat fragmentation caused by construction, challenges that could be significantly reduced by creating green corridors and installing wildlife-friendly infrastructure like reflective windows.",
      "Wildlife parks serve a dual purpose by educating the public about conservation while funding protection efforts, though ethical concerns emerge when animals are confined to spaces that severely limit their natural behaviors and social structures.",
      "Protecting rare species requires a multifaceted approach that includes preserving natural habitats, enforcing strict anti-poaching laws, and supporting local communities economically, a strategy that proves most effective when governments collaborate closely with NGOs and indigenous peoples.",
      "Global warming disrupts migration patterns, reduces food availability, and forces rapid adaptation in species like polar bears who are losing Arctic ice for hunting, a crisis that renewable energy adoption and emissions reduction could significantly slow though action must be urgent and coordinated.",
      "Nature should absolutely be integrated into school curricula because hands-on experiences like wetland field trips and forest conservation projects teach environmental responsibility and ecological thinking far more effectively than textbooks alone, creating lifelong advocates for conservation.",
      "In two decades, wildlife protection will likely rely heavily on AI-powered drones for real-time population monitoring, DNA tracking systems to combat illegal trade, and community-led reserves that combine traditional knowledge with modern technology, improving recovery rates across endangered populations while empowering local stewardship."
    ]
  },
  {
    "part": 3,
    "topic": "Overcoming Challenges",
    "questions": [
      "What obstacles do teenagers commonly encounter nowadays?",
      "How do individuals typically tackle tough assignments?",
      "Is it preferable to confront problems independently or with support from others?",
      "Why might constant challenges benefit personal growth?",
      "How has technology altered the way people deal with difficulties?",
      "What role does failure play in building resilience?"
    ],
    "answers": [
      "Teenagers often face academic pressure and social media anxiety, issues that can overwhelm them without proper guidance from parents or school counselors. Modern education systems are increasingly offering mental health support, which helps students manage stress through workshops and counseling sessions. For instance, many schools now use apps that track emotional well-being, providing early warnings when intervention might be needed.",
      "Many people turn to online tutorials or collaborative study groups when handling complex tasks, a method that combines diverse knowledge efficiently while building problem-solving networks. This approach not only accelerates solutions but also develops teamwork skills essential for professional environments where projects demand collective effort rather than individual heroics.",
      "Although tackling issues alone fosters independence and self-reliance, seeking help from peers or mentors often leads to innovative solutions that wouldn't emerge in isolation. I believe a balanced mix works best, since complete independence can prolong struggles unnecessarily while excessive dependence prevents skill development.",
      "Challenges push people beyond comfort zones, sparking creativity and determination that routine life rarely demands, which explains why successful people often cite adversity as their greatest teacher. Without obstacles, growth stagnates—consider how Olympic athletes train harder after defeats, transforming setbacks into motivational fuel for breakthrough performances.",
      "Technology provides tools like AI coaching platforms and problem-solving apps, transforming obstacles into learning opportunities through instant feedback and adaptive guidance. However, over-reliance on tech might weaken critical thinking abilities, so blending technological resources with human insight and reflection remains crucial for balanced development.",
      "Failure teaches invaluable lessons by exposing weaknesses and refining strategies for future attempts, turning what seems like defeat into a foundation for eventual success. Reflecting deeply on mistakes, rather than avoiding them through fear, transforms setbacks into stepping stones that build character and competence over time."
    ]
  },
  {
    "part": 3,
    "topic": "Pet Companionship",
    "questions": [
      "Why do many individuals choose to keep animals at home?",
      "What responsibilities come with owning pets?",
      "How do pets contribute to human well-being?",
      "Should exotic animals be kept as companions?",
      "What considerations affect choosing between cats and dogs?",
      "How might pet ownership change in future decades?"
    ],
    "answers": [
      "Pets provide companionship and emotional support, reducing loneliness especially for those living alone or coping with mental health challenges like depression and anxiety. Dogs offer unconditional affection that boosts moods through predictable routines like walks and play, creating structure that benefits owners psychologically while encouraging physical activity and social interactions with other pet owners in parks and neighborhoods.",
      "Owners must commit to regular feeding, veterinary care, and daily exercise, responsibilities that demand time and financial resources throughout the animal's lifespan. Neglecting these duties harms pet welfare, so potential owners should carefully assess their capacity for long-term commitment before adopting animals that depend entirely on human care for survival and quality of life.",
      "Research shows that petting animals lowers blood pressure and releases calming hormones, providing therapeutic effects that complement medical treatments for stress-related conditions. Service dogs assist people with disabilities by performing tasks like guiding the blind or alerting diabetics to blood sugar changes, demonstrating how human-animal bonds extend beyond emotional comfort to tangible health improvements that enhance independence and safety.",
      "While exotic pets like reptiles or parrots fascinate enthusiasts, they often require specialized care that most owners can't provide adequately, leading to shortened lifespans and behavioral problems. Additionally, the exotic pet trade threatens wild populations through illegal capture, so responsible ownership means choosing domesticated species bred for companionship rather than removing animals from natural habitats where they play crucial ecological roles.",
      "Cats suit people with limited space or irregular schedules since they're more independent, while dogs demand consistent attention and outdoor access but offer greater interactive companionship for active individuals. Lifestyle factors like apartment living versus houses with yards often determine which pet fits best, though personality preferences regarding affection levels and playfulness also influence choices significantly.",
      "Future pet ownership might involve robotic companions for those with allergies or time constraints, though most people will likely continue valuing genuine animal connections despite technological alternatives. Adoption rates may increase as awareness grows about shelter animals, while breeding regulations could tighten to address overpopulation and genetic health issues that currently plague certain popular breeds."
    ]
  },
  {
    "part": 3,
    "topic": "Reading & Literature",
    "questions": [
      "Why do people read for pleasure?",
      "Are digital books better than printed ones?",
      "How have reading habits evolved lately?",
      "Should schools encourage more reading?",
      "What role will libraries play in the future?",
      "How does technology shape reading behavior?"
    ],
    "answers": [
      "People read for pleasure because it offers a mental escape while simultaneously expanding imagination and knowledge, a combination that reduces stress more effectively than passive entertainment like scrolling social media.",
      "Although digital books are highly portable and allow adjustable font sizes, which helps readers with vision issues, printed versions provide a tactile experience that many find more immersive and emotionally satisfying.",
      "With the rise of social media and bite-sized content, many people now consume short articles rather than full novels, a shift that has noticeably shortened attention spans and reduced engagement with complex narratives over time.",
      "Schools should definitely encourage reading since it develops critical thinking and empathy—skills I personally gained from literature classes that taught me to analyze different perspectives and understand diverse cultures more deeply.",
      "Libraries will evolve into multifunctional community spaces offering e-books, workshops, maker labs, and digital literacy programs, ensuring they remain relevant institutions that provide equal access to information in an increasingly online world.",
      "While technology enables instant access to global literature and reading tracking apps that motivate progress, constant notifications and digital distractions often interrupt deep focus, making sustained reading more challenging than it was in the pre-smartphone era."
    ]
  },
  {
    "part": 3,
    "topic": "Social Media Impact",
    "questions": [
      "How have social platforms changed communication?",
      "What are the psychological effects of constant connectivity?",
      "Should there be age restrictions on social media?",
      "How might online platforms combat misinformation?",
      "What role does social media play in political movements?",
      "Could social networking evolve to become healthier?"
    ],
    "answers": [
      "Social platforms enable instant global communication that connects distant friends and relatives, making relationships more maintainable across geographical distances that previously meant gradual disconnection. However, digital interactions often feel superficial compared to face-to-face conversations, as text-based exchanges lack nonverbal cues like tone and body language that convey emotional depth, potentially creating networks that appear extensive while feeling emotionally shallow.",
      "Constant connectivity generates anxiety through information overload and social comparison, as curated highlight reels make others' lives appear more fulfilling than reality while users present edited versions of themselves seeking validation through likes. This performance pressure contributes to rising depression rates, particularly among teenagers whose developing identities become entangled with online personas and peer feedback that feels disproportionately important during formative years when belonging matters intensely.",
      "Age limits protecting children from platforms designed to maximize engagement through addictive features seem prudent, though enforcement proves difficult when kids easily circumvent restrictions using false birthdates. Parents monitoring usage and teaching digital literacy provide more effective protection than outright bans that teenagers will evade, making education about healthy technology use more practical than prohibition that breeds secrecy without genuinely preventing access.",
      "Fact-checking labels and algorithm adjustments deprioritizing false content help combat misinformation, though distinguishing deliberate lies from honest mistakes proves challenging when determining truth requires expertise platforms lack. Media literacy education teaching critical evaluation of sources addresses root causes more effectively than content moderation alone, empowering users to identify manipulative content rather than depending on platforms to police billions of posts with inherently imperfect automated systems.",
      "Social media amplifies political movements by enabling rapid mobilization and information sharing that circumvents traditional media gatekeepers, empowering grassroots organizing that challenges established power structures. However, these same tools spread extremism and enable harassment campaigns targeting activists, demonstrating how platforms function neutrally regarding political direction while amplifying both constructive and destructive movements through features maximizing engagement regardless of social consequences.",
      "Future platforms might prioritize well-being over engagement through features encouraging breaks and limiting inflammatory content that drives clicks but harms mental health. Subscription models funded by users rather than advertisers could reduce manipulative design since platforms wouldn't need to maximize attention to sell ads, though converting users accustomed to free services presents business challenges requiring convincing people that healthier social media justifies monthly fees."
    ]
  },
  {
    "part": 3,
    "topic": "Team Dynamics",
    "questions": [
      "Should personal growth take priority over collective goals in group settings?",
      "Why encourage children to participate in team activities?",
      "How do conflicts within teams impact overall performance?",
      "What strategies could schools use to foster better cooperation?",
      "Do diverse teams produce stronger outcomes than uniform ones?",
      "How has remote work changed collaboration in modern workplaces?",
      "What makes a team leader truly effective?"
    ],
    "answers": [
      "While individual development builds unique skills and expertise, achieving team targets often drives collective success, creating synergy where motivated individuals contribute more effectively toward shared objectives. Companies that balance both priorities see higher innovation rates, as personal growth fuels creativity that benefits the entire organization rather than serving selfish interests.",
      "Joining sports teams or group projects teaches children negotiation, compromise, and empathy—skills that classroom lectures alone struggle to impart through abstract instruction. For example, participating in soccer clubs helps kids resolve disputes over positions and tactics, preparing them for workplace dynamics where cooperation determines career advancement and project success.",
      "Disagreements, when managed constructively through open dialogue, can spark creativity by challenging assumptions and forcing teams to consider alternative perspectives. However, unresolved tensions derail projects by creating hostile atmospheres where members withhold effort, so establishing clear communication protocols like regular feedback sessions transforms potential conflicts into productive debates.",
      "Schools could integrate project-based learning where students collaborate on real community problems, enhancing engagement while developing practical teamwork abilities that transfer to professional contexts. This hands-on method not only boosts cooperation skills but also makes education more relevant by connecting classroom theory to tangible outcomes students can see and measure.",
      "Diverse teams bring varied cultural perspectives and problem-solving approaches, leading to innovative solutions that homogeneous groups might miss due to shared blind spots and similar thinking patterns. Celebrating differences rather than forcing conformity unlocks greater creative potential, though teams must invest time in building trust across cultural boundaries to realize these benefits fully.",
      "Remote work relies heavily on digital collaboration tools like video conferencing and project management platforms, strengthening virtual bonds through frequent check-ins but sometimes weakening personal connections that develop through spontaneous office interactions. Hybrid models combining online efficiency with periodic in-person gatherings seem ideal for balancing productivity with relationship-building that sustains long-term team cohesion.",
      "Effective leaders inspire through example while delegating authority appropriately, creating environments where team members feel valued and empowered to contribute ideas without fear of criticism. They balance decisiveness with openness to feedback, recognizing that strong leadership means guiding rather than controlling every detail of team operations."
    ]
  },
  {
    "part": 3,
    "topic": "Travel and Tourism",
    "questions": [
      "How has travel changed in recent decades?",
      "What are the benefits of international tourism?",
      "Should governments limit tourist numbers?",
      "How does tourism affect local communities?",
      "What makes sustainable tourism different?",
      "How might travel change in the future?"
    ],
    "answers": [
      "Budget airlines and online booking platforms have democratized international travel that was once exclusive to wealthy elites, enabling middle-class families to experience foreign cultures firsthand. This accessibility explosion has made global connections more tangible while creating environmental concerns from aviation emissions and overtourism straining popular destinations beyond capacity to maintain quality experiences or protect heritage sites from damage caused by visitor volume.",
      "Tourism generates foreign exchange and employment for developing nations while exposing visitors to different perspectives that challenge stereotypes and build cross-cultural understanding. Personal travel experiences create emotional connections that abstract knowledge cannot replicate, potentially fostering international cooperation and peace through mutual appreciation, though shallow tourism focusing on photo opportunities rather than genuine engagement limits these intercultural benefits significantly.",
      "Restricting visitor numbers protects fragile ecosystems and prevents cultural sites from deteriorating under foot traffic, maintaining long-term viability even if limiting short-term revenue. Venice and Machu Picchu implementing entry caps demonstrate how preservation concerns eventually outweigh unlimited access that threatens the very attractions tourists seek, though balancing local economic dependence on tourism with conservation creates political tensions between stakeholders with competing interests.",
      "Tourism provides income opportunities through lodging, guiding, and handicrafts, potentially lifting communities from poverty when revenue stays local rather than flowing to foreign corporations. However, tourism can also inflate living costs as prices rise for tourists, displacing long-term residents who cannot afford gentrified neighborhoods, while seasonal employment creates income instability and dependency on industries vulnerable to global events like pandemics that halt travel instantly.",
      "Sustainable tourism minimizes environmental impact through eco-lodges and supports cultural preservation by hiring local guides and sourcing food from community suppliers, ensuring benefits remain local. This approach prioritizes long-term community well-being over maximizing short-term profits, though genuinely sustainable practices cost more than mass tourism, limiting accessibility and raising questions about whether environmental consciousness should remain a luxury available primarily to wealthy travelers willing to pay premiums.",
      "Virtual reality might satisfy some travel desires without emissions, offering immersive experiences for those unable to travel physically due to financial or health limitations. However, most people will likely continue valuing physical travel for authentic experiences technology cannot fully replicate, suggesting future travel may become more intentional and less frequent as environmental consciousness grows and carbon costs increase, shifting patterns toward longer, more meaningful trips replacing quick weekend getaways."
    ]
  },
  {
    "part": 3,
    "topic": "Urban Development",
    "questions": [
      "What challenges do rapidly growing cities face?",
      "How can urban planning improve quality of life?",
      "Should governments prioritize public spaces in cities?",
      "What role do green areas play in metropolitan regions?",
      "How might smart city technology reshape urban living?",
      "Are skyscrapers beneficial for community development?"
    ],
    "answers": [
      "Fast-expanding cities struggle with traffic congestion, housing shortages, and overtaxed infrastructure that can't keep pace with population growth. These problems create stress for residents while deterring businesses from investing in areas where basic services like water and electricity remain unreliable, potentially stalling economic development that initially drove urban expansion.",
      "Thoughtful planning that mixes residential, commercial, and recreational zones reduces commute times while creating vibrant neighborhoods where people live, work, and socialize within walkable distances. Integrated public transit networks connecting these mixed-use areas decrease car dependency, lowering pollution while fostering chance encounters that build social capital and community bonds weakened by suburban sprawl isolating residents in separate functional zones.",
      "Absolutely—parks and plazas provide gathering spaces essential for civic life, hosting everything from farmers markets to political demonstrations that constitute democratic participation. Without these commons, cities become mere collections of private spaces where commercial transactions dominate, eroding the public sphere where diverse citizens interact across class lines and build solidarity through shared experiences that transcend individual consumer identities.",
      "Green spaces cool cities through shade and evaporation, mitigating urban heat islands that make summers dangerously hot while improving air quality by filtering pollutants that concentrate in built environments. Psychologically, access to nature within cities reduces stress and promotes mental well-being, benefits quantified in studies showing lower healthcare costs for residents living near parks compared to those surrounded only by concrete and asphalt.",
      "Smart sensors monitoring traffic and air quality enable responsive infrastructure adjustments, like traffic lights adapting to real-time congestion or ventilation systems activating when pollution spikes. However, surveillance concerns arise when data collection tracks individual movements, so implementing smart technology requires balancing efficiency gains against privacy rights through transparent governance that prevents authoritarian misuse of urban monitoring capabilities.",
      "While skyscrapers maximize land use in expensive urban cores, allowing more residents and businesses per square meter, they can create isolated vertical communities lacking street-level vibrancy that fosters spontaneous interactions. Successful high-rise development includes ground-floor retail and public amenities that connect towers to surrounding neighborhoods, preventing the sterile atmosphere that characterizes some modern developments prioritizing density over livability."
    ]
  },
  {
    "part": 3,
    "topic": "Work-Life Balance",
    "questions": [
      "Why do people struggle to balance professional and personal life?",
      "What strategies help maintain healthy work boundaries?",
      "Should companies enforce mandatory time off?",
      "How has remote work affected work-life integration?",
      "What role does leisure play in productivity?",
      "How might future workplaces support employee well-being?"
    ],
    "answers": [
      "Intense workplace competition and always-on digital connectivity blur boundaries between professional responsibilities and personal time, creating pressure to respond to emails evenings and weekends. Career advancement often rewards those who sacrifice family time, establishing toxic cultures where overwork becomes normalized rather than questioned, leading to burnout that ultimately decreases productivity despite appearing dedicated in the short term through visible long hours.",
      "Setting clear schedules with designated work periods helps create mental separation, while disabling notifications after hours prevents constant interruptions that fragment attention and prevent genuine relaxation. Communicating boundaries to colleagues and supervisors establishes expectations that protect personal time, though this requires workplace cultures that respect limits rather than penalizing those who prioritize well-being over performative busyness that masquerades as commitment.",
      "Mandatory vacation policies prevent workaholic tendencies while ensuring employees return refreshed, benefiting companies through improved creativity and engagement from rested workers. Some nations legally require minimum vacation days, recognizing that individual workers often feel unable to take time off voluntarily due to competitive pressures, so systemic requirements protect workers collectively while preventing companies from exploiting voluntary overwork that damages long-term productivity.",
      "Remote work offers flexibility to manage personal obligations like childcare or exercise, potentially improving balance by eliminating commutes and allowing schedule customization. However, home-office arrangements can also intensify work intrusion when professional and domestic spaces merge, making it harder to mentally disconnect when the laptop sits steps from the bedroom, blurring temporal and spatial boundaries that previously signaled transitions between work and home modes.",
      "Leisure recharges mental energy and provides perspective that enhances problem-solving abilities, making downtime productive rather than wasteful despite appearing unproductive in immediate output terms. Hobbies and social activities outside work develop diverse skills and networks that indirectly benefit careers, while preventing burnout that devastates productivity far more than occasional breaks that seem like lost time when judged by narrow efficiency metrics.",
      "Progressive workplaces might offer flexible schedules, on-site childcare, and mental health resources that acknowledge employees as whole persons rather than merely productive units. Four-day workweeks being piloted in some countries show promising results for both employee satisfaction and maintained productivity, suggesting future norms may prioritize sustainability and human flourishing over extractive practices that maximize short-term output while burning out talent."
    ]
  }
];
