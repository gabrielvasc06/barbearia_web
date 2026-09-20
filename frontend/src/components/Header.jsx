import { Link, NavLink } from 'react-router-dom'
import { BarberLogo } from './BarberLogo'
import { Button } from './Button'

const navLinks = [
  { to: '/', label: 'Início', end: true },
  { to: '/servicos', label: 'Serviços' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' }
]

export function Header({ showCta = true }) {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand brand-link">
          <BarberLogo />
          <span>Barbearia Web</span>
        </Link>

        <nav className="nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {showCta && <Button to="/agendamento">Agendar</Button>}
      </div>
    </header>
  )
}