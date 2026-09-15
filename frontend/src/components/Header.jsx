import { Link } from 'react-router-dom'
import { BarberLogo } from './BarberLogo'
import { Button } from './Button'

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/#servicos', label: 'Serviços' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/#contato', label: 'Contato' }
]

export function Header({ showCta = true }) {
  return (
    <header className="site-header">
      <div className="container">
        {/* Logo + nome clicáveis → voltam pra Home */}
        <Link to="/" className="brand brand-link">
          <BarberLogo />
          <span>Barbearia Web</span>
        </Link>

        <nav className="nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.label} href={link.to}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Só mostra o botão Agendar quando showCta for true */}
        {showCta && <Button to="/agendamento">Agendar</Button>}
      </div>
    </header>
  )
}