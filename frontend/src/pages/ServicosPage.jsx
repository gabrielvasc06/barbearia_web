import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'
import { services, steps } from '../data/services'

export default function ServicosPage() {
  return (
    <>
      <Header />

      <main>
        <section className="section services-intro">
          <div className="container">
            <h1>Nossos serviços</h1>
            <p className="services-lead">
              Do corte clássico ao design de barba, cada serviço é feito com
              atenção aos detalhes e produtos de alta qualidade.
            </p>
          </div>
        </section>

        <section className="section services-list">
          <div className="container">
            <div className="cards">
              {services.map((service) => (
                <article key={service.title} className="card service-card">
                  <span className="service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <div className="service-meta">
                    <span className="service-price">{service.price}</span>
                    <span className="service-duration">⏱ {service.duration}</span>
                  </div>

                  <Button to="/agendamento" variant="primary">
                    Agendar
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section steps-section">
          <div className="container">
            <h2>Como funciona</h2>

            <div className="steps">
              {steps.map((step, index) => (
                <div key={step.title} className="step">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-icon" aria-hidden="true">{step.icon}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container">
            <h2>Gostou? Garanta seu horário!</h2>
            <p>Agende em menos de 2 minutos e venha se renovar.</p>
            <Link to="/agendamento" className="cta-button">
              Agendar agora
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}