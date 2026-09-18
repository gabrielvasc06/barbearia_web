import { Map } from './Map'

export function Footer({ showMap = false }) {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <p className="footer-address">Rua da Barbearia, 123 • (81) 99211-5616</p>

        {showMap && <Map />}
      </div>
    </footer>
  )
}