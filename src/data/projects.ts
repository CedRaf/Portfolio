/**
 * A headline figure. Plain text, unless it should count — then it is split so
 * the number itself can be animated. Splitting beats parsing a number back out
 * of a string. `from` is where the count starts: the baseline being improved on.
 */
export type Figure = { label: string } & (
  | { text: string }
  | { value: number; from: number; suffix: string }
)

export type Shot = { src: string; width: number; height: number; alt: string }

/**
 * A carousel slide. Slides render at 2:1; `contain` shows a differently shaped
 * screen whole on the canvas instead of cropping it to fill.
 */
export type Slide = Shot & { name: string; contain?: boolean }

/**
 * Images for a featured project: one image, or a carousel of screens. The
 * first slide doubles as the selector thumbnail.
 */
export type Media =
  | { kind: 'single'; shot: Shot }
  | { kind: 'carousel'; label: string; slides: Slide[] }

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
        media: Media
      }
    | {
        kind: 'client'
        client: string
        /** Client codebases are private, so there is no link — only a figure. */
        figure: { text: string; label: string }
        /** Both are team builds, so the card says which part was mine. */
        team: boolean
        role: string
        highlights: string[]
        ongoing: boolean
        media: Media
      }
    | { kind: 'personal'; repoUrl: string }
  )

/** The projects shown in the selector, rather than as plain rows. */
export type Featured = Extract<Project, { kind: 'thesis' | 'client' }>

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
    // The IEEE slide is cropped to the title and authors on purpose: the
    // published abstract misstates the results (63% / 31% / 12%), an error
    // missed before publication. The figures above are the correct ones,
    // matching the résumé. Don't show the abstract until an erratum fixes it.
    media: {
      kind: 'carousel',
      label: 'Thesis publication and repository',
      slides: [
        {
          name: 'IEEE Xplore',
          src: '/images/rag-paper-listing.png',
          width: 1316,
          height: 236,
          contain: true,
          alt: 'IEEE Xplore listing: Integrating Dense, Sparse, and Graph-Based Approaches in Financial Data Analysis for a Retrieval-Augmented Generation Framework, listing Cedric Thomas Y. Rafanan, Rhenz Gerard G. Largo and Glenn B. Pepito as authors',
        },
        {
          name: 'GitHub repository',
          src: '/images/rag-repository-1200.jpg',
          width: 1200,
          height: 600,
          alt: 'GitHub preview card for Shabimbawa/RAG_Framework, the team thesis repository, showing 2 contributors',
        },
      ],
    },
  },
  // Client work comes from the Freelance role on the résumé, which lists these
  // as engagements under Experience. They have no dates of their own, so each
  // carries the role's period.
  //
  // TODO: the team framing and the scoreboard's WebSocket role are ahead of the
  // Sept 2026 résumé, which says only "Developing the React (TypeScript)
  // frontend". Cedric is updating the PDF to match — re-check once it lands.
  {
    kind: 'client',
    title: 'Order Management System',
    client: 'Rice wholesaler',
    period: 'August 2026 – Present',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Drizzle'],
    description: 'A warehouse management system for a local wholesaler.',
    figure: { text: '100+', label: 'order slips processed daily' },
    team: true,
    role: 'The order and sales module, including its database schemas and backend.',
    highlights: [
      'Stock deductions sync to warehouse inventory',
      'Daily sales summaries per cashier',
    ],
    // Dummy data throughout: every name, address, amount, container number and
    // login shown is seed data. The order module leads because it's Cedric's
    // part, and the first slide is also the selector thumbnail.
    media: {
      kind: 'carousel',
      label: 'Order management system screens',
      slides: [
        {
          name: 'Order module',
          src: '/images/rice-wholesaler-order-module-1280.jpg',
          width: 1280,
          height: 639,
          alt: 'The order slips screen: a filterable table of slips with date, customer, cashier, address, rice articles and quantities, payment status and total amount',
        },
        {
          name: 'Inventory module',
          src: '/images/rice-wholesaler-inventory-module-1280.jpg',
          width: 1280,
          height: 638,
          alt: 'The international shipments screen: incoming shipments by supplier with their containers, sack counts and unloading progress',
        },
        {
          name: 'Sign-in',
          src: '/images/rice-wholesaler-login-1280.jpg',
          width: 1280,
          height: 637,
          alt: 'The sign-in screen for the Rice Wholesaler inventory management system, with email and password fields',
        },
      ],
    },
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
    team: true,
    role: "The WebSocket layer, server and client, and the frontend's core logic and state.",
    highlights: [
      "Dedicated remote devices update each court's TV display over WebSockets",
    ],
    // Sample screens with no client data.
    // TODO: confirm the client is happy for their venue branding, visible on
    // the display, to be shown here.
    media: {
      kind: 'carousel',
      label: 'Scoreboard screens',
      slides: [
        {
          name: 'Solid',
          src: '/images/scoreboard-theme1-1280.jpg',
          width: 1280,
          height: 632,
          alt: "Court 1 TV scoreboard in the solid theme: a doubles match at 0–0, with each side's score on a coloured panel, the serving player and a match timer",
        },
        {
          name: 'Venue backdrop',
          src: '/images/scoreboard-theme2-1280.jpg',
          width: 1280,
          height: 639,
          alt: 'The same court 1 scoreboard in the venue backdrop theme, with translucent score panels over a blurred photo of the court',
        },
        {
          name: 'Controller',
          src: '/images/scoreboard-controller-718.jpg',
          width: 718,
          height: 836,
          contain: true,
          alt: 'Controller screen for court 1, where match format, player names and the serving side are set up before starting a match',
        },
      ],
    },
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
