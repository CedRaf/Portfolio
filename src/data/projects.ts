/**
 * A headline figure. Plain text, unless it should count — then it is split so
 * the number itself can be animated. Splitting beats parsing a number back out
 * of a string. `from` is where the count starts: the baseline being improved on.
 */
export type Figure = { label: string } & (
  | { text: string }
  | { value: number; from: number; suffix: string }
)

type BaseProject = {
  title: string
  period: string
  stack: string[]
  description: string
}

/**
 * `kind` decides the tier a project renders in: the thesis as a full-width case
 * study, client work as cards, personal projects as compact rows.
 */
export type Project = BaseProject &
  (
    | {
        kind: 'thesis'
        figures: Figure[]
        notes: string[]
        repoUrl: string
        paperUrl: string
      }
    | {
        kind: 'client'
        client: string
        /** Client codebases are private, so there is no link — only a figure. */
        figure: { text: string; label: string }
        highlights: string[]
        ongoing: boolean
      }
    | { kind: 'personal'; repoUrl: string }
  )

export const projects: Project[] = [
  {
    kind: 'thesis',
    title: 'Retrieval Augmented Generation Framework',
    period: 'June 2025 – November 2025',
    stack: ['Python', 'Milvus', 'Neo4j', 'LangChain'],
    description:
      'A hybrid RAG framework for financial question answering over 200 SEC filings, routing each query between dense/sparse vector retrieval in Milvus and a Neo4j knowledge graph built from structured financial statements.',
    figures: [
      {
        value: 68,
        from: 53,
        suffix: '%',
        label: 'Answer correctness with graph-based retrieval, up from 53% over a flattened JSON baseline',
      },
      { text: '66%', label: 'Context recall, up from 49% over the same baseline' },
      { text: '97.5%', label: 'Query routing accuracy' },
    ],
    notes: [
      'The full pipeline outperformed a closed-book LLM on every evaluated metric across 17,000 QA pairs.',
      'Official paper published on IEEE Xplore.',
    ],
    repoUrl: 'https://github.com/Shabimbawa/RAG_Framework',
    paperUrl: 'https://ieeexplore.ieee.org/document/11467963',
  },
  // Client work comes from the Freelance role on the résumé, which lists these
  // as engagements under Experience. They have no dates of their own, so each
  // carries the role's period.
  {
    kind: 'client',
    title: 'Order Management System',
    client: 'Rice wholesaler',
    period: 'August 2026 – Present',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Drizzle'],
    description:
      'The order and sales module of a warehouse management system for a local wholesaler.',
    figure: { text: '100+', label: 'order slips processed daily' },
    highlights: [
      "Designed the module's database schemas and backend",
      'Stock deductions sync to warehouse inventory',
      'Daily sales summaries per cashier',
    ],
    ongoing: true,
  },
  {
    kind: 'client',
    title: 'Real-Time Scoreboard System',
    client: 'Pickleball court',
    period: 'August 2026 – Present',
    stack: ['React', 'TypeScript', 'WebSockets'],
    description: 'A real-time scoreboard system running across 2 courts.',
    figure: { text: '<100ms', label: 'display update latency' },
    highlights: [
      'Developing the React (TypeScript) frontend',
      "Dedicated remote devices update each court's TV display over WebSockets",
    ],
    ongoing: true,
  },
  {
    kind: 'personal',
    title: 'Target Trial Emulation',
    period: 'February 2025 – March 2025',
    stack: ['Python', 'pandas', 'scikit-learn'],
    description:
      'A target trial emulation simulation built by translating an existing R implementation to Python and integrating clustering methods to enhance time-to-event simulations.',
    repoUrl: 'https://github.com/CedRaf/Target-Trial-Emulation',
  },
  {
    kind: 'personal',
    title: 'Event Management System',
    period: 'November 2024 – December 2024',
    stack: ['React', 'Node.js', 'Express', 'Prisma', 'MySQL'],
    description:
      'An event management system with a modern web stack, streamlining event scheduling and user access with Google Sign-In authentication.',
    repoUrl: 'https://github.com/CedRaf/Event-Management-System',
  },
  // This and the next project are no longer on the résumé (cut for space), but
  // still true — kept on the site.
  {
    kind: 'personal',
    title: 'Mobile E-Commerce Application',
    period: 'May 2024',
    stack: ['React Native', 'Expo'],
    description:
      'A mobile e-commerce front-end emphasizing a responsive interface for seamless product browsing and user interaction.',
    repoUrl: 'https://github.com/graysonLL/MobDev-Final-Project',
  },
  {
    kind: 'personal',
    title: 'Inventory Management System',
    period: 'October 2023 – December 2023',
    stack: ['React', 'Node.js', 'Express', 'Prisma', 'MySQL'],
    description:
      'An inventory management system focused on improving stock visibility and streamlining inventory operations.',
    repoUrl: 'https://github.com/CedRaf/Inventory-Management-System-Web2',
  },
]
