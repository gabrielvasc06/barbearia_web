import { Header } from '../components/Header'
import { EmptyMessage } from '../components/EmptyMessage'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'
import {
  services,
  steps
} from '../data/services'

export default function ServicosPage() {
  return (
    <>
      <Header />

      <main className="site-page services-page">

        <section className="page-hero services-page-hero">

          <div className="page-hero-overlay" />

          <div className="container page-hero-content">

            <span className="page-eyebrow">
              Serviços
            </span>

            <h1>
              Escolha o cuidado
              que combina com você.
            </h1>

            <p>
              Corte, barba, acabamento
              e tratamentos com preço e
              duração apresentados antes
              do agendamento.
            </p>

            <Button
              to="/agendamento"
              variant="primary"
            >
              Reservar horário
            </Button>

          </div>

        </section>

        <section className="section services-catalog-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-kicker">
                Catálogo
              </span>

              <h2>
                Todos os serviços
              </h2>

              <p>
                Escolha um serviço individual
                ou combine vários no mesmo
                atendimento.
              </p>

            </div>

            <div className="services-catalog-grid">

              {services.length > 0 ? (

                services.map(
                  (
                    service,
                    index
                  ) => (

                    <article
                      key={service.title}
                      className="catalog-service-card"
                    >

                      <div className="catalog-service-head">

                        <span className="catalog-service-index">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            '0'
                          )}
                        </span>

                        <span className="catalog-service-time">
                          {
                            service.duration
                          }
                        </span>

                      </div>

                      <h3>
                        {
                          service.title
                        }
                      </h3>

                      <p>
                        {
                          service.description
                        }
                      </p>

                      <div className="catalog-service-bottom">

                        <strong>
                          {
                            service.price
                          }
                        </strong>

                        <Button
                          to="/agendamento"
                        >
                          Agendar
                        </Button>

                      </div>

                    </article>

                  )
                )

              ) : (

                <EmptyMessage
                  message="Nenhum serviço disponível no momento."
                />

              )}

            </div>

          </div>

        </section>

        <section className="section process-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-kicker">
                Como funciona
              </span>

              <h2>
                Do serviço ao horário
                em poucos passos.
              </h2>

            </div>

            <div className="process-grid">

              {steps.map(
                (
                  step,
                  index
                ) => (

                  <article
                    key={step.title}
                    className="process-card"
                  >

                    <span className="process-number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.description}
                    </p>

                  </article>

                )
              )}

            </div>

          </div>

        </section>

        <section className="final-cta">

          <div className="container final-cta-content">

            <div>

              <span className="section-kicker">
                Agendamento
              </span>

              <h2>
                Já sabe o que quer fazer?
              </h2>

              <p>
                Escolha os serviços,
                a data e o horário.
              </p>

            </div>

            <Button
              to="/agendamento"
              variant="primary"
            >
              Agendar agora
            </Button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}