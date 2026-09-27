import { Link } from 'react-router-dom'
import { Map } from './Map'

export function Footer({
  showMap = false
}) {
  const year =
    new Date().getFullYear()

  return (
    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-main">

          <div className="footer-brand">

            <span className="footer-eyebrow">
              Barbearia Web
            </span>

            <h2>
              Seu estilo começa
              nos detalhes.
            </h2>

            <p>
              Cortes, barba e cuidados
              masculinos com atendimento
              por horário.
            </p>

          </div>

          <div className="footer-column">

            <strong>
              Navegação
            </strong>

            <Link to="/">
              Início
            </Link>

            <Link to="/servicos">
              Serviços
            </Link>

            <Link to="/sobre">
              Sobre
            </Link>

            <Link to="/contato">
              Contato
            </Link>

          </div>

          <div className="footer-column">

            <strong>
              Atendimento
            </strong>

            <span>
              (81) 98654-0840
            </span>

            <span>
              Seg a Sex — 09h às 19h
            </span>

            <span>
              Sábado — 09h às 17h
            </span>

          </div>

        </div>

        {showMap && (

          <div className="footer-map-wrapper">

            <div className="footer-map-heading">

              <div>

                <span className="section-kicker">
                  Localização
                </span>

                <h3>
                  Encontre a barbearia
                </h3>

              </div>

              <Link
                to="/contato"
                className="footer-map-link"
              >
                Ver contato
              </Link>

            </div>

            <Map />

          </div>

        )}

        <div className="footer-bottom">

          <span>
            © {year} Barbearia Web
          </span>

          <span>
            Atendimento com hora marcada
          </span>

        </div>

      </div>

    </footer>
  )
}