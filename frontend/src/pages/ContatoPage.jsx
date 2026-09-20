import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Map } from '../components/Map'

const contactInfo = [
  { icon: '📍', label: 'Endereço', value: 'Rua da Barbearia, 123 – São Paulo/SP' },
  { icon: '📞', label: 'Telefone', value: '(81) 98654-0840' },
  { icon: '🕐', label: 'Horários', value: 'Seg a Sex: 09h–19h • Sáb: 09h–17h' },
  { icon: '📧', label: 'E-mail', value: 'contato@barbeariaweb.com.br' }
]

export default function ContatoPage() {
  return (
    <>
      <Header />

      <main>
        <section className="section contact-section">
          <div className="container">
            <h1>Fale com a gente</h1>
            <p className="about-lead">
              Tire dúvidas, faça sugestões ou agende direto pelo WhatsApp.
            </p>

            <div className="contact-grid">
              <div className="contact-info">
                {contactInfo.map((item) => (
                  <div key={item.label} className="contact-item">
                    <span className="contact-icon" aria-hidden="true">{item.icon}</span>
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}

                <a
                  className="cta-button contact-whatsapp"
                  href="https://wa.me/5581986540840"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chamar no WhatsApp
                </a>
              </div>

              <div className="contact-map">
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