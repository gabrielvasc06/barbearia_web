import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Section } from '../components/Section'
import { ServiceCard } from '../components/ServiceCard'
import { Footer } from '../components/Footer'

const services = [
  {
    title: 'Corte Clássico',
    description: 'Estilo moderno com acabamento premium para o dia a dia.'
  },
  {
    title: 'Barba e Design',
    description: 'Sobrancelhas, contorno e acabamento refinado com atenção aos detalhes.'
  },
  {
    title: 'Agenda Personalizada',
    description: 'Atendimento saudável, pontual e com experiência memorável.'
  }
]

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Veio de outra página com âncora (ex: /#servicos)
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [hash])

  return (
    <>
      <Header />

      <main>
        <Hero />

        <Section id="servicos" title="Serviços">
          <div className="cards">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Section>

        <Section id="sobre" title="Sobre a barbearia">
          <p>
            Um espaço pensado para valorizar a aparência, a rotina e a autoestima
            de cada cliente, com atenção nos detalhes e um atendimento acolhedor.
          </p>
        </Section>
      </main>

      <Footer />
    </>
  )
}