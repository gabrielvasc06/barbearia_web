import { Button } from './Button'

const openingHours = [
  'Segunda a Sexta: 09:00 às 19:00',
  'Sábado: 09:00 às 17:00',
  'Domingo: Fechado'
]

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div>
          <h1>Estilo, presença e confiança.</h1>
          <p>
            A barbearia ideal para quem busca atendimento de qualidade, ambiente
            sofisticado e cortes pensados para realçar sua identidade.
          </p>

          <div className="hero-actions">
            <Button href="#servicos" variant="primary">Ver serviços</Button>
            <Button href="#contato">Reservar horário</Button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-sub-card" />
          <div className="hero-card-inner">
            <h3>Horário de atendimento</h3>
            <ul>
              {openingHours.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}