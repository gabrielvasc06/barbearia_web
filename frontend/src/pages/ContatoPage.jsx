import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Map } from '../components/Map'

const contactInfo = [
  {
    label: 'WhatsApp',
    value: '(81) 98654-0840'
  },
  {
    label: 'Funcionamento',
    value: 'Segunda a sexta — 09h às 19h'
  },
  {
    label: 'Sábado',
    value: '09h às 17h'
  },
  {
    label: 'Localização',
    value: 'Consulte a rota no mapa ao lado'
  }
]

export default function ContatoPage() {
  return (
    <>
      <Header />

      <main className="site-page">

        <section className="page-hero contact-page-hero">

          <div className="page-hero-overlay" />

          <div className="container page-hero-content">

            <span className="page-eyebrow">
              Contato
            </span>

            <h1>
              Fale direto
              com a barbearia.
            </h1>

            <p>
              Tire dúvidas sobre serviços,
              horários ou atendimento pelo
              WhatsApp.
            </p>

            <a
              className="primary-button"
              href="https://wa.me/5581986540840"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp
            </a>

          </div>

        </section>

        <section className="section contact-content-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-kicker">
                Atendimento
              </span>

              <h2>
                Informações da barbearia
              </h2>

            </div>

            <div className="contact-layout">

              <div className="contact-panel">

                <div className="contact-panel-heading">

                  <span>
                    Canais de contato
                  </span>

                  <h3>
                    Precisa falar com a gente?
                  </h3>

                  <p>
                    Envie uma mensagem ou
                    consulte os horários antes
                    de vir.
                  </p>

                </div>

                <div className="contact-list">

                  {contactInfo.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={
                          item.label
                        }
                        className="contact-row"
                      >

                        <span className="contact-number">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            '0'
                          )}
                        </span>

                        <div>

                          <strong>
                            {
                              item.label
                            }
                          </strong>

                          <p>
                            {
                              item.value
                            }
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

                <a
                  className="primary-button contact-button"
                  href="https://wa.me/5581986540840"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir WhatsApp
                </a>

              </div>

              <div className="contact-map-panel">

                <div className="contact-map-heading">

                  <span className="section-kicker">
                    Mapa
                  </span>

                  <h3>
                    Veja como chegar
                  </h3>

                </div>

                <Map />

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}