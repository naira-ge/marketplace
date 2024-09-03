import React from 'react'
import { useRouter } from 'next/router'
import styles from './LanguageSwitcher.module.sass' // Import the styles

const LanguageSwitcher = () => {
  const router = useRouter()

  const changeLanguage = event => {
    const selectedLanguage = event.target.value

    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      {
        locale: selectedLanguage,
      },
    )
  }

  return (
    <div className={styles.languageSwitcher}>
      <select
        id="language-select"
        value={router.locale}
        onChange={changeLanguage}
        className={styles.languageSelect}
        aria-label="Language Selector"
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
        <option value="hy">AM</option>
      </select>
    </div>
  )
}

export default LanguageSwitcher
