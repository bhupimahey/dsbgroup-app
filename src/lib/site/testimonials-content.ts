export type VideoTestimonial = {
  title: string;
  embedUrl: string;
};

export type TextTestimonial = {
  quote: string;
  name: string;
  role: string;
  imagePath?: string;
};

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    title: 'NBFC licensing & compliance support',
    embedUrl: 'https://www.youtube.com/embed/lJIrF4YjHfQ',
  },
  {
    title: 'Corporate legal advisory experience',
    embedUrl: 'https://www.youtube.com/embed/9No-FiEInLA',
  },
  {
    title: 'Banking & regulatory guidance',
    embedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
  },
];

export const TEXT_TESTIMONIALS: TextTestimonial[] = [
  {
    quote:
      'DSB Law Group gave us practical direction on compliance and helped us move faster with confidence.',
    name: 'Financial Services Client',
    role: 'Managing Director',
  },
  {
    quote:
      'Their advisory is sharp, business-focused, and always responsive when regulations change.',
    name: 'Corporate Client',
    role: 'Head of Legal',
  },
  {
    quote: 'From licensing to governance, the team handled every legal milestone with clarity.',
    name: 'NBFC Founder',
    role: 'CEO',
  },
  {
    quote:
      'We relied on DSB for RBI filings and board governance — their depth in NBFC regulation is outstanding.',
    name: 'Compliance Head',
    role: 'Regional NBFC',
  },
  {
    quote:
      'Labour code transition support was structured, practical, and delivered on tight timelines.',
    name: 'HR Director',
    role: 'Manufacturing Group',
  },
  {
    quote:
      'UCB advisory and audit coordination were handled with precision — a trusted partner for our board.',
    name: 'Urban Cooperative Bank',
    role: 'Chairman',
  },
];
