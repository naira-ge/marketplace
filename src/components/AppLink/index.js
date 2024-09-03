import Link from 'next/link'
import { useRouter } from 'next/router'

function AppLink({ href, className, children }) {
  const { locale } = useRouter()
  const hrefPath = href?.startsWith('http')

  const localizedHref = hrefPath
    ? href
    : `/${locale}${href.startsWith('/') ? '' : '/'}${href}`

  return (
    <Link
      href={localizedHref}
      passHref
      aria-hidden="true"
      target={hrefPath ? '_blank' : '_self'}
      rel={hrefPath ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </Link>
  )
}

export default AppLink
