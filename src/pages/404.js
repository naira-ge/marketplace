import React from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import Layout from '../components/Layout'
import Image from '../components/Image'
import { getAllDataByType } from '../lib/cosmic'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from '../styles/pages/NotFound.module.sass'

const NotFound = ({ navigationItems }) => {
  const { push } = useRouter()
  const { t } = useTranslation('common')

  const handleClick = href => {
    push(href)
  }

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrap}>
            <div className={styles.preview}>
              <Image
                size={{ width: '100%', height: '50vh' }}
                src="/images/content/figures-dark.png"
                srcDark="/images/content/figures-dark.png"
                alt="Figures"
              />
            </div>
            <h2 className={cn('h2', styles.title)}>
              {t(
                'notFound.title',
                'Sorry, we couldn’t find any results for this search.',
              )}
            </h2>
            <div className={styles.info}>
              {t('notFound.info', 'Maybe give one of these a try?')}
            </div>
            <button
              onClick={() => handleClick(`/search`)}
              className={cn('button-stroke', styles.form)}
            >
              {t('notFound.button', 'Start your search')}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound

export async function getStaticProps({ locale }) {
  const navigationItems = (await getAllDataByType('navigation')) || []

  return {
    props: {
      navigationItems,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
