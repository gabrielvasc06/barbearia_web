import { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const services = [
  'Corte Clássico',
  'Barba e Design',
  'Corte + Barba',
  'Agenda Personalizada'
]

// Horários normais (segunda a sexta)
const weekdaySlots = [
  '09:00', '10:00', '11:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00'
]

// Sábado só até às 17:00
const saturdaySlots = weekdaySlots.filter((slot) => slot <= '17:00')

const initialForm = {
  name: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  notes: ''
}

// Máscara automática: (11) 99999-9999
function maskPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

// Retorna os horários disponíveis conforme o dia escolhido
function getAvailableSlots(dateString) {
  if (!dateString) return []
  const day = new Date(`${dateString}T00:00:00`).getDay() // 0 = domingo
  if (day === 0) return [] // domingo: fechado
  if (day === 6) return saturdaySlots
  return weekdaySlots
}

// Salva no localStorage em vez de enviar pro backend
function saveBooking(booking) {
  const saved = JSON.parse(localStorage.getItem('agendamentos') || '[]')
  const newBooking = { id: Date.now(), ...booking }
  localStorage.setItem('agendamentos', JSON.stringify([...saved, newBooking]))
  return newBooking
}

export default function AgendamentoPage() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const availableSlots = getAvailableSlots(form.date)
  const today = new Date().toISOString().split('T')[0]

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: name === 'phone' ? maskPhone(value) : value,
      // Se mudar a data, zera o horário (pode ficar inválido pro novo dia)
      ...(name === 'date' ? { time: '' } : {})
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    // ✅ Validação: nenhum campo pode ficar em branco (nem só com espaços)
    const emptyField = Object.entries(form).find(([, value]) => !value.trim())

    if (emptyField) {
      setError('Por favor, preencha todos os campos antes de continuar.')
      return
    }

    setLoading(true)

    // Simula um tempo de processamento (como se fosse uma requisição)
    setTimeout(() => {
      try {
        saveBooking(form)
        setSubmitted(true)
      } catch {
        setError('Não foi possível salvar. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }, 800)
  }

  function resetForm() {
    setForm(initialForm)
    setSubmitted(false)
    setError('')
  }

  return (
    <>
      <Header showCta={false} />

      <main className="section booking-page">
        <div className="container booking-container">
          <div className="booking-info">
            <h1>Agende seu horário!</h1>
            <p>
              Preencha todos os campos e garanta seu lugar na cadeira.
              Entraremos em contato para confirmar o horário escolhido.
            </p>

            <ul className="booking-benefits">
              <li>✂️ Atendimento personalizado!</li>
              <li>⏱️ Pontualidade garantida</li>
              <li>📱 Confirmação por telefone</li>
            </ul>
          </div>

          <div className="booking-card">
            {submitted ? (
              <div className="booking-success">
                <h2>Agendamento enviado! ✅</h2>
                <p>
                  Obrigado, <strong>{form.name}</strong>! Recebemos seu pedido
                  para <strong>{form.service}</strong> no dia{' '}
                  <strong>{form.date}</strong> às <strong>{form.time}</strong>.
                </p>
                <button className="cta-button" onClick={resetForm}>
                  Fazer novo agendamento
                </button>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Nome completo *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefone / WhatsApp *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Serviço *</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecione um serviço
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Data *</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">Horário *</label>
                    <select
                      id="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      disabled={!form.date || availableSlots.length === 0}
                      required
                    >
                      <option value="" disabled>
                        {!form.date
                          ? 'Escolha a data primeiro'
                          : availableSlots.length === 0
                            ? 'Fechado neste dia'
                            : 'Selecione'}
                      </option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Observações *</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    placeholder="Alguma preferência? Conte pra gente."
                    value={form.notes}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button
                  type="submit"
                  className="primary-button form-submit"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Confirmar agendamento'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}