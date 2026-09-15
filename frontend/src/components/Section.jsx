export function Section({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <div className="container">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}