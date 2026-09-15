import { BarberLogo } from './BarberLogo'
import { Button } from './Button'

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' }
]

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">
          <BarberLogo />
          <span>Barbearia Web</span>
        </div>

        <nav className="nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <Button href="#contato">Agendar</Button>
      </div>
    </header>
  )
}