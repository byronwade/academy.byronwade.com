export type Course = {
  id: string;
  title: string;
  description: string;
};

export const courses: Course[] = [
  {
    id: 'intro-math',
    title: 'Intro to Mathematics',
    description: 'Learn basic math operations with interactive problems.',
  },
  {
    id: 'physics-basics',
    title: 'Physics Basics',
    description: 'Explore fundamental physics concepts like motion and energy.',
  },
  {
    id: 'cs-fundamentals',
    title: 'Computer Science Fundamentals',
    description: 'Understand algorithms and data structures through puzzles.',
  },
];
