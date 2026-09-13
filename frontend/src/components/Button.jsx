export function Button({ href, variant = 'cta', children }) {
  return (
    <a className={`${variant}-button`} href={href}>
      {children}
    </a>
  )
}