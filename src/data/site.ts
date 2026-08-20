import type { ComponentType } from 'react'
import { GithubIcon, LinkedInIcon } from '../components/Icons'
import { Mail } from 'lucide-react'

export type NavItem = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export type ContactLink = SocialLink & {
  display: string
}

export type TaglineSegment = {
  text: string
  emphasis?: boolean
}

export const site = {
  name: 'Cedric Thomas Y. Rafanan',
  shortName: 'Cedric Rafanan',
  initials: 'CR',
  role: 'Software Developer',
  subtitle: 'Software Developer, PhilNITS Certified, IEEE Xplore Author',
  location: 'Cebu City, Philippines',
  email: 'cedricrafanan27@gmail.com',
  resumeUrl: '/resume.pdf',

  tagline:
    "Hi, I'm Ced! A Computer Science graduate with hands-on experience in full-stack development and software automation.",

  contactHeading: "Let's Connect!",
  contactBody:
    "I'd love to get on a call and discuss my experiences and how I can fit into your team. I'm open to software development roles and collaboration.",

  intro:
    'I build web applications and internal tools that remove manual work. Recently I automated an HR offboarding workflow during a software development internship, and published a hybrid RAG framework for financial data analysis on IEEE Xplore.',
} as const

export const taglineSegments: TaglineSegment[] = [
  { text: "Hi, I'm Ced! A Computer Science graduate with hands-on experience in " },
  { text: 'full-stack development', emphasis: true },
  { text: ' and ' },
  { text: 'software automation.', emphasis: true },
]

export const nav: NavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const githubUrl = 'https://github.com/CedRaf'
const linkedInUrl =
  'https://linkedin.com/in/cedric-rafanan'

export const socials: SocialLink[] = [
  { label: 'GitHub', href: githubUrl, icon: GithubIcon },
  { label: 'LinkedIn', href: linkedInUrl, icon: LinkedInIcon },
]

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    href: `mailto:${site.email}`,
    display: site.email,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: linkedInUrl,
    display: 'linkedin.com/in/cedric-rafanan',
    icon: LinkedInIcon,
  },
  {
    label: 'GitHub',
    href: githubUrl,
    display: 'github.com/CedRaf',
    icon: GithubIcon,
  },
]
