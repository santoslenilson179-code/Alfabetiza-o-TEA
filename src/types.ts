export interface Testimonial {
  id: string;
  name: string;
  role: string;
  childAge?: string;
  avatarColor: string;
  text: string;
  rating: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: string;
  }[];
}

export interface PreviewCard {
  letter: string;
  word: string;
  meaning: string;
  imageEmoji: string;
  color: string;
  syllables: string[];
}
