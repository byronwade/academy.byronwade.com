export type Chapter = {
  title: string;
  description: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  details: string;
  chapters: Chapter[];
};

export const courses: Course[] = [
  {
    id: 'plumbing-beginner',
    title: 'Plumbing Beginner Guide',
    description: 'Get started with basic plumbing skills.',
    price: 49,
    details:
      'Introductory course covering fundamental plumbing concepts with interactive diagrams and videos.',
    chapters: [
      {
        title: 'Tools Overview',
        description: 'Learn about essential plumbing tools and safety gear.',
      },
      {
        title: 'Pipe Installation Basics',
        description: 'Understand pipe materials and basic installation techniques.',
      },
    ],
  },
  {
    id: 'plumbing-ce',
    title: 'Plumbing Continuing Education',
    description: 'Stay current with plumbing codes and best practices.',
    price: 99,
    details:
      'Updates and advanced topics to keep licensed plumbers up to date. Interactive videos and charts help reinforce learning.',
    chapters: [
      {
        title: 'Code Updates',
        description: 'Review the latest plumbing code changes.',
      },
      {
        title: 'Safety Practices',
        description: 'Advanced safety procedures and compliance.',
      },
    ],
  },
  {
    id: 'plumbing-master',
    title: 'Plumbing Master Course',
    description: 'Advanced training for master plumbers.',
    price: 199,
    details:
      'Deep dive into complex systems, leadership, and advanced code compliance. Includes interactive case studies.',
    chapters: [
      {
        title: 'Commercial Systems',
        description: 'Design and maintain large-scale plumbing installations.',
      },
      {
        title: 'Green Plumbing Technology',
        description: 'Explore sustainable and energy-efficient plumbing solutions.',
      },
    ],
  },
  {
    id: 'hvac-beginner',
    title: 'HVAC Beginner Guide',
    description: 'Learn the basics of heating, ventilation, and air conditioning.',
    price: 49,
    details:
      'Foundational HVAC concepts with interactive schematics and videos to build core skills.',
    chapters: [
      {
        title: 'HVAC Tools and Safety',
        description: 'Introduction to HVAC tools and safe operation.',
      },
      {
        title: 'System Fundamentals',
        description: 'Overview of heating and cooling system components.',
      },
    ],
  },
  {
    id: 'hvac-ce',
    title: 'HVAC Continuing Education',
    description: 'Update your HVAC knowledge and maintain certification.',
    price: 99,
    details:
      'Covers code updates, efficiency standards, and troubleshooting techniques using interactive content.',
    chapters: [
      {
        title: 'Energy Efficiency Standards',
        description: 'Study new efficiency requirements and best practices.',
      },
      {
        title: 'Advanced Troubleshooting',
        description: 'Interactive scenarios to diagnose complex HVAC issues.',
      },
    ],
  },
  {
    id: 'hvac-master',
    title: 'HVAC Master Course',
    description: 'Master-level training for experienced HVAC technicians.',
    price: 199,
    details:
      'Comprehensive coverage of system design, project management, and cutting-edge technology with interactive simulations.',
    chapters: [
      {
        title: 'System Design',
        description: 'Plan and design large-scale HVAC systems.',
      },
      {
        title: 'Project Leadership',
        description: 'Manage teams and complex installations effectively.',
      },
    ],
  },
  {
    id: 'electrical-beginner',
    title: 'Electrical Beginner Guide',
    description: 'Understand basic electrical theory and practice.',
    price: 49,
    details:
      'Starter course covering essential electrical concepts with interactive circuit diagrams and videos.',
    chapters: [
      {
        title: 'Electrical Safety',
        description: 'Fundamental safety procedures and personal protective equipment.',
      },
      {
        title: 'Circuit Basics',
        description: 'Learn about circuits, current, and voltage.',
      },
    ],
  },
  {
    id: 'electrical-ce',
    title: 'Electrical Continuing Education',
    description: 'Keep up with electrical codes and emerging technologies.',
    price: 99,
    details:
      'Explores recent code revisions, smart systems, and interactive problem-solving exercises.',
    chapters: [
      {
        title: 'Code Revisions',
        description: 'Detailed look at the latest National Electrical Code updates.',
      },
      {
        title: 'Smart Technologies',
        description: 'Integrating smart devices and controls safely.',
      },
    ],
  },
  {
    id: 'electrical-master',
    title: 'Electrical Master Course',
    description: 'Expert-level course for seasoned electricians.',
    price: 199,
    details:
      'Advanced topics including industrial systems, leadership, and interactive design projects.',
    chapters: [
      {
        title: 'Industrial Systems',
        description: 'Design and maintain complex industrial electrical networks.',
      },
      {
        title: 'Leadership and Management',
        description: 'Lead teams and manage large electrical projects.',
      },
    ],
  },
];
