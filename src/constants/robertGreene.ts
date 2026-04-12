export interface ProfilePoint {
  label: string;
  value: string;
}

export interface ResourceLink {
  name: string;
  url: string;
  description: string;
}

export const PROFILE_POINTS: ProfilePoint[] = [
  { label: 'Born', value: 'May 14, 1959' },
  { label: 'Raised', value: 'Los Angeles, California' },
  { label: 'Education', value: 'Classical Studies at UC Berkeley and University of Wisconsin-Madison' },
  { label: 'Career Context', value: 'Worked over 50 jobs before publishing his first major work in 1998' },
];

export const CORE_PHILOSOPHY =
  'Greene frames power as an inescapable and amoral force in human nature. His work focuses on observing the mechanics of influence instead of denying that those mechanics exist.';

export const GREENE_METHOD =
  'Historical anecdote, philosophical synthesis, and practical strategy: each book blends examples from figures like Machiavelli and Sun Tzu with counter-intuitive lessons designed for modern social and professional conflict.';

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    name: 'Official Website',
    url: 'https://powerseductionandwar.com/',
    description: 'Primary author site and archive.',
  },
  {
    name: 'Official YouTube',
    url: 'https://www.youtube.com/@RobertGreeneOfficial',
    description: 'Interviews, talks, and short strategy clips.',
  },
  {
    name: 'Mastery Substack',
    url: 'https://robertgreene.substack.com/',
    description: 'Long-form writing and recent essays.',
  },
  {
    name: 'Amazon Books',
    url: 'https://www.amazon.com/s?k=Robert+Greene+books',
    description: 'Purchase and format options.',
  },
  {
    name: 'Goodreads Profile',
    url: 'https://www.goodreads.com/author/show/865.Robert_Greene',
    description: 'Ratings, lists, and reading order.',
  },
];

export const NOTABLE_QUOTES = [
  'The future belongs to those who learn more skills and combine them in creative ways.',
  'Your task is to resist the temptation to wish it were all different; instead you must fearlessly accept these circumstances.',
  'Never be whining. Never be complaining. Never be justifying yourself.',
];
