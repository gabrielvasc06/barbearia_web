import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'

const values = [
  {
    number: '01',
    title: 'Precisão',
    description:
      'Atenção ao formato do rosto, ao cabelo e ao estilo que você deseja manter.'
  },
  {
    number: '02',
    title: 'Confiança',
    description:
      'Conversa clara antes do serviço para entender o resultado que você procura.'
  },
  {
    number: '03',
    title: 'Qualidade',
    description:
      'Técnica, cuidado e produtos adequados em todas as etapas do atendimento.'
  }
]

export default function SobrePage() {
  return (
    <>
      <Header />

      <main className="site-page">

        <section className="page-hero about-page-hero">

          <div className="page-hero-overlay" />

          <div className="container page-hero-content">

            <span className="page-eyebrow">
              Sobre
            </span>

            <h1>
              Mais que um corte.
              Um atendimento bem feito.
            </h1>

            <p>
              Técnica, cuidado e atenção
              aos detalhes em um ambiente
              pensado para receber você
              com tranquilidade.
            </p>

          </div>

        </section>

        <section className="section about-story-section">

          <div className="container about-story-grid">

            <div className="about-story-copy">

              <span className="section-kicker">
                Nossa história
              </span>

              <h2>
                Barbearia com identidade,
                sem exagero.
              </h2>

              <p>
                A Barbearia Web nasceu da
                ideia de unir a tradição da
                barbearia com uma experiência
                de atendimento mais prática.
              </p>

              <p>
                O cliente pode conhecer os
                serviços, entender os valores
                e reservar seu horário antes
                mesmo de chegar.
              </p>

              <p>
                Na cadeira, o foco volta para
                o essencial: conversa,
                técnica e atenção ao resultado.
              </p>

            </div>

            <div className="about-story-image">

              <div className="about-image-caption">

                <span>
                  Atendimento
                </span>

                <strong>
                  Feito no seu tempo
                </strong>

              </div>

            </div>

          </div>

        </section>

        <section className="section values-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-kicker">
                O que valorizamos
              </span>

              <h2>
                O jeito como trabalhamos.
              </h2>

            </div>

            <div className="values-grid">

              {values.map(
                (value) => (

                  <article
                    key={value.number}
                    className="value-card"
                  >

                    <span className="value-number">
                      {
                        value.number
                      }
                    </span>

                    <h3>
                      {
                        value.title
                      }
                    </h3>

                    <p>
                      {
                        value.description
                      }
                    </p>

                  </article>

                )
              )}

            </div>

          </div>

        </section>

        <section className="about-statements">

          <div className="container about-statements-grid">

            <div>

              <strong>
                Horário marcado
              </strong>

              <span>
                Mais organização para você
                e para a barbearia.
              </span>

            </div>

            <div>

              <strong>
                Preço transparente
              </strong>

              <span>
                Você vê o valor antes de
                confirmar.
              </span>

            </div>

            <div>

              <strong>
                Atendimento completo
              </strong>

              <span>
                Serviços que podem ser
                combinados no mesmo horário.
              </span>

            </div>

          </div>

        </section>

        <section className="final-cta">

          <div className="container final-cta-content">

            <div>

              <span className="section-kicker">
                Na prática
              </span>

              <h2>
                Venha conhecer nosso
                atendimento.
              </h2>

            </div>

            <Button
              to="/agendamento"
              variant="primary"
            >
              Reservar horário
            </Button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}