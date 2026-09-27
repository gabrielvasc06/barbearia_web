import { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { services } from '../data/services'
import './AgendamentoPage.css'

const initialForm = {
  name: '',
  phone: '',
  services: [],
  date: '',
  time: '',
  notes: ''
}

const WEEKDAY_PERIODS = [
  {
    start: '09:00',
    end: '12:00'
  },
  {
    start: '13:00',
    end: '20:00'
  }
]

const SATURDAY_PERIODS = [
  {
    start: '09:00',
    end: '12:00'
  },
  {
    start: '13:00',
    end: '18:00'
  }
]

function sanitizeName(value) {
  return value
    .replace(/[^\p{L}\s]/gu, '')
    .replace(/\s{2,}/g, ' ')
}

function maskPhone(value) {
  const digits = value
    .replace(/\D/g, '')
    .slice(0, 11)

  if (!digits) {
    return ''
  }

  if (digits.length <= 2) {
    return `(${digits}`
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function getPhoneDigits(value) {
  return value.replace(/\D/g, '')
}

function durationToMinutes(duration) {
  if (!duration) {
    return 0
  }

  let total = 0

  const hourMatch = duration.match(/(\d+)\s*h/i)
  const minuteMatch = duration.match(/(\d+)\s*min/i)

  if (hourMatch) {
    total += Number(hourMatch[1]) * 60
  }

  if (minuteMatch) {
    total += Number(minuteMatch[1])
  }

  return total
}

function formatDuration(totalMinutes) {
  if (!totalMinutes) {
    return '0 min'
  }

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes} min`
  }

  if (minutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${minutes}min`
}

function timeToMinutes(time) {
  if (!time) {
    return 0
  }

  const [hours, minutes] = time
    .split(':')
    .map(Number)

  return hours * 60 + minutes
}

function formatLocalDate(date) {
  const year = date.getFullYear()

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0')

  const day = String(
    date.getDate()
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getTodayLocalDate() {
  return formatLocalDate(new Date())
}

function getMaxBookingDate() {
  const date = new Date()

  date.setFullYear(
    date.getFullYear() + 1
  )

  return formatLocalDate(date)
}

function hasValidDateFormat(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(
    dateString
  )
}

function isPastDate(dateString) {
  if (!dateString) {
    return false
  }

  return dateString < getTodayLocalDate()
}

function formatDate(dateString) {
  if (!dateString) {
    return ''
  }

  return new Intl.DateTimeFormat(
    'pt-BR'
  ).format(
    new Date(
      `${dateString}T00:00:00`
    )
  )
}

function formatCurrency(value) {
  return Number(
    value || 0
  ).toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  )
}

function getSavedBookings() {
  try {
    const value =
      localStorage.getItem(
        'agendamentos'
      )

    const parsed =
      JSON.parse(
        value || '[]'
      )

    return Array.isArray(parsed)
      ? parsed
      : []
  } catch {
    return []
  }
}

function getBookingDuration(booking) {
  if (
    Number.isFinite(
      booking.totalDurationMinutes
    )
  ) {
    return booking.totalDurationMinutes
  }

  if (booking.totalDuration) {
    return durationToMinutes(
      booking.totalDuration
    )
  }

  if (
    Array.isArray(
      booking.services
    )
  ) {
    return booking.services.reduce(
      (total, service) =>
        total +
        durationToMinutes(
          service.duration
        ),
      0
    )
  }

  if (booking.serviceDuration) {
    return durationToMinutes(
      booking.serviceDuration
    )
  }

  return 60
}

function generatePeriodSlots(
  period,
  serviceDuration
) {
  const slots = []

  const start =
    timeToMinutes(
      period.start
    )

  const end =
    timeToMinutes(
      period.end
    )

  for (
    let current = start;
    current < end;
    current += 60
  ) {
    if (
      current + serviceDuration >
      end
    ) {
      continue
    }

    const hour =
      String(
        Math.floor(current / 60)
      ).padStart(2, '0')

    const minute =
      String(
        current % 60
      ).padStart(2, '0')

    slots.push(
      `${hour}:${minute}`
    )
  }

  return slots
}

function hasTimeConflict(
  startMinutes,
  durationMinutes,
  bookings,
  date
) {
  const endMinutes =
    startMinutes +
    durationMinutes

  return bookings.some(
    (booking) => {
      if (
        booking.date !== date
      ) {
        return false
      }

      const bookingStart =
        timeToMinutes(
          booking.time
        )

      const bookingEnd =
        bookingStart +
        getBookingDuration(
          booking
        )

      return (
        startMinutes < bookingEnd &&
        endMinutes > bookingStart
      )
    }
  )
}

function getAvailableSlots(
  dateString,
  durationMinutes,
  bookings
) {
  if (
    !dateString ||
    durationMinutes <= 0
  ) {
    return []
  }

  if (
    !hasValidDateFormat(
      dateString
    )
  ) {
    return []
  }

  if (
    isPastDate(
      dateString
    )
  ) {
    return []
  }

  const date =
    new Date(
      `${dateString}T00:00:00`
    )

  const weekday =
    date.getDay()

  if (weekday === 0) {
    return []
  }

  const periods =
    weekday === 6
      ? SATURDAY_PERIODS
      : WEEKDAY_PERIODS

  let slots =
    periods.flatMap(
      (period) =>
        generatePeriodSlots(
          period,
          durationMinutes
        )
    )

  if (
    dateString ===
    getTodayLocalDate()
  ) {
    const now = new Date()

    const currentMinutes =
      now.getHours() * 60 +
      now.getMinutes()

    slots =
      slots.filter(
        (slot) =>
          timeToMinutes(slot) >
          currentMinutes
      )
  }

  return slots.filter(
    (slot) => {
      const startMinutes =
        timeToMinutes(slot)

      return !hasTimeConflict(
        startMinutes,
        durationMinutes,
        bookings,
        dateString
      )
    }
  )
}

function saveBooking(booking) {
  const saved =
    getSavedBookings()

  const newBooking = {
    id: Date.now(),
    createdAt:
      new Date().toISOString(),
    ...booking
  }

  localStorage.setItem(
    'agendamentos',
    JSON.stringify([
      ...saved,
      newBooking
    ])
  )

  return newBooking
}

function buildWhatsAppUrl(booking) {
  const BARBERSHOP_PHONE =
    '5581986540840'

  const servicesText =
    booking.services
      .map(
        (service) =>
          `- ${service.title} - ${formatCurrency(service.price)}`
      )
      .join('\n')

  const lines = [
    'Novo agendamento',
    '',
    `Cliente: ${booking.name}`,
    `Telefone: ${booking.phone}`,
    '',
    'Serviços:',
    servicesText,
    '',
    `Data: ${formatDate(booking.date)}`,
    `Horário: ${booking.time}`,
    `Duração estimada: ${booking.totalDuration}`,
    `Total a pagar: ${formatCurrency(booking.total)}`
  ]

  if (booking.notes) {
    lines.push(
      '',
      `Observações: ${booking.notes}`
    )
  }

  const message =
    lines.join('\n')

  return (
    `https://wa.me/${BARBERSHOP_PHONE}` +
    `?text=${encodeURIComponent(message)}`
  )
}

export default function AgendamentoPage() {
  const [form, setForm] =
    useState(initialForm)

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [
    submittedBooking,
    setSubmittedBooking
  ] = useState(null)

  const selectedServices =
    services.filter(
      (service) =>
        form.services.includes(
          service.title
        )
    )

  const total =
    selectedServices.reduce(
      (sum, service) =>
        sum +
        service.priceValue,
      0
    )

  const totalDurationMinutes =
    selectedServices.reduce(
      (sum, service) =>
        sum +
        durationToMinutes(
          service.duration
        ),
      0
    )

  const totalDuration =
    formatDuration(
      totalDurationMinutes
    )

  const today =
    getTodayLocalDate()

  const maxBookingDate =
    getMaxBookingDate()

  const savedBookings =
    getSavedBookings()

  const availableSlots =
    getAvailableSlots(
      form.date,
      totalDurationMinutes,
      savedBookings
    )

  function handleChange(event) {
    const {
      name,
      value
    } = event.target

    let newValue = value

    if (name === 'name') {
      newValue =
        sanitizeName(value)
    }

    if (name === 'phone') {
      newValue =
        maskPhone(value)
    }

    setForm(
      (previous) => ({
        ...previous,
        [name]: newValue
      })
    )

    setError('')
  }

  function handleDateChange(event) {
    const value =
      event.target.value

    if (!value) {
      setForm(
        (previous) => ({
          ...previous,
          date: '',
          time: ''
        })
      )

      setError('')

      return
    }

    if (
      !hasValidDateFormat(
        value
      )
    ) {
      setError(
        'Escolha uma data válida pelo calendário.'
      )

      return
    }

    if (
      value < today
    ) {
      setForm(
        (previous) => ({
          ...previous,
          date: '',
          time: ''
        })
      )

      setError(
        'Não é possível escolher uma data que já passou.'
      )

      return
    }

    if (
      value >
      maxBookingDate
    ) {
      setForm(
        (previous) => ({
          ...previous,
          date: '',
          time: ''
        })
      )

      setError(
        'O agendamento pode ser feito com até 1 ano de antecedência.'
      )

      return
    }

    setForm(
      (previous) => ({
        ...previous,
        date: value,
        time: ''
      })
    )

    setError('')
  }

  function handleServiceChange(
    serviceTitle
  ) {
    setForm(
      (previous) => {
        const selected =
          previous.services.includes(
            serviceTitle
          )

        const newServices =
          selected
            ? previous.services.filter(
                (title) =>
                  title !==
                  serviceTitle
              )
            : [
                ...previous.services,
                serviceTitle
              ]

        return {
          ...previous,
          services:
            newServices,
          time: ''
        }
      }
    )

    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    setError('')

    const phoneDigits =
      getPhoneDigits(
        form.phone
      )

    if (
      !form.name.trim()
    ) {
      setError(
        'Informe seu nome.'
      )

      return
    }

    if (
      form.name
        .trim()
        .length < 2
    ) {
      setError(
        'Digite um nome válido.'
      )

      return
    }

    if (
      phoneDigits.length !== 11
    ) {
      setError(
        'Digite um telefone válido no formato (99) 99999-9999.'
      )

      return
    }

    if (
      form.services.length === 0
    ) {
      setError(
        'Escolha pelo menos um serviço.'
      )

      return
    }

    if (
      !form.date
    ) {
      setError(
        'Escolha uma data.'
      )

      return
    }

    if (
      form.date < today
    ) {
      setError(
        'A data escolhida já passou.'
      )

      return
    }

    if (
      form.date >
      maxBookingDate
    ) {
      setError(
        'O agendamento pode ser feito com até 1 ano de antecedência.'
      )

      return
    }

    if (
      !form.time
    ) {
      setError(
        'Escolha um horário.'
      )

      return
    }

    const currentBookings =
      getSavedBookings()

    const currentSlots =
      getAvailableSlots(
        form.date,
        totalDurationMinutes,
        currentBookings
      )

    if (
      !currentSlots.includes(
        form.time
      )
    ) {
      setForm(
        (previous) => ({
          ...previous,
          time: ''
        })
      )

      setError(
        'Esse horário não está mais disponível. Escolha outro.'
      )

      return
    }

    setLoading(true)

    try {
      const bookingServices =
        selectedServices.map(
          (service) => ({
            title:
              service.title,

            price:
              service.priceValue,

            duration:
              service.duration
          })
        )

      const bookingData = {
        name:
          form.name.trim(),

        phone:
          form.phone,

        phoneDigits,

        services:
          bookingServices,

        total,

        totalDurationMinutes,

        totalDuration,

        date:
          form.date,

        time:
          form.time,

        notes:
          form.notes.trim()
      }

      const booking =
        saveBooking(
          bookingData
        )

      setSubmittedBooking(
        booking
      )
    } catch {
      setError(
        'Não foi possível salvar o agendamento. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setForm(initialForm)

    setSubmittedBooking(
      null
    )

    setError('')
  }

  return (
    <>
      <Header showCta={false} />

      <main className="booking-page">

        <section className="booking-hero">

          <div className="booking-hero-overlay" />

          <div className="container booking-hero-content">

            <span className="booking-eyebrow">
              Agendamento
            </span>

            <h1>
              Escolha seus serviços
              e reserve seu horário
            </h1>

            <p>
              Monte seu atendimento,
              confira o valor total
              e escolha um horário
              disponível.
            </p>

          </div>

        </section>

        <section className="booking-main-section">

          <div className="container booking-layout">

            <aside className="booking-side">

              <span className="booking-side-label">
                Seu atendimento
              </span>

              <h2>
                Tudo em um só horário
              </h2>

              <p>
                Você pode combinar
                vários serviços no mesmo
                agendamento.
              </p>

              <div className="booking-side-item">
                <strong>
                  Serviços
                </strong>

                <span>
                  Escolha quantos quiser
                </span>
              </div>

              <div className="booking-side-item">
                <strong>
                  Horários
                </strong>

                <span>
                  O sistema considera
                  a duração total
                </span>
              </div>

              <div className="booking-side-item">
                <strong>
                  Valor
                </strong>

                <span>
                  Total calculado
                  automaticamente
                </span>
              </div>

            </aside>

            <div className="booking-card">

              {submittedBooking ? (

                <div className="booking-success">

                  <span className="success-label">
                    Agendamento registrado
                  </span>

                  <h2>
                    Horário reservado
                  </h2>

                  <p className="success-intro">
                    Confira abaixo os dados
                    do atendimento.
                  </p>

                  <div className="booking-summary">

                    <div className="summary-row">

                      <span>
                        Cliente
                      </span>

                      <strong>
                        {
                          submittedBooking.name
                        }
                      </strong>

                    </div>

                    <div className="summary-row">

                      <span>
                        Telefone
                      </span>

                      <strong>
                        {
                          submittedBooking.phone
                        }
                      </strong>

                    </div>

                    <div className="summary-services">

                      <div className="summary-services-heading">

                        <span className="summary-title">
                          Serviços
                        </span>

                        <small>
                          {
                            submittedBooking.services.length
                          }{' '}
                          {
                            submittedBooking.services.length === 1
                              ? 'serviço'
                              : 'serviços'
                          }
                        </small>

                      </div>

                      <div className="summary-services-grid">

                        {submittedBooking.services.map(
                          (service) => (

                            <div
                              key={
                                service.title
                              }
                              className="summary-service-card"
                            >

                              <span className="summary-service-name">
                                {
                                  service.title
                                }
                              </span>

                              <strong className="summary-service-price">
                                {formatCurrency(
                                  service.price
                                )}
                              </strong>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                    <div className="summary-row">

                      <span>
                        Data
                      </span>

                      <strong>
                        {formatDate(
                          submittedBooking.date
                        )}
                      </strong>

                    </div>

                    <div className="summary-row">

                      <span>
                        Horário
                      </span>

                      <strong>
                        {
                          submittedBooking.time
                        }
                      </strong>

                    </div>

                    <div className="summary-row">

                      <span>
                        Duração estimada
                      </span>

                      <strong>
                        {
                          submittedBooking.totalDuration
                        }
                      </strong>

                    </div>

                    <div className="summary-total">

                      <div>

                        <span>
                          Total a pagar
                        </span>

                        <small>
                          {
                            submittedBooking.services.length
                          }{' '}
                          {
                            submittedBooking.services.length === 1
                              ? 'serviço'
                              : 'serviços'
                          }
                        </small>

                      </div>

                      <strong>
                        {formatCurrency(
                          submittedBooking.total
                        )}
                      </strong>

                    </div>

                  </div>

                  <div className="booking-actions">

                    <a
                      className="booking-primary-button"
                      href={
                        buildWhatsAppUrl(
                          submittedBooking
                        )
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enviar confirmação pelo WhatsApp
                    </a>

                    <button
                      type="button"
                      className="booking-secondary-button"
                      onClick={
                        resetForm
                      }
                    >
                      Fazer novo agendamento
                    </button>

                  </div>

                </div>

              ) : (

                <form
                  className="booking-form"
                  onSubmit={
                    handleSubmit
                  }
                  noValidate
                >

                  <div className="booking-form-section">

                    <div className="booking-section-heading">

                      <span>
                        01
                      </span>

                      <div>

                        <h2>
                          Seus dados
                        </h2>

                        <p>
                          Informe os dados
                          para identificação
                          do agendamento.
                        </p>

                      </div>

                    </div>

                    <div className="booking-fields-grid">

                      <div className="booking-field">

                        <label htmlFor="name">
                          Nome completo
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Seu nome"
                          value={
                            form.name
                          }
                          onChange={
                            handleChange
                          }
                          autoComplete="name"
                        />

                      </div>

                      <div className="booking-field">

                        <label htmlFor="phone">
                          Telefone / WhatsApp
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="(99) 99999-9999"
                          maxLength={15}
                          value={
                            form.phone
                          }
                          onChange={
                            handleChange
                          }
                          autoComplete="tel"
                        />

                      </div>

                    </div>

                  </div>

                  <div className="booking-form-section">

                    <div className="booking-section-heading">

                      <span>
                        02
                      </span>

                      <div>

                        <h2>
                          Escolha os serviços
                        </h2>

                        <p>
                          Selecione um ou mais.
                          O valor e a duração
                          são atualizados
                          automaticamente.
                        </p>

                      </div>

                    </div>

                    <div className="service-card-grid">

                      {services.map(
                        (service) => {

                          const selected =
                            form.services.includes(
                              service.title
                            )

                          return (

                            <button
                              type="button"
                              key={
                                service.title
                              }
                              className={
                                selected
                                  ? 'booking-service-card selected'
                                  : 'booking-service-card'
                              }
                              onClick={() =>
                                handleServiceChange(
                                  service.title
                                )
                              }
                            >

                              <div className="service-card-header">

                                <span
                                  className={
                                    selected
                                      ? 'service-check active'
                                      : 'service-check'
                                  }
                                >
                                  {selected
                                    ? '✓'
                                    : ''}
                                </span>

                                <span className="service-duration">
                                  {
                                    service.duration
                                  }
                                </span>

                              </div>

                              <div className="service-card-body">

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

                              </div>

                              <div className="service-card-bottom">

                                <span>
                                  Valor
                                </span>

                                <strong>
                                  {
                                    service.price
                                  }
                                </strong>

                              </div>

                            </button>

                          )
                        }
                      )}

                    </div>

                  </div>

                  {selectedServices.length > 0 && (

                    <div className="selected-services-box">

                      <div className="selected-services-title">

                        <div>

                          <span>
                            Seu atendimento
                          </span>

                          <strong>
                            {
                              selectedServices.length
                            }{' '}
                            {
                              selectedServices.length === 1
                                ? 'serviço selecionado'
                                : 'serviços selecionados'
                            }
                          </strong>

                        </div>

                        <strong className="selected-total">
                          {formatCurrency(
                            total
                          )}
                        </strong>

                      </div>

                      <div className="selected-services-list">

                        {selectedServices.map(
                          (service) => (

                            <div
                              key={
                                service.title
                              }
                              className="selected-service-item"
                            >

                              <div>

                                <strong>
                                  {
                                    service.title
                                  }
                                </strong>

                                <small>
                                  {
                                    service.duration
                                  }
                                </small>

                              </div>

                              <strong>
                                {formatCurrency(
                                  service.priceValue
                                )}
                              </strong>

                            </div>

                          )
                        )}

                      </div>

                      <div className="selected-duration">

                        <span>
                          Tempo estimado
                        </span>

                        <strong>
                          {
                            totalDuration
                          }
                        </strong>

                      </div>

                    </div>

                  )}

                  <div className="booking-form-section">

                    <div className="booking-section-heading">

                      <span>
                        03
                      </span>

                      <div>

                        <h2>
                          Data e horário
                        </h2>

                        <p>
                          Escolha a data pelo
                          calendário e depois
                          selecione um horário
                          disponível.
                        </p>

                      </div>

                    </div>

                    <div className="booking-fields-grid">

                      <div className="booking-field">

                        <label htmlFor="date">
                          Data
                        </label>

                        <input
                          id="date"
                          name="date"
                          type="date"
                          min={
                            today
                          }
                          max={
                            maxBookingDate
                          }
                          value={
                            form.date
                          }
                          onChange={
                            handleDateChange
                          }
                          onKeyDown={
                            (event) => {
                              if (
                                event.key !== 'Tab' &&
                                event.key !== 'Escape'
                              ) {
                                event.preventDefault()
                              }
                            }
                          }
                          onPaste={
                            (event) => {
                              event.preventDefault()
                            }
                          }
                          onDrop={
                            (event) => {
                              event.preventDefault()
                            }
                          }
                          onClick={
                            (event) => {
                              const input =
                                event.currentTarget

                              if (
                                typeof input.showPicker ===
                                'function'
                              ) {
                                try {
                                  input.showPicker()
                                } catch {
                                  // Usa calendário padrão.
                                }
                              }
                            }
                          }
                        />

                      </div>

                      <div className="booking-field">

                        <label htmlFor="time">
                          Horário
                        </label>

                        <select
                          id="time"
                          name="time"
                          value={
                            form.time
                          }
                          onChange={
                            handleChange
                          }
                          disabled={
                            !form.date ||
                            selectedServices.length === 0 ||
                            availableSlots.length === 0
                          }
                        >

                          <option
                            value=""
                            disabled
                          >

                            {selectedServices.length === 0
                              ? 'Escolha os serviços primeiro'
                              : !form.date
                                ? 'Escolha a data primeiro'
                                : availableSlots.length === 0
                                  ? 'Sem horários disponíveis'
                                  : 'Selecione um horário'}

                          </option>

                          {availableSlots.map(
                            (slot) => (

                              <option
                                key={
                                  slot
                                }
                                value={
                                  slot
                                }
                              >
                                {slot}
                              </option>

                            )
                          )}

                        </select>

                      </div>

                    </div>

                  </div>

                  <div className="booking-form-section">

                    <div className="booking-field">

                      <label htmlFor="notes">
                        Observações
                      </label>

                      <textarea
                        id="notes"
                        name="notes"
                        rows="4"
                        placeholder="Alguma preferência ou informação importante?"
                        value={
                          form.notes
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                  </div>

                  {selectedServices.length > 0 && (

                    <div className="booking-final-total">

                      <div>

                        <span>
                          Total do atendimento
                        </span>

                        <small>
                          Duração aproximada:{' '}
                          {
                            totalDuration
                          }
                        </small>

                      </div>

                      <strong>
                        {formatCurrency(
                          total
                        )}
                      </strong>

                    </div>

                  )}

                  {error && (

                    <p className="booking-error">
                      {error}
                    </p>

                  )}

                  <button
                    type="submit"
                    className="booking-submit-button"
                    disabled={
                      loading
                    }
                  >

                    {loading
                      ? 'Salvando agendamento...'
                      : selectedServices.length > 0
                        ? `Confirmar agendamento — ${formatCurrency(total)}`
                        : 'Confirmar agendamento'}

                  </button>

                </form>

              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}