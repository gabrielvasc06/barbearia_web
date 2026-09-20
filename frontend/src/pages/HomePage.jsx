import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Section } from '../components/Section'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'
import { services } from '../data/services'

const highlights = [
  {
    icon: '🏆',
    title: 'Profissionais premiados',
    description: 'Equipe com anos de experiência e formação constante.'
  },
  {
    icon: '🧴',
    title: 'Produtos premium',
    description: 'Utilizamos as melhores marcas do mercado em cada atendimento.'
  },
  {
    icon: '⏰',
    title: 'Sem fila, sem espera',
    description: 'Agende online e seja atendido exatamente no seu horário.'
  }
]

const testimonials = [
  {
    name: 'Carlos M.',
    text: 'Melhor corte da região. O barbeiro entende exatamente o que eu quero antes mesmo de eu terminar de explicar.'
  },
  {
    name: 'Rafael S.',
    text: 'Ambiente top, atendimento pontual e o resultado sempre impecável. Virei cliente fiel.'
  },
  {
    name: 'André L.',
    text: 'Agendei pelo site em 1 minuto, cheguei e fui atendido na hora. Experiência nota dez.'
  }
]

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        {/* Destaques */}
        <section className="section highlights-section">
          <div className="container">
            <div className="cards highlights">
              {highlights.map((item) => (
                <article key={item.title} className="card highlight-card">
                  <span className="service-icon" aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Amostra dos serviços */}
        <section className="section services-teaser">
          <div className="container">
            <h2>Serviços em destaque</h2>

            <div className="cards">
              {services.slice(0, 3).map((service) => (
                <article key={service.title} className="card service-card">
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <div className="service-meta">
                    <span className="service-price">{service.price}</span>
                    <span className="service-duration">⏱ {service.duration}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="teaser-actions">
              <Button to="/servicos" variant="primary">Ver todos os serviços</Button>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="section testimonials-section">
          <div className="container">
            <h2>O que dizem nossos clientes</h2>

            <div className="cards">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="card testimonial-card">
                  <p className="testimonial-text">“{testimonial.text}”</p>
                  <p className="testimonial-author">— {testimonial.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre */}
        <Section id="sobre" title="Sobre a barbearia">
          <p>
            Um espaço pensado para valorizar a aparência, a rotina e a autoestima
            de cada cliente, com atenção nos detalhes e um atendimento acolhedor.
          </p>
        </Section>

        {/* CTA final */}
        <section className="cta-band">
          <div className="container">
            <h2>Pronto para renovar o visual?</h2>
            <p>Agende agora e garanta seu horário com os melhores.</p>
            <Button to="/agendamento">Agendar agora</Button>
          </div>
        </section>
      </main>

      <Footer showMap />
    </>
  )
}