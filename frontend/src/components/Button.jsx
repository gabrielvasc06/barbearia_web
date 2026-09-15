import { Link } from 'react-router-dom'

  export function Button({ href, to, variant = 'cta', children }) {
  const className = `${variant}-button`

  // Se receber "to", navega interno com React Router
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    )
  }

  // Se receber "href", continua como âncora (#secoes)
  return (
    <a className={className} href={href}>
      {children}
    </a>
  )
}