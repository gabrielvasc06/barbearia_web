import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'

const values = [
  { icon: '🎯', title: 'Precisão', description: 'Cada corte é planejado para valorizar o seu estilo e seu rosto.' },
  { icon: '🤝', title: 'Confiança', description: 'Ambiente acolhedor onde você se sente em casa desde a chegada.' },
  { icon: '⭐', title: 'Qualidade', description: 'Produtos premium e técnicas atualizadas das principais tendências.' }
]

export default function SobrePage() {
  return (
    <>
      <Header />

      <main>
        <section className="section about-hero">
          <div className="container">
            <h1>Sobre a Barbearia Web</h1>
            <p className="about-lead">
              Nascemos da paixão pela arte do barbeiro. Há mais de 5 anos
              transformamos cortes de cabelo em experiências de autocuidado,
              unindo técnica, tradição e estilo moderno.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Nossos valores</h2>
            <div className="cards">
              {values.map((value) => (
                <article key={value.title} className="card">
                  <span className="service-icon" aria-hidden="true">{value.icon}</span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container">
            <h2>Experimente a diferença</h2>
            <p>Agende seu horário e conheça nosso atendimento.</p>
            <Button to="/agendamento">Agendar agora</Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}