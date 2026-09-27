import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'
import { services } from '../data/services'

const highlights = [
  {
    number: '01',
    title: 'Horário marcado',
    description:
      'Você escolhe o melhor horário e evita ficar esperando atendimento.'
  },
  {
    number: '02',
    title: 'Cuidado nos detalhes',
    description:
      'Cada serviço é feito levando em conta o seu estilo e o resultado que você procura.'
  },
  {
    number: '03',
    title: 'Atendimento completo',
    description:
      'Cabelo, barba, acabamento e outros cuidados em um só lugar.'
  }
]

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="site-page">

        <Hero />

        <section className="section home-intro-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-kicker">
                Atendimento
              </span>

              <h2>
                Simples no agendamento.
                Cuidadoso no resultado.
              </h2>

              <p>
                Você escolhe os serviços,
                confere o valor antes e
                reserva um horário sem
                precisar esperar.
              </p>

            </div>

            <div className="experience-grid">

              {highlights.map(
                (item) => (

                  <article
                    key={item.number}
                    className="experience-card"
                  >
                    <span className="experience-number">
                      {item.number}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>
                  </article>

                )
              )}

            </div>

          </div>

        </section>

        <section className="section home-services-section">

          <div className="container">

            <div className="section-heading section-heading-row">

              <div>

                <span className="section-kicker">
                  Serviços
                </span>

                <h2>
                  Os mais procurados
                </h2>

              </div>

              <Button
                to="/servicos"
                variant="primary"
              >
                Ver todos
              </Button>

            </div>

            <div className="home-services-grid">

              {services
                .slice(0, 4)
                .map(
                  (
                    service,
                    index
                  ) => (

                    <article
                      key={service.title}
                      className="home-service-card"
                    >

                      <div className="home-service-top">

                        <span className="home-service-number">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            '0'
                          )}
                        </span>

                        <span className="home-service-duration">
                          {service.duration}
                        </span>

                      </div>

                      <h3>
                        {service.title}
                      </h3>

                      <p>
                        {service.description}
                      </p>

                      <div className="home-service-footer">

                        <strong>
                          {service.price}
                        </strong>

                        <Button
                          to="/agendamento"
                        >
                          Agendar
                        </Button>

                      </div>

                    </article>

                  )
                )}

            </div>

          </div>

        </section>

        <section className="home-about-band">

          <div className="home-about-image" />

          <div className="home-about-content">

            <div>

              <span className="section-kicker">
                A barbearia
              </span>

              <h2>
                Um espaço feito
                para você sair
                satisfeito.
              </h2>

              <p>
                A proposta é simples:
                atendimento pontual,
                conversa direta e cuidado
                em cada etapa do serviço.
              </p>

              <p>
                Sem pressa, sem excesso e
                sem complicação. O foco
                está no que realmente
                importa: um resultado que
                combine com você.
              </p>

              <Button
                to="/sobre"
                variant="primary"
              >
                Conhecer a barbearia
              </Button>

            </div>

          </div>

        </section>

        <section className="final-cta">

          <div className="container final-cta-content">

            <div>

              <span className="section-kicker">
                Seu próximo horário
              </span>

              <h2>
                Escolha os serviços
                e deixe o resto com a gente.
              </h2>

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

      <Footer showMap />
    </>
  )
}