export type Project = {
  title: string
  period: string
  stack: string[]
  description: string
  highlights?: string[]
  repoUrl?: string
  paperUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Retrieval Augmented Generation Framework',
    period: 'June 2025 – November 2025',
    stack: ['Python', 'Milvus', 'Neo4j', 'LangChain'],
    description:
      'Undergraduate thesis. A hybrid RAG framework for financial data analysis that combines graph and vector-based retrieval with optimized preprocessing.',
    highlights: [
      'Boosted retrieval performance by ~12% over baseline methods',
      'Official paper published on IEEE Xplore',
    ],
    repoUrl: 'https://github.com/Shabimbawa/RAG_Framework',
    paperUrl: 'https://ieeexplore.ieee.org/document/11467963',
    featured: true,
  },
  {
    title: 'Target Trial Emulation',
    period: 'February 2025 – March 2025',
    stack: ['Python', 'Jupyter Notebook'],
    description:
      'A target trial emulation simulation built by translating an existing R implementation to Python and integrating clustering methods to enhance time-to-event simulations.',
    repoUrl: 'https://github.com/CedRaf/Target-Trial-Emulation',
  },
  {
    title: 'Event Management System',
    period: 'November 2024 – December 2024',
    stack: ['React', 'Node.js', 'Express', 'Prisma', 'MySQL'],
    description:
      'An event management system with a modern web stack, streamlining event scheduling and user access with Google Sign-In authentication.',
    repoUrl: 'https://github.com/CedRaf/Event-Management-System',
    featured: true,
  },
  {
    title: 'Mobile E-Commerce Application',
    period: 'May 2024',
    stack: ['React Native', 'Expo'],
    description:
      'A mobile e-commerce front-end emphasizing a responsive interface for seamless product browsing and user interaction.',
    repoUrl: 'https://github.com/graysonLL/MobDev-Final-Project',
  },
  {
    title: 'Inventory Management System',
    period: 'October 2023 – December 2023',
    stack: ['React', 'Node.js', 'Express', 'Prisma', 'MySQL'],
    description:
      'An inventory management system focused on improving stock visibility and streamlining inventory operations.',
    repoUrl: 'https://github.com/CedRaf/Inventory-Management-System-Web2',
  },
]
