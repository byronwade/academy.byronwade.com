export type Course = {
  id: string;
  title: string;
  description: string;
};

export const courses: Course[] = [
  {
    id: 'osha-safety',
    title: 'OSHA Safety Training',
    description: 'Comply with OSHA regulations and keep your job sites safe.',
  },
  {
    id: 'electrical-code',
    title: 'Electrical Code Update',
    description:
      'Understand the latest National Electrical Code requirements for contractors.',
  },
  {
    id: 'plumbing-basics',
    title: 'Residential Plumbing Basics',
    description:
      'Review common plumbing systems and installation best practices.',
  },
];
