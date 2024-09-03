import React from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import Image from 'next/image'
import chooseBySlug from '../utils/chooseBySlug'
import { getAllDataByType } from '../lib/cosmic'
import { PageMeta } from '../components/Meta'

import styles from '../styles/pages/NotFound.module.sass'

const AboutUs = ({ navigationItems, landing }) => {
  const { push } = useRouter()
  const { t } = useTranslation('common')

  const handleClick = href => {
    push(href)
  }

  const infoAbout = chooseBySlug(landing, 'about')

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={t('aboutPage.pageTitle', 'About | uNFT Marketplace')}
        description={t(
          'aboutPage.pageDescription',
          'uNFT Marketplace built with Cosmic CMS, Next.js, and the Stripe API',
        )}
      />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrap}>
            <div className={styles.heroWrapper}>
              <Image
                quality={60}
                layout="fill"
                src={infoAbout?.metadata?.image?.imgix_url}
                placeholder="blur"
                blurDataURL={`${infoAbout?.metadata?.image?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
                objectFit="cover"
                alt="Figures"
                priority
              />
            </div>
            <h2 className={cn('h2', styles.title)}>
              {infoAbout?.metadata?.title}
            </h2>
            <h3 className={styles.info}>{infoAbout?.metadata?.subtitle}</h3>
            <p className={styles.info}>{infoAbout?.metadata?.description}</p>
            <button
              onClick={() => handleClick(`/search`)}
              className={cn('button-stroke', styles.form)}
              suppressHydrationWarning
            >
              {t('buttons.startSearchButton', 'Start your search')}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs

export async function getServerSideProps({ locale }) {
  const navigationItems = (await getAllDataByType('navigation')) || []
  const landing = (await getAllDataByType(`landings-${locale}`)) || []

  return {
    props: {
      navigationItems,
      landing,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
