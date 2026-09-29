/** Work, education, skills and credentials — transcribed from `public/resume.pdf`. */

/** A client engagement inside a role — freelance work is grouped this way. */
export type Engagement = {
  name: string
  highlights: string[]
}

/**
 * A role carries either its own highlights or a set of engagements. Freelance
 * work has no employer, so `company` is optional.
 */
export type Role = {
  company?: string
  title: string
  period: string
} & (
  | { highlights: string[]; engagements?: never }
  | { highlights?: never; engagements: Engagement[] }
)

export type Education = {
  school: string
  credential: string
  location: string
  period: string
  details: string[]
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type Accomplishment = {
  title: string
  date: string
}

export const roles: Role[] = [
  {
    title: 'Freelance Software Developer',
    period: 'August 2026 – Present',
    engagements: [
      {
        name: 'Real-Time Scoreboard System (Pickleball Court)',
        highlights: [
          "Developing the React (TypeScript) frontend for a real-time scoreboard across 2 courts, where dedicated remote devices update each court's TV display over WebSockets with under 100ms latency.",
        ],
      },
      {
        name: 'Order Management System (Rice Wholesaler)',
        highlights: [
          'Building the order and sales module of a warehouse management system for a local wholesaler processing 100+ order slips daily, using React, TypeScript, PostgreSQL and Drizzle ORM.',
          "Designed the module's database schemas and backend, with stock deductions synced to warehouse inventory and daily sales summaries per cashier.",
        ],
      },
    ],
  },
  {
    company: 'Alliance Software Incorporated',
    title: 'Software Developer Intern',
    period: 'September 2025 – March 2026',
    highlights: [
      'Built an internal exit clearance system using React (TypeScript) and C# that replaced paper-based offboarding routing across HR and department approvers.',
      'Engineered JWT-based authentication with role-based conditional rendering, giving HR admins and employees distinct access levels and restricting sensitive offboarding data to authorized roles.',
      'Presented system to stakeholders and worked closely with QA and ~15 employee testers to refine features, incorporating feedback ahead of company-wide rollout.',
    ],
  },
]

export const education: Education[] = [
  {
    school: 'University of San Carlos',
    credential: 'Bachelor of Science in Computer Science',
    location: 'Talamban, Cebu',
    period: 'July 2026',
    details: [
      'Cum Laude — GPA 1.55 / 1.0 Highest',
      "Dean's List 2022–2026",
      'Coursework: Data Structures, Algorithms, Software Engineering, Web & App Development',
    ],
  },
  // No longer on the résumé (cut for space), but still true — kept on the site.
  {
    school: 'Sacred Heart School – Hijas de Jesus',
    credential: 'Kindergarten – Senior High School',
    location: 'Cebu City',
    period: 'June 2022',
    details: ['Senior High School general average: 96'],
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Programming Languages',
    items: ['TypeScript', 'JavaScript', 'C#', 'Python', 'SQL', 'C'],
  },
  {
    label: 'Frameworks & Libraries',
    items: ['React', 'React Native', 'Node.js', 'Express', 'Prisma', 'Drizzle', '.NET'],
  },
  {
    label: 'Databases & Tools',
    items: ['MySQL', 'PostgreSQL', 'Milvus', 'Neo4j', 'Git & GitHub', 'Azure DevOps', 'Postman', 'Vercel', 'Claude Code', 'GitHub Copilot'],
  },
  {
    label: 'Spoken',
    items: ['English (Fluent)', 'Cebuano (Proficient)'],
  },
]

export const accomplishments: Accomplishment[] = [
  { title: 'Tech, AI & Career Readiness Program — Vietnam Immersion', date: 'May 2026' },
  { title: 'AI Experience @ Global City', date: 'May 2026' },
  { title: 'ACDSA 2026 Conference — Thesis Presentation', date: 'February 2026' },
  { title: 'Cisco Cyber Security Essentials Certification', date: 'November 2024' },
  { title: 'PHILNITS FE Certification', date: 'October 2024' },
  { title: 'TESDA Programming (JAVA) NC II Certification', date: 'January 2024' },
  { title: 'Cisco CCNAv7 Certification', date: 'December 2023' },
]
