import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const HeaderComponent: FC = () => {
  const { t } = useTranslation()
  const pageUrls: { name: string; path: string }[] = [
    // { name: 'auth', path: '/auth' }, // AUTO-REDIRECTION FROM /auth TO /auth/signin
    { name: 'auth_signin', path: '/auth/signin' },
    { name: 'dashboard', path: '/' },
    { name: 'user', path: '/user' },
    { name: 'user_profile', path: '/user/profile' },
    { name: 'user_settings', path: '/user/settings' },
  ]
  return (
    <>
      <header>
        <h2>HEADER COMPONENT</h2>
        <nav>
          <ul className="flex justify-center gap-x-2 underline">
            {pageUrls.map((page, key) => (
              <li key={key}>
                <Link to={page.path}>{t(`page.${page.name}`)}</Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-x-4">
            <Link to="/auth">{t('page.auth_signin')}</Link>
            <Link to="/">{t('page.dashboard')}</Link>
          </div>
        </nav>
      </header>
    </>
  )
}
export default HeaderComponent