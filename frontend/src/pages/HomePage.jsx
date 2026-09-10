const barberLogoUrl =
  'https://img.freepik.com/vetores-premium/vetor-de-design-de-logotipo-vintage-de-barbearia_677726-187.jpg?w=2000'

const services = [
  {
    title: 'Corte Clássico',
    description: 'Estilo moderno com acabamento premium para o dia a dia.'
  },
  {
    title: 'Barba e Design',
    description: 'Sobrancelhas, contorno e acabamento refinado com atenção aos detalhes.'
  },
  {
    title: 'Agenda Personalizada',
    description: 'Atendimento saudável, pontual e com experiência memorável.'
  }
]

function BarberLogo() {
  return (
    <img
      className="brand-logo"
      src={barberLogoUrl}
      alt="Logo Barbearia Web"
      loading="eager"
    />
  )
}

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="brand">
            <BarberLogo />
            <span>Barbearia Web</span>
          </div>

          <nav className="nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>

          <a className="cta-button" href="#contato">Agendar</a>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container">
            <div>
              <h1>Estilo, presença e confiança.</h1>
              <p>
                A barbearia ideal para quem busca atendimento de qualidade, ambiente
                sofisticado e cortes pensados para realçar sua identidade.
              </p>

              <div className="hero-actions">
                <a className="primary-button" href="#servicos">Ver serviços</a>
                <a className="cta-button" href="#contato">Reservar horário</a>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-inner">
                <h3>Horário de atendimento</h3>
                <ul>
                  <li>Segunda a Sexta: 09:00 às 19:00</li>
                  <li>Sábado: 09:00 às 17:00</li>
                  <li>Domingo: Fechado</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="servicos">
          <div className="container">
            <h2>Serviços</h2>

            <div className="cards">
              {services.map((service) => (
                <article key={service.title} className="card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="sobre">
          <div className="container">
            <h2>Sobre a barbearia</h2>
            <p>
              Um espaço pensado para valorizar a aparência, a rotina e a autoestima
              de cada cliente, com atenção nos detalhes e um atendimento acolhedor.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer" id="contato">
        <div className="container">
          <p>Rua da Barbearia, 123 • (11) 99999-9999</p>
        </div>
      </footer>
    </>
  )
}
