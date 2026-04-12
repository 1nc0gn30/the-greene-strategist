export interface Book {
  id: string;
  title: string;
  year: string;
  description: string;
  coverImage: string;
  coverColor: string;
  accentColor: string;
  laws?: string[];
  strategies?: string[];
  chapters?: { title: string; content: string }[];
  keyThemes: string[];
  summary: string;
  detailedAnalysis: string;
}

export const BOOKS: Book[] = [
  {
    id: "48-laws-of-power",
    title: "The 48 Laws of Power",
    year: "1998",
    description: "The definitive guide to the mechanics of power and influence.",
    coverImage: "/images/books/48-laws-of-power.jpg",
    coverColor: "bg-orange-950",
    accentColor: "text-orange-500",
    keyThemes: ["Power", "Control", "Strategy", "Prudence", "Manipulation", "Sovereignty"],
    summary: "A distillation of 3,000 years of the history of power into 48 essential laws by drawing from the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz.",
    detailedAnalysis: "The 48 Laws of Power is a handbook for anyone who wants power, observes power, or wants to arm themselves against power. Greene uses historical anecdotes from figures like Talleyrand, Catherine the Great, and Mao Zedong to illustrate how power is gained, maintained, and lost. The book is often criticized for its perceived ruthlessness, but Greene argues that power is an amoral force, and understanding its mechanics is essential for survival in any competitive environment.",
    laws: [
      "Law 1: Never Outshine the Master",
      "Law 2: Never Put Too Much Trust in Friends, Learn How to Use Enemies",
      "Law 3: Conceal Your Intentions",
      "Law 4: Always Say Less Than Necessary",
      "Law 5: So Much Depends on Reputation – Guard It with Your Life",
      "Law 6: Court Attention at All Cost",
      "Law 7: Get Others to Do the Work for You, but Always Take the Credit",
      "Law 8: Make Other People Come to You – Use Bait if Necessary",
      "Law 9: Win Through Your Actions, Never Through Argument",
      "Law 10: Infection: Avoid the Unhappy and Unlucky",
      "Law 11: Learn to Keep People Dependent on You",
      "Law 12: Use Selective Honesty and Generosity to Disarm Your Victim",
      "Law 13: When Asking for Help, Appeal to People’s Self-Interest, Never to Their Mercy or Gratitude",
      "Law 14: Pose as a Friend, Work as a Spy",
      "Law 15: Crush Your Enemy Totally",
      "Law 16: Use Absence to Increase Respect and Honor",
      "Law 17: Keep Others in Suspended Terror: Cultivate an Air of Unpredictability",
      "Law 18: Do Not Build Fortresses to Protect Yourself – Isolation is Dangerous",
      "Law 19: Know Who You’re Dealing with – Do Not Offend the Wrong Person",
      "Law 20: Do Not Commit to Anyone",
      "Law 21: Play a Sucker to Catch a Sucker – Seem Dumber Than Your Mark",
      "Law 22: Use the Surrender Tactic: Transform Weakness into Power",
      "Law 23: Concentrate Your Forces",
      "Law 24: Play the Perfect Courtier",
      "Law 25: Re-Create Yourself",
      "Law 26: Keep Your Hands Clean",
      "Law 27: Play on People’s Need to Believe to Create a Cultlike Following",
      "Law 28: Enter Action with Boldness",
      "Law 29: Plan All the Way to the End",
      "Law 30: Make Your Accomplishments Seem Effortless",
      "Law 31: Control the Options: Get Others to Play with the Cards You Deal",
      "Law 32: Play to People’s Fantasies",
      "Law 33: Discover Each Man’s Thumbscrew",
      "Law 34: Be Royal in Your Own Fashion: Act Like a King to be Treated Like One",
      "Law 35: Master the Art of Timing",
      "Law 36: Disdain Things You Cannot Have: Ignoring Them is the Best Revenge",
      "Law 37: Create Compelling Spectacles",
      "Law 38: Think as You Like but Behave Like Others",
      "Law 39: Stir Up Waters to Catch Fish",
      "Law 40: Despise the Free Lunch",
      "Law 41: Avoid Stepping into a Great Man’s Shoes",
      "Law 42: Strike the Shepherd and the Sheep Will Scatter",
      "Law 43: Work on the Hearts and Minds of Others",
      "Law 44: Disarm and Infuriate with the Mirror Effect",
      "Law 45: Preach the Need for Change, but Never Reform Too Much at Once",
      "Law 46: Never Appear Too Perfect",
      "Law 47: Do Not Go Past the Mark You Aimed For; In Victory, Learn When to Stop",
      "Law 48: Assume Formlessness"
    ]
  },
  {
    id: "art-of-seduction",
    title: "The Art of Seduction",
    year: "2001",
    description: "An indispensable primer on the ultimate form of power.",
    coverImage: "/images/books/art-of-seduction.jpg",
    coverColor: "bg-red-950",
    accentColor: "text-red-500",
    keyThemes: ["Seduction", "Charm", "Psychology", "Manipulation", "Eroticism", "Social Power"],
    summary: "The Art of Seduction explores the character types of seducers and the process of seduction, viewing it as a form of psychological warfare.",
    detailedAnalysis: "Greene breaks down the process of seduction into two parts: the Seductive Character and the Seductive Process. He identifies nine types of seducers (The Siren, The Rake, The Ideal Lover, etc.) and provides a 24-step process for successfully seducing a target. The book is a deep dive into human psychology, vanity, and the desire for transcendence through another person.",
    chapters: [
      { title: "The Seducer's Characters", content: "The Siren, The Rake, The Ideal Lover, The Dandy, The Natural, The Coquette, The Charmer, The Charismatic, The Star." },
      { title: "The Seductive Process", content: "Phase One: Separation (Choosing the victim, Creating a false sense of security, Sending mixed signals). Phase Two: Lead Astray (Creating desire, Using the power of suggestion, Entering their spirit). Phase Three: The Precipice (Deepening the effect, Using the 'hook', Creating a sense of danger). Phase Four: Moving in for the Kill (The physical move, The aftermath)." }
    ],
    laws: [
      "The Siren", "The Rake", "The Ideal Lover", "The Dandy", "The Natural", "The Coquette", "The Charmer", "The Charismatic", "The Star", "The Anti-Seducer"
    ]
  },
  {
    id: "33-strategies-of-war",
    title: "The 33 Strategies of War",
    year: "2006",
    description: "A guide to the social game of daily life as informed by military principles.",
    coverImage: "/images/books/33-strategies-of-war.jpg",
    coverColor: "bg-zinc-900",
    accentColor: "text-zinc-400",
    keyThemes: ["Conflict", "Strategy", "Warfare", "Leadership", "Psychological Warfare"],
    summary: "Spanning world civilizations, this book synthesizes military wisdom into strategies for everyday life.",
    detailedAnalysis: "Greene applies the lessons of history's greatest generals (Napoleon, Sun Tzu, Alexander the Great) to modern social and professional conflicts. He categorizes strategies into Self-Directed Warfare, Organizational Warfare, Defensive Warfare, and Offensive Warfare. The core message is that life is a series of conflicts, and one must be strategic to survive and thrive.",
    strategies: [
      "1. Declare War on Your Enemies: The Polarity Strategy",
      "2. Do Not Fight the Last War: The Guerrilla-War-of-the-Mind Strategy",
      "3. Amidst the Turmoil of Events, Do Not Lose Your Presence of Mind: The Counterbalance Strategy",
      "4. Create a Threatening Presence: Deterrence Strategies",
      "5. Avoid the Snares of Groupthink: The Command-and-Control Strategy",
      "6. Segment Your Forces: The Controlled-Chaos Strategy",
      "7. Transform Your War into a Crusade: Morale Strategies",
      "8. Pick Your Battles: The Perfect-Economy Strategy",
      "9. Turn the Tables: The Counterattack Strategy",
      "10. Create a Threatening Presence: Deterrence Strategies",
      "11. Trade Space for Time: The Non-Engagement Strategy",
      "12. Lose Battles but Win the War: Grand Strategy",
      "13. Know Your Enemy: The Intelligence Strategy",
      "14. Overwhelm Resistance with Speed and Suddenness: The Blitzkrieg Strategy",
      "15. Control the Dynamic: Forcing Strategies",
      "16. Hit Them Where It Hurts: The Center-of-Gravity Strategy",
      "17. Defeat Them in Detail: The Divide-and-Conquer Strategy",
      "18. Expose and Attack Your Opponent's Soft Flank: The Turning Strategy",
      "19. Envelop the Enemy: The Annihilation Strategy",
      "20. Maneuver Them into Weakness: The Ripening-for-the-Scythe Strategy",
      "21. Negotiate While Advancing: The Diplomatic-War Strategy",
      "22. Know How to End Things: The Exit Strategy",
      "23. Weave a Seamless Blend of Fact and Fiction: Perception-Framing Strategies",
      "24. Take the Line of Least Expectation: The Ordinary-Extraordinary Strategy",
      "25. Occupy the Moral High Ground: The Righteousness Strategy",
      "26. Deny Them Targets: The Void Strategy",
      "27. Seem to Work for the Interests of Others while Furthering Your Own: The Alliance Strategy",
      "28. Give Your Rivals Enough Rope to Hang Themselves: The One-Upmanship Strategy",
      "29. Take Small Bites: The Fait Accompli Strategy",
      "30. Penetrate Their Minds: Communication Strategies",
      "31. Destroy from Within: The Inner-Front Strategy",
      "32. Dominate while Seeming to Submit: The Passive-Aggression Strategy",
      "33. Sow Uncertainty and Panic through Acts of Terror: The Chain-Reaction Strategy"
    ]
  },
  {
    id: "the-50th-law",
    title: "The 50th Law",
    year: "2009",
    description: "A collaboration with 50 Cent on the power of fearlessness.",
    coverImage: "/images/books/the-50th-law.jpg",
    coverColor: "bg-stone-900",
    accentColor: "text-stone-300",
    keyThemes: ["Fearlessness", "Self-Reliance", "Opportunism", "Realism", "Hustle"],
    summary: "The 50th Law is a book on strategy and fearlessness by 50 Cent and Robert Greene.",
    detailedAnalysis: "The book explores the concept of 'fearlessness' as the ultimate power. By examining 50 Cent's life in the streets and in the music industry, Greene identifies ten lessons of fearlessness. The core idea is that most of our limitations are self-imposed by fear, and by confronting reality without fear, we gain immense power.",
    chapters: [
      { title: "1. See Things for What They Are – Intense Realism", content: "The ability to look at things as they are, not as you want them to be." },
      { title: "2. Make Everything Your Own – Self-Reliance", content: "Relying on yourself and your own resources." },
      { title: "3. Opportunism", content: "Turning every negative into a positive." },
      { title: "4. Keep Moving – Calculated Momentum", content: "The power of constant movement and adaptation." },
      { title: "5. Know When to Be Bad – Aggression", content: "Using aggression strategically." },
      { title: "6. Lead from the Front – Authority", content: "The importance of taking charge." },
      { title: "7. Know Your Environment from the Inside Out – Connection", content: "Deep understanding of your surroundings." },
      { title: "8. Respect the Process – Mastery", content: "The long-term path to excellence." },
      { title: "9. Push Beyond Your Limits – Self-Belief", content: "Overcoming internal barriers." },
      { title: "10. Confront Your Mortality – The Sublime", content: "Using the awareness of death to live more intensely." }
    ]
  },
  {
    id: "mastery",
    title: "Mastery",
    year: "2012",
    description: "The path to greatness and achieving peak performance.",
    coverImage: "/images/books/mastery.jpg",
    coverColor: "bg-blue-950",
    accentColor: "text-blue-400",
    keyThemes: ["Excellence", "Apprenticeship", "Creativity", "Focus", "Purpose"],
    summary: "Mastery examines the lives of historical figures to distill the traits that made them masters.",
    detailedAnalysis: "Mastery debunks the myth of 'genius' as an innate gift. Instead, Greene argues that mastery is a process available to anyone who follows a specific path: discovering one's 'Life's Task,' undergoing a rigorous apprenticeship, gaining social intelligence, and finally entering the creative-active phase. The book is a roadmap for achieving high-level skill and fulfillment.",
    chapters: [
      { title: "I. Discover Your Calling: The Life's Task", content: "Finding the work you were meant to do." },
      { title: "II. Submit to Reality: The Ideal Apprenticeship", content: "The phase of learning and observation." },
      { title: "III. Absorb the Master’s Power: The Mentor Dynamic", content: "The importance of guidance." },
      { title: "IV. See People as They Are: Social Intelligence", content: "Navigating the human environment." },
      { title: "V. Awaken the Dimensional Mind: The Creative-Active Phase", content: "Applying your skills in new and creative ways." },
      { title: "VI. Fuse the Intuitive with the Rational: Mastery", content: "The final stage of peak performance." }
    ]
  },
  {
    id: "laws-of-human-nature",
    title: "The Laws of Human Nature",
    year: "2018",
    description: "A deep dive into the hidden motivations of human behavior.",
    coverImage: "/images/books/laws-of-human-nature.jpg",
    coverColor: "bg-emerald-950",
    accentColor: "text-emerald-500",
    keyThemes: ["Psychology", "Empathy", "Self-Awareness", "Observation", "Rationality"],
    summary: "This book helps us understand why people do what they do, providing tools to decode behavior.",
    detailedAnalysis: "Greene's most ambitious work, The Laws of Human Nature, is a comprehensive study of the human drive. He identifies 18 laws that govern our behavior, from the Law of Irrationality to the Law of Death Denial. By understanding these laws, we can become more rational, more empathetic, and better at navigating social dynamics. It is a guide to self-mastery and social influence.",
    laws: [
      "1. The Law of Irrationality",
      "2. The Law of Narcissism",
      "3. The Law of Role-playing",
      "4. The Law of Compulsive Behavior",
      "5. The Law of Covetousness",
      "6. The Law of Short-sightedness",
      "7. The Law of Defensiveness",
      "8. The Law of Self-sabotage",
      "9. The Law of Repression",
      "10. The Law of Envy",
      "11. The Law of Grandiosity",
      "12. The Law of Gender Rigidity",
      "13. The Law of Aimlessness",
      "14. The Law of Conformity",
      "15. The Law of Fickleness",
      "16. The Law of Aggression",
      "17. The Law of Generational Myopia",
      "18. The Law of Death Denial"
    ]
  },
  {
    id: "the-daily-laws",
    title: "The Daily Laws",
    year: "2021",
    description: "366 Meditations on Power, Seduction, Mastery, Strategy, and Human Nature.",
    coverImage: "/images/books/the-daily-laws.png",
    coverColor: "bg-orange-900",
    accentColor: "text-orange-300",
    keyThemes: ["Daily Practice", "Meditation", "Wisdom", "Discipline", "Habit"],
    summary: "A daily devotional that distills Greene's decades of research into bite-sized daily lessons.",
    detailedAnalysis: "The Daily Laws is designed to be read one page per day over the course of a year. It organizes Greene's core teachings into monthly themes: January (Your Life's Task), February (The Ideal Apprenticeship), March (The Master at Work), April (The Perfect Courtier), May (The Seducer's Gaze), June (The Master of Persuasion), July (The Strategic Warrior), August (The Laws of Human Nature), September (The Law of Irrationality), October (The Law of Narcissism), November (The Law of Role-Playing), and December (The Law of Death Denial). It is the ultimate synthesis of his entire body of work.",
    chapters: [
      { title: "January: Your Life's Task", content: "Focusing on finding your purpose and unique contribution." },
      { title: "February-April: The Apprenticeship & Power", content: "Learning the ropes and understanding social dynamics." },
      { title: "May-July: Seduction & Strategy", content: "Mastering the arts of influence and conflict." },
      { title: "August-December: Human Nature", content: "Deepening your understanding of yourself and others." }
    ]
  }
];
