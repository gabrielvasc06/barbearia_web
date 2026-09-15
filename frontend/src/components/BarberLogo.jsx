const barberLogoUrl =
  'https://img.freepik.com/vetores-premium/vetor-de-design-de-logotipo-vintage-de-barbearia_677726-187.jpg?w=2000'

export function BarberLogo() {
  return (
    <img
      className="brand-logo"
      src={barberLogoUrl}
      alt="Logo Barbearia Web"
      loading="eager"
    />
  )
}