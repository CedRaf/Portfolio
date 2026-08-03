export type NavItem = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
}

export const site = {
  name: 'Cedric Thomas Y. Rafanan',
  shortName: 'Cedric Rafanan',
  initials: 'CR',
  role: 'Software Developer',
  location: 'Cebu City, Philippines',
  email: 'cedricrafanan27@gmail.com',
  resumeUrl: '/resume.pdf',

  tagline:
    'Hi I\'m Ced!, a Computer Science graduate with hands-on experience in full-stack development and software automation.',

  intro:
    'I build web applications and internal tools that remove manual work. Recently I automated an HR offboarding workflow during a software development internship, and published a hybrid RAG framework for financial data analysis on IEEE Xplore.',
} as const

export const nav: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/CedRaf' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cedric-thomas-rafanan-820a0637a/' },
]
