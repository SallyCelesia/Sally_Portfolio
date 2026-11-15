// Placeholder addresses. Replace them with your real profiles.
const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sallycelesia/',
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zM9.5 9.75h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75z" />
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SallyCelesia',
    icon: (
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    ),
  },
  {
    label: 'Email - sallycelesia@gmail.com',
    href: 'mailto:sallycelesia@gmail.com',
    icon: (
      <path d="M2 5h20v14H2V5zm2 2v.5l8 5 8-5V7H4zm16 2.8-7.45 4.66a1 1 0 0 1-1.1 0L4 9.8V17h16V9.8z" />
    ),
  },
];

export default function SocialLinks() {
  return (
    <ul className="social-links" aria-label="Contact and profiles">
      {links.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            className="social-link"
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {icon}
            </svg>
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
