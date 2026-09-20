import { Link } from 'react-router-dom'

export function Button({ href, to, variant = 'cta', children }) {
  const className = `${variant}-button`

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  )
}