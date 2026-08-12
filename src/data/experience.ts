/** Work, education, skills and credentials — transcribed from `public/resume.pdf`. */

export type Role = {
  company: string
  title: string
  period: string
  highlights: string[]
}

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
    company: 'Alliance Software Incorporated',
    title: 'Software Developer Intern',
    period: 'September 2025 – March 2026',
    highlights: [
      'Built an internal exit clearance system using React (TypeScript) and C# that automated manual employee offboarding, replacing a manual paper-based routing process across HR and department approvers.',
      'Engineered JWT-based authentication with role-based conditional rendering, giving HR admins and employees distinct access levels and eliminating unauthorized access to sensitive offboarding data.',
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
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'C', 'SQL'],
  },
  {
    label: 'Frameworks & Libraries',
    items: ['React', 'React Native', 'Node.js', 'Express', 'Prisma', 'LangChain'],
  },
  {
    label: 'Databases & Tools',
    items: ['MySQL', 'Milvus', 'Neo4j', 'Git & GitHub', 'Postman', 'MySQL Workbench', 'Claude Code', 'GitHub Copilot', 'Azure DevOps'],
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
  { title: 'CISCO Cyber Security Essentials Certification', date: 'November 2024' },
  { title: 'PHILNITS FE Certification', date: 'October 2024' },
  { title: 'TESDA Programming (JAVA) NC II Certification', date: 'January 2024' },
  { title: 'CISCO CCNav7 Certification', date: 'December 2023' },
]
