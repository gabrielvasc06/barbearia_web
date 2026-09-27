import { Button } from './Button'

const openingHours = [
  {
    day: 'Segunda a sexta',
    time: '09:00 às 19:00'
  },
  {
    day: 'Sábado',
    time: '09:00 às 17:00'
  },
  {
    day: 'Domingo',
    time: 'Fechado'
  }
]

export function Hero() {
  return (
    <section
      className="home-hero"
      id="inicio"
    >

      <div className="hero-overlay" />

      <div className="container home-hero-layout">

        <div className="home-hero-copy">

          <span className="page-eyebrow">
            Barbearia Web
          </span>

          <h1>
            Corte bem feito.
            <br />
            Sem complicação.
          </h1>

          <p>
            Um espaço para cuidar do visual
            com calma, atenção aos detalhes
            e horário marcado.
          </p>

          <div className="hero-actions">

            <Button
              to="/agendamento"
              variant="primary"
            >
              Reservar horário
            </Button>

            <Button to="/servicos">
              Conhecer serviços
            </Button>

          </div>

        </div>

        <aside className="hero-hours">

          <span className="hero-hours-label">
            Funcionamento
          </span>

          <h2>
            Horários da semana
          </h2>

          <div className="hero-hours-list">

            {openingHours.map(
              (item) => (
                <div
                  key={item.day}
                  className="hero-hours-row"
                >

                  <span>
                    {item.day}
                  </span>

                  <strong>
                    {item.time}
                  </strong>

                </div>
              )
            )}

          </div>

          <p className="hero-hours-note">
            Atendimento realizado
            preferencialmente com horário
            reservado.
          </p>

        </aside>

      </div>

    </section>
  )
}